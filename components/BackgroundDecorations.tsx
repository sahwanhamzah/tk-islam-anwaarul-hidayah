import React from 'react';

export const BackgroundDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Balon Udara Kiri */}
      <div className="absolute top-[10%] left-[5%] text-6xl opacity-20 animate-float-slow select-none">
        🎈
      </div>
      
      {/* Awan Kanan */}
      <div className="absolute top-[20%] right-[10%] text-8xl opacity-30 animate-float text-blue-200 select-none">
        ☁️
      </div>
      
      {/* Bintang Kecil Bawah */}
      <div className="absolute bottom-[15%] left-[15%] text-4xl opacity-40 animate-pulse text-yellow-300 select-none">
        ✨
      </div>

      {/* Matahari/Bunga */}
      <div className="absolute top-[5%] left-[40%] text-5xl opacity-10 animate-spin-slow select-none text-orange-300">
        ☀️
      </div>

      {/* Balon Udara Kanan Bawah */}
      <div className="absolute bottom-[10%] right-[5%] text-5xl opacity-20 animate-float-fast select-none delay-1000">
        🎈
      </div>

      {/* Awan Kiri Bawah */}
      <div className="absolute bottom-[30%] left-[-2%] text-9xl opacity-20 animate-float text-emerald-100 select-none">
        ☁️
      </div>
    </div>
  );
};