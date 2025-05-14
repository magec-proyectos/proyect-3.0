
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ChartTypeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({ value, onValueChange }) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] bg-dark-lighter border-dark-border">
        <SelectValue placeholder="Chart Type" />
      </SelectTrigger>
      <SelectContent className="bg-dark-lighter border-dark-border">
        <SelectItem value="line">Line Chart</SelectItem>
        <SelectItem value="area">Area Chart</SelectItem>
        <SelectItem value="bar">Bar Chart</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ChartTypeSelector;
