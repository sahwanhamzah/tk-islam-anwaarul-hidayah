import React, { useState, useEffect } from 'react';

interface UstazahCharacterProps {
  message: string;
  className?: string;
}

export const UstazahCharacter: React.FC<UstazahCharacterProps> = ({ message, className = "" }) => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Munculkan balon bicara dengan sedikit delay agar terlihat natural
    const timer = setTimeout(() => setShowBubble(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // URL Avatar Ustazah (Format PNG agar lebih stabil daripada SVG)
  // Menggunakan style 'avataaars' yang mendukung hijab secara eksplisit
  const ustazahImage = 'https://api.dicebear.com/9.x/avataaars/png?seed=Amira&top=hijab&accessories=glasses&clothing=overall&clothingColor=3c4f5c&skinColor=f8d25c&eyes=happy&mouth=smile';

  return (
    <div className={`fixed bottom-0 left-0 z-50 flex flex-col items-start pointer-events-none pl-2 pb-2 ${className}`}>
      
      {/* Balon Bicara */}
      <div 
        className={`relative ml-4 mb-2 bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-xl border-2 border-emerald-400 max-w-[200px] md:max-w-xs transform transition-all duration-500 origin-bottom-left ${showBubble ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10'}`}
      >
        <p className="text-emerald-800 font-bold text-sm md:text-base leading-snug font-sans">
          {message}
        </p>
        {/* Segitiga Balon */}
        <div className="absolute -bottom-2 left-0 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-emerald-400 border-r-[10px] border-r-transparent transform rotate-12 translate-x-2"></div>
        <div className="absolute -bottom-[5px] left-0 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white border-r-[8px] border-r-transparent transform rotate-12 translate-x-[9px]"></div>
      </div>

      {/* Gambar Karakter */}
      <div className="relative pointer-events-auto cursor-pointer group">
        <img 
          src={ustazahImage}
          alt="Karakter Ustazah" 
          className="h-48 md:h-64 w-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300 animate-float-slow object-contain"
          onError={(e) => {
            // Fallback jika PNG gagal, coba load ulang atau ganti seed
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Mencegah loop
            target.src = 'https://api.dicebear.com/9.x/avataaars/png?seed=Fatima&top=hijab&clothing=blazerAndShirt&eyes=happy';
          }}
        />
      </div>
    </div>
  );
};