
import React from 'react';

type ColorDistributionProps = {
  colorDistribution: Array<{name: string; value: number}>;
}

const ColorDistribution: React.FC<ColorDistributionProps> = ({ colorDistribution }) => {
  return (
    <div className="bg-black/20 rounded p-3">
      <div className="text-amber-200/80 mb-1">Color Distribution</div>
      <div className="flex items-center space-x-2 mt-1">
        <div className="bg-red-600 w-3 h-3 rounded-full"></div>
        <div className="text-amber-200/90">Red: {colorDistribution[0].value}</div>
      </div>
      <div className="flex items-center space-x-2 mt-1">
        <div className="bg-black w-3 h-3 rounded-full border border-white/20"></div>
        <div className="text-amber-200/90">Black: {colorDistribution[1].value}</div>
      </div>
      <div className="flex items-center space-x-2 mt-1">
        <div className="bg-green-600 w-3 h-3 rounded-full"></div>
        <div className="text-amber-200/90">Green: {colorDistribution[2].value}</div>
      </div>
    </div>
  );
};

export default ColorDistribution;
