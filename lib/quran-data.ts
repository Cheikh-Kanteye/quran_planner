export interface Surah {
  number: number;
  nameArabic: string;
  nameTranslit: string;
  nameFrench: string;
  ayahCount: number;
  revelationType: 'Mecquoise' | 'Médinoise';
}

export interface JuzInfo {
  number: number;
  nameFrench: string;
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
}

export const SURAHS: Surah[] = [
  { number: 1, nameArabic: 'الفاتحة', nameTranslit: 'Al-Fatiha', nameFrench: "L'Ouverture", ayahCount: 7, revelationType: 'Mecquoise' },
  { number: 2, nameArabic: 'البقرة', nameTranslit: 'Al-Baqarah', nameFrench: 'La Vache', ayahCount: 286, revelationType: 'Médinoise' },
  { number: 3, nameArabic: 'آل عمران', nameTranslit: "Âl-'Imrân", nameFrench: "La Famille d'Imran", ayahCount: 200, revelationType: 'Médinoise' },
  { number: 4, nameArabic: 'النساء', nameTranslit: 'An-Nisa', nameFrench: 'Les Femmes', ayahCount: 176, revelationType: 'Médinoise' },
  { number: 5, nameArabic: 'المائدة', nameTranslit: 'Al-Maïdah', nameFrench: 'La Table Servie', ayahCount: 120, revelationType: 'Médinoise' },
  { number: 6, nameArabic: 'الأنعام', nameTranslit: "Al-An'âm", nameFrench: 'Les Bestiaux', ayahCount: 165, revelationType: 'Mecquoise' },
  { number: 7, nameArabic: 'الأعراف', nameTranslit: "Al-A'râf", nameFrench: 'Les Murailles', ayahCount: 206, revelationType: 'Mecquoise' },
  { number: 8, nameArabic: 'الأنفال', nameTranslit: 'Al-Anfâl', nameFrench: 'Le Butin', ayahCount: 75, revelationType: 'Médinoise' },
  { number: 9, nameArabic: 'التوبة', nameTranslit: 'At-Tawbah', nameFrench: 'Le Repentir', ayahCount: 129, revelationType: 'Médinoise' },
  { number: 10, nameArabic: 'يونس', nameTranslit: 'Yûnus', nameFrench: 'Jonas', ayahCount: 109, revelationType: 'Mecquoise' },
  { number: 11, nameArabic: 'هود', nameTranslit: 'Hûd', nameFrench: 'Hûd', ayahCount: 123, revelationType: 'Mecquoise' },
  { number: 12, nameArabic: 'يوسف', nameTranslit: 'Yûsuf', nameFrench: 'Joseph', ayahCount: 111, revelationType: 'Mecquoise' },
  { number: 13, nameArabic: 'الرعد', nameTranslit: "Ar-Ra'd", nameFrench: 'Le Tonnerre', ayahCount: 43, revelationType: 'Médinoise' },
  { number: 14, nameArabic: 'ابراهيم', nameTranslit: 'Ibrâhîm', nameFrench: 'Abraham', ayahCount: 52, revelationType: 'Mecquoise' },
  { number: 15, nameArabic: 'الحجر', nameTranslit: 'Al-Hijr', nameFrench: 'Al-Hijr', ayahCount: 99, revelationType: 'Mecquoise' },
  { number: 16, nameArabic: 'النحل', nameTranslit: 'An-Nahl', nameFrench: 'Les Abeilles', ayahCount: 128, revelationType: 'Mecquoise' },
  { number: 17, nameArabic: 'الإسراء', nameTranslit: "Al-Isrâ'", nameFrench: 'Le Voyage Nocturne', ayahCount: 111, revelationType: 'Mecquoise' },
  { number: 18, nameArabic: 'الكهف', nameTranslit: 'Al-Kahf', nameFrench: 'La Caverne', ayahCount: 110, revelationType: 'Mecquoise' },
  { number: 19, nameArabic: 'مريم', nameTranslit: 'Maryam', nameFrench: 'Marie', ayahCount: 98, revelationType: 'Mecquoise' },
  { number: 20, nameArabic: 'طه', nameTranslit: 'Tâ-Hâ', nameFrench: 'Tâ-Hâ', ayahCount: 135, revelationType: 'Mecquoise' },
  { number: 21, nameArabic: 'الأنبياء', nameTranslit: 'Al-Anbiyâ', nameFrench: 'Les Prophètes', ayahCount: 112, revelationType: 'Mecquoise' },
  { number: 22, nameArabic: 'الحج', nameTranslit: 'Al-Hajj', nameFrench: 'Le Pèlerinage', ayahCount: 78, revelationType: 'Médinoise' },
  { number: 23, nameArabic: 'المؤمنون', nameTranslit: 'Al-Mu\'minûn', nameFrench: 'Les Croyants', ayahCount: 118, revelationType: 'Mecquoise' },
  { number: 24, nameArabic: 'النور', nameTranslit: 'An-Nûr', nameFrench: 'La Lumière', ayahCount: 64, revelationType: 'Médinoise' },
  { number: 25, nameArabic: 'الفرقان', nameTranslit: 'Al-Furqân', nameFrench: 'Le Discernement', ayahCount: 77, revelationType: 'Mecquoise' },
  { number: 26, nameArabic: 'الشعراء', nameTranslit: "Ash-Shu'arâ'", nameFrench: 'Les Poètes', ayahCount: 227, revelationType: 'Mecquoise' },
  { number: 27, nameArabic: 'النمل', nameTranslit: 'An-Naml', nameFrench: 'Les Fourmis', ayahCount: 93, revelationType: 'Mecquoise' },
  { number: 28, nameArabic: 'القصص', nameTranslit: 'Al-Qasas', nameFrench: 'Le Récit', ayahCount: 88, revelationType: 'Mecquoise' },
  {
    number: 29, nameArabic: 'العنكبوت', nameTranslit: 'Al-\'Ankabût', nameFrench: "L'Araignée", ayahCount: 69, revelationType: 'Mecquoise'
  },
  { number: 30, nameArabic: 'الروم', nameTranslit: 'Ar-Rûm', nameFrench: 'Les Romains', ayahCount: 60, revelationType: 'Mecquoise' },
  { number: 31, nameArabic: 'لقمان', nameTranslit: 'Luqmân', nameFrench: 'Luqmân', ayahCount: 34, revelationType: 'Mecquoise' },
  { number: 32, nameArabic: 'السجدة', nameTranslit: 'As-Sajdah', nameFrench: 'La Prosternation', ayahCount: 30, revelationType: 'Mecquoise' },
  { number: 33, nameArabic: 'الأحزاب', nameTranslit: 'Al-Ahzâb', nameFrench: 'Les Coalisés', ayahCount: 73, revelationType: 'Médinoise' },
  { number: 34, nameArabic: 'سبأ', nameTranslit: "Saba'", nameFrench: 'Saba', ayahCount: 54, revelationType: 'Mecquoise' },
  { number: 35, nameArabic: 'فاطر', nameTranslit: 'Fâtir', nameFrench: 'Le Créateur', ayahCount: 45, revelationType: 'Mecquoise' },
  { number: 36, nameArabic: 'يس', nameTranslit: 'Yâ-Sîn', nameFrench: 'Yâ-Sîn', ayahCount: 83, revelationType: 'Mecquoise' },
  { number: 37, nameArabic: 'الصافات', nameTranslit: 'As-Sâffât', nameFrench: 'Les Rangées', ayahCount: 182, revelationType: 'Mecquoise' },
  { number: 38, nameArabic: 'ص', nameTranslit: 'Sâd', nameFrench: 'Sâd', ayahCount: 88, revelationType: 'Mecquoise' },
  { number: 39, nameArabic: 'الزمر', nameTranslit: 'Az-Zumar', nameFrench: 'Les Groupes', ayahCount: 75, revelationType: 'Mecquoise' },
  { number: 40, nameArabic: 'غافر', nameTranslit: 'Ghâfir', nameFrench: 'Le Pardonneur', ayahCount: 85, revelationType: 'Mecquoise' },
  { number: 41, nameArabic: 'فصلت', nameTranslit: 'Fussilat', nameFrench: 'Exposés en Détail', ayahCount: 54, revelationType: 'Mecquoise' },
  { number: 42, nameArabic: 'الشورى', nameTranslit: 'Ash-Shûrâ', nameFrench: 'La Consultation', ayahCount: 53, revelationType: 'Mecquoise' },
  { number: 43, nameArabic: 'الزخرف', nameTranslit: 'Az-Zukhruf', nameFrench: "L'Ornement", ayahCount: 89, revelationType: 'Mecquoise' },
  { number: 44, nameArabic: 'الدخان', nameTranslit: 'Ad-Dukhân', nameFrench: 'La Fumée', ayahCount: 59, revelationType: 'Mecquoise' },
  { number: 45, nameArabic: 'الجاثية', nameTranslit: 'Al-Jâthiyah', nameFrench: "L'Agenouillée", ayahCount: 37, revelationType: 'Mecquoise' },
  { number: 46, nameArabic: 'الأحقاف', nameTranslit: 'Al-Ahqâf', nameFrench: 'Les Dunes', ayahCount: 35, revelationType: 'Mecquoise' },
  { number: 47, nameArabic: 'محمد', nameTranslit: 'Muhammad', nameFrench: 'Muhammad', ayahCount: 38, revelationType: 'Médinoise' },
  { number: 48, nameArabic: 'الفتح', nameTranslit: 'Al-Fath', nameFrench: 'La Victoire', ayahCount: 29, revelationType: 'Médinoise' },
  { number: 49, nameArabic: 'الحجرات', nameTranslit: 'Al-Hujurât', nameFrench: 'Les Appartements', ayahCount: 18, revelationType: 'Médinoise' },
  { number: 50, nameArabic: 'ق', nameTranslit: 'Qâf', nameFrench: 'Qâf', ayahCount: 45, revelationType: 'Mecquoise' },
  { number: 51, nameArabic: 'الذاريات', nameTranslit: 'Adh-Dhâriyât', nameFrench: 'Les Vents Dispersants', ayahCount: 60, revelationType: 'Mecquoise' },
  { number: 52, nameArabic: 'الطور', nameTranslit: 'At-Tûr', nameFrench: 'Le Mont Sinaï', ayahCount: 49, revelationType: 'Mecquoise' },
  { number: 53, nameArabic: 'النجم', nameTranslit: 'An-Najm', nameFrench: "L'Étoile", ayahCount: 62, revelationType: 'Mecquoise' },
  { number: 54, nameArabic: 'القمر', nameTranslit: 'Al-Qamar', nameFrench: 'La Lune', ayahCount: 55, revelationType: 'Mecquoise' },
  { number: 55, nameArabic: 'الرحمن', nameTranslit: 'Ar-Rahmân', nameFrench: 'Le Très Miséricordieux', ayahCount: 78, revelationType: 'Mecquoise' },
  { number: 56, nameArabic: 'الواقعة', nameTranslit: "Al-Wâqi'ah", nameFrench: "L'Événement", ayahCount: 96, revelationType: 'Mecquoise' },
  { number: 57, nameArabic: 'الحديد', nameTranslit: 'Al-Hadîd', nameFrench: 'Le Fer', ayahCount: 29, revelationType: 'Médinoise' },
  { number: 58, nameArabic: 'المجادلة', nameTranslit: 'Al-Mujâdilah', nameFrench: 'La Discussion', ayahCount: 22, revelationType: 'Médinoise' },
  { number: 59, nameArabic: 'الحشر', nameTranslit: 'Al-Hashr', nameFrench: "L'Exode", ayahCount: 24, revelationType: 'Médinoise' },
  { number: 60, nameArabic: 'الممتحنة', nameTranslit: 'Al-Mumtahanah', nameFrench: "L'Éprouvée", ayahCount: 13, revelationType: 'Médinoise' },
  { number: 61, nameArabic: 'الصف', nameTranslit: 'As-Saff', nameFrench: 'Le Rang', ayahCount: 14, revelationType: 'Médinoise' },
  { number: 62, nameArabic: 'الجمعة', nameTranslit: "Al-Jumu'ah", nameFrench: 'Le Vendredi', ayahCount: 11, revelationType: 'Médinoise' },
  { number: 63, nameArabic: 'المنافقون', nameTranslit: 'Al-Munâfiqûn', nameFrench: 'Les Hypocrites', ayahCount: 11, revelationType: 'Médinoise' },
  { number: 64, nameArabic: 'التغابن', nameTranslit: 'At-Taghâbun', nameFrench: 'La Spoliation', ayahCount: 18, revelationType: 'Médinoise' },
  { number: 65, nameArabic: 'الطلاق', nameTranslit: 'At-Talâq', nameFrench: 'Le Divorce', ayahCount: 12, revelationType: 'Médinoise' },
  { number: 66, nameArabic: 'التحريم', nameTranslit: 'At-Tahrîm', nameFrench: "L'Interdiction", ayahCount: 12, revelationType: 'Médinoise' },
  { number: 67, nameArabic: 'الملك', nameTranslit: 'Al-Mulk', nameFrench: 'La Royauté', ayahCount: 30, revelationType: 'Mecquoise' },
  { number: 68, nameArabic: 'القلم', nameTranslit: 'Al-Qalam', nameFrench: 'La Plume', ayahCount: 52, revelationType: 'Mecquoise' },
  { number: 69, nameArabic: 'الحاقة', nameTranslit: 'Al-Hâqqah', nameFrench: "L'Inévitable", ayahCount: 52, revelationType: 'Mecquoise' },
  { number: 70, nameArabic: 'المعارج', nameTranslit: "Al-Ma'ârij", nameFrench: 'Les Degrés', ayahCount: 44, revelationType: 'Mecquoise' },
  { number: 71, nameArabic: 'نوح', nameTranslit: 'Nûh', nameFrench: 'Noé', ayahCount: 28, revelationType: 'Mecquoise' },
  { number: 72, nameArabic: 'الجن', nameTranslit: 'Al-Jinn', nameFrench: 'Les Djinns', ayahCount: 28, revelationType: 'Mecquoise' },
  { number: 73, nameArabic: 'المزمل', nameTranslit: 'Al-Muzzammil', nameFrench: "L'Enveloppé", ayahCount: 20, revelationType: 'Mecquoise' },
  { number: 74, nameArabic: 'المدثر', nameTranslit: 'Al-Muddaththir', nameFrench: 'Le Revêtu du Manteau', ayahCount: 56, revelationType: 'Mecquoise' },
  { number: 75, nameArabic: 'القيامة', nameTranslit: 'Al-Qiyâmah', nameFrench: 'La Résurrection', ayahCount: 40, revelationType: 'Mecquoise' },
  { number: 76, nameArabic: 'الإنسان', nameTranslit: 'Al-Insân', nameFrench: "L'Homme", ayahCount: 31, revelationType: 'Médinoise' },
  { number: 77, nameArabic: 'المرسلات', nameTranslit: 'Al-Mursalât', nameFrench: 'Les Envoyés', ayahCount: 50, revelationType: 'Mecquoise' },
  { number: 78, nameArabic: 'النبأ', nameTranslit: "An-Naba'", nameFrench: 'La Nouvelle', ayahCount: 40, revelationType: 'Mecquoise' },
  { number: 79, nameArabic: 'النازعات', nameTranslit: "An-Nâzi'ât", nameFrench: 'Ceux Qui Arrachent', ayahCount: 46, revelationType: 'Mecquoise' },
  { number: 80, nameArabic: 'عبس', nameTranslit: 'Abasa', nameFrench: 'Il se Renfrogna', ayahCount: 42, revelationType: 'Mecquoise' },
  { number: 81, nameArabic: 'التكوير', nameTranslit: 'At-Takwîr', nameFrench: "L'Enroulement", ayahCount: 29, revelationType: 'Mecquoise' },
  { number: 82, nameArabic: 'الإنفطار', nameTranslit: 'Al-Infitâr', nameFrench: 'Le Déchirement', ayahCount: 19, revelationType: 'Mecquoise' },
  { number: 83, nameArabic: 'المطففين', nameTranslit: 'Al-Mutaffifîn', nameFrench: 'Les Fraudeurs', ayahCount: 36, revelationType: 'Mecquoise' },
  { number: 84, nameArabic: 'الإنشقاق', nameTranslit: 'Al-Inshiqâq', nameFrench: 'La Fente', ayahCount: 25, revelationType: 'Mecquoise' },
  { number: 85, nameArabic: 'البروج', nameTranslit: 'Al-Burûj', nameFrench: 'Les Constellations', ayahCount: 22, revelationType: 'Mecquoise' },
  { number: 86, nameArabic: 'الطارق', nameTranslit: 'At-Târiq', nameFrench: "L'Astre Nocturne", ayahCount: 17, revelationType: 'Mecquoise' },
  { number: 87, nameArabic: 'الأعلى', nameTranslit: "Al-A'lâ", nameFrench: 'Le Très-Haut', ayahCount: 19, revelationType: 'Mecquoise' },
  { number: 88, nameArabic: 'الغاشية', nameTranslit: 'Al-Ghâshiyah', nameFrench: "L'Enveloppante", ayahCount: 26, revelationType: 'Mecquoise' },
  { number: 89, nameArabic: 'الفجر', nameTranslit: 'Al-Fajr', nameFrench: "L'Aube", ayahCount: 30, revelationType: 'Mecquoise' },
  { number: 90, nameArabic: 'البلد', nameTranslit: 'Al-Balad', nameFrench: 'La Cité', ayahCount: 20, revelationType: 'Mecquoise' },
  { number: 91, nameArabic: 'الشمس', nameTranslit: 'Ash-Shams', nameFrench: 'Le Soleil', ayahCount: 15, revelationType: 'Mecquoise' },
  { number: 92, nameArabic: 'الليل', nameTranslit: 'Al-Layl', nameFrench: 'La Nuit', ayahCount: 21, revelationType: 'Mecquoise' },
  { number: 93, nameArabic: 'الضحى', nameTranslit: 'Ad-Duhâ', nameFrench: 'La Matinée', ayahCount: 11, revelationType: 'Mecquoise' },
  { number: 94, nameArabic: 'الشرح', nameTranslit: 'Ash-Sharh', nameFrench: "L'Expansion", ayahCount: 8, revelationType: 'Mecquoise' },
  { number: 95, nameArabic: 'التين', nameTranslit: 'At-Tîn', nameFrench: 'Le Figuier', ayahCount: 8, revelationType: 'Mecquoise' },
  { number: 96, nameArabic: 'العلق', nameTranslit: "Al-'Alaq", nameFrench: "Le Caillot de Sang", ayahCount: 19, revelationType: 'Mecquoise' },
  { number: 97, nameArabic: 'القدر', nameTranslit: 'Al-Qadr', nameFrench: 'La Nuit du Destin', ayahCount: 5, revelationType: 'Mecquoise' },
  { number: 98, nameArabic: 'البينة', nameTranslit: 'Al-Bayyinah', nameFrench: 'La Preuve', ayahCount: 8, revelationType: 'Médinoise' },
  { number: 99, nameArabic: 'الزلزلة', nameTranslit: 'Az-Zalzalah', nameFrench: 'Le Séisme', ayahCount: 8, revelationType: 'Médinoise' },
  { number: 100, nameArabic: 'العاديات', nameTranslit: "Al-'Âdiyât", nameFrench: 'Les Coursiers', ayahCount: 11, revelationType: 'Mecquoise' },
  { number: 101, nameArabic: 'القارعة', nameTranslit: "Al-Qâri'ah", nameFrench: 'La Fracassante', ayahCount: 11, revelationType: 'Mecquoise' },
  { number: 102, nameArabic: 'التكاثر', nameTranslit: 'At-Takâthur', nameFrench: "L'Accumulation", ayahCount: 8, revelationType: 'Mecquoise' },
  { number: 103, nameArabic: 'العصر', nameTranslit: "Al-'Asr", nameFrench: "Le Temps", ayahCount: 3, revelationType: 'Mecquoise' },
  { number: 104, nameArabic: 'الهمزة', nameTranslit: 'Al-Humazah', nameFrench: 'Le Médisant', ayahCount: 9, revelationType: 'Mecquoise' },
  { number: 105, nameArabic: 'الفيل', nameTranslit: 'Al-Fîl', nameFrench: "L'Éléphant", ayahCount: 5, revelationType: 'Mecquoise' },
  { number: 106, nameArabic: 'قريش', nameTranslit: 'Quraysh', nameFrench: 'Quraysh', ayahCount: 4, revelationType: 'Mecquoise' },
  { number: 107, nameArabic: 'الماعون', nameTranslit: "Al-Mâ'ûn", nameFrench: "L'Ustensile", ayahCount: 7, revelationType: 'Mecquoise' },
  { number: 108, nameArabic: 'الكوثر', nameTranslit: 'Al-Kawthar', nameFrench: "L'Abondance", ayahCount: 3, revelationType: 'Mecquoise' },
  { number: 109, nameArabic: 'الكافرون', nameTranslit: 'Al-Kâfirûn', nameFrench: 'Les Infidèles', ayahCount: 6, revelationType: 'Mecquoise' },
  { number: 110, nameArabic: 'النصر', nameTranslit: 'An-Nasr', nameFrench: 'Le Secours Divin', ayahCount: 3, revelationType: 'Médinoise' },
  { number: 111, nameArabic: 'المسد', nameTranslit: 'Al-Masad', nameFrench: 'Les Fibres', ayahCount: 5, revelationType: 'Mecquoise' },
  { number: 112, nameArabic: 'الإخلاص', nameTranslit: 'Al-Ikhlâs', nameFrench: 'La Sincérité', ayahCount: 4, revelationType: 'Mecquoise' },
  { number: 113, nameArabic: 'الفلق', nameTranslit: 'Al-Falaq', nameFrench: "L'Aube Naissante", ayahCount: 5, revelationType: 'Mecquoise' },
  { number: 114, nameArabic: 'الناس', nameTranslit: 'An-Nâs', nameFrench: 'Les Hommes', ayahCount: 6, revelationType: 'Mecquoise' },
];

export const JUZ_DATA: JuzInfo[] = [
  { number: 1, nameFrench: 'Alif Lâm Mîm', startSurah: 1, startAyah: 1, endSurah: 2, endAyah: 141 },
  { number: 2, nameFrench: 'Sayaqûl', startSurah: 2, startAyah: 142, endSurah: 2, endAyah: 252 },
  { number: 3, nameFrench: 'Tilka ar-Rusul', startSurah: 2, startAyah: 253, endSurah: 3, endAyah: 92 },
  { number: 4, nameFrench: "Lan Tanâlû", startSurah: 3, startAyah: 93, endSurah: 4, endAyah: 23 },
  { number: 5, nameFrench: 'Wal-Muhsanât', startSurah: 4, startAyah: 24, endSurah: 4, endAyah: 147 },
  { number: 6, nameFrench: 'Lâ Yuhibb Allâh', startSurah: 4, startAyah: 148, endSurah: 5, endAyah: 81 },
  { number: 7, nameFrench: 'Wa Idhâ Sami\'û', startSurah: 5, startAyah: 82, endSurah: 6, endAyah: 110 },
  { number: 8, nameFrench: 'Wa Law Annanâ', startSurah: 6, startAyah: 111, endSurah: 7, endAyah: 87 },
  { number: 9, nameFrench: 'Qâla al-Mala\'', startSurah: 7, startAyah: 88, endSurah: 8, endAyah: 40 },
  { number: 10, nameFrench: 'Wa A\'lamû', startSurah: 8, startAyah: 41, endSurah: 9, endAyah: 92 },
  { number: 11, nameFrench: "Ya'tadhirûna", startSurah: 9, startAyah: 93, endSurah: 11, endAyah: 5 },
  { number: 12, nameFrench: 'Wa Mâ Min Dâbbah', startSurah: 11, startAyah: 6, endSurah: 12, endAyah: 52 },
  { number: 13, nameFrench: "Wa Mâ Ubarri'u", startSurah: 12, startAyah: 53, endSurah: 14, endAyah: 52 },
  { number: 14, nameFrench: 'Rubamâ', startSurah: 15, startAyah: 1, endSurah: 16, endAyah: 128 },
  { number: 15, nameFrench: 'Subhânallazî', startSurah: 17, startAyah: 1, endSurah: 18, endAyah: 74 },
  { number: 16, nameFrench: 'Qâla Alam', startSurah: 18, startAyah: 75, endSurah: 20, endAyah: 135 },
  { number: 17, nameFrench: 'Iqtaraba', startSurah: 21, startAyah: 1, endSurah: 22, endAyah: 78 },
  { number: 18, nameFrench: 'Qad Aflaha', startSurah: 23, startAyah: 1, endSurah: 25, endAyah: 20 },
  { number: 19, nameFrench: 'Wa Qâlallazîna', startSurah: 25, startAyah: 21, endSurah: 27, endAyah: 55 },
  { number: 20, nameFrench: 'Amman Khalaqa', startSurah: 27, startAyah: 56, endSurah: 29, endAyah: 45 },
  { number: 21, nameFrench: 'Utlu Mâ Ûhiya', startSurah: 29, startAyah: 46, endSurah: 33, endAyah: 30 },
  { number: 22, nameFrench: 'Wa Mayyaqnut', startSurah: 33, startAyah: 31, endSurah: 36, endAyah: 27 },
  { number: 23, nameFrench: 'Wa Mâ lî', startSurah: 36, startAyah: 28, endSurah: 39, endAyah: 31 },
  { number: 24, nameFrench: 'Faman Azlamu', startSurah: 39, startAyah: 32, endSurah: 41, endAyah: 46 },
  { number: 25, nameFrench: 'Ilayhi Yuraddu', startSurah: 41, startAyah: 47, endSurah: 45, endAyah: 37 },
  { number: 26, nameFrench: 'Hâ Mîm', startSurah: 46, startAyah: 1, endSurah: 51, endAyah: 30 },
  { number: 27, nameFrench: 'Qâla Famâ Khatbukum', startSurah: 51, startAyah: 31, endSurah: 57, endAyah: 29 },
  { number: 28, nameFrench: 'Qad Sami\'a Allâh', startSurah: 58, startAyah: 1, endSurah: 66, endAyah: 12 },
  { number: 29, nameFrench: 'Tabâraka Alladhî', startSurah: 67, startAyah: 1, endSurah: 77, endAyah: 50 },
  { number: 30, nameFrench: 'Amma', startSurah: 78, startAyah: 1, endSurah: 114, endAyah: 6 },
];

export function getSurah(number: number): Surah | undefined {
  return SURAHS.find((s) => s.number === number);
}

export function getJuz(number: number): JuzInfo | undefined {
  return JUZ_DATA.find((j) => j.number === number);
}

/** Returns the juz(s) to read on a given day for a given frequency */
export function getDayPlan(day: number, frequency: number): JuzInfo[] {
  const result: JuzInfo[] = [];
  for (let i = 0; i < frequency; i++) {
    const juzIndex = ((day - 1) * frequency + i) % 30;
    result.push(JUZ_DATA[juzIndex]);
  }
  return result;
}

export const PRAYERS = ['Fajr', 'Dhouhr', 'Asr', 'Maghrib', 'Isha'] as const;
export type Prayer = (typeof PRAYERS)[number];

export const FREQUENCY_LABELS: Record<number, string> = {
  1: 'Une fois',
  2: 'Deux fois',
  3: 'Trois fois',
  4: 'Quatre fois',
  5: 'Cinq fois',
};
