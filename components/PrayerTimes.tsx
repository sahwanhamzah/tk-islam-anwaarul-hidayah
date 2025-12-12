import React, { useState, useEffect } from 'react';
import { getPrayerTimes } from '../services/prayerService';
import { PrayerTimeData } from '../types';
import { UstazahCharacter } from './UstazahCharacter';

export const PrayerTimes: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [prayerData, setPrayerData] = useState<PrayerTimeData | null>(null);
  const [loading, setLoading] = useState(true);

  // Update Clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Prayer Times on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getPrayerTimes();
      setPrayerData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/\./g, ':');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const PRAYER_NAMES: Record<string, string> = {
    Fajr: 'Subuh',
    Dhuhr: 'Dzuhur',
    Asr: 'Ashar',
    Maghrib: 'Maghrib',
    Isha: 'Isya'
  };

  const getNextPrayer = () => {
    if (!prayerData) return null;
    const current = time.getHours() * 60 + time.getMinutes();
    
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    for (const p of prayers) {
      const timeStr = prayerData.timings[p];
      const [h, m] = timeStr.split(':').map(Number);
      const pTime = h * 60 + m;
      
      if (pTime > current) {
        return p;
      }
    }
    return 'Fajr'; // Next day Fajr
  };

  const nextPrayer = getNextPrayer();

  return (
    <div className="w-full mx-auto p-4 animate-fade-in pb-20">
      <UstazahCharacter message="Sholat tepat waktu adalah amalan yang paling dicintai Allah." />

      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-emerald-800 mb-2 drop-shadow-sm">🕰️ Jam & Jadwal Sholat</h2>
        <p className="text-emerald-600 font-medium text-lg">Wilayah Lombok Barat & Sekitarnya</p>
      </div>

      {/* UPDATE: Grid Layout untuk Desktop (Kiri: Jam, Kanan: List) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative z-10">
        
        {/* Kolom Kiri: Digital Clock Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2.5rem] p-10 shadow-2xl text-white text-center relative overflow-hidden border-8 border-yellow-400 h-full flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-full islamic-pattern opacity-10 pointer-events-none"></div>
            
            <p className="text-emerald-100 text-xl font-medium mb-2 uppercase tracking-widest">{formatDate(time)}</p>
            
            {/* Hijri Date if available */}
            {prayerData && (
            <div className="inline-block bg-white/20 px-4 py-1 rounded-full backdrop-blur-md mb-6 mx-auto border border-white/30">
                <p className="text-yellow-300 text-lg font-bold">
                    {prayerData.date.hijri.day} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year} H
                </p>
            </div>
            )}

            <div className="text-7xl xl:text-8xl font-mono font-bold tracking-widest drop-shadow-lg my-6">
            {formatTime(time)}
            </div>
            
            <p className="text-base text-emerald-200 mt-4 italic font-serif">
            "Sesungguhnya sholat itu adalah fardhu yang ditentukan waktunya atas orang-orang yang beriman."
            </p>
        </div>

        {/* Kolom Kanan: Prayer Schedule List */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border-2 border-emerald-100 overflow-hidden h-full">
            <div className="bg-emerald-50 p-6 border-b border-emerald-200">
                <h3 className="text-center font-bold text-emerald-800 text-2xl">Jadwal Hari Ini</h3>
            </div>
            
            {loading ? (
            <div className="p-12 text-center text-gray-500">
                <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
                Mengambil data jadwal...
            </div>
            ) : prayerData ? (
            <div className="divide-y divide-gray-100">
                {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((key) => {
                    const isActive = nextPrayer === key;
                    return (
                    <div 
                        key={key} 
                        className={`flex justify-between items-center p-6 transition-all duration-300 ${
                            isActive ? 'bg-yellow-50 scale-[1.02] shadow-inner' : 'hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-md ${isActive ? 'bg-yellow-400 text-yellow-900 border-2 border-yellow-500' : 'bg-emerald-100 text-emerald-600'}`}>
                                {key === 'Fajr' && '🌅'}
                                {key === 'Dhuhr' && '☀️'}
                                {key === 'Asr' && '🌤️'}
                                {key === 'Maghrib' && '🌇'}
                                {key === 'Isha' && '🌌'}
                            </div>
                            <span className={`text-xl font-bold ${isActive ? 'text-emerald-900' : 'text-gray-600'}`}>
                                {PRAYER_NAMES[key]}
                            </span>
                        </div>
                        <span className={`text-3xl font-black font-mono ${isActive ? 'text-emerald-700' : 'text-gray-800'}`}>
                            {prayerData.timings[key]}
                        </span>
                    </div>
                    );
                })}
            </div>
            ) : (
                <div className="p-8 text-center text-red-500">
                    Gagal memuat jadwal. Periksa koneksi internet.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};