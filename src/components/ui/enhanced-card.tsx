import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'elevated';
  hover?: 'none' | 'lift' | 'glow' | 'scale';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

const EnhancedCard = ({ 
  children, 
  className, 
  variant = 'default',
  hover = 'lift',
  title,
  description,
  icon,
  actions
}: EnhancedCardProps) => {
  const variantClasses = {
    default: 'bg-card border-border',
    glass: 'bg-card/80 backdrop-blur-sm border-border/50',
    gradient: 'bg-gradient-to-br from-card to-card/50 border-border',
    elevated: 'bg-card border-border shadow-lg'
  };

  const hoverClasses = {
    none: '',
    lift: 'hover:shadow-lg hover:-translate-y-1',
    glow: 'hover:shadow-2xl hover:shadow-primary/20',
    scale: 'hover:scale-[1.02]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        'transition-all duration-300',
        variantClasses[variant],
        hoverClasses[hover],
        className
      )}>
        {(title || description || icon || actions) && (
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              {icon}
              <div>
                {title && <CardTitle className="text-xl font-semibold">{title}</CardTitle>}
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
              </div>
            </div>
            {actions}
          </CardHeader>
        )}
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedCard;