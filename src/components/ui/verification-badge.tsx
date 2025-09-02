import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Target, CheckCircle, Shield } from 'lucide-react';

interface VerificationBadgeProps {
  tier: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showText?: boolean;
  className?: string;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  tier,
  size = 'md',
  showIcon = true,
  showText = true,
  className = ''
}) => {
  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'legend':
        return {
          icon: Crown,
          name: 'Leyenda',
          color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
          textColor: 'text-white',
          iconColor: 'text-yellow-200'
        };
      case 'expert':
        return {
          icon: Target,
          name: 'Experto',
          color: 'bg-gradient-to-r from-purple-500 to-pink-500',
          textColor: 'text-white',
          iconColor: 'text-purple-200'
        };
      case 'verified':
        return {
          icon: CheckCircle,
          name: 'Verificado',
          color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
          textColor: 'text-white',
          iconColor: 'text-blue-200'
        };
      default:
        return null;
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-1';
      case 'lg':
        return 'text-sm px-3 py-2';
      default:
        return 'text-xs px-2.5 py-1.5';
    }
  };

  const getIconSize = (size: string) => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-5 h-5';
      default:
        return 'w-4 h-4';
    }
  };

  const tierInfo = getTierInfo(tier);

  if (!tierInfo || tier === 'none') {
    return null;
  }

  const IconComponent = tierInfo.icon;

  return (
    <Badge 
      className={`
        ${tierInfo.color} 
        ${tierInfo.textColor} 
        ${getSizeClasses(size)}
        border-0 font-medium
        ${className}
      `}
    >
      {showIcon && (
        <IconComponent className={`${getIconSize(size)} ${showText ? 'mr-1' : ''} ${tierInfo.iconColor}`} />
      )}
      {showText && tierInfo.name}
    </Badge>
  );
};

export default VerificationBadge;