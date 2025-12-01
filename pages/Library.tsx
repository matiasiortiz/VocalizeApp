import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale } from '../types';

interface LibraryProps {
  customScales: Scale[];
}

const PREDEFINED_SCALES: Scale[] = [
  { id: 'major', name: 'Mayor', type: 'predefined', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'] },
  { id: 'minor_natural', name: 'Menor Natural', type: 'predefined', notes: ['C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'A#4', 'C5'] },
  { id: 'pent_major', name: 'Pentatónica Mayor', type: 'predefined', notes: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'] },
  { id: 'pent_minor', name: 'Pentatónica Menor', type: 'predefined', notes: ['C4', 'D#4', 'F4', 'G4', 'A#4', 'C5'] },
  { id: 'chromatic', name: 'Cromática', type: 'predefined', notes: ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'] },
  { id: 'blues', name: 'Blues', type: 'predefined', notes: ['C4', 'D#4', 'F4', 'F#4', 'G4', 'A#4', 'C5'] },
];

const Library: React.FC<LibraryProps> = ({ customScales }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'predefined' | 'custom'>('predefined');
  const [search, setSearch] = useState('');

  const displayScales = tab === 'predefined' ? PREDEFINED_SCALES : customScales;
  
  const filteredScales = displayScales.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-20 bg-background-light dark:bg-background-dark/95 backdrop-blur-sm">
        <div className="size-12"></div>
        <h1 className="text-lg font-bold">Biblioteca de Escalas</h1>
        <button 
          onClick={() => navigate('/create')}
          className="flex size-12 items-center justify-center text-primary"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 sticky top-[60px] z-20 bg-background-light dark:bg-background-dark/95 backdrop-blur-sm">
        <div className="flex w-full items-center rounded-xl bg-zinc-200 dark:bg-input-dark h-12 overflow-hidden">
          <div className="pl-4 pr-2 text-zinc-400 dark:text-zinc-500">
             <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            type="text"
            placeholder="Buscar escala..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-4 py-3">
        <div className="flex h-10 flex-1 rounded-lg bg-zinc-200 dark:bg-input-dark p-1">
           <button 
             onClick={() => setTab('predefined')}
             className={`flex-1 rounded-md text-sm font-medium transition-all ${tab === 'predefined' ? 'bg-white dark:bg-background-dark shadow-sm text-slate-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}
           >
             Predefinidas
           </button>
           <button 
             onClick={() => setTab('custom')}
             className={`flex-1 rounded-md text-sm font-medium transition-all ${tab === 'custom' ? 'bg-white dark:bg-background-dark shadow-sm text-slate-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}
           >
             Mis Escalas
           </button>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col px-4 gap-1">
        {filteredScales.map((scale) => (
          <div 
            key={scale.id}
            onClick={() => navigate(`/play/${scale.id}`, { state: { scale } })}
            className="flex items-center gap-4 py-3 px-4 bg-white dark:bg-card-dark rounded-xl cursor-pointer active:scale-[0.99] transition-transform shadow-sm dark:shadow-none mb-2"
          >
             <div className="size-10 rounded-lg bg-zinc-100 dark:bg-input-dark flex items-center justify-center text-slate-700 dark:text-white">
                <span className="material-symbols-outlined">music_note</span>
             </div>
             <p className="flex-1 font-medium text-base truncate">{scale.name}</p>
             <span className="material-symbols-outlined text-zinc-400">chevron_right</span>
          </div>
        ))}
        {filteredScales.length === 0 && (
            <div className="text-center py-10 text-zinc-500">
                No se encontraron escalas
            </div>
        )}
      </div>
    </div>
  );
};

export default Library;