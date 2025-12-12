import React from 'react';
import { ViewState } from '../types';
import { APP_NAME } from '../constants';

interface NavigationProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
  score?: number;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentView, score = 0 }) => {
  return (
    <nav className="w-full bg-emerald-600 shadow-md rounded-b-3xl p-4 sticky top-0 z-50 border-b-4 border-emerald-700">
      {/* UPDATE: Menggunakan w-full max-w-[95%] 2xl:max-w-screen-2xl agar sejajar dengan body */}
      <div className="w-full max-w-[95%] 2xl:max-w-screen-2xl mx-auto flex justify-between items-center">
        <div 
          onClick={() => onNavigate(ViewState.HOME)}
          className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
        >
          {/* Use uploaded logo.png here */}
          <img 
            src="./logo.png" 
            alt="Logo" 
            className="h-12 w-12 object-contain bg-white rounded-full p-1 shadow-md border-2 border-yellow-400"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50?text=Logo'; 
              (e.target as HTMLImageElement).alt = 'Logo (missing)';
            }}
          />
          <h1 className="text-lg md:text-2xl font-bold text-white hidden md:block drop-shadow-md leading-tight">
            {APP_NAME}
          </h1>
        </div>
        
        <div className="flex gap-3 items-center">
          <div className="bg-yellow-400 px-3 py-1 rounded-full shadow-inner border-2 border-yellow-500 flex items-center gap-1" title="Bintang Kebaikan">
             <span className="text-lg">⭐</span>
             <span className="font-black text-yellow-900">{score}</span>
          </div>

          <button 
            onClick={() => onNavigate(ViewState.HOME)}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-colors shadow-sm ${
              currentView === ViewState.HOME 
              ? 'bg-white text-emerald-700' 
              : 'bg-emerald-700 text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            Beranda
          </button>
        </div>
      </div>
    </nav>
  );
};