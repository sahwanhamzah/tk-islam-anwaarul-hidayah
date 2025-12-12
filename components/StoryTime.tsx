import React, { useState, useRef, useEffect } from 'react';
import { generateStory, generateSpeechFromText } from '../services/geminiService';
import { STORY_THEMES } from '../constants';
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

export const StoryTime: React.FC = () => {
  const [story, setStory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [childName, setChildName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(STORY_THEMES[0]);
  
  // Audio States
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  // Initialize Audio Context on mount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleGenerate = async () => {
    if (!childName.trim()) {
      alert("Masukkan nama panggilanmu dulu ya!");
      return;
    }
    stopAudio();
    setLoading(true);
    setStory("");
    audioBufferRef.current = null; // Reset audio buffer when new story is generated
    
    const result = await generateStory(selectedTheme, childName);
    setStory(result);
    setLoading(false);
  };

  const handlePlayAudio = async () => {
    if (!story) return;

    // Initialize AudioContext if not exists (must be done after user interaction)
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }

    // Resume context if suspended
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    // If we already have the buffer, just play it
    if (audioBufferRef.current) {
      playBuffer(audioBufferRef.current);
      return;
    }

    // Fetch Audio from API
    setIsAudioLoading(true);
    const base64Audio = await generateSpeechFromText(story);
    setIsAudioLoading(false);

    if (base64Audio && audioContextRef.current) {
      const bytes = decode(base64Audio);
      const buffer = await decodeAudioData(bytes, audioContextRef.current);
      audioBufferRef.current = buffer; // Cache the buffer
      playBuffer(buffer);
    } else {
      alert("Maaf, gagal memuat suara. Coba lagi ya.");
    }
  };

  const playBuffer = (buffer: AudioBuffer) => {
    if (!audioContextRef.current) return;

    // Stop previous instance if any
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) { /* ignore */ }
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    
    source.onended = () => {
      setIsPlaying(false);
    };

    source.start();
    sourceNodeRef.current = source;
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) { /* ignore */ }
      sourceNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  return (
    <div className="w-full mx-auto p-4 pb-20">
      <UstazahCharacter message="Ustazah punya cerita seru nih! Masukkan namamu dulu ya." />
      
      <h2 className="text-4xl font-bold text-center text-emerald-700 mb-8 drop-shadow-sm">📖 Dongeng Islami AI</h2>

      <div className={`grid grid-cols-1 ${story ? 'lg:grid-cols-12' : 'max-w-3xl mx-auto'} gap-8 items-start transition-all duration-500`}>
        
        {/* Kolom Kiri: Form Input */}
        <div className={`${story ? 'lg:col-span-4' : 'w-full'} bg-white rounded-[2rem] shadow-lg p-6 md:p-8 border border-emerald-100 relative overflow-hidden z-10`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="mb-6 relative z-10">
            <label className="block text-emerald-800 font-bold mb-2 text-lg">Siapa Namamu?</label>
            <input 
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Contoh: Ahmed"
                className="w-full p-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none text-xl bg-emerald-50 placeholder-emerald-300"
            />
            </div>

            <div className="mb-8 relative z-10">
            <label className="block text-emerald-800 font-bold mb-3 text-lg">Pilih Topik Cerita:</label>
            <div className="flex flex-wrap gap-2">
                {STORY_THEMES.map((theme) => (
                <button
                    key={theme}
                    onClick={() => setSelectedTheme(theme)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedTheme === theme 
                    ? 'bg-emerald-600 text-white shadow-md scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700'
                    }`}
                >
                    {theme}
                </button>
                ))}
            </div>
            </div>

            <button 
            onClick={handleGenerate}
            disabled={loading || isPlaying || isAudioLoading}
            className="relative z-10 w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black py-5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xl border-b-[6px] border-emerald-800 active:border-b-0 active:translate-y-1"
            >
            {loading ? "✨ Sedang Mengarang..." : "✨ Buat Cerita Islami"}
            </button>
        </div>

        {/* Kolom Kanan: Hasil Cerita */}
        {story && (
            <div className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-xl p-8 md:p-10 border-4 border-yellow-200 animate-fade-in relative min-h-[500px] flex flex-col z-10">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-emerald-400 via-yellow-300 to-emerald-400"></div>
            
            {/* Scrollable text area */}
            <div className="flex-grow prose prose-xl max-w-none text-gray-700 font-medium leading-loose mb-8 font-fredoka overflow-y-auto max-h-[60vh] custom-scrollbar pr-2">
                {story.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-justify">{paragraph}</p>
                ))}
            </div>
            
            {/* Footer Buttons */}
            <div className="flex flex-wrap gap-4 justify-center border-t-2 border-gray-100 pt-6 mt-auto">
                {!isPlaying ? (
                <button 
                    onClick={handlePlayAudio}
                    disabled={isAudioLoading}
                    className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all shadow-md text-lg ${
                    isAudioLoading 
                    ? 'bg-gray-300 text-gray-600 cursor-wait' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white border-b-4 border-blue-700 active:scale-95'
                    }`}
                >
                    {isAudioLoading ? (
                    <>⏳ Memuat Suara...</>
                    ) : (
                    <>🔊 Dengarkan Cerita</>
                    )}
                </button>
                ) : (
                <button 
                    onClick={stopAudio}
                    className="flex items-center gap-3 bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-md border-b-4 border-rose-700 active:scale-95 animate-pulse text-lg"
                >
                    🛑 Stop Cerita
                </button>
                )}
            </div>
            </div>
        )}
      </div>
    </div>
  );
};