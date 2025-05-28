
import React from 'react';
import { cn } from '@/lib/utils';

// Enhanced spacing system with consistent values
export const SPACING = {
  none: '0',
  xxs: '0.125rem', // 2px
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem',   // 32px
  '4xl': '2.5rem', // 40px
  '5xl': '3rem',   // 48px
  '6xl': '4rem',   // 64px
  '7xl': '5rem',   // 80px
  '8xl': '6rem',   // 96px
} as const;

type SpacingValue = keyof typeof SPACING;

interface SpacingProps {
  children: React.ReactNode;
  className?: string;
  p?: SpacingValue; // padding
  px?: SpacingValue; // padding horizontal
  py?: SpacingValue; // padding vertical
  pt?: SpacingValue; // padding top
  pr?: SpacingValue; // padding right
  pb?: SpacingValue; // padding bottom
  pl?: SpacingValue; // padding left
  m?: SpacingValue; // margin
  mx?: SpacingValue; // margin horizontal
  my?: SpacingValue; // margin vertical
  mt?: SpacingValue; // margin top
  mr?: SpacingValue; // margin right
  mb?: SpacingValue; // margin bottom
  ml?: SpacingValue; // margin left
  gap?: SpacingValue; // gap for flex/grid
  as?: keyof JSX.IntrinsicElements;
}

export const Spacing: React.FC<SpacingProps> = ({
  children,
  className,
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  gap,
  as: Component = 'div',
  ...props
}) => {
  const spacingClasses = cn(
    // Padding
    p && `p-[${SPACING[p]}]`,
    px && `px-[${SPACING[px]}]`,
    py && `py-[${SPACING[py]}]`,
    pt && `pt-[${SPACING[pt]}]`,
    pr && `pr-[${SPACING[pr]}]`,
    pb && `pb-[${SPACING[pb]}]`,
    pl && `pl-[${SPACING[pl]}]`,
    
    // Margin
    m && `m-[${SPACING[m]}]`,
    mx && `mx-[${SPACING[mx]}]`,
    my && `my-[${SPACING[my]}]`,
    mt && `mt-[${SPACING[mt]}]`,
    mr && `mr-[${SPACING[mr]}]`,
    mb && `mb-[${SPACING[mb]}]`,
    ml && `ml-[${SPACING[ml]}]`,
    
    // Gap
    gap && `gap-[${SPACING[gap]}]`,
    
    className
  );

  return (
    <Component className={spacingClasses} {...props}>
      {children}
    </Component>
  );
};

// Stack component for consistent vertical spacing
interface StackProps {
  children: React.ReactNode;
  gap?: SpacingValue;
  className?: string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

export const Stack: React.FC<StackProps> = ({
  children,
  gap = 'md',
  className,
  align = 'stretch',
  justify = 'start'
}) => {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  return (
    <div 
      className={cn(
        'flex flex-col',
        `gap-[${SPACING[gap]}]`,
        alignClasses[align],
        justifyClasses[justify],
        className
      )}
    >
      {children}
    </div>
  );
};

// Inline component for consistent horizontal spacing
interface InlineProps {
  children: React.ReactNode;
  gap?: SpacingValue;
  className?: string;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

export const Inline: React.FC<InlineProps> = ({
  children,
  gap = 'md',
  className,
  align = 'center',
  justify = 'start',
  wrap = false
}) => {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
    stretch: 'items-stretch'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  return (
    <div 
      className={cn(
        'flex',
        `gap-[${SPACING[gap]}]`,
        alignClasses[align],
        justifyClasses[justify],
        wrap && 'flex-wrap',
        className
      )}
    >
      {children}
    </div>
  );
};

export default { Spacing, Stack, Inline, SPACING };
