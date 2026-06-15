import { useState, useEffect } from 'react';

// Frases motivacionales según el estado
const FRASES = {
  inicio: [
    '¡Hola! Soy Excelito, tu compañero de diagnóstico. ¡Mucho éxito! 🚀',
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

  return (
    <div className="flex items-center gap-6 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-5 shadow-xl backdrop-blur-md transition-all duration-300">
      {/* Sprite Pixel Art de Excelito (Imagen generada) */}
      <div className="relative flex-shrink-0 w-24 h-24 flex items-center justify-center animate-bounce duration-1000">
        <img
          src="/excelito.png"
          alt="Excelito"
          className="w-22 h-22 object-contain filter drop-shadow-[0_0_10px_rgba(16,185,129,0.35)]"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Globo de diálogo */}
      <div className="relative flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 shadow-md">
        {/* Triángulo del globo */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-3 h-3 bg-slate-800 border-l border-b border-slate-700 rotate-45" />
        
        <p className="text-slate-100 text-sm font-medium leading-relaxed">
          {frase}
        </p>
      </div>
    </div>
  );
}
