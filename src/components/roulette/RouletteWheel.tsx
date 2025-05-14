
import React, { useEffect, useState } from 'react';

interface RouletteWheelProps {
  spinning: boolean;
  lastResult?: number;
}

// Orden de los números en la ruleta europea
const wheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

const RouletteWheel: React.FC<RouletteWheelProps> = ({ spinning, lastResult }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [ballPosition, setBallPosition] = useState(0);
  
  // Generar una posición aleatoria para el resultado
  const getResultPosition = (result: number) => {
    const index = wheelNumbers.indexOf(result);
    return index >= 0 ? index * (360 / wheelNumbers.length) : 0;
  };
  
  useEffect(() => {
    if (spinning) {
      const randomRotations = 5 + Math.random() * 5; // Entre 5 y 10 rotaciones completas
      const targetAngle = rotationAngle + (randomRotations * 360);
      setRotationAngle(targetAngle);
      
      // Establecer posición de la bola para animación independiente
      setBallPosition(Math.random() * 360);
    } else if (lastResult !== undefined) {
      // Cuando se detiene, alinear con el resultado
      const resultPosition = getResultPosition(lastResult);
      const finalAngle = rotationAngle + (resultPosition + Math.random() * 10 - 5); // Pequeña variación
      setRotationAngle(finalAngle);
    }
  }, [spinning, lastResult]);

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Círculo exterior */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-800 to-red-700 
                      border-8 border-amber-900 shadow-[0_0_25px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Rueda giratoria */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-red-700 to-red-800"
          style={{ 
            transform: `rotate(${rotationAngle}deg)`,
            transition: spinning ? 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'transform 0.5s ease-out'
          }}
        >
          {/* Sectores de la rueda */}
          {wheelNumbers.map((num, i) => {
            const rotation = i * (360 / wheelNumbers.length);
            const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);
            const isGreen = num === 0;
            const bgColor = isGreen ? 'bg-green-600' : isRed ? 'bg-red-600' : 'bg-black';
            
            return (
              <div 
                key={i}
                className="absolute top-0 left-1/2 -ml-[2px] w-1 origin-bottom h-[48%]"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className={`absolute -left-6 -top-6 w-12 h-12 ${bgColor} flex items-center justify-center
                                text-white text-xs font-bold border-b border-gray-700`}>
                  {num}
                </div>
                <div className="absolute top-[35%] left-[-5px] w-3 h-8 bg-amber-300/40"></div>
              </div>
            );
          })}
          
          {/* Separadores */}
          {Array.from({ length: wheelNumbers.length }).map((_, i) => {
            const rotation = i * (360 / wheelNumbers.length);
            return (
              <div 
                key={i}
                className="absolute top-0 left-1/2 -ml-px h-full w-[1px] bg-amber-200/40"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            );
          })}
          
          {/* Centro de la rueda */}
          <div className="absolute inset-[20%] rounded-full bg-amber-800 border-4 border-amber-700 
                         flex items-center justify-center shadow-inner">
            <div className="absolute inset-[30%] rounded-full bg-amber-900 shadow-inner flex items-center justify-center">
              <div className="text-amber-300 font-bold">
                {lastResult !== undefined ? lastResult : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bola */}
      {spinning ? (
        <div 
          className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
          style={{
            top: `${40 + 35 * Math.sin((ballPosition + rotationAngle / 5) * Math.PI / 180)}%`,
            left: `${40 + 35 * Math.cos((ballPosition + rotationAngle / 5) * Math.PI / 180)}%`,
            transition: spinning ? 'all 0.1s linear' : 'all 0.5s ease-out'
          }}
        />
      ) : lastResult !== undefined ? (
        <div 
          className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10 animate-pulse"
          style={{
            top: `${40 + 35 * Math.sin(getResultPosition(lastResult) * Math.PI / 180)}%`,
            left: `${40 + 35 * Math.cos(getResultPosition(lastResult) * Math.PI / 180)}%`
          }}
        />
      ) : null}
      
      {/* Flecha indicadora */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-6 z-10">
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-yellow-400 mx-auto"></div>
        <div className="w-4 h-2 bg-yellow-400"></div>
      </div>
    </div>
  );
};

export default RouletteWheel;
