import React, { useMemo } from 'react';
import { Note } from '../types';

interface PianoProps {
  selectedNotes: Note[];
  activeNote?: Note | null;
  onNoteClick?: (note: Note) => void;
  interactive?: boolean;
}

const OCTAVES = 2; // Display 2 octaves C4-B5
const START_OCTAVE = 4;

const Piano: React.FC<PianoProps> = ({ selectedNotes, activeNote, onNoteClick, interactive = false }) => {
  
  const keys = useMemo(() => {
    const k = [];
    for (let o = 0; o < OCTAVES; o++) {
      const octaveNum = START_OCTAVE + o;
      const notesInOctave = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      notesInOctave.forEach(noteName => {
        const isSharp = noteName.includes('#');
        k.push({
            note: `${noteName}${octaveNum}`,
            isSharp,
            display: noteName
        });
      });
    }
    // Add final C
    k.push({ note: `C${START_OCTAVE + OCTAVES}`, isSharp: false, display: 'C' });
    return k;
  }, []);

  // Separate white and black keys for layout
  const whiteKeys = keys.filter(k => !k.isSharp);
  const blackKeys = keys.filter(k => k.isSharp);

  const isSelected = (note: string) => selectedNotes.includes(note);
  const isActive = (note: string) => activeNote === note;

  return (
    <div className="relative w-full overflow-x-auto hide-scrollbar pb-4 select-none">
        <div className="relative flex min-w-max h-[180px] select-none">
            {/* White Keys */}
            <div className="flex h-full">
                {whiteKeys.map((k) => (
                    <div
                        key={k.note}
                        onClick={() => interactive && onNoteClick?.(k.note)}
                        className={`
                            relative w-12 h-full border-r border-b border-t border-gray-700 rounded-b-lg transition-colors duration-150
                            ${interactive ? 'cursor-pointer active:scale-[0.98] origin-top' : ''}
                            ${isActive(k.note) ? '!bg-yellow-400' : ''} 
                            ${isSelected(k.note) && !isActive(k.note) ? 'bg-primary' : 'bg-white'}
                        `}
                    >
                         {/* Optional Note Label for learning */}
                        {interactive && (
                            <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold ${isSelected(k.note) ? 'text-white' : 'text-slate-800'}`}>
                                {k.note}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Black Keys - Absolute Positioning Overlay */}
            {/* The logic here assumes standard piano spacing. 
                C-D gap, D-E gap, F-G gap, G-A gap, A-B gap. 
                We can position them based on the index of the PRECEDING white key.
            */}
            <div className="absolute top-0 left-0 h-[100px] flex pointer-events-none">
                 {/* 
                    We need to map the black keys to their positions.
                    A white key is 3rem (w-12).
                    A black key is usually centered on the line between white keys.
                    Width w-8 (2rem).
                    Left offset = (WhiteKeyIndex + 1) * 3rem - 1rem
                 */}
                 {keys.map((k, idx) => {
                     if (!k.isSharp) return null;
                     
                     // Find how many white keys came before this black key
                     const previousWhiteKeysCount = keys.slice(0, idx).filter(pk => !pk.isSharp).length;
                     
                     // Tailwind w-12 is 3rem (48px). w-8 is 2rem (32px).
                     // Offset: previousWhiteKeysCount * 48px - (32px / 2) = previousWhiteKeysCount * 48 - 16
                     const leftOffset = (previousWhiteKeysCount * 48) - 16;

                     return (
                        <div
                            key={k.note}
                            style={{ left: `${leftOffset}px` }}
                            className="absolute top-0 h-full w-8 pointer-events-auto z-10"
                        >
                             <div 
                                onClick={() => interactive && onNoteClick?.(k.note)}
                                className={`
                                    w-full h-full border border-black rounded-b-md shadow-lg transition-colors duration-150
                                    ${interactive ? 'cursor-pointer active:scale-[0.98] origin-top' : ''}
                                    ${isActive(k.note) ? '!bg-yellow-500' : ''}
                                    ${isSelected(k.note) && !isActive(k.note) ? 'bg-primary border-primary' : 'bg-[#3A3A3C]'}
                                `}
                             />
                        </div>
                     );
                 })}
            </div>
        </div>
    </div>
  );
};

export default Piano;