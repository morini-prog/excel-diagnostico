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

  // SVG Pixel Art de Excelito (un disquete verde retro y tierno de 16x16)
  // Usamos una cuadrícula de rectángulos para lograr el estilo retro pixelado
  return (
    <div className="flex items-center gap-6 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-5 shadow-xl backdrop-blur-md transition-all duration-300">
      {/* Sprite Pixel Art de Excelito */}
      <div className="relative flex-shrink-0 w-24 h-24 flex items-center justify-center animate-bounce duration-1000">
        <svg
          viewBox="0 0 16 16"
          className="w-20 h-20 filter drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Cuerpo - Disquete Verde (Excel Green #10B981 / #059669) */}
          {/* Fila 1 */}
          <rect x="1" y="2" width="13" height="1" fill="#047857" />
          <rect x="14" y="3" width="1" height="1" fill="#047857" />
          {/* Fila 2 */}
          <rect x="1" y="3" width="13" height="11" fill="#10B981" />
          <rect x="14" y="4" width="1" height="10" fill="#059669" />
          <rect x="1" y="14" width="14" height="1" fill="#047857" />
          {/* Etiqueta blanca de disquete */}
          <rect x="3" y="7" width="10" height="7" fill="#FFFFFF" />
          {/* Líneas horizontales de la etiqueta */}
          <rect x="4" y="9" width="8" height="1" fill="#3B82F6" />
          <rect x="4" y="11" width="8" height="1" fill="#10B981" />
          
          {/* Parte superior metal deslizante */}
          <rect x="4" y="3" width="7" height="3" fill="#D1D5DB" />
          <rect x="5" y="3" width="2" height="2" fill="#9CA3AF" />
          <rect x="8" y="4" width="2" height="1" fill="#4B5563" />

          {/* Ojos tiernos (Estilo Kawaii Pixel) */}
          {estado === 'incorrecto' ? (
            <>
              {/* Ojos en cruz X X */}
              <rect x="4" y="5" width="1" height="1" fill="#111827" />
              <rect x="5" y="6" width="1" height="1" fill="#111827" />
              <rect x="4" y="7" width="1" height="1" fill="#111827" />
              <rect x="10" y="5" width="1" height="1" fill="#111827" />
              <rect x="11" y="6" width="1" height="1" fill="#111827" />
              <rect x="10" y="7" width="1" height="1" fill="#111827" />
            </>
          ) : estado === 'correcto' ? (
            <>
              {/* Ojos alegres ^ ^ */}
              <rect x="3" y="6" width="1" height="1" fill="#111827" />
              <rect x="4" y="5" width="1" height="1" fill="#111827" />
              <rect x="5" y="6" width="1" height="1" fill="#111827" />
              <rect x="9" y="6" width="1" height="1" fill="#111827" />
              <rect x="10" y="5" width="1" height="1" fill="#111827" />
              <rect x="11" y="6" width="1" height="1" fill="#111827" />
            </>
          ) : (
            <>
              {/* Ojos redondos normales con brillo */}
              <rect x="3" y="5" width="2" height="2" fill="#111827" />
              <rect x="3" y="5" width="1" height="1" fill="#FFFFFF" />
              <rect x="9" y="5" width="2" height="2" fill="#111827" />
              <rect x="9" y="5" width="1" height="1" fill="#FFFFFF" />
            </>
          )}

          {/* Mejillas rosadas */}
          {estado === 'correcto' && (
            <>
              <rect x="2" y="7" width="1" height="1" fill="#F472B6" />
              <rect x="11" y="7" width="1" height="1" fill="#F472B6" />
            </>
          )}

          {/* Boca */}
          {estado === 'correcto' ? (
            <rect x="6" y="7" width="3" height="1" fill="#EF4444" /> // Sonrisa roja alegre
          ) : estado === 'incorrecto' ? (
            <rect x="6" y="6" width="3" height="1" fill="#111827" /> // Boca recta/triste
          ) : (
            <rect x="6" y="7" width="3" height="1" fill="#111827" /> // Pequeña boca feliz
          )}
        </svg>
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
