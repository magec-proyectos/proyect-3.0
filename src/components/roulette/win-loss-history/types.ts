
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

export type RollingStatsItem = {
  spin: number;
  redPercentage: number;
  blackPercentage: number;
  oddPercentage: number;
  evenPercentage: number;
};

export type ColorDistributionItem = {
  name: string;
  value: number;
};

export type Streak = {
  type: string;
  count: number;
};
