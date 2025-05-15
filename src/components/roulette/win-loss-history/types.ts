
export interface HistoryDataItem {
  spin: number;
  number: number;
  color: 'red' | 'black' | 'green';
  isOdd: boolean;
  isEven: boolean;
  isLow: boolean;
  isHigh: boolean;
  isZero: boolean;
}

export interface RollingStatsItem {
  spin: number;
  redPercentage: number;
  blackPercentage: number;
  oddPercentage: number;
  evenPercentage: number;
}

export interface ColorDistributionItem {
  name: string;
  value: number;
}

export interface Streak {
  type: string;
  count: number;
}
