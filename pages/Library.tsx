import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale } from '../types';

interface LibraryProps {
  customScales: Scale[];
}

const PREDEFINED_SCALES: Scale[] = [
  // Escalas Básicas
  { id: 'major', name: 'Mayor (Jónica)', type: 'predefined', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'] },
  { id: 'minor_natural', name: 'Menor Natural (Eólica)', type: 'predefined', notes: ['C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'A#4', 'C5'] },
  { id: 'harmonic_minor', name: 'Menor Armónica', type: 'predefined', notes: ['C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'B4', 'C5'] },
  { id: 'melodic_minor', name: 'Menor Melódica', type: 'predefined', notes: ['C4', 'D4', 'D#4', 'F4', 'G4', 'A4', 'B4', 'C5'] },
  
  // Arpegios y Vocalización
  { id: 'major_arpeggio', name: 'Arpegio Mayor (Vocalización)', type: 'predefined', notes: ['C4', 'E4', 'G4', 'C5'] },
  { id: 'minor_arpeggio', name: 'Arpegio Menor (Vocalización)', type: 'predefined', notes: ['C4', 'D#4', 'G4', 'C5'] },
  { id: 'major_triad_ext', name: 'Tríada Mayor Extendida', type: 'predefined', notes: ['C4', 'E4', 'G4', 'C5', 'E5', 'G5', 'C6'] },
  
  // Pentatónicas y Blues
  { id: 'pent_major', name: 'Pentatónica Mayor', type: 'predefined', notes: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'] },
  { id: 'pent_minor', name: 'Pentatónica Menor', type: 'predefined', notes: ['C4', 'D#4', 'F4', 'G4', 'A#4', 'C5'] },
  { id: 'blues', name: 'Blues', type: 'predefined', notes: ['C4', 'D#4', 'F4', 'F#4', 'G4', 'A#4', 'C5'] },
  
  // Modos y Otros
  { id: 'flamenco', name: 'Flamenca (Frigia Dominante)', type: 'predefined', notes: ['C4', 'C#4', 'E4', 'F4', 'G4', 'G#4', 'A#4', 'C5'] },
  { id: 'chromatic', name: 'Cromática', type: 'predefined', notes: ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'] },
  { id: 'dorian', name: 'Dórica (Modo)', type: 'predefined', notes: ['C4', 'D4', 'D#4', 'F4', 'G4', 'A4', 'A#4', 'C5'] },
  { id: 'mixolydian', name: 'Mixolidia (Modo)', type: 'predefined', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'A#4', 'C5'] },
  { id: 'phrygian', name: 'Frigia (Modo)', type: 'predefined', notes: ['C4', 'C#4', 'D#4', 'F4', 'G4', 'G#4', 'A#4', 'C5'] },
  { id: 'whole_tone', name: 'Tonos Enteros', type: 'predefined', notes: ['C4', 'D4', 'E4', 'F#4', 'G#4', 'A#4', 'C5'] },
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
    <div className="flex flex-col min-h-screen pb-20 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-transparent dark:border-slate-800/50">
        <div className="size-12"></div>
        <h1 className="text-lg font-bold dark:text-white">Biblioteca de Escalas</h1>
        <button 
          onClick={() => navigate('/create')}
          className="flex size-12 items-center justify-center text-primary bg-blue-50 dark:bg-slate-800 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
          title="Crear Nueva Escala"
        >
          <span className="material-symbols-outlined text-2xl">add</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 sticky top-[60px] z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <div className="flex w-full items-center rounded-xl bg-zinc-200 dark:bg-input-dark h-12 overflow-hidden shadow-inner">
          <div className="pl-4 pr-2 text-zinc-400 dark:text-zinc-500">
             <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            type="text"
            placeholder="Buscar escala..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-4 py-3">
        <div className="flex h-12 flex-1 rounded-xl bg-zinc-200 dark:bg-input-dark p-1.5 gap-2">
           <button 
             onClick={() => setTab('predefined')}
             className={`flex-1 rounded-lg text-sm font-bold transition-all ${tab === 'predefined' ? 'bg-white dark:bg-background-dark shadow-sm text-primary dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
           >
             Predeterminadas
           </button>
           <button 
             onClick={() => setTab('custom')}
             className={`flex-1 rounded-lg text-sm font-bold transition-all ${tab === 'custom' ? 'bg-white dark:bg-background-dark shadow-sm text-primary dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
           >
             Mis Escalas
           </button>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col px-4 gap-2">
        {filteredScales.map((scale) => (
          <div 
            key={scale.id}
            onClick={() => navigate(`/play/${scale.id}`, { state: { scale } })}
            className="group flex items-center gap-4 py-3.5 px-4 bg-white dark:bg-card-dark rounded-xl cursor-pointer active:scale-[0.99] transition-all shadow-sm border border-transparent hover:border-primary/20"
          >
             <div className="size-10 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-blue-400 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">music_note</span>
             </div>
             <div className="flex-1 min-w-0">
                <p className="font-bold text-base text-slate-800 dark:text-white truncate">{scale.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                    {scale.notes.length} notas • {scale.notes[0]} - {scale.notes[scale.notes.length-1]}
                </p>
             </div>
             <span className="material-symbols-outlined text-zinc-300 dark:text-zinc-600">chevron_right</span>
          </div>
        ))}

        {filteredScales.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="size-16 rounded-full bg-zinc-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-zinc-400 dark:text-slate-500">
                    <span className="material-symbols-outlined text-3xl">library_music</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-1">
                    {tab === 'custom' ? 'No tienes escalas guardadas' : 'No se encontraron resultados'}
                </p>
                {tab === 'custom' && (
                    <button 
                        onClick={() => navigate('/create')}
                        className="mt-4 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-transform flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Crear Escala
                    </button>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default Library;