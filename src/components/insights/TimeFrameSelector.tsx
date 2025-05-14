
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimeFrameSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({ value, onValueChange }) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] bg-dark-lighter border-dark-border">
        <SelectValue placeholder="Time Period" />
      </SelectTrigger>
      <SelectContent className="bg-dark-lighter border-dark-border">
        <SelectItem value="last-month">Last Month</SelectItem>
        <SelectItem value="last-3-months">Last 3 Months</SelectItem>
        <SelectItem value="last-6-months">Last 6 Months</SelectItem>
        <SelectItem value="year-to-date">Year to Date</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TimeFrameSelector;
