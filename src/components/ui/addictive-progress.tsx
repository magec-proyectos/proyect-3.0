
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface AddictiveProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  psychology?: 'reward' | 'achievement' | 'urgency' | 'success' | 'energy'
  showParticles?: boolean
  glowIntensity?: 'low' | 'medium' | 'high'
  milestone?: number
}

const psychologyStyles = {
  reward: {
    background: 'bg-dark-lighter',
    indicator: 'progress-bar-addictive',
    glow: 'shadow-[0_0_20px_rgba(255,193,7,0.4)]'
  },
  achievement: {
    background: 'bg-dark-lighter',
    indicator: 'gradient-achievement',
    glow: 'shadow-[0_0_20px_rgba(156,39,176,0.4)]'
  },
  urgency: {
    background: 'bg-dark-lighter',
    indicator: 'gradient-excitement animate-urgency-throb',
    glow: 'shadow-[0_0_20px_rgba(255,67,54,0.4)]'
  },
  success: {
    background: 'bg-dark-lighter',
    indicator: 'gradient-success',
    glow: 'shadow-[0_0_20px_rgba(76,175,80,0.4)]'
  },
  energy: {
    background: 'bg-dark-lighter',
    indicator: 'bg-energy animate-pulse-soft',
    glow: 'shadow-[0_0_20px_rgba(255,152,0,0.4)]'
  }
}

const AddictiveProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  AddictiveProgressProps
>(({ 
  className, 
  value = 0, 
  psychology = 'reward',
  showParticles = false,
  glowIntensity = 'medium',
  milestone,
  ...props 
}, ref) => {
  const [showMilestone, setShowMilestone] = React.useState(false)
  const styles = psychologyStyles[psychology]
  
  React.useEffect(() => {
    if (milestone && value >= milestone) {
      setShowMilestone(true)
      const timer = setTimeout(() => setShowMilestone(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [value, milestone])

  const getGlowIntensity = () => {
    switch (glowIntensity) {
      case 'low': return 'opacity-30'
      case 'high': return 'opacity-80'
      default: return 'opacity-50'
    }
  }

  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full",
          styles.background,
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all duration-500 ease-out",
            styles.indicator,
            styles.glow,
            getGlowIntensity()
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
        
        {/* Milestone marker */}
        {milestone && (
          <div 
            className="absolute top-0 h-full w-0.5 bg-white/60"
            style={{ left: `${milestone}%` }}
          />
        )}
        
        {/* Animated particles for special moments */}
        {showParticles && value > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-reward rounded-full"
                style={{
                  top: '50%',
                  left: `${value}%`,
                }}
                initial={{ scale: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  y: [-10, -20, -30],
                  x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            ))}
          </div>
        )}
        
        {/* Milestone celebration */}
        {showMilestone && (
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.div
              className="text-reward font-bold text-xs"
              animate={{
                y: [-5, -15, -5],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.5 }}
            >
              🎉 Milestone!
            </motion.div>
          </motion.div>
        )}
      </ProgressPrimitive.Root>
      
      {/* Progress percentage with psychological coloring */}
      <div className="flex justify-between items-center mt-1 text-xs">
        <span className="text-gray-400">Progress</span>
        <span className={cn(
          "font-medium transition-colors",
          value >= 100 ? "text-success" : 
          value >= 75 ? "text-energy" :
          value >= 50 ? "text-reward" :
          value >= 25 ? "text-focus" : "text-gray-400"
        )}>
          {Math.round(value)}%
        </span>
      </div>
    </div>
  )
})

AddictiveProgress.displayName = "AddictiveProgress"

export { AddictiveProgress }
