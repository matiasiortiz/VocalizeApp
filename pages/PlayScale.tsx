import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Scale } from '../types';
import Piano from '../components/Piano';
import { audioService } from '../services/audio';

// Helper for note calculations
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const getNoteValue = (note: string) => {
  const match = note.match(/([A-G]#?)(\d)/);
  if (!match) return 0;
  const key = match[1];
  const octave = parseInt(match[2]);
  const keyIndex = NOTES.indexOf(key);
  return octave * 12 + keyIndex;
};

const getNoteFromValue = (value: number) => {
  const octave = Math.floor(value / 12);
  const keyIndex = value % 12;
  // Handle negative values or wrapping if needed, but for our range it should be fine
  return `${NOTES[keyIndex]}${octave}`;
};

const PlayScale: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scale, setScale] = useState<Scale | null>(null);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);

  useEffect(() => {
    if (location.state && (location.state as any).scale) {
      const s = (location.state as any).scale as Scale;
      setScale(s);
      
      // Determine initial root from the first note of the scale
      if (s.notes.length > 0) {
        const match = s.notes[0].match(/([A-G]#?)\d/);
        if (match) setSelectedRoot(match[1]);
      }
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  // Calculate transposed notes
  const currentNotes = useMemo(() => {
    if (!scale || !selectedRoot || scale.notes.length === 0) return [];

    const originalRootNote = scale.notes[0];
    const originalVal = getNoteValue(originalRootNote);
    
    // We target the 4th octave for the new root to keep it visible on the piano
    // (Piano displays C4-C6)
    const targetVal = getNoteValue(`${selectedRoot}4`);
    
    const diff = targetVal - originalVal;

    return scale.notes.map(n => getNoteFromValue(getNoteValue(n) + diff));
  }, [scale, selectedRoot]);

  const handlePlay = (direction: 'asc' | 'desc' | 'both') => {
    if (!currentNotes.length) return;
    audioService.playScale(currentNotes, direction, (note) => {
        setActiveNote(note || null);
    });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value);
      setVolume(val);
      audioService.setVolume(val / 100);
  };

  if (!scale) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-6">
      {/* Header */}
      <div className="flex flex-col p-4 pb-2">
        <button onClick={() => navigate(-1)} className="self-start size-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 mb-2 transition-colors">
             <span className="material-symbols-outlined dark:text-white">arrow_back_ios_new</span>
        </button>
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold dark:text-white leading-tight">{scale.name}</h1>
            {selectedRoot && (
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                    Tonalidad: {selectedRoot}
                </p>
            )}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
         {/* Controls */}
         <div className="flex flex-col gap-3 px-4 pt-4">
             <div className="flex gap-3">
                <button onClick={() => handlePlay('asc')} className="flex-1 h-14 bg-primary rounded-xl flex items-center justify-center gap-2 text-white font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
                    <span className="material-symbols-outlined">arrow_upward</span>
                </button>
                <button onClick={() => handlePlay('desc')} className="flex-1 h-14 bg-input-dark rounded-xl flex items-center justify-center gap-2 text-white font-bold shadow-lg shadow-black/10 active:scale-[0.98] transition-all">
                    <span className="material-symbols-outlined">arrow_downward</span>
                </button>
                <button onClick={() => handlePlay('both')} className="flex-1 h-14 bg-input-dark rounded-xl flex items-center justify-center gap-2 text-white font-bold shadow-lg shadow-black/10 active:scale-[0.98] transition-all">
                    <span className="material-symbols-outlined">unfold_more</span>
                </button>
             </div>
         </div>

         {/* Key Selector */}
         <div className="flex flex-col gap-2 mt-6">
            <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cambiar Tonalidad</p>
            <div className="flex gap-2 overflow-x-auto px-4 py-1 hide-scrollbar">
                {NOTES.map(note => (
                    <button
                        key={note}
                        onClick={() => setSelectedRoot(note)}
                        className={`
                            shrink-0 h-10 min-w-[3rem] px-3 rounded-lg font-bold text-sm transition-all
                            ${selectedRoot === note 
                                ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105' 
                                : 'bg-white dark:bg-card-dark text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 hover:border-primary/50'
                            }
                        `}
                    >
                        {note}
                    </button>
                ))}
            </div>
         </div>

         {/* Visualizer */}
         <div className="py-6">
             <div className="px-4 mb-4">
                 <div className="bg-white dark:bg-card-dark rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm h-32 relative overflow-hidden">
                     <span className={`text-3xl sm:text-4xl font-bold transition-all duration-200 text-center ${activeNote ? 'text-primary scale-110' : 'text-slate-300 dark:text-slate-600'}`}>
                         {activeNote ? activeNote.replace(/\d/g, '') : currentNotes.map(n => n.replace(/\d/g,'')).join(' ')}
                     </span>
                     {/* Subtitle for current note frequency or detailed info could go here */}
                 </div>
             </div>
             
             {/* Small Piano Preview */}
             <div className="opacity-90 scale-95 origin-center">
                 <Piano selectedNotes={currentNotes} activeNote={activeNote} />
             </div>
         </div>

         {/* Volume */}
         <div className="px-6 pb-4">
             <div className="flex items-center justify-between mb-4 text-slate-600 dark:text-slate-400">
                 <span className="material-symbols-outlined">volume_down</span>
                 <span className="font-medium text-slate-900 dark:text-white">Volumen {volume}%</span>
                 <span className="material-symbols-outlined">volume_up</span>
             </div>
             <input 
               type="range" 
               min="0" 
               max="100" 
               value={volume} 
               onChange={handleVolumeChange}
               className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
             />
         </div>
      </div>
    </div>
  );
};

export default PlayScale;