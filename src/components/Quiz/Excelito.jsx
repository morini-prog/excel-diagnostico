import { useState, useEffect } from 'react';

// Frases motivacionales según el estado
const FRASES = {
  inicio: [
    '¡Hola! Te acompañaré durante tu diagnóstico. ¡Mucho éxito! 🚀',
    '¡Qué alegría verte! ¿Listo para demostrar tus habilidades en Excel? 📊',
    '¡Hola, jugador! Prepárate para el reto. ¡Vamos a divertirnos! 🎮'
  ],
  esperando: [
    'Lee atentamente la pregunta...',
    '¿Cuál crees que sea la respuesta correcta? 🤔',
    '¡Tómate tu tiempo, tú puedes!',
    '¡Analiza la fórmula antes de decidir!',
    'Concentración total... ¡Sigue así!'
  ],
  correcto: [
    '¡EXCELENTE! ¡La tienes clarísima! ⭐',
    '¡Brillante! ¡Eres un crack de las hojas de cálculo! 🎯',
    '¡Sí! ¡Esa era la respuesta correcta! ¡Impecable! 🏆',
    '¡Estás arrasando! ¡Sigue con ese ritmo! 🔥',
    '¡Muy bien pensado! ¡Dominas este tema!'
  ],
  incorrecto: [
    '¡Ánimo! La próxima saldrá mejor. ¡No te rindas! 💪',
    '¡No pasa nada! De los errores se aprende. 💡',
    '¡Cerca! Recuerda repasar ese concepto luego. 📘',
    '¡Sigue adelante! Cada pregunta es una oportunidad de aprender.',
    '¡Casi! Respira hondo y vamos por la siguiente.'
  ]
};

export default function Excelito({ estado = 'esperando' }) {
  const [frase, setFrase] = useState('');
  
  useEffect(() => {
    const listaFrases = FRASES[estado] || FRASES.esperando;
    const randomIndex = Math.floor(Math.random() * listaFrases.length);
    setFrase(listaFrases[randomIndex]);
  }, [estado]);

  // Selección de icono de estado
  const icon = estado === 'correcto' ? '🎉' : estado === 'incorrecto' ? '💡' : '📢';
  const borderClass = estado === 'correcto' ? 'border-emerald-500/25 bg-emerald-500/5' : estado === 'incorrecto' ? 'border-rose-500/20 bg-rose-500/5' : 'border-slate-800 bg-slate-900/40';

  return (
    <div className={`border rounded-3xl p-5 shadow-xl backdrop-blur-md transition-all duration-300 flex items-center gap-4 ${borderClass}`}>
      <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg shadow-inner">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-slate-250 text-sm font-medium leading-relaxed">
          {frase}
        </p>
      </div>
    </div>
  );
}
