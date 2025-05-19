
import { useState, useEffect, useCallback } from 'react';

interface UseChartDataPointProps {
  activeData: any[];
  animateChart: boolean;
}

export const useChartDataPoint = ({ activeData, animateChart }: UseChartDataPointProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animatingDataPoint, setAnimatingDataPoint] = useState(false);
  
  // Function to animate a random data point
  const animateRandomPoint = useCallback(() => {
    if (!activeData.length) return;
    
    const randomPoint = Math.floor(Math.random() * activeData.length);
    setAnimatingDataPoint(true);
    setHoveredPoint(randomPoint);
    
    // Stop animation after a short delay
    setTimeout(() => {
      setAnimatingDataPoint(false);
      setHoveredPoint(null);
    }, 2000);
  }, [activeData.length]);
  
  // Randomly highlight a data point every few seconds
  useEffect(() => {
    if (!animateChart) return;
    
    // Initial animation after a short delay
    const initialTimer = setTimeout(() => {
      animateRandomPoint();
    }, 2000);
    
    // Set up interval for repeated animations
    const interval = setInterval(animateRandomPoint, 6000);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [activeData.length, animateChart, animateRandomPoint]);

  return {
    hoveredPoint,
    setHoveredPoint,
    animatingDataPoint,
    setAnimatingDataPoint
  };
};
