
import { useState, useEffect, useCallback } from 'react';

interface UseChartDataPointProps {
  activeData: any[];
  animateChart: boolean;
}

export const useChartDataPoint = ({ activeData, animateChart }: UseChartDataPointProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animatingDataPoint, setAnimatingDataPoint] = useState(false);
  const [animationPaused, setAnimationPaused] = useState(false);
  
  // Handle user interaction with chart
  const handlePointHover = useCallback((point: number | null) => {
    if (point !== null) {
      setAnimationPaused(true); // Pause automatic animations when user interacts
    }
    setHoveredPoint(point);
  }, []);
  
  // Resume animations after user stops interacting
  useEffect(() => {
    if (hoveredPoint !== null) {
      const timer = setTimeout(() => {
        setAnimationPaused(false);
      }, 5000); // Resume after 5 seconds of inactivity
      
      return () => clearTimeout(timer);
    }
  }, [hoveredPoint]);
  
  // Randomly highlight a data point every few seconds
  useEffect(() => {
    if (!animateChart || animationPaused) return;
    
    const interval = setInterval(() => {
      // Skip animation if user is currently interacting
      if (animationPaused) return;
      
      // Find an interesting point to highlight (with largest difference or change)
      let pointToHighlight: number | null = null;
      
      if (activeData.length > 1) {
        // Find point with largest difference between with/without Bet3
        let maxDiff = -1;
        let maxDiffIndex = -1;
        
        for (let i = 0; i < activeData.length; i++) {
          const diff = Math.abs(activeData[i].withBet3 - activeData[i].withoutBet3);
          if (diff > maxDiff) {
            maxDiff = diff;
            maxDiffIndex = i;
          }
        }
        
        // Alternate between random points and significant points
        if (Math.random() > 0.5 && maxDiffIndex !== -1) {
          pointToHighlight = maxDiffIndex;
        } else {
          pointToHighlight = Math.floor(Math.random() * activeData.length);
        }
      } else if (activeData.length === 1) {
        pointToHighlight = 0;
      }
      
      if (pointToHighlight !== null) {
        setAnimatingDataPoint(true);
        setHoveredPoint(pointToHighlight);
        
        setTimeout(() => {
          setAnimatingDataPoint(false);
          setHoveredPoint(null);
        }, 2500); // Display for longer
      }
    }, 8000); // Increased interval for less frequent animations
    
    return () => clearInterval(interval);
  }, [activeData, animateChart, animationPaused]);

  return {
    hoveredPoint,
    setHoveredPoint: handlePointHover,
    animatingDataPoint,
    setAnimatingDataPoint,
    animationPaused,
    setAnimationPaused
  };
};
