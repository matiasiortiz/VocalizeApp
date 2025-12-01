import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isActive = (p: string) => path === p;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-[#192233]/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        <button 
          onClick={() => navigate('/')} 
          className={`flex flex-col items-center gap-1 w-16 ${isActive('/') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <span className={`material-symbols-outlined ${isActive('/') ? 'filled' : ''}`}>home</span>
          <span className="text-[10px] font-bold">Inicio</span>
        </button>

        <button 
           className={`flex flex-col items-center gap-1 w-16 text-slate-400 dark:text-slate-500 opacity-50 cursor-not-allowed`}
        >
          <span className="material-symbols-outlined">music_note</span>
          <span className="text-[10px] font-medium">Escalas</span>
        </button>

        <button 
           className={`flex flex-col items-center gap-1 w-16 text-slate-400 dark:text-slate-500 opacity-50 cursor-not-allowed`}
        >
          <span className="material-symbols-outlined">mic</span>
          <span className="text-[10px] font-medium">Ejercicios</span>
        </button>

        <button 
          onClick={() => navigate('/settings')}
          className={`flex flex-col items-center gap-1 w-16 ${isActive('/settings') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <span className={`material-symbols-outlined ${isActive('/settings') ? 'filled' : ''}`}>settings</span>
          <span className="text-[10px] font-medium">Ajustes</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;