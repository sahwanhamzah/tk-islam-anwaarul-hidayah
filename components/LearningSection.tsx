import React, { useState, useRef, useEffect } from 'react';
import { LearningItem } from '../types';
import { ARABIC_DISPLAY_MAP } from '../constants';
import { generateSpeechFromText } from '../services/geminiService';
import { UstazahCharacter } from './UstazahCharacter';

// --- Audio Helper Functions ---
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

interface LearningSectionProps {
  title: string;
  items: LearningItem[];
  colorTheme: string;
  isArabic?: boolean;
}

export const LearningSection: React.FC<LearningSectionProps> = ({ title, items, colorTheme, isArabic = false }) => {
  const [selectedItem, setSelectedItem] = useState<LearningItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) { /* ignore */ }
      sourceNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const playGeminiAudio = async (item: LearningItem) => {
    stopAudio();
    setIsPlaying(true);

    // Construct Text
    let textToSpeak = "";
    if (item.meaning) {
        // Asmaul Husna
        textToSpeak = `${item.word}. Artinya, ${item.meaning}.`;
    } else if (isArabic) {
        // Hijaiyah
        textToSpeak = `Huruf ${item.word}`;
    } else {
        // ABC / 123 / Colors
        textToSpeak = `${item.symbol}. ${item.word}.`;
    }

    try {
      // Init Audio Context
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const base64Audio = await generateSpeechFromText(textToSpeak);
      
      if (base64Audio && audioContextRef.current) {
        const bytes = decode(base64Audio);
        const buffer = await decodeAudioData(bytes, audioContextRef.current);
        
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        
        source.onended = () => setIsPlaying(false);
        source.start();
        sourceNodeRef.current = source;
      } else {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Audio error:", error);
      setIsPlaying(false);
    }
  };

  const handleCardClick = (item: LearningItem) => {
    setSelectedItem(item);
    playGeminiAudio(item);
    // Scroll to top nicely to see the featured card
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine Ustazah Message based on content
  const getUstazahMessage = () => {
    if (title.includes("Asmaul Husna")) return "Mari mengenal nama-nama Allah yang indah, Nak!";
    if (title.includes("Hijaiyah")) return "Ayo belajar membaca Al-Quran dengan riang!";
    if (title.includes("Angka")) return "Berhitung itu menyenangkan lho! Satu, dua, tiga...";
    if (title.includes("ABC")) return "Ayo mengenal huruf-huruf alfabet bersama Ustazah!";
    if (title.includes("Warna")) return "Wah, dunia ini penuh warna-warni ciptaan Allah!";
    return "Semangat belajarnya ya, Anak Sholeh & Sholehah!";
  };

  return (
    <div className="w-full mx-auto p-2 animate-fade-in relative pb-20">
      
      {/* Karakter Ustazah */}
      <UstazahCharacter message={getUstazahMessage()} />

      <h2 className={`text-3xl md:text-5xl font-bold text-center mb-10 ${colorTheme} drop-shadow-sm font-fredoka`}>{title}</h2>
      
      {/* Featured Large Card */}
      {selectedItem && (
        <div className="mb-12 mx-auto max-w-3xl p-8 bg-white rounded-[3rem] shadow-2xl border-8 border-yellow-300 flex flex-col items-center text-center transform transition-all duration-300 relative overflow-hidden animate-bounce-in z-20">
          <div className="absolute top-0 left-0 w-full h-full islamic-pattern opacity-10 pointer-events-none"></div>
          
          <span className={`mb-6 animate-float ${isArabic ? 'text-9xl font-arabic text-emerald-600 leading-tight' : 'text-9xl'}`}>
            {isArabic ? (ARABIC_DISPLAY_MAP[selectedItem.symbol] || selectedItem.symbol) : selectedItem.emoji}
          </span>
          
          <div className={`font-black mb-2 ${isArabic ? 'text-5xl text-gray-700' : 'text-8xl text-blue-500'}`}>
             {isArabic ? selectedItem.word : selectedItem.symbol}
          </div>
          
          <div className="text-3xl font-bold text-gray-600">
             {isArabic && !selectedItem.meaning ? '(Huruf Hijaiyah)' : selectedItem.word}
          </div>

          {selectedItem.meaning && (
             <div className="mt-4 px-6 py-3 bg-yellow-100 rounded-2xl text-yellow-900 font-bold border-2 border-yellow-300 text-xl shadow-sm">
               Artinya: {selectedItem.meaning}
             </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            {isPlaying ? (
               <span className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-6 py-2 rounded-full animate-pulse text-lg border border-emerald-200">
                 🔊 Sedang Membaca...
               </span>
            ) : (
               <button 
                 onClick={() => playGeminiAudio(selectedItem)}
                 className="text-lg bg-emerald-100 text-emerald-800 px-6 py-2 rounded-full hover:bg-emerald-200 font-bold transition-all border border-emerald-300 hover:scale-105 active:scale-95 shadow-md"
               >
                 🔊 Ulangi Suara
               </button>
            )}
             <button 
                 onClick={() => setSelectedItem(null)}
                 className="text-lg bg-gray-100 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-200 font-bold transition-all border border-gray-300 hover:scale-105 active:scale-95 shadow-md"
               >
                 ❌ Tutup
               </button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6 relative z-10">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(item)}
            className={`${item.color} p-4 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 transition-all duration-300 flex flex-col items-center justify-center aspect-square border-b-[6px] border-black/10 relative overflow-hidden group active:scale-95 active:border-b-0 active:translate-y-0`}
          >
            <span className={`font-black mb-2 transition-transform duration-300 group-hover:scale-110 ${isArabic ? 'text-6xl font-arabic mt-2' : 'text-5xl opacity-90'}`}>
              {isArabic ? (ARABIC_DISPLAY_MAP[item.symbol] || item.symbol) : item.symbol}
            </span>
            <span className="text-sm md:text-base font-bold truncate w-full text-center bg-white/40 rounded-full px-2 py-1 backdrop-blur-sm">
              {isArabic && item.emoji.length < 3 ? item.emoji : (isArabic ? item.word : item.emoji)}
            </span>
            {item.meaning && (
                <span className="absolute top-2 right-2 text-[10px] bg-white/60 px-2 py-0.5 rounded-full font-mono">
                    {index + 1}
                </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};