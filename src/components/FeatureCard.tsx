
import React, { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradient?: "blue" | "lime" | "mixed";
}

const FeatureCard = ({ title, description, icon, gradient = "blue" }: FeatureCardProps) => {
  const getGradientClass = () => {
    switch (gradient) {
      case "blue":
        return "from-neon-blue/20 to-neon-blue/5";
      case "lime":
        return "from-neon-lime/20 to-neon-lime/5";
      case "mixed":
        return "from-neon-blue/20 via-purple-500/10 to-neon-lime/10";
      default:
        return "from-neon-blue/20 to-neon-blue/5";
    }
  };

  const getIconClass = () => {
    switch (gradient) {
      case "blue":
        return "text-neon-blue";
      case "lime":
        return "text-neon-lime";
      case "mixed":
        return "text-neon-blue";
      default:
        return "text-neon-blue";
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getGradientClass()} p-6 rounded-xl border border-white/10`}>
      <div className={`w-12 h-12 rounded-full bg-dark/40 flex items-center justify-center mb-4 ${getIconClass()}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
