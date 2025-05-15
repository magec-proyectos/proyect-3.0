
export type HistoryDataItem = {
  spin: number;
  number: number;
  color: 'red' | 'black' | 'green';
  isOdd: boolean;
  isEven: boolean;
  isLow: boolean;
  isHigh: boolean;
  isZero: boolean;
};

export type HistoryTabType = 'numbers' | 'distributions' | 'trends';
