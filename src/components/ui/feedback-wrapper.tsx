
import React from 'react';
import { VisualFeedback, useVisualFeedback } from './visual-feedback';
import { EnhancedBreadcrumb } from './breadcrumb-enhanced';
import { cn } from '@/lib/utils';

interface FeedbackWrapperProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbItems?: Array<{ label: string; href?: string; icon?: React.ReactNode }>;
  className?: string;
  contentClassName?: string;
}

export const FeedbackWrapper: React.FC<FeedbackWrapperProps> = ({
  children,
  showBreadcrumbs = true,
  breadcrumbItems,
  className,
  contentClassName
}) => {
  const feedback = useVisualFeedback();

  const enhancedChildren = React.cloneElement(children as React.ReactElement, {
    showSuccess: feedback.showSuccess,
    showError: feedback.showError,
    showWarning: feedback.showWarning,
    showInfo: feedback.showInfo,
    showLoading: feedback.showLoading,
    hideFeedback: feedback.hide
  });

  return (
    <VisualFeedback 
      className={cn("min-h-screen", className)}
      onFeedbackChange={(state) => feedback.setFeedbackRef}
    >
      <div className={cn("container mx-auto px-4 py-6", contentClassName)}>
        {showBreadcrumbs && (
          <EnhancedBreadcrumb items={breadcrumbItems} />
        )}
        {enhancedChildren}
      </div>
    </VisualFeedback>
  );
};

export default FeedbackWrapper;
