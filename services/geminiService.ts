import { GoogleGenAI, Type, Modality } from "@google/genai";
import { QuizData } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = "gemini-2.5-flash";
const ttsModelName = "gemini-2.5-flash-preview-tts";

/**
 * Generates a short story for children based on a theme.
 */
export const generateStory = async (theme: string, childName: string = "Teman Kecil"): Promise<string> => {
  try {
    const prompt = `Buatkan cerita anak-anak Islami yang pendek (maksimal 3 paragraf), mendidik, dan seru untuk anak TK. 
    Topiknya adalah: "${theme}". 
    Nama karakter utamanya adalah "${childName}".
    Selipkan nilai-nilai kebaikan, akhlak mulia, atau pesan moral Islami (seperti mengucap Bismillah/Alhamdulillah).
    PENTING: Jika ada tokoh guru dalam cerita, sebut dia sebagai "Ustazah" (jangan gunakan "Bu Guru").
    Gunakan bahasa Indonesia yang sederhana dan ceria.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.7,
        systemInstruction: "Kamu adalah seorang Ustazah di TK Islam yang sangat ramah, ceria, dan pandai bercerita tentang kebaikan.",
      }
    });

    return response.text || "Maaf, belum bisa membuat cerita saat ini.";
  } catch (error) {
    console.error("Error generating story:", error);
    return "Terjadi kesalahan saat memanggil teman cerita AI.";
  }
};

/**
 * Generates audio speech from text using Gemini TTS.
 */
export const generateSpeechFromText = async (text: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: ttsModelName,
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // 'Kore' has a nice gentle tone
          },
        },
      },
    });

    // The audio data is in the first part's inlineData
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
};

/**
 * Generates a multiple choice question suitable for Kindergarten.
 */
export const generateQuizQuestion = async (): Promise<QuizData | null> => {
  try {
    const prompt = `Buat satu soal kuis sederhana untuk anak TK Islam. 
    Topiknya bisa acak antara: 
    1. Pengetahuan Islam dasar (Rukun Islam, Malaikat, Nabi, Doa harian).
    2. Hewan (Ciptaan Allah).
    3. Buah-buahan (Rezeki dari Allah).
    4. Angka atau Warna.
    5. Akhlak Terpuji (Sangat Penting!). Topik: Kejujuran, Kesabaran, Tolong-menolong, Berbagi, Sayang Teman, Hormat pada Orang Tua.
       - Untuk topik Akhlak, buatlah pertanyaan situasi (studi kasus sederhana). Contoh: "Jika melihat teman jatuh, apa yang harus dilakukan?" atau "Kalau menemukan uang bukan milik kita, harus bagaimana?"
    
    Berikan 3 pilihan jawaban.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING, description: "Pertanyaan untuk anak" },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 pilihan jawaban"
            },
            correctAnswer: { type: Type.STRING, description: "Jawaban yang benar (harus ada di options)" },
            explanation: { type: Type.STRING, description: "Penjelasan singkat dan memuji jika benar (contoh: Masya Allah, benar!)" }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;
    
    return JSON.parse(jsonText) as QuizData;
  } catch (error) {
    console.error("Error generating quiz:", error);
    return null;
  }
};