
import React, { ReactNode } from 'react';

interface ChartContentWrapperProps {
  children: ReactNode;
}

/**
 * This wrapper component fixes the TypeScript issue with the ChartContainer
 * by ensuring we pass a single React element as children instead of an array.
 */
const ChartContentWrapper: React.FC<ChartContentWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

export default ChartContentWrapper;
