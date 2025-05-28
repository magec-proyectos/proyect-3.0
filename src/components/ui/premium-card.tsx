
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'neon'
  hover?: boolean
  clickable?: boolean
  children: React.ReactNode
}

const cardVariants = {
  default: "premium-card",
  glass: "glass-card",
  gradient: "bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-emerald-600/10 border border-white/20 backdrop-blur-lg",
  elevated: "bg-card border border-border shadow-2xl",
  neon: "bg-card/50 border border-blue-500/30 shadow-lg shadow-blue-500/20 backdrop-blur-lg"
}

const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, variant = 'default', hover = true, clickable = false, children, ...props }, ref) => {
    const cardVariant = {
      initial: { scale: 1, y: 0 },
      hover: hover ? { 
        scale: 1.02, 
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      } : {},
      tap: clickable ? { scale: 0.98 } : {}
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          cardVariants[variant],
          "rounded-3xl p-6 transition-all duration-300",
          clickable && "cursor-pointer",
          className
        )}
        variants={cardVariant}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {/* Efecto de brillo superior */}
        {variant === 'glass' && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        )}
        
        {/* Contenido */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Efecto de ondas de fondo */}
        {variant === 'neon' && (
          <div className="absolute inset-0 rounded-3xl">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-xl animate-pulse-premium" />
            <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-xl animate-pulse-premium" style={{ animationDelay: '1s' }} />
          </div>
        )}
      </motion.div>
    )
  }
)
PremiumCard.displayName = "PremiumCard"

// Componente de estadística premium
interface PremiumStatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: 'blue' | 'emerald' | 'purple' | 'amber' | 'red'
}

const PremiumStatCard: React.FC<PremiumStatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'from-blue-600/20 to-blue-400/20 border-blue-500/30 text-blue-400',
    emerald: 'from-emerald-600/20 to-emerald-400/20 border-emerald-500/30 text-emerald-400',
    purple: 'from-purple-600/20 to-purple-400/20 border-purple-500/30 text-purple-400',
    amber: 'from-amber-600/20 to-amber-400/20 border-amber-500/30 text-amber-400',
    red: 'from-red-600/20 to-red-400/20 border-red-500/30 text-red-400'
  }

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→'
  }

  return (
    <PremiumCard 
      variant="glass" 
      className={cn(
        "bg-gradient-to-br",
        colorClasses[color].split(' ').slice(0, 2).join(' '),
        "border",
        colorClasses[color].split(' ')[2]
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={cn(
              "p-2 rounded-xl bg-white/10 backdrop-blur-sm",
              colorClasses[color].split(' ')[3]
            )}>
              {icon}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-white/70">{title}</p>
          </div>
        </div>
        
        {trend && trendValue && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold",
            trend === 'up' && "bg-emerald-500/20 text-emerald-400",
            trend === 'down' && "bg-red-500/20 text-red-400",
            trend === 'neutral' && "bg-gray-500/20 text-gray-400"
          )}>
            <span>{trendIcons[trend]}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <motion.div 
          className="text-3xl font-bold text-white"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        >
          {value}
        </motion.div>
        
        {description && (
          <p className="text-sm text-white/60">{description}</p>
        )}
      </div>
    </PremiumCard>
  )
}

export { PremiumCard, PremiumStatCard }
