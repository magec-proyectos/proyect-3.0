
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const MatchSelectionSkeleton = () => {
  return (
    <Card className="bg-dark-card border-dark-border mb-8">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </CardContent>
    </Card>
  );
};

export const BetBuilderSkeleton = () => {
  return (
    <div className="bg-dark-lighter p-6 rounded-xl border border-dark-border">
      <Skeleton className="h-6 w-40 mb-4" />
      <Skeleton className="h-5 w-full mb-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-dark p-4 rounded-lg border border-dark-border">
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-6 w-32 mb-2" />
            <div className="flex items-center justify-between mt-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-dark-card p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );
};
