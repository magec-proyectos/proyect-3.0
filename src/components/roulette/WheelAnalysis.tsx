
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WheelAnalysisProps {
  imageData: string | null;
  onClearAnalysis: () => void;
}

const WheelAnalysis: React.FC<WheelAnalysisProps> = ({ imageData, onClearAnalysis }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [recentNumbers, setRecentNumbers] = useState<number[]>([]);
  const [recommendation, setRecommendation] = useState<string>('');
  
  useEffect(() => {
    if (imageData) {
      analyzeWheel();
    }
  }, [imageData]);

  const analyzeWheel = () => {
    // Simulate wheel analysis process
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Mock progress updates
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Simulate detected numbers and generate recommendation
            const detectedNumbers = generateMockDetectedNumbers();
            setRecentNumbers(detectedNumbers);
            setRecommendation(generateMockRecommendation(detectedNumbers));
            setAnalysisComplete(true);
            setIsAnalyzing(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 600);
  };
  
  // Generate mock data for the demo
  const generateMockDetectedNumbers = (): number[] => {
    // In a real implementation, this would use computer vision to detect recent numbers
    return [
      Math.floor(Math.random() * 37), // 0-36
      Math.floor(Math.random() * 37),
      Math.floor(Math.random() * 37),
      Math.floor(Math.random() * 37),
      Math.floor(Math.random() * 37)
    ];
  };
  
  const generateMockRecommendation = (numbers: number[]): string => {
    // In a real implementation, this would analyze patterns and provide strategic advice
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    const redCount = numbers.filter(n => redNumbers.includes(n)).length;
    const blackCount = numbers.filter(n => n > 0 && !redNumbers.includes(n)).length;
    const zeroCount = numbers.filter(n => n === 0).length;
    
    if (redCount > blackCount + 1) {
      return "Red numbers are appearing frequently. Consider betting on Black for regression to the mean.";
    } else if (blackCount > redCount + 1) {
      return "Black numbers are appearing frequently. Consider betting on Red for regression to the mean.";
    } else if (zeroCount > 0) {
      return "Zero has appeared recently. Consider neighbor bets around zero.";
    } else {
      const oddCount = numbers.filter(n => n > 0 && n % 2 === 1).length;
      const evenCount = numbers.filter(n => n > 0 && n % 2 === 0).length;
      
      if (oddCount > evenCount) {
        return "Odd numbers are trending. Consider betting on Even for balance.";
      } else {
        return "Even numbers are trending. Consider betting on Odd for balance.";
      }
    }
  };
  
  const getNumberColor = (num: number): string => {
    if (num === 0) return "bg-green-600 border-green-400/30";
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? "bg-red-600 border-red-400/30" : "bg-black border-gray-600/30";
  };
  
  if (!imageData && !analysisComplete) {
    return null;
  }

  return (
    <Card className="bg-dark-card border-amber-500/30 shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-amber-200 flex items-center">
          <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
          Wheel Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAnalyzing ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-1 text-sm">
              <span className="text-amber-200">Analyzing image...</span>
              <span className="text-amber-400">{Math.round(analysisProgress)}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2 bg-amber-950" />
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
            </div>
            <p className="text-xs text-amber-200/70 text-center">
              Detecting wheel numbers and analyzing patterns...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-black/30 p-3 rounded-lg border border-amber-500/10">
              <div className="text-sm text-amber-200 mb-2">Detected Recent Numbers</div>
              <div className="flex justify-center gap-2">
                {recentNumbers.map((num, i) => (
                  <div 
                    key={i} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold border shadow-md ${getNumberColor(num)}`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-500/20">
              <div className="text-amber-200 font-medium mb-2 flex items-center">
                <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                AI Recommendation
              </div>
              <p className="text-sm text-amber-100">{recommendation}</p>
            </div>
            
            <div className="bg-black/20 p-3 rounded-lg text-xs text-amber-200/80 flex items-start">
              <AlertCircle size={16} className="mr-2 flex-shrink-0 mt-0.5 text-amber-400/80" />
              <p>
                This analysis is based on visual detection and statistical trends. 
                Remember that each spin is independent and past results do not 
                guarantee future outcomes.
              </p>
            </div>
            
            <Button 
              onClick={onClearAnalysis}
              variant="outline" 
              className="w-full bg-black/40 border-amber-500/30 text-amber-200 hover:bg-black/60"
            >
              Clear Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WheelAnalysis;
