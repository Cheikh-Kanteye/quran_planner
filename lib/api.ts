const BASE_URL = 'https://api.alquran.cloud/v1';

export interface ApiAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
  };
}

export interface AyahWithTranslation {
  number: number;
  numberInSurah: number;
  arabicText: string;
  frenchText: string;
  surahNumber: number;
  surahName: string;
  surahNameArabic: string;
  page: number;
}

export interface JuzData {
  juzNumber: number;
  ayahs: AyahWithTranslation[];
}

async function fetchEdition(
  juzNumber: number,
  edition: string
): Promise<ApiAyah[]> {
  const url = `${BASE_URL}/juz/${juzNumber}/${edition}`;
  const response = await fetch(url, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(
      `Erreur API ${response.status} pour l'édition "${edition}" du Juz ${juzNumber}`
    );
  }

  const data = await response.json();

  if (data.code !== 200 || !data.data?.ayahs) {
    throw new Error(`Réponse invalide pour le Juz ${juzNumber} (${edition})`);
  }

  return data.data.ayahs as ApiAyah[];
}

export async function fetchJuzData(juzNumber: number): Promise<JuzData> {
  // Two separate requests — more reliable than the combined /editions/ endpoint
  const [arabicAyahs, frenchAyahs] = await Promise.all([
    fetchEdition(juzNumber, 'quran-uthmani'),
    fetchEdition(juzNumber, 'fr.hamidullah'),
  ]);

  const ayahs: AyahWithTranslation[] = arabicAyahs.map((arabicAyah, index) => {
    const frenchAyah = frenchAyahs[index];
    return {
      number: arabicAyah.number,
      numberInSurah: arabicAyah.numberInSurah,
      arabicText: arabicAyah.text,
      frenchText: frenchAyah?.text ?? '',
      surahNumber: arabicAyah.surah.number,
      surahName: arabicAyah.surah.englishName,
      surahNameArabic: arabicAyah.surah.name,
      page: arabicAyah.page,
    };
  });

  return { juzNumber, ayahs };
}
