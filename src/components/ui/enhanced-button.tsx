
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const enhancedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/25",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent engagement-card",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-lg hover:shadow-secondary/25",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-soft-blue to-soft-cyan text-white hover:from-soft-blue/90 hover:to-soft-cyan/90 hover:shadow-lg hover:shadow-soft-blue/25",
        success: "bg-gradient-to-r from-soft-green to-soft-lime text-white hover:from-soft-green/90 hover:to-soft-lime/90 hover:shadow-lg hover:shadow-soft-green/25",
        
        // New addictive variants
        reward: "reward-button text-black font-bold shadow-lg",
        achievement: "achievement-badge text-white font-bold",
        excitement: "gradient-excitement text-white font-bold hover:scale-105",
        urgency: "urgency-indicator text-white font-bold animate-urgency-throb",
        mystery: "bg-mystery text-white font-medium hover:bg-mystery/90 shadow-lg",
        focus: "bg-focus text-white font-medium hover:bg-focus/90 shadow-lg",
        energy: "bg-energy text-black font-bold hover:bg-energy/90 shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        pulse: "animate-pulse-soft",
        bounce: "animate-bounce-soft",
        glow: "animate-glow-soft",
        dopamine: "animate-dopamine-pulse",
        shimmer: "reward-shimmer",
        fomo: "animate-fomo-pulse",
        scarcity: "animate-scarcity-blink",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean
  loading?: boolean
  success?: boolean
  triggerEffect?: 'burst' | 'shake' | 'confetti'
  urgencyTimer?: number
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    animation, 
    asChild = false, 
    loading, 
    success, 
    triggerEffect,
    urgencyTimer,
    children, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const [showEffect, setShowEffect] = React.useState(false)
    const [timeLeft, setTimeLeft] = React.useState(urgencyTimer)
    
    // Handle timer for urgency variant
    React.useEffect(() => {
      if (urgencyTimer && timeLeft && timeLeft > 0) {
        const interval = setInterval(() => {
          setTimeLeft(prev => {
            if (prev && prev <= 1) {
              clearInterval(interval)
              return 0
            }
            return prev ? prev - 1 : 0
          })
        }, 1000)
        
        return () => clearInterval(interval)
      }
    }, [urgencyTimer, timeLeft])
    
    // Handle trigger effects
    React.useEffect(() => {
      if (triggerEffect) {
        setShowEffect(true)
        const timer = setTimeout(() => setShowEffect(false), 1000)
        return () => clearTimeout(timer)
      }
    }, [triggerEffect])
    
    const getHoverScale = () => {
      if (variant === 'urgency' || variant === 'excitement') return 1.05
      return 1.02
    }
    
    return (
      <motion.div
        whileHover={{ scale: getHoverScale() }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Comp
          className={cn(enhancedButtonVariants({ variant, size, animation, className }))}
          ref={ref}
          disabled={loading}
          {...props}
        >
          {/* Reward shimmer effect */}
          {(variant === 'reward' || animation === 'shimmer') && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-reward-shimmer" />
          )}
          
          {/* Ripple effect background */}
          <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          
          {/* Burst effect */}
          {(showEffect && triggerEffect === 'burst') && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-reward rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos(i * 45 * Math.PI / 180) * 25,
                    y: Math.sin(i * 45 * Math.PI / 180) * 25,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Confetti effect */}
          {(showEffect && triggerEffect === 'confetti') && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "absolute w-1 h-1 rounded-full",
                    i % 4 === 0 ? 'bg-reward' :
                    i % 4 === 1 ? 'bg-success' :
                    i % 4 === 2 ? 'bg-achievement' : 'bg-energy'
                  )}
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 60,
                    y: Math.random() * -40 - 10,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.05,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Urgency timer display */}
          {variant === 'urgency' && timeLeft && timeLeft > 0 && (
            <div className="absolute -top-2 -right-2 bg-urgency text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-fomo-pulse">
              {timeLeft}
            </div>
          )}
          
          {/* FOMO indicator for mystery variant */}
          {variant === 'mystery' && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-reward rounded-full animate-scarcity-blink" />
          )}
          
          {loading && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-background/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}
          
          {success && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-success/90"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
          
          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
        </Comp>
      </motion.div>
    )
  }
)
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, enhancedButtonVariants }
