import React, { useState, useEffect } from 'react';
import { getPrayerTimes } from '../services/prayerService';
import { PrayerTimeData } from '../types';

export const PrayerTimesBar: React.FC = () => {
  const [prayerData, setPrayerData] = useState<PrayerTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Clock tick
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // update every minute

    const fetchData = async () => {
      setLoading(true);
      const data = await getPrayerTimes();
      setPrayerData(data);
      setLoading(false);
    };
    fetchData();

    return () => clearInterval(timer);
  }, []);

  const PRAYER_NAMES: Record<string, string> = {
    Fajr: 'Subuh',
    Dhuhr: 'Dzuhur',
    Asr: 'Ashar',
    Maghrib: 'Maghrib',
    Isha: 'Isya'
  };

  const getNextPrayer = () => {
    if (!prayerData) return null;
    const current = currentTime.getHours() * 60 + currentTime.getMinutes();
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    for (const p of prayers) {
      const timeStr = prayerData.timings[p];
      const [h, m] = timeStr.split(':').map(Number);
      const pTime = h * 60 + m;
      if (pTime > current) return p;
    }
    return 'Fajr'; // Next day
  };

  const nextPrayer = getNextPrayer();

  if (loading) return (
    <div className="w-full mb-8 px-4">
      <div className="h-20 bg-emerald-100 rounded-2xl animate-pulse flex items-center justify-center text-emerald-600 w-full">
        Memuat Jadwal Sholat...
      </div>
    </div>
  );

  if (!prayerData) return null;

  return (
    // UPDATE: Menggunakan w-full agar mengisi container induk (main) yang sudah lebar
    <div className="w-full mb-8 px-0 relative z-20">
      <div className="bg-emerald-800 rounded-2xl shadow-lg border-2 border-yellow-500 p-1 md:p-3 relative overflow-hidden w-full">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full islamic-pattern opacity-10 pointer-events-none"></div>
        
        {/* Horizontal Scroll Container */}
        <div className="flex justify-between items-center overflow-x-auto gap-2 md:gap-4 pb-1 md:pb-0 scrollbar-hide w-full">
          {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((key) => {
            const isActive = nextPrayer === key;
            return (
              <div 
                key={key}
                className={`flex-1 flex flex-col items-center justify-center p-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 min-w-[70px] ${
                  isActive 
                  ? 'bg-yellow-400 text-emerald-900 shadow-md scale-105 transform' 
                  : 'text-emerald-50 hover:bg-emerald-700'
                }`}
              >
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider mb-1 opacity-80">
                  {PRAYER_NAMES[key]}
                </span>
                <span className={`font-mono font-black ${isActive ? 'text-lg md:text-2xl' : 'text-base md:text-xl'}`}>
                  {prayerData.timings[key]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
       {/* Lokasi label kecil */}
      <div className="text-center mt-1">
        <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
           📍 Gunungsari, Lombok Barat
        </span>
      </div>
    </div>
  );
};