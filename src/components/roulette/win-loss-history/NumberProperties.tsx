
import React from 'react';
import { HistoryDataItem } from './types';

type NumberPropertiesProps = {
  historyData: HistoryDataItem[];
}

const NumberProperties: React.FC<NumberPropertiesProps> = ({ historyData }) => {
  return (
    <div className="bg-black/20 rounded p-3">
      <div className="text-amber-200/80 mb-1">Number Properties</div>
      <div className="text-amber-200/90">
        Odd: {historyData.filter(data => data.isOdd).length}
      </div>
      <div className="text-amber-200/90">
        Even: {historyData.filter(data => data.isEven).length}
      </div>
      <div className="text-amber-200/90">
        Low (1-18): {historyData.filter(data => data.isLow).length}
      </div>
      <div className="text-amber-200/90">
        High (19-36): {historyData.filter(data => data.isHigh).length}
      </div>
    </div>
  );
};

export default NumberProperties;
