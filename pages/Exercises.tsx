
import React from 'react';

const Exercises: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24 font-display">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-transparent dark:border-slate-800/50">
         <div className="size-10"></div>
         <h1 className="flex-1 text-center font-bold text-lg text-slate-900 dark:text-white">Educación Vocal</h1>
         <div className="size-10"></div>
      </div>

      <div className="flex flex-col px-4 pt-4 gap-8">
        
        {/* Section 1: Anatomy & Production */}
        <div className="flex flex-col gap-4">
            <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-lg">
                <img 
                    src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop" 
                    alt="Cantante en escenario" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <h2 className="text-white text-xl font-bold">¿Cómo funciona tu voz?</h2>
                </div>
            </div>

            <div className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined">graphic_eq</span>
                    Producción del Sonido
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                    La voz humana se produce en la <strong>laringe</strong>, donde se encuentran las cuerdas vocales. El proceso consta de tres partes fundamentales:
                </p>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold size-6 shrink-0 rounded-full flex items-center justify-center text-xs">1</span>
                        <span><strong>El Motor (Pulmones):</strong> El aire sale de los pulmones creando presión hacia arriba.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold size-6 shrink-0 rounded-full flex items-center justify-center text-xs">2</span>
                        <span><strong>El Vibrador (Cuerdas Vocales):</strong> El aire pasa entre las cuerdas, haciéndolas vibrar cientos de veces por segundo para crear sonido.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold size-6 shrink-0 rounded-full flex items-center justify-center text-xs">3</span>
                        <span><strong>El Resonador:</strong> La garganta, boca y nariz amplifican y moldean ese zumbido para convertirlo en tu voz única.</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Section 2: Care Tips */}
        <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 px-1">Tips para Cuidar la Voz</h3>
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 dark:bg-[#1C2431] p-4 rounded-xl border border-blue-100 dark:border-slate-700/50 flex flex-col items-center text-center gap-2">
                    <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <span className="material-symbols-outlined">water_drop</span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Hidratación</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Bebe agua constantemente. Las cuerdas vocales necesitan estar lubricadas.</p>
                </div>

                <div className="bg-purple-50 dark:bg-[#1C2431] p-4 rounded-xl border border-purple-100 dark:border-slate-700/50 flex flex-col items-center text-center gap-2">
                    <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <span className="material-symbols-outlined">bedtime</span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Descanso</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Dormir bien (7-8h) es vital. La voz se fatiga igual que cualquier músculo.</p>
                </div>

                <div className="bg-orange-50 dark:bg-[#1C2431] p-4 rounded-xl border border-orange-100 dark:border-slate-700/50 flex flex-col items-center text-center gap-2">
                    <div className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                        <span className="material-symbols-outlined">volume_off</span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Evita Gritar</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">No fuerces la voz en ambientes ruidosos. El susurro forzado también daña.</p>
                </div>

                <div className="bg-green-50 dark:bg-[#1C2431] p-4 rounded-xl border border-green-100 dark:border-slate-700/50 flex flex-col items-center text-center gap-2">
                    <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                        <span className="material-symbols-outlined">self_improvement</span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Relajación</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">La tensión en cuello y hombros afecta la calidad vocal. Estira antes de cantar.</p>
                </div>
            </div>
        </div>

        {/* Section 3: Warmups */}
        <div className="flex flex-col gap-4">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white px-1">Ejercicios Básicos</h3>
             
             {/* Exercise Card 1 */}
             <div className="flex bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="w-24 bg-cover bg-center shrink-0" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1525926477800-7a3be58cb7e6?q=80&w=400&auto=format&fit=crop")'}}></div>
                <div className="p-4 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Lip Trills (Vibración Labial)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Relaja los labios y mejora el control del aire.</p>
                    <div className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                        <strong>Instrucción:</strong> Sopla aire haciendo vibrar tus labios (como un motor o un caballo) manteniendo un tono constante y suave.
                    </div>
                </div>
             </div>

             {/* Exercise Card 2 */}
             <div className="flex bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="w-24 bg-cover bg-center shrink-0" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1519683109079-d5f539e1c42a?q=80&w=400&auto=format&fit=crop")'}}></div>
                <div className="p-4 flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Humming (Boca Cerrada)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Ideal para despertar la resonancia sin tensión.</p>
                    <div className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                        <strong>Instrucción:</strong> Con la boca cerrada y dientes separados, emite una "M". Siente la vibración en los labios y nariz.
                    </div>
                </div>
             </div>

        </div>

        {/* Footer info */}
        <div className="py-6 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-600">
                Recuerda: Si sientes dolor o ronquera persistente, consulta a un especialista (foniatra u otorrinolaringólogo).
            </p>
        </div>

      </div>
    </div>
  );
};

export default Exercises;
