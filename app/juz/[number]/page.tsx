import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JUZ_DATA, SURAHS } from "@/lib/quran-data";
import JuzViewer from "@/components/JuzViewer";

interface Props {
  params: Promise<{ number: string }>;
}

export async function generateMetadata({ params }: Readonly<Props>): Promise<Metadata> {
  const { number } = await params;
  const juzNumber = Number.parseInt(number, 10);
  if (Number.isNaN(juzNumber) || juzNumber < 1 || juzNumber > 30) {
    return { title: "Juz introuvable" };
  }
  const juz = JUZ_DATA[juzNumber - 1];
  return {
    title: `Juz ${juzNumber} — ${juz.nameFrench} | Coran Ramadan`,
    description: `Lisez le Juz ${juzNumber} du Coran avec le texte arabe et la traduction française de Muhammad Hamidullah.`,
  };
}

export default async function JuzPage({ params }: Readonly<Props>) {
  const { number } = await params;
  const juzNumber = Number.parseInt(number, 10);

  if (Number.isNaN(juzNumber) || juzNumber < 1 || juzNumber > 30) {
    notFound();
  }

  const juzInfo = JUZ_DATA[juzNumber - 1];

  // Build a lightweight surah metadata map to pass to the client component.
  // This avoids shipping the full SURAHS array in the client bundle.
  const relevantSurahNumbers = new Set<number>();
  for (let s = juzInfo.startSurah; s <= juzInfo.endSurah; s++) {
    relevantSurahNumbers.add(s);
  }

  const surahMeta = Object.fromEntries(
    SURAHS.filter((s) => relevantSurahNumbers.has(s.number)).map((s) => [
      s.number,
      {
        nameArabic: s.nameArabic,
        nameTranslit: s.nameTranslit,
        nameFrench: s.nameFrench,
        ayahCount: s.ayahCount,
        revelationType: s.revelationType,
      },
    ])
  );

  return (
    <JuzViewer
      juzNumber={juzNumber}
      juzInfo={juzInfo}
      surahMeta={surahMeta}
    />
  );
}
