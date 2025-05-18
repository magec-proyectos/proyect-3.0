
import { useState, useEffect } from 'react';

interface UseChartDataPointProps {
  activeData: any[];
  animateChart: boolean;
}

export const useChartDataPoint = ({ activeData, animateChart }: UseChartDataPointProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animatingDataPoint, setAnimatingDataPoint] = useState(false);
  
  // Randomly highlight a data point every few seconds
  useEffect(() => {
    if (!animateChart) return;
    
    const interval = setInterval(() => {
      const randomPoint = Math.floor(Math.random() * activeData.length);
      setAnimatingDataPoint(true);
      setHoveredPoint(randomPoint);
      
      setTimeout(() => {
        setAnimatingDataPoint(false);
        setHoveredPoint(null);
      }, 2000);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeData.length, animateChart]);

  return {
    hoveredPoint,
    setHoveredPoint,
    animatingDataPoint,
    setAnimatingDataPoint
  };
};
