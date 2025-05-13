
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface SkeletonCardProps {
  type?: 'default' | 'stats' | 'prediction';
  height?: string;
}

const SkeletonCard = ({ type = 'default', height = 'h-[300px]' }: SkeletonCardProps) => {
  if (type === 'stats') {
    return (
      <Card className="bg-dark-card border-dark-border overflow-hidden">
        <CardHeader className="pb-2 space-y-2">
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-6 h-6 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-5 w-28" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-6 h-6 rounded-full" />
              ))}
            </div>
          </div>
          <Skeleton className={`w-full ${height}`} />
        </CardContent>
      </Card>
    );
  }

  if (type === 'prediction') {
    return (
      <Card className="bg-dark-card border-dark-border overflow-hidden">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent className="pb-0 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-12 w-24 rounded-lg" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-[180px] rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default skeleton
  return (
    <Card className="bg-dark-card border-dark-border overflow-hidden">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className={`w-full ${height}`} />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
