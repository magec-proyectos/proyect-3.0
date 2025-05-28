
import React from 'react';
import { FeedbackWrapper } from '@/components/ui/feedback-wrapper';
import { OnboardingTooltip, useOnboarding } from '@/components/ui/tooltip-enhanced';

interface EnhancedPageWrapperProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbItems?: Array<{ label: string; href?: string; icon?: React.ReactNode }>;
  onboardingSteps?: Array<{
    id: string;
    title: string;
    content: string;
    target: string;
    position: 'top' | 'right' | 'bottom' | 'left';
    icon?: React.ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
  }>;
  onboardingKey?: string;
  className?: string;
}

export const EnhancedPageWrapper: React.FC<EnhancedPageWrapperProps> = ({
  children,
  showBreadcrumbs = true,
  breadcrumbItems,
  onboardingSteps,
  onboardingKey,
  className
}) => {
  const onboarding = useOnboarding(onboardingKey || 'default');

  return (
    <FeedbackWrapper
      showBreadcrumbs={showBreadcrumbs}
      breadcrumbItems={breadcrumbItems}
      className={className}
    >
      <>
        {children}
        {onboardingSteps && !onboarding.isCompleted && (
          <OnboardingTooltip
            steps={onboardingSteps}
            isActive={!onboarding.isCompleted}
            onComplete={onboarding.markCompleted}
            onSkip={onboarding.markCompleted}
          />
        )}
      </>
    </FeedbackWrapper>
  );
};

export default EnhancedPageWrapper;
