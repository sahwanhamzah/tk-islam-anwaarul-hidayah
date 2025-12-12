import React, { useState, useRef, useEffect } from 'react';
import { PRAYER_DATA } from '../constants';
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

export const PrayerList: React.FC = () => {
  const [activePrayer, setActivePrayer] = useState<number | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

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
    setPlayingIndex(null);
  };

  const playPrayer = async (index: number, text: string) => {
    if (playingIndex === index) {
      stopAudio();
      return;
    }
    stopAudio();
    setPlayingIndex(index);

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const base64Audio = await generateSpeechFromText(text);
      
      if (base64Audio && audioContextRef.current) {
        const bytes = decode(base64Audio);
        const buffer = await decodeAudioData(bytes, audioContextRef.current);
        
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        
        source.onended = () => setPlayingIndex(null);
        source.start();
        sourceNodeRef.current = source;
      } else {
        setPlayingIndex(null);
        alert("Gagal memuat suara doa. Coba lagi.");
      }
    } catch (error) {
      console.error("Audio error:", error);
      setPlayingIndex(null);
    }
  };

  const togglePrayer = (index: number) => {
    setActivePrayer(activePrayer === index ? null : index);
    if (activePrayer !== index) {
        stopAudio();
    }
  };

  return (
    <div className="w-full mx-auto p-4 animate-fade-in pb-20">
      <UstazahCharacter message="Anak sholeh rajin berdoa. Allah sayang pada hamba-Nya yang berdoa." />

      <h2 className="text-4xl font-bold text-center text-emerald-800 mb-2 drop-shadow-sm">🤲 Doa Harian</h2>
      <p className="text-center text-emerald-600 mb-10 font-medium text-lg">Hafalkan doa agar disayang Allah</p>

      {/* UPDATE: Menggunakan Grid Layout (Masonry-ish) pada layar besar */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start relative z-10">
        {PRAYER_DATA.map((prayer, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 border-2 ${activePrayer === index ? 'border-emerald-500 ring-4 ring-emerald-100 col-span-1 row-span-2' : 'border-transparent hover:-translate-y-1 hover:shadow-lg'}`}
          >
            <button 
              onClick={() => togglePrayer(index)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-emerald-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${activePrayer === index ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-gray-800">{prayer.title}</h3>
              </div>
              <span className={`text-emerald-500 text-2xl font-bold transition-transform duration-300 ${activePrayer === index ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {/* Content Area - Expanded */}
            {activePrayer === index && (
              <div className="px-6 pb-6 bg-gradient-to-b from-white to-emerald-50 animate-fade-in">
                <div className="p-5 bg-emerald-100/50 rounded-xl mb-3 text-center border border-emerald-100 relative">
                  {/* Play Button */}
                  {prayer.arabic && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        playPrayer(index, prayer.arabic!);
                      }}
                      className={`absolute top-2 right-2 p-3 rounded-full shadow-lg transition-all ${
                        playingIndex === index 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-110'
                      }`}
                      title="Dengarkan Doa"
                    >
                       {playingIndex === index ? '⏹️' : '🔊'}
                    </button>
                  )}

                  {/* Arabic Text Display */}
                  {prayer.arabic && (
                    <p className="font-arabic text-3xl md:text-4xl text-emerald-800 mb-6 leading-relaxed text-right md:text-center px-2 py-4 drop-shadow-sm mt-8">
                      {prayer.arabic}
                    </p>
                  )}
                  <p className="text-lg font-bold text-emerald-900 italic font-serif leading-loose tracking-wide border-t border-emerald-200 pt-3 mt-2">
                    "{prayer.latin}"
                  </p>
                </div>
                <div className="text-center mt-4">
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold mb-2 uppercase tracking-wider">Artinya</span>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {prayer.translation}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};