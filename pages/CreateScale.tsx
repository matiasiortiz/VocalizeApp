import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Note, Scale } from '../types';
import Piano from '../components/Piano';
import { audioService } from '../services/audio';

interface CreateScaleProps {
  onSave: (scale: Scale) => void;
}

const CreateScale: React.FC<CreateScaleProps> = ({ onSave }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  // Musical sorter helper
  const sortNotes = (notesList: string[]) => {
      const order = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      return [...notesList].sort((a: string, b: string) => {
          const octA = parseInt(a.slice(-1));
          const octB = parseInt(b.slice(-1));
          if (octA !== octB) return octA - octB;
          const noteA = a.slice(0, -1);
          const noteB = b.slice(0, -1);
          return order.indexOf(noteA) - order.indexOf(noteB);
      });
  };

  const toggleNote = (note: Note) => {
    audioService.playNote(note, 0.2); // Feedback sound
    setNotes(prev => {
      if (prev.includes(note)) {
        const filtered = prev.filter(n => n !== note);
        return sortNotes(filtered);
      } else {
        return sortNotes([...prev, note]);
      }
    });
  };

  const handleSave = () => {
    if (!name.trim()) return alert('Por favor ingresa un nombre');
    if (notes.length === 0) return alert('Selecciona al menos una nota');
    
    const newScale: Scale = {
      id: Date.now().toString(),
      name,
      notes,
      type: 'custom'
    };
    onSave(newScale);
    navigate('/');
  };

  const handlePreview = () => {
      if (notes.length === 0) return;
      audioService.playScale(notes, 'asc');
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="text-white size-10 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg text-white -ml-10">Crear Nueva Escala</h1>
      </div>

      <div className="flex-1 flex flex-col px-4 overflow-y-auto">
        {/* Name Input */}
        <div className="py-4">
            <label className="block text-white/80 text-sm font-medium mb-2">Nombre de la Escala</label>
            <input 
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej: Escala Pentatónica Mayor"
                className="w-full bg-input-dark rounded-lg border-none text-white px-4 py-3 placeholder:text-slate-500 focus:ring-2 focus:ring-primary"
            />
        </div>

        {/* Selected Notes Display */}
        <div className="py-2">
            <p className="text-white/60 text-xs mb-1">Notas Seleccionadas:</p>
            <p className="text-primary text-base font-medium min-h-[1.5rem] flex flex-wrap gap-1">
                {notes.length > 0 
                  ? notes.map((n, i) => (
                      <span key={i} className="after:content-[','] last:after:content-[''] mr-1">
                          {n.replace(/\d/g, '')}
                      </span>
                    ))
                  : <span className="text-white/20 italic">Toca el piano para añadir notas</span>
                }
            </p>
        </div>

        {/* Piano */}
        <div className="mt-4">
            <Piano selectedNotes={notes} onNoteClick={toggleNote} interactive={true} />
            <p className="text-center text-white/40 text-sm mt-2">&lt;-- Desliza para ver más notas --&gt;</p>
        </div>
        
        <div className="flex-grow"></div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pb-8 pt-4">
            <button onClick={handleSave} className="h-14 bg-primary rounded-xl font-bold text-white shadow-lg active:scale-[0.98] transition-transform">
                Guardar Escala
            </button>
            <button onClick={handlePreview} className="h-14 bg-input-dark rounded-xl font-bold text-white shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">play_arrow</span>
                Previsualizar
            </button>
            <button onClick={() => navigate(-1)} className="h-14 bg-transparent text-white/60 font-medium">
                Cancelar
            </button>
        </div>
      </div>
    </div>
  );
};

export default CreateScale;