import React from 'react';
import { APP_NAME, APP_ADDRESS } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-800 text-emerald-50 py-8 mt-auto border-t-4 border-yellow-400 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 islamic-pattern pointer-events-none"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
            <h3 className="font-bold text-xl md:text-2xl mb-2 text-yellow-300 font-serif drop-shadow-md">YAYASAN ANWAARUL HIDAYAH AL-FALAH</h3>
            <h4 className="font-bold text-lg mb-3 text-white">{APP_NAME}</h4>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-4 rounded-full"></div>
            <p className="mb-4 text-sm md:text-base opacity-90 max-w-md mx-auto leading-relaxed">
              {APP_ADDRESS}
            </p>
            <p className="text-xs opacity-70 mt-6 pt-4 border-t border-emerald-700">
              &copy; {new Date().getFullYear()} One Computer. All Rights Reserved.
            </p>
        </div>
    </footer>
  );
};