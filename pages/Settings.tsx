import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-20">
      <div className="flex items-center p-4 sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="text-primary size-10 flex items-center justify-center">
             <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg dark:text-white -ml-10">Ajustes</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-col gap-6 px-4 py-2">
        
        {/* Section */}
        <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Sonido</h2>
            <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-lg">piano</span>
                        </div>
                        <span className="font-medium dark:text-white">Sonido del Piano</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <span className="text-sm">Grand Piano</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Section */}
        <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Notificaciones</h2>
            <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-lg">notifications</span>
                        </div>
                        <span className="font-medium dark:text-white">Recordatorios</span>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Section */}
        <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Datos</h2>
            <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                 <div className="flex items-center justify-between p-4 cursor-pointer active:bg-slate-50 dark:active:bg-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-lg">tune</span>
                        </div>
                        <span className="font-medium dark:text-white">Gestionar Escalas</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-sm">arrow_forward_ios</span>
                </div>
                <div className="flex items-center justify-center p-4 cursor-pointer active:bg-slate-50 dark:active:bg-slate-800">
                    <span className="text-red-500 font-medium">Borrar Todas las Escalas</span>
                </div>
            </div>
        </div>

        {/* Section */}
        <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Información</h2>
            <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                 <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-lg">star</span>
                        </div>
                        <span className="font-medium dark:text-white">Calificar la App</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-sm">arrow_forward_ios</span>
                </div>
                 <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-slate-500 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-lg">info</span>
                        </div>
                        <span className="font-medium dark:text-white">Versión</span>
                    </div>
                    <span className="text-slate-500">1.0.0</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;