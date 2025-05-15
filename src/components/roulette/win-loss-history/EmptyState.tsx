
import React from 'react';
import { CardContent } from '@/components/ui/card';

const EmptyState: React.FC = () => {
  return (
    <CardContent className="text-center py-8">
      <p className="text-amber-200/70">No spin data available yet.</p>
      <p className="text-amber-200/50 text-sm mt-2">Place bets and spin the wheel to see history.</p>
    </CardContent>
  );
};

export default EmptyState;
