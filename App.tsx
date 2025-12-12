import React, { useState } from 'react';
import { ViewState } from './types';
import { ALPHABET_DATA, NUMBER_DATA, COLOR_SHAPE_DATA, HIJAIYAH_DATA, ASMAUL_HUSNA_DATA, APP_ADDRESS } from './constants';
import { Navigation } from './components/Navigation';
import { LearningSection } from './components/LearningSection';
import { StoryTime } from './components/StoryTime';
import { QuizMode } from './components/QuizMode';
import { DrawingCanvas } from './components/DrawingCanvas';
import { PrayerList } from './components/PrayerList';
import { Footer } from './components/Footer';
import { PrayerTimes } from './components/PrayerTimes';
import { PrayerTimesBar } from './components/PrayerTimesBar';
import { BackgroundDecorations } from './components/BackgroundDecorations';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [totalScore, setTotalScore] = useState(0);

  const addScore = (points: number) => {
    setTotalScore(prev => prev + points);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.LEARN_ABC:
        return (
          <LearningSection 
            title="Belajar Huruf ABC" 
            items={ALPHABET_DATA} 
            colorTheme="text-blue-600" 
          />
        );
      case ViewState.LEARN_HIJAIYAH:
        return (
          <LearningSection 
            title="Huruf Hijaiyah" 
            items={HIJAIYAH_DATA} 
            colorTheme="text-emerald-700"
            isArabic={true}
          />
        );
      case ViewState.LEARN_ASMAUL_HUSNA:
        return (
          <LearningSection 
            title="Asmaul Husna" 
            items={ASMAUL_HUSNA_DATA} 
            colorTheme="text-yellow-600"
            isArabic={true}
          />
        );
      case ViewState.LEARN_123:
        return (
          <LearningSection 
            title="Belajar Angka 1-10" 
            items={NUMBER_DATA} 
            colorTheme="text-orange-600" 
          />
        );
      case ViewState.LEARN_COLORS:
        return (
          <LearningSection 
            title="Warna & Bentuk" 
            items={COLOR_SHAPE_DATA} 
            colorTheme="text-pink-600" 
          />
        );
      case ViewState.STORY_TIME:
        return <StoryTime />;
      case ViewState.QUIZ_MODE:
        return <QuizMode onScoreUpdate={addScore} />;
      case ViewState.DRAWING:
        return <DrawingCanvas />;
      case ViewState.PRAYERS:
        return <PrayerList />;
      case ViewState.PRAYER_TIMES:
        return <PrayerTimes />;
      default:
        return <HomeMenu onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col relative overflow-hidden bg-slate-50 selection:bg-yellow-200 selection:text-emerald-900">
      <BackgroundDecorations />
      
      <Navigation currentView={currentView} onNavigate={setCurrentView} score={totalScore} />
      
      {/* UPDATE: Menggunakan w-full max-w-[95%] 2xl:max-w-screen-2xl mx-auto mt-6 px-4 pb-10 flex-grow relative z-10 */}
      <main className="w-full max-w-[95%] 2xl:max-w-screen-2xl mx-auto mt-6 px-4 pb-10 flex-grow relative z-10">
        {renderContent()}
      </main>

      <Footer />

      {currentView !== ViewState.HOME && (
        <div className="fixed bottom-6 right-6 z-40 animate-bounce-in">
           <button 
             onClick={() => setCurrentView(ViewState.HOME)}
             className="bg-white p-4 rounded-full shadow-2xl border-4 border-yellow-400 hover:scale-110 hover:rotate-12 transition-all group active:scale-95"
             title="Kembali ke Menu Utama"
           >
             <span className="text-3xl block animate-pulse">🏠</span>
           </button>
        </div>
      )}
    </div>
  );
};

const HomeMenu: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => {
  return (
    <div className="relative py-4 animate-fade-in">
      
      {/* Decorative Background Blobs - Made stronger for fun effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-32 left-0 w-[400px] h-[400px] bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Horizontal Prayer Times Widget */}
      <PrayerTimesBar />

      {/* Hero Section */}
      <div className="relative z-10 text-center mb-10 mt-6 group">
        <div className="inline-block relative cursor-default transition-transform hover:scale-105 duration-500">
           <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
           <img 
            src="./logo.png" 
            alt="Logo Sekolah" 
            className="relative h-36 w-36 sm:h-44 sm:w-44 mx-auto mb-6 object-contain drop-shadow-xl"
            onError={(e) => {
               (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Logo';
            }}
          />
        </div>

        {/* Text Hero */}
        <div className="w-full mx-auto relative z-10 px-4">
          <div className="relative z-10">
            <h2 className="font-arabic text-3xl md:text-5xl text-emerald-600 mb-2 drop-shadow-sm hover:text-emerald-700 transition-colors cursor-default">
              ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ وَبَرَكَاتُهُ
            </h2>
            <p className="text-gray-500 italic mb-4 text-sm md:text-base">"Semoga keselamatan dan rahmat Allah serta keberkahan-Nya terlimpah kepada kalian"</p>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-800 mb-3 tracking-tight drop-shadow-sm">
              <span className="text-emerald-600 inline-block hover:animate-wiggle cursor-default">TK ISLAM</span> <span className="text-yellow-500 inline-block hover:animate-wiggle cursor-default delay-100">ANWAARUL HIDAYAH</span>
            </h1>
            
            <div className="flex items-center justify-center gap-2 text-emerald-700 font-medium bg-emerald-50/50 inline-block px-4 py-2 rounded-full border border-emerald-100/50 mx-auto max-w-lg backdrop-blur-sm hover:bg-emerald-100 transition-colors cursor-pointer">
              <span className="animate-bounce">📍</span>
              <p className="text-xs md:text-sm line-clamp-2 md:line-clamp-1">{APP_ADDRESS}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-none mx-auto px-2 pb-8">
        <MenuCard 
          emoji="🕰️" 
          title="Detail Jadwal" 
          desc="Jam & Tanggal Hijriyah" 
          bgClass="bg-gradient-to-br from-green-50 to-green-100 hover:to-green-200"
          textClass="text-green-700"
          borderClass="border-green-200 group-hover:border-green-400"
          onClick={() => onNavigate(ViewState.PRAYER_TIMES)} 
        />
        <MenuCard 
          emoji="🅰️" 
          title="Huruf ABC" 
          desc="Belajar mengenal huruf A-Z" 
          bgClass="bg-gradient-to-br from-blue-50 to-blue-100 hover:to-blue-200"
          textClass="text-blue-700"
          borderClass="border-blue-200 group-hover:border-blue-400"
          onClick={() => onNavigate(ViewState.LEARN_ABC)} 
        />
        <MenuCard 
          emoji="☪️" 
          title="Hijaiyah" 
          desc="Belajar huruf Al-Quran" 
          bgClass="bg-gradient-to-br from-emerald-50 to-emerald-100 hover:to-emerald-200"
          textClass="text-emerald-700"
          borderClass="border-emerald-200 group-hover:border-emerald-400"
          onClick={() => onNavigate(ViewState.LEARN_HIJAIYAH)} 
        />
        <MenuCard 
          emoji="🤲" 
          title="Doa Harian" 
          desc="Kumpulan doa sehari-hari" 
          bgClass="bg-gradient-to-br from-teal-50 to-teal-100 hover:to-teal-200"
          textClass="text-teal-700"
          borderClass="border-teal-200 group-hover:border-teal-400"
          onClick={() => onNavigate(ViewState.PRAYERS)} 
        />
        <MenuCard 
          emoji="🔢" 
          title="Angka 123" 
          desc="Belajar berhitung ceria" 
          bgClass="bg-gradient-to-br from-orange-50 to-orange-100 hover:to-orange-200"
          textClass="text-orange-700"
          borderClass="border-orange-200 group-hover:border-orange-400"
          onClick={() => onNavigate(ViewState.LEARN_123)} 
        />
        <MenuCard 
          emoji="🕋" 
          title="Asmaul Husna" 
          desc="99 Nama Allah yang Indah" 
          bgClass="bg-gradient-to-br from-yellow-50 to-yellow-100 hover:to-yellow-200"
          textClass="text-yellow-700"
          borderClass="border-yellow-200 group-hover:border-yellow-400"
          onClick={() => onNavigate(ViewState.LEARN_ASMAUL_HUSNA)} 
        />
         <MenuCard 
          emoji="🎨" 
          title="Menggambar" 
          desc="Asah kreativitasmu" 
          bgClass="bg-gradient-to-br from-purple-50 to-purple-100 hover:to-purple-200"
          textClass="text-purple-700"
          borderClass="border-purple-200 group-hover:border-purple-400"
          onClick={() => onNavigate(ViewState.DRAWING)} 
        />
        <MenuCard 
          emoji="🔺" 
          title="Warna & Bentuk" 
          desc="Mengenal ragam bentuk" 
          bgClass="bg-gradient-to-br from-pink-50 to-pink-100 hover:to-pink-200"
          textClass="text-pink-700"
          borderClass="border-pink-200 group-hover:border-pink-400"
          onClick={() => onNavigate(ViewState.LEARN_COLORS)} 
        />
        <MenuCard 
          emoji="📖" 
          title="Dongeng Islami" 
          desc="Cerita penuh hikmah" 
          bgClass="bg-gradient-to-br from-indigo-50 to-indigo-100 hover:to-indigo-200"
          textClass="text-indigo-700"
          borderClass="border-indigo-200 group-hover:border-indigo-400"
          onClick={() => onNavigate(ViewState.STORY_TIME)} 
        />
        <MenuCard 
          emoji="❓" 
          title="Kuis Cerdas" 
          desc="Uji pengetahuanmu" 
          bgClass="bg-gradient-to-br from-lime-50 to-lime-100 hover:to-lime-200"
          textClass="text-lime-700"
          borderClass="border-lime-200 group-hover:border-lime-400"
          onClick={() => onNavigate(ViewState.QUIZ_MODE)} 
        />
      </div>
    </div>
  );
};

const MenuCard: React.FC<{ 
  emoji: string; 
  title: string; 
  desc: string; 
  bgClass: string;
  textClass: string;
  borderClass: string;
  onClick: () => void 
}> = ({ emoji, title, desc, bgClass, textClass, borderClass, onClick }) => (
  <button 
    onClick={onClick}
    className={`group relative ${bgClass} p-6 rounded-3xl shadow-md hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 text-left border-b-[6px] ${borderClass} overflow-hidden active:scale-95`}
  >
    {/* Decorative Background Icon */}
    <div className="absolute -right-4 -bottom-4 text-9xl opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 grayscale select-none">
      {emoji}
    </div>

    {/* Emoji Icon with Bounce Effect on Hover */}
    <div className={`relative z-10 w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 group-hover:animate-wiggle`}>
      {emoji}
    </div>
    
    <div className="relative z-10 flex-1">
      <h3 className={`text-xl md:text-2xl font-black mb-1 leading-tight ${textClass} group-hover:translate-x-1 transition-transform`}>
        {title}
      </h3>
      <p className="text-gray-600 font-medium text-sm leading-tight opacity-90 group-hover:opacity-100">
        {desc}
      </p>
    </div>

    <div className={`relative z-10 w-8 h-8 rounded-full bg-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0`}>
        <span className="text-gray-600 text-sm font-bold">➜</span>
    </div>
  </button>
);

export default App;
