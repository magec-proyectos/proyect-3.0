
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

interface TouchOptimizedSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  label: string;
  icon: React.ReactNode;
  formatValue: (value: number) => string;
  className?: string;
}

const TouchOptimizedSlider: React.FC<TouchOptimizedSliderProps> = ({
  value,
  min,
  max,
  step,
  onChange,
  label,
  icon,
  formatValue,
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon}
          <label className="text-gray-300 text-sm font-medium">{label}</label>
        </div>
        <motion.div 
          className="bg-dark-lighter px-3 py-1.5 rounded-lg"
          animate={{ scale: isDragging ? 1.05 : 1 }}
          transition={{ duration: 0.1 }}
        >
          <span className="text-white font-semibold text-sm">
            {formatValue(value)}
          </span>
        </motion.div>
      </div>
      
      <div className="relative">
        <Slider 
          value={[value]} 
          min={min} 
          max={max} 
          step={step} 
          onValueChange={(newValue) => onChange(newValue[0])}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          className="cursor-pointer touch-manipulation"
        />
        
        {/* Visual feedback dots */}
        <div className="flex justify-between mt-2 px-1">
          <span className="text-xs text-gray-500">{formatValue(min)}</span>
          <span className="text-xs text-gray-500">{formatValue(Math.floor((min + max) / 2))}</span>
          <span className="text-xs text-gray-500">{formatValue(max)}</span>
        </div>
      </div>
    </div>
  );
};

export default TouchOptimizedSlider;
