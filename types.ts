
export enum ViewState {
  HOME = 'HOME',
  LEARN_ABC = 'LEARN_ABC',
  LEARN_HIJAIYAH = 'LEARN_HIJAIYAH',
  LEARN_123 = 'LEARN_123',
  LEARN_COLORS = 'LEARN_COLORS',
  LEARN_ASMAUL_HUSNA = 'LEARN_ASMAUL_HUSNA',
  STORY_TIME = 'STORY_TIME',
  QUIZ_MODE = 'QUIZ_MODE',
  DRAWING = 'DRAWING',
  PRAYERS = 'PRAYERS',
  PRAYER_TIMES = 'PRAYER_TIMES'
}

export interface QuizData {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface StoryConfig {
  theme: string;
  characterName: string;
}

export interface LearningItem {
  symbol: string;
  word: string;
  emoji: string;
  color: string;
  isArabic?: boolean;
  meaning?: string; // Added for Asmaul Husna translation
}

export interface PrayerItem {
  title: string;
  arabic?: string;
  latin: string;
  translation: string;
}

export interface PrayerTimeData {
  timings: {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    [key: string]: string;
  };
  date: {
    readable: string;
    hijri: {
      day: string;
      month: { en: string; ar: string };
      year: string;
    };
  };
}
