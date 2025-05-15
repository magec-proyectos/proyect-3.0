
import React from 'react';
import { HistoryDataItem } from './types';
import ColorDistribution from './ColorDistribution';
import NumberProperties from './NumberProperties';

type NumbersTabProps = {
  historyData: HistoryDataItem[];
  colorDistribution: Array<{name: string; value: number}>;
}

const NumbersTab: React.FC<NumbersTabProps> = ({ historyData, colorDistribution }) => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 p-2">
        {historyData.map((result, idx) => (
          <div 
            key={idx} 
            className={`relative w-10 h-10 ${
              result.color === 'red' ? 'bg-red-600' : 
              result.color === 'black' ? 'bg-black' : 
              'bg-green-600'
            } rounded-full flex items-center justify-center text-white border border-white/20`}
          >
            {result.number}
            <span className="absolute -bottom-5 text-xs text-amber-200/60">#{result.spin}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <ColorDistribution colorDistribution={colorDistribution} />
        <NumberProperties historyData={historyData} />
      </div>
    </>
  );
};

export default NumbersTab;
