import React, { useState, useEffect, useRef } from 'react';
import { generateQuizQuestion, generateSpeechFromText } from '../services/geminiService';
import { QuizData } from '../types';
import confetti from 'canvas-confetti';
import { UstazahCharacter } from './UstazahCharacter';

// --- Audio Helper Functions for Raw PCM ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface QuizModeProps {
  onScoreUpdate: (points: number) => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({ onScoreUpdate }) => {
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [localScore, setLocalScore] = useState(0);

  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const fetchQuestion = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    stopAudio(); // Stop audio if any playing
    const data = await generateQuizQuestion();
    setCurrentQuiz(data);
    setLoading(false);
  };

  useEffect(() => {
    // Load first question on mount
    fetchQuestion();
    
    // Cleanup audio context on unmount
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10B981', '#F59E0B', '#3B82F6'] // Green, Gold, Blue
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10B981', '#F59E0B', '#3B82F6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) { /* ignore */ }
      sourceNodeRef.current = null;
    }
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple clicks
    setSelectedAnswer(answer);
    
    if (currentQuiz && answer === currentQuiz.correctAnswer) {
      setIsCorrect(true);
      const points = 10;
      setLocalScore(s => s + points);
      onScoreUpdate(points); // Update Global Score
      triggerConfetti(); // 🎉 Celebrate!
      
      // Kirim penjelasan AI untuk dibacakan
      playFeedbackGemini(true, currentQuiz.explanation);
    } else {
      setIsCorrect(false);
      playFeedbackGemini(false);
    }
  };

  const playFeedbackGemini = async (correct: boolean, explanation: string = "") => {
    // 1. Stop audio sebelumnya
    stopAudio();

    // 2. Siapkan teks
    let textToSpeak = "";
    if (correct) {
      const phrases = [
        "Masya Allah, jawaban kamu benar!",
        "Alhamdulillah, hebat sekali!",
        "Masya Allah, pintar!",
        "Barakallahu fiik, benar!"
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      textToSpeak = `${randomPhrase}. ${explanation}`;
    } else {
      const phrases = [
        "Ayo coba lagi ya!",
        "Belum tepat, yuk semangat!",
        "Jangan menyerah, coba lagi nanti."
      ];
      textToSpeak = phrases[Math.floor(Math.random() * phrases.length)];
    }

    // 3. Inisialisasi Audio Context jika belum ada
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    // Resume context jika suspended (kebijakan browser)
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    // 4. Request ke Gemini TTS
    try {
      const base64Audio = await generateSpeechFromText(textToSpeak);
      
      if (base64Audio && audioContextRef.current) {
        const bytes = decode(base64Audio);
        const buffer = await decodeAudioData(bytes, audioContextRef.current);
        
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        source.start();
        sourceNodeRef.current = source;
      }
    } catch (error) {
      console.error("Gagal memutar suara Gemini:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 pb-20">
      <UstazahCharacter message={isCorrect === null ? "Ayo jawab pertanyaannya, jangan lupa baca Bismillah!" : (isCorrect ? "Alhamdulillah, kamu hebat!" : "Tidak apa-apa, ayo coba lagi!")} />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-700">❓ Kuis Cerdas</h2>
        <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-yellow-300 font-bold text-yellow-700 flex items-center gap-2 text-xl z-20">
          <span>🌟</span> Skor: {localScore}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-12 min-h-[500px] flex flex-col justify-center relative overflow-hidden border-t-[12px] border-emerald-500 z-10">
        <div className="absolute top-0 left-0 w-full h-full islamic-pattern opacity-5 pointer-events-none"></div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="w-20 h-20 border-8 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-emerald-600 font-bold text-xl animate-pulse">Sedang mencari pertanyaan seru...</p>
          </div>
        ) : currentQuiz ? (
          <div className="animate-fade-in z-10 w-full">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-12 text-center leading-snug drop-shadow-sm">
              {currentQuiz.question}
            </h3>

            {/* UPDATE: Grid 2 kolom untuk jawaban di layar besar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {currentQuiz.options.map((option, idx) => {
                let btnClass = "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-b-[6px] border-emerald-200";
                
                if (selectedAnswer) {
                  if (option === currentQuiz.correctAnswer) {
                    btnClass = "bg-green-100 border-b-[6px] border-green-500 text-green-800 ring-4 ring-green-200 shadow-xl scale-[1.02]";
                  } else if (option === selectedAnswer) {
                    btnClass = "bg-red-100 border-b-[6px] border-red-500 text-red-800 opacity-80";
                  } else {
                    btnClass = "opacity-40 grayscale border-transparent";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedAnswer}
                    className={`p-6 md:p-8 rounded-3xl text-xl md:text-2xl font-bold transition-all transform duration-200 ${btnClass} ${!selectedAnswer && 'hover:scale-[1.02] active:scale-95 hover:shadow-lg'}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selectedAnswer && (
              <div className={`mt-10 p-8 rounded-3xl text-center animate-bounce-in shadow-inner border-2 ${isCorrect ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                <p className="font-bold text-3xl md:text-4xl mb-4">
                  {isCorrect ? "Alhamdulillah! Benar! 🎉" : "Terus Semangat ya! 💪"}
                </p>
                <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-4xl mx-auto">{currentQuiz.explanation}</p>
                
                <button 
                  onClick={fetchQuestion}
                  className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-4 px-12 rounded-full shadow-xl transition-all border-b-[6px] border-yellow-600 hover:scale-105 active:scale-95 text-xl"
                >
                  Pertanyaan Selanjutnya ➡️
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-red-500 font-bold mb-4 text-xl">Gagal memuat soal.</p>
            <button onClick={fetchQuestion} className="text-emerald-500 underline text-lg font-bold">Coba lagi</button>
          </div>
        )}
      </div>
    </div>
  );
};