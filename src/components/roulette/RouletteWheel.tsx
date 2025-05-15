
import React, { useEffect, useState, useRef } from 'react';
import { rouletteNumbers } from './rouletteUtils';
import { motion, AnimatePresence } from 'framer-motion';

interface RouletteWheelProps {
  spinning: boolean;
  lastResult?: number;
}

// Wheel numbers in European roulette order
const wheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

const RouletteWheel: React.FC<RouletteWheelProps> = ({ spinning, lastResult }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [ballPosition, setBallPosition] = useState(0);
  const [ballAngle, setBallAngle] = useState(0);
  const [ballRadius, setBallRadius] = useState(35);
  const [ballSpeed, setBallSpeed] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [showHighlight, setShowHighlight] = useState(false);
  
  // Generate a random position for the result
  const getResultPosition = (result: number) => {
    const index = wheelNumbers.indexOf(result);
    // Each pocket is 9.73 degrees (360/37)
    return index >= 0 ? index * (360 / wheelNumbers.length) : 0;
  };
  
  useEffect(() => {
    if (spinning) {
      // Reset any previous animations
      setShowHighlight(false);
      
      // Set initial ball motion outside the wheel
      setBallRadius(55);
      setBallSpeed(15);
      
      // Generate random starting positions and speeds
      const randomRotations = 8 + Math.random() * 4; // Between 8 and 12 complete rotations
      const targetAngle = rotationAngle + (randomRotations * 360);
      setRotationAngle(targetAngle);
      
      // Set ball position for independent animation
      const randomStartAngle = Math.random() * 360;
      setBallAngle(randomStartAngle);
      
      // Simulate ball slowing down and falling into the wheel
      let ballInterval = setInterval(() => {
        setBallSpeed((prev) => {
          if (prev <= 0.5) {
            clearInterval(ballInterval);
            return 0.5;
          }
          return prev * 0.97; // Gradually slow down
        });
        
        setBallRadius((prev) => {
          // Ball gradually moves inward
          if (prev <= 35) return 35;
          return prev - 0.1;
        });
      }, 50);
      
      return () => {
        clearInterval(ballInterval);
      };
    } else if (lastResult !== undefined) {
      // When stopped, align with the result
      const resultPosition = getResultPosition(lastResult);
      const finalAngle = Math.floor(rotationAngle / 360) * 360 + resultPosition + (Math.random() * 4 - 2);
      setRotationAngle(finalAngle);
      
      // Position the ball in the correct pocket
      setBallAngle(resultPosition);
      setBallRadius(35);
      setBallSpeed(0);
      
      // Show highlight animation after a short delay
      setTimeout(() => {
        setShowHighlight(true);
      }, 500);
    }
  }, [spinning, lastResult]);
  
  // Update ball position
  useEffect(() => {
    if (!spinning && lastResult === undefined) return;
    
    const ballAnimation = setInterval(() => {
      setBallAngle((prev) => (prev + ballSpeed) % 360);
    }, 16); // ~60fps
    
    return () => clearInterval(ballAnimation);
  }, [spinning, ballSpeed, lastResult]);
  
  const getBallPosition = () => {
    const angle = (ballAngle * Math.PI) / 180;
    return {
      top: `${40 + ballRadius * Math.sin(angle)}%`,
      left: `${40 + ballRadius * Math.cos(angle)}%`,
    };
  };
  
  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Outer casing with shadow and metallic effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 
                     border-8 border-amber-950/90 shadow-[0_0_30px_rgba(0,0,0,0.7)] overflow-hidden">
        
        {/* Inner wheel rim */}
        <div className="absolute inset-[8px] rounded-full bg-gradient-to-r from-amber-700 to-amber-600 border border-amber-500/30"></div>
        
        {/* Spinning wheel */}
        <div 
          ref={wheelRef}
          className="absolute inset-[12px] rounded-full bg-gradient-to-r from-amber-800 to-amber-700"
          style={{ 
            transform: `rotate(${rotationAngle}deg)`,
            transition: spinning 
              ? 'transform 6s cubic-bezier(0.2, 0.8, 0.2, 1)' 
              : 'transform 2s cubic-bezier(0.1, 0.8, 0.2, 1)'
          }}
        >
          {/* Wheel sectors */}
          {wheelNumbers.map((num, i) => {
            const rotation = i * (360 / wheelNumbers.length);
            const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);
            const isGreen = num === 0;
            const bgColor = isGreen ? 'bg-green-600' : isRed ? 'bg-red-600' : 'bg-black';
            const isWinner = !spinning && lastResult === num;
            
            return (
              <div 
                key={i}
                className="absolute top-0 left-1/2 -ml-[2px] w-1 origin-bottom h-[48%]"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className={`absolute -left-6 -top-6 w-12 h-12 ${bgColor} flex items-center justify-center
                              text-white text-xs font-bold border-b border-gray-700
                              ${isWinner && showHighlight ? 'ring-2 ring-yellow-300 ring-opacity-80' : ''}`}>
                  <span className={`${isWinner && showHighlight ? 'text-glow shadow-yellow-300' : ''}`}>
                    {num}
                  </span>
                </div>
                <div className="absolute top-[35%] left-[-5px] w-3 h-8 bg-amber-300/40"></div>
              </div>
            );
          })}
          
          {/* Pocket separators */}
          {Array.from({ length: wheelNumbers.length }).map((_, i) => {
            const rotation = i * (360 / wheelNumbers.length);
            return (
              <div 
                key={`sep-${i}`}
                className="absolute top-0 left-1/2 -ml-px h-full w-[1px] bg-amber-300/40"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            );
          })}
          
          {/* Diamond-shaped pocket markers */}
          {Array.from({ length: wheelNumbers.length }).map((_, i) => {
            const rotation = i * (360 / wheelNumbers.length);
            return (
              <div 
                key={`diamond-${i}`}
                className="absolute top-[10%] left-1/2 -ml-1 w-2 h-2 bg-amber-300/80 rotate-45"
                style={{ transform: `rotate(${rotation}deg) translateY(-10px)` }}
              />
            );
          })}
          
          {/* Wheel center */}
          <div className="absolute inset-[20%] rounded-full bg-gradient-to-b from-amber-700 to-amber-900 border-4 border-amber-700/70 
                        flex items-center justify-center shadow-inner">
            <div className="absolute inset-[25%] rounded-full bg-gradient-to-br from-amber-900 to-amber-800 shadow-inner flex items-center justify-center">
              <div className="text-amber-300 font-bold">
                {lastResult !== undefined ? lastResult : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ball */}
      <AnimatePresence>
        <motion.div 
          className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] z-10"
          style={getBallPosition()}
          animate={{
            boxShadow: spinning 
              ? '0 0 12px 2px rgba(255, 255, 255, 0.8)' 
              : showHighlight 
                ? '0 0 15px 5px rgba(255, 255, 255, 0.9)' 
                : '0 0 10px rgba(255, 255, 255, 0.7)'
          }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
      
      {/* Reflection overlay */}
      <div className="absolute inset-[12px] rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20"></div>
      
      {/* Marker diamonds around the outer edge */}
      {Array.from({ length: 12 }).map((_, i) => {
        const rotation = i * 30;
        return (
          <div 
            key={`marker-${i}`}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-amber-300 rotate-45 z-20"
            style={{ 
              top: `${6 + 44 * Math.sin(rotation * Math.PI / 180)}%`, 
              left: `${6 + 44 * Math.cos(rotation * Math.PI / 180)}%` 
            }}
          />
        );
      })}
      
      {/* Indicator arrow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-8 z-30">
        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-yellow-400 mx-auto drop-shadow-lg"></div>
        <div className="w-5 h-2 bg-yellow-400 mx-auto rounded-b drop-shadow-lg"></div>
      </div>
    </div>
  );
};

export default RouletteWheel;
