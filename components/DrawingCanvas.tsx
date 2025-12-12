import React, { useRef, useState, useEffect } from 'react';
import { UstazahCharacter } from './UstazahCharacter';

const COLORS = [
  '#000000', '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3',
  '#FF1493', '#00CED1', '#8B4513', '#808080'
];

const STAMPS = ['⭐', '❤️', '🌙', '☁️', '🌸', '🐱', '🦋', '⚽'];

type ToolType = 'pen' | 'marker' | 'eraser' | 'stamp';

export const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState<ToolType>('pen');
  const [selectedStamp, setSelectedStamp] = useState(STAMPS[0]);
  const [history, setHistory] = useState<ImageData[]>([]);

  // Setup Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      // Set canvas size to match container
      canvas.width = container.offsetWidth;
      canvas.height = 600; // Fixed height lebih tinggi
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveHistory(); // Save initial blank state
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory(prev => {
          const newHistory = [...prev, imageData];
          // Limit history to last 10 steps to save memory
          if (newHistory.length > 10) return newHistory.slice(newHistory.length - 10);
          return newHistory;
        });
      }
    }
  };

  const handleUndo = () => {
    if (history.length <= 1) return; // Keep at least the blank state
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Remove current state
        const newHistory = [...history];
        newHistory.pop(); 
        
        // Restore previous state
        const previousState = newHistory[newHistory.length - 1];
        ctx.putImageData(previousState, 0, 0);
        
        setHistory(newHistory);
      }
    }
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent scrolling on touch devices
    if ('touches' in e) {
      // e.preventDefault(); // Sometimes needed, but can block scrolling page
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e, canvas);

    if (tool === 'stamp') {
      saveHistory();
      ctx.font = `${lineWidth * 5}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedStamp, x, y);
      return;
    }

    setIsDrawing(true);
    saveHistory(); // Save state before new stroke

    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // Setup Tool Styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;

    if (tool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.globalAlpha = 1.0;
    } else if (tool === 'marker') {
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.5; // Transparent effect
    } else {
      // Pen
      ctx.strokeStyle = color;
      ctx.globalAlpha = 1.0;
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || tool === 'stamp') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `karyaku-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleClear = () => {
    if (window.confirm("Hapus semua gambarnya?")) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          saveHistory();
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  };

  return (
    <div className="w-full mx-auto p-2 md:p-4 animate-fade-in pb-20">
      <UstazahCharacter message="Ayo tunjukkan kreativitasmu! Mau gambar apa hari ini?" />

      <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-3xl shadow-md border border-emerald-100">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-600 flex items-center gap-2">
          🎨 Studio Gambar
        </h2>
        <div className="flex gap-2">
           <button 
            onClick={handleUndo} 
            disabled={history.length <= 1}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-100 text-yellow-800 rounded-full font-bold hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-yellow-300"
          >
            ↩️ <span className="hidden md:inline">Undo</span>
          </button>
          <button 
            onClick={handleDownload} 
            className="flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-800 rounded-full font-bold hover:bg-blue-200 transition-colors border border-blue-300"
          >
            💾 <span className="hidden md:inline">Simpan</span>
          </button>
          <button 
            onClick={handleClear} 
            className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-800 rounded-full font-bold hover:bg-red-200 transition-colors border border-red-300"
          >
            🗑️ <span className="hidden md:inline">Hapus</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-col xl:flex-row gap-6">
        {/* SIDEBAR TOOLS */}
        <div className="w-full xl:w-80 flex flex-col gap-6 relative z-10">
          
          {/* Tools Selection */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-indigo-100">
            <h3 className="font-bold text-gray-700 mb-4 text-lg">🖊️ Alat</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setTool('pen')} className={`p-4 rounded-2xl border-2 flex flex-col items-center transition-all ${tool === 'pen' ? 'bg-indigo-100 border-indigo-500 scale-105 shadow-md' : 'border-gray-100 hover:bg-gray-50'}`}>
                ✏️ <span className="text-sm font-bold mt-1">Pensil</span>
              </button>
              <button onClick={() => setTool('marker')} className={`p-4 rounded-2xl border-2 flex flex-col items-center transition-all ${tool === 'marker' ? 'bg-indigo-100 border-indigo-500 scale-105 shadow-md' : 'border-gray-100 hover:bg-gray-50'}`}>
                🖍️ <span className="text-sm font-bold mt-1">Spidol</span>
              </button>
              <button onClick={() => setTool('eraser')} className={`p-4 rounded-2xl border-2 flex flex-col items-center transition-all ${tool === 'eraser' ? 'bg-indigo-100 border-indigo-500 scale-105 shadow-md' : 'border-gray-100 hover:bg-gray-50'}`}>
                🧼 <span className="text-sm font-bold mt-1">Hapus</span>
              </button>
              <button onClick={() => setTool('stamp')} className={`p-4 rounded-2xl border-2 flex flex-col items-center transition-all ${tool === 'stamp' ? 'bg-indigo-100 border-indigo-500 scale-105 shadow-md' : 'border-gray-100 hover:bg-gray-50'}`}>
                🦄 <span className="text-sm font-bold mt-1">Stempel</span>
              </button>
            </div>
          </div>

          {/* Stamps Selection */}
          {tool === 'stamp' && (
             <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-pink-100 animate-fade-in">
                <h3 className="font-bold text-gray-700 mb-4 text-lg">Stiker</h3>
                <div className="grid grid-cols-4 gap-2">
                  {STAMPS.map(s => (
                    <button 
                      key={s} 
                      onClick={() => setSelectedStamp(s)}
                      className={`text-3xl p-2 rounded-xl hover:bg-pink-50 transition-all ${selectedStamp === s ? 'bg-pink-100 ring-2 ring-pink-400 scale-110' : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
             </div>
          )}

          {/* Brush Size */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-orange-100">
            <h3 className="font-bold text-gray-700 mb-4 text-lg">📏 Ukuran</h3>
            <div className="flex justify-between items-center bg-gray-100 rounded-full p-2">
              {[5, 10, 20, 30].map((size) => (
                <button
                  key={size}
                  onClick={() => setLineWidth(size)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${lineWidth === size ? 'bg-white shadow-md scale-110 border-2 border-orange-300' : 'text-gray-400'}`}
                >
                  <div 
                    className="bg-gray-800 rounded-full" 
                    style={{ width: size / 2, height: size / 2 }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          {tool !== 'eraser' && tool !== 'stamp' && (
            <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-teal-100">
              <h3 className="font-bold text-gray-700 mb-4 text-lg">🎨 Warna</h3>
              <div className="grid grid-cols-4 gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-12 h-12 rounded-full border-2 transition-transform ${color === c ? 'border-gray-800 scale-110 shadow-lg ring-2 ring-offset-2' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: c }}
                    aria-label={`Pilih warna ${c}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CANVAS AREA */}
        <div 
          ref={containerRef}
          className="flex-1 bg-white rounded-[2rem] shadow-2xl overflow-hidden touch-none border-8 border-emerald-100 relative cursor-crosshair min-h-[600px] z-10"
        >
          {/* Background pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '20px 20px'
          }}></div>

          <canvas
            ref={canvasRef}
            className="w-full h-full relative z-10"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          
          {/* Helper Text */}
          <div className="absolute bottom-4 right-6 text-sm text-gray-400 font-bold pointer-events-none select-none bg-white/90 px-3 py-1 rounded-full shadow-sm border border-gray-100">
             {tool === 'stamp' ? 'Klik untuk menempel' : 'Tarik untuk menggambar'}
          </div>
        </div>
      </div>
    </div>
  );
};