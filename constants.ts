import { LearningItem, PrayerItem } from "./types";

export const APP_NAME = "TK Islam Anwaarul Hidayah";
export const APP_ADDRESS = "Perum Green Asri, Desa Jatisela | Aplikasi Belajar Ceria";

export const ALPHABET_DATA: LearningItem[] = [
  { symbol: 'A', word: 'Apel', emoji: '🍎', color: 'bg-red-100 text-red-700' },
  { symbol: 'B', word: 'Bola', emoji: '⚽', color: 'bg-blue-100 text-blue-700' },
  { symbol: 'C', word: 'Ceri', emoji: '🍒', color: 'bg-pink-100 text-pink-700' },
  { symbol: 'D', word: 'Domba', emoji: '🐑', color: 'bg-gray-100 text-gray-700' },
  { symbol: 'E', word: 'Es Krim', emoji: '🍦', color: 'bg-yellow-100 text-yellow-700' },
  { symbol: 'F', word: 'Foto', emoji: '📷', color: 'bg-purple-100 text-purple-700' },
  { symbol: 'G', word: 'Gajah', emoji: '🐘', color: 'bg-gray-200 text-gray-800' },
  { symbol: 'H', word: 'Hujan', emoji: '🌧️', color: 'bg-blue-200 text-blue-800' },
  { symbol: 'I', word: 'Ikan', emoji: '🐟', color: 'bg-cyan-100 text-cyan-600' },
  { symbol: 'J', word: 'Jeruk', emoji: '🍊', color: 'bg-orange-100 text-orange-800' },
  { symbol: 'K', word: 'Kucing', emoji: '🐱', color: 'bg-amber-100 text-amber-800' },
  { symbol: 'L', word: 'Lampu', emoji: '💡', color: 'bg-yellow-200 text-yellow-800' },
  { symbol: 'M', word: 'Masjid', emoji: '🕌', color: 'bg-emerald-100 text-emerald-800' },
  { symbol: 'N', word: 'Nanas', emoji: '🍍', color: 'bg-yellow-100 text-yellow-700' },
  { symbol: 'O', word: 'Obor', emoji: '🔥', color: 'bg-orange-200 text-orange-800' },
  { symbol: 'P', word: 'Pohon', emoji: '🌳', color: 'bg-green-100 text-green-700' },
  { symbol: 'Q', word: 'Quran', emoji: '📖', color: 'bg-emerald-200 text-emerald-800' },
  { symbol: 'R', word: 'Rumah', emoji: '🏠', color: 'bg-blue-100 text-blue-700' },
  { symbol: 'S', word: 'Sapi', emoji: '🐄', color: 'bg-stone-200 text-stone-800' },
  { symbol: 'T', word: 'Tas', emoji: '🎒', color: 'bg-rose-100 text-rose-700' },
  { symbol: 'U', word: 'Unta', emoji: '🐪', color: 'bg-amber-200 text-amber-800' },
  { symbol: 'V', word: 'Vas', emoji: '🏺', color: 'bg-orange-100 text-orange-800' },
  { symbol: 'W', word: 'Wortel', emoji: '🥕', color: 'bg-orange-200 text-orange-700' },
  { symbol: 'X', word: 'Xylophone', emoji: '🎹', color: 'bg-pink-100 text-pink-700' },
  { symbol: 'Y', word: 'Yoyo', emoji: '🪀', color: 'bg-red-200 text-red-800' },
  { symbol: 'Z', word: 'Zebra', emoji: '🦓', color: 'bg-gray-200 text-gray-900' },
];

export const HIJAIYAH_DATA: LearningItem[] = [
  { symbol: 'ا', word: 'Alif', emoji: '1', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'b', word: 'Ba', emoji: '2', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 't', word: 'Ta', emoji: '3', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'th', word: 'Tsa', emoji: '4', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'j', word: 'Jim', emoji: '5', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'H', word: 'Ha', emoji: '6', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'kh', word: 'Kho', emoji: '7', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'd', word: 'Dal', emoji: '8', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'dh', word: 'Dzal', emoji: '9', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'r', word: 'Ro', emoji: '10', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'z', word: 'Zai', emoji: '11', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 's', word: 'Sin', emoji: '12', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'sh', word: 'Syin', emoji: '13', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'S', word: 'Shod', emoji: '14', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'D', word: 'Dhod', emoji: '15', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'T', word: 'Tho', emoji: '16', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'Z', word: 'Zho', emoji: '17', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: '3', word: 'Ain', emoji: '18', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'G', word: 'Ghain', emoji: '19', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'f', word: 'Fa', emoji: '20', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'q', word: 'Qof', emoji: '21', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'k', word: 'Kaf', emoji: '22', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'l', word: 'Lam', emoji: '23', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'm', word: 'Mim', emoji: '24', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'n', word: 'Nun', emoji: '25', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'w', word: 'Wau', emoji: '26', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'h', word: 'Ha', emoji: '27', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'y', word: 'Ya', emoji: '28', color: 'bg-emerald-100 text-emerald-800', isArabic: true }
];

// Map simple chars to real Arabic for display
export const ARABIC_DISPLAY_MAP: Record<string, string> = {
  'ا': 'ا', 'b': 'ب', 't': 'ت', 'th': 'ث', 'j': 'ج', 'H': 'ح', 'kh': 'خ',
  'd': 'د', 'dh': 'ذ', 'r': 'ر', 'z': 'ز', 's': 'س', 'sh': 'ش', 'S': 'ص',
  'D': 'ض', 'T': 'ط', 'Z': 'ظ', '3': 'ع', 'G': 'غ', 'f': 'ف', 'q': 'ق',
  'k': 'ك', 'l': 'ل', 'm': 'م', 'n': 'ن', 'w': 'و', 'h': 'ه', 'y': 'ي'
};

export const NUMBER_DATA: LearningItem[] = [
  { symbol: '1', word: 'Satu', emoji: '1️⃣', color: 'bg-green-100 text-green-700' },
  { symbol: '2', word: 'Dua', emoji: '2️⃣', color: 'bg-blue-100 text-blue-700' },
  { symbol: '3', word: 'Tiga', emoji: '3️⃣', color: 'bg-purple-100 text-purple-700' },
  { symbol: '4', word: 'Empat', emoji: '4️⃣', color: 'bg-yellow-100 text-yellow-700' },
  { symbol: '5', word: 'Lima', emoji: '5️⃣', color: 'bg-red-100 text-red-700' },
  { symbol: '6', word: 'Enam', emoji: '6️⃣', color: 'bg-indigo-100 text-indigo-700' },
  { symbol: '7', word: 'Tujuh', emoji: '7️⃣', color: 'bg-pink-100 text-pink-700' },
  { symbol: '8', word: 'Delapan', emoji: '8️⃣', color: 'bg-teal-100 text-teal-700' },
  { symbol: '9', word: 'Sembilan', emoji: '9️⃣', color: 'bg-orange-100 text-orange-700' },
  { symbol: '10', word: 'Sepuluh', emoji: '🔟', color: 'bg-emerald-100 text-emerald-700' },
];

export const COLOR_SHAPE_DATA: LearningItem[] = [
  { symbol: '🔴', word: 'Merah', emoji: '🎈', color: 'bg-red-100 text-red-600' },
  { symbol: '🔵', word: 'Biru', emoji: '🚙', color: 'bg-blue-100 text-blue-600' },
  { symbol: '🟡', word: 'Kuning', emoji: '🌻', color: 'bg-yellow-100 text-yellow-600' },
  { symbol: '🟢', word: 'Hijau', emoji: '🐸', color: 'bg-green-100 text-green-600' },
  { symbol: '⚫', word: 'Hitam', emoji: '🎩', color: 'bg-gray-300 text-black' },
  { symbol: '⚪', word: 'Putih', emoji: '🦢', color: 'bg-white text-gray-400 border' },
  { symbol: '🟠', word: 'Jingga', emoji: '🍊', color: 'bg-orange-100 text-orange-600' },
  { symbol: '🟣', word: 'Ungu', emoji: '🍇', color: 'bg-purple-100 text-purple-600' },
  { symbol: '⬛', word: 'Kotak', emoji: '📦', color: 'bg-gray-200 text-gray-700' },
  { symbol: '🔺', word: 'Segitiga', emoji: '🍕', color: 'bg-orange-100 text-orange-600' },
  { symbol: '⚪', word: 'Lingkaran', emoji: '🍩', color: 'bg-pink-100 text-pink-600' },
  { symbol: '⭐', word: 'Bintang', emoji: '🌟', color: 'bg-yellow-100 text-yellow-600' },
  { symbol: '🌙', word: 'Bulan Sabit', emoji: '☪️', color: 'bg-emerald-100 text-emerald-700' },
  { symbol: '🕌', word: 'Kubah', emoji: '💚', color: 'bg-emerald-200 text-emerald-800' },
  { symbol: '🤎', word: 'Cokelat', emoji: '🪵', color: 'bg-amber-100 text-amber-800' },
];

export const ASMAUL_HUSNA_DATA: LearningItem[] = [
  { symbol: 'الرَّحْمَنُ', word: 'Ar Rahman', meaning: 'Maha Pengasih', emoji: '1', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'الرَّحِيمُ', word: 'Ar Rahiim', meaning: 'Maha Penyayang', emoji: '2', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'الْمَلِكُ', word: 'Al Malik', meaning: 'Maha Merajai', emoji: '3', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'الْقُدُّوسُ', word: 'Al Quddus', meaning: 'Maha Suci', emoji: '4', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'السَّلاَمُ', word: 'As Salaam', meaning: 'Maha Memberi Sejahtera', emoji: '5', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'الْمُؤْمِنُ', word: 'Al Mu\'min', meaning: 'Maha Memberi Keamanan', emoji: '6', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'الْمُهَيْمِنُ', word: 'Al Muhaimin', meaning: 'Maha Memelihara', emoji: '7', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'الْعَزِيزُ', word: 'Al \'Aziz', meaning: 'Maha Perkasa', emoji: '8', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'الْجَبَّارُ', word: 'Al Jabbar', meaning: 'Maha Memaksa', emoji: '9', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'الْمُتَكَبِّرُ', word: 'Al Mutakabbir', meaning: 'Maha Memiliki Kebesaran', emoji: '10', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'الْخَالِقُ', word: 'Al Khaliq', meaning: 'Maha Pencipta', emoji: '11', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'الْبَارِئُ', word: 'Al Baari\'', meaning: 'Maha Melepaskan', emoji: '12', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'الْمُصَوِّرُ', word: 'Al Mushawwir', meaning: 'Maha Membentuk Rupa', emoji: '13', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'الْغَفَّارُ', word: 'Al Ghaffar', meaning: 'Maha Pengampun', emoji: '14', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'الْقَهَّارُ', word: 'Al Qahhar', meaning: 'Maha Menundukkan', emoji: '15', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'الْوَهَّابُ', word: 'Al Wahhab', meaning: 'Maha Pemberi Karunia', emoji: '16', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'الرَّزَّاقُ', word: 'Ar Razzaq', meaning: 'Maha Pemberi Rezeki', emoji: '17', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'الْفَتَّاحُ', word: 'Al Fattah', meaning: 'Maha Pembuka Rahmat', emoji: '18', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
  { symbol: 'الْعَلِيمُ', word: 'Al \'Aliim', meaning: 'Maha Mengetahui', emoji: '19', color: 'bg-emerald-50 text-emerald-800', isArabic: true },
  { symbol: 'الْقَابِضُ', word: 'Al Qaabidh', meaning: 'Maha Menyempitkan', emoji: '20', color: 'bg-emerald-100 text-emerald-800', isArabic: true },
];

export const PRAYER_DATA: PrayerItem[] = [
  {
    title: "Doa Sebelum Makan",
    arabic: "اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    latin: "Allahumma baarik lanaa fiimaa rozaqtanaa wa qinaa 'adzaaban naar.",
    translation: "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka."
  },
  {
    title: "Doa Sesudah Makan",
    arabic: "اَلْحَمْدُ ِللهِ الَّذِىْ اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِيْنَ",
    latin: "Alhamdulillahilladzi ath-amanaa wa saqoonaa wa ja'alanaa minal muslimiin.",
    translation: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami termasuk dari golongan orang-orang muslim."
  },
  {
    title: "Doa Sebelum Tidur",
    arabic: "بِسْمِكَ اللّٰهُمَّ اَحْيَا وَاَمُوْتُ",
    latin: "Bismika Allahumma ahyaa wa bismika amuut.",
    translation: "Dengan nama-Mu Ya Allah aku hidup dan dengan nama-Mu aku mati."
  },
  {
    title: "Doa Bangun Tidur",
    arabic: "اَلْحَمْدُ ِللهِ الَّذِىْ اَحْيَانَا بَعْدَمَا اَمَاتَنَا وَاِلَيْهِ النُّشُوْرُ",
    latin: "Alhamdulillahilladzi ahyaanaa ba'damaa amaatanaa wa ilaihin nusyuur.",
    translation: "Segala puji bagi Allah yang telah menghidupkan kami sesudah kami mati (bangun dari tidur) dan hanya kepada-Nya kami dikembalikan."
  },
  {
    title: "Doa Kedua Orang Tua",
    arabic: "رَبِّ اغْفِرْلِيْ وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا",
    latin: "Rabbighfir lii wa li waalidayya warhamhumaa kamaa robbayaanii shoghiiroo.",
    translation: "Ya Tuhanku, ampunilah aku dan kedua orang tuaku, dan kasihilah mereka sebagaimana mereka merawatku di waktu kecil."
  },
  {
    title: "Doa Kebaikan Dunia Akhirat",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbanaa aatinaa fid dunyaa hasanah, wa fil aakhiroti hasanah, wa qinaa 'adzaaban naar.",
    translation: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka."
  },
  {
    title: "Doa Masuk Masjid",
    arabic: "اَللّٰهُمَّ افْتَحْ لِيْ اَبْوَابَ رَحْمَتِكَ",
    latin: "Allahummaf-tahlii abwaaba rohmatik.",
    translation: "Ya Allah, bukalah untukku pintu-pintu rahmat-Mu."
  },
  {
    title: "Doa Keluar Masjid",
    arabic: "اَللّٰهُمَّ اِنِّى اَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Allahumma innii as-aluka min fadhlik.",
    translation: "Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu."
  }
];

export const STORY_THEMES = [
  "Kisah Nabi Nuh dan Kapal Besar",
  "Kisah Nabi Muhammad SAW yang Jujur",
  "Anak Sholeh yang Sayang Orang Tua",
  "Belajar Berpuasa",
  "Kisah Semut dan Nabi Sulaiman",
  "Keajaiban Sedekah",
  "Menjaga Kebersihan Sebagian dari Iman",
  "Persahabatan Hewan di Hutan"
];