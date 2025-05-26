
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const addictiveButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        // Psychological trigger variants
        reward: "reward-button text-black font-bold shadow-lg",
        achievement: "achievement-badge text-white font-bold",
        success: "success-feedback text-white font-medium",
        urgency: "urgency-indicator text-white font-bold animate-urgency-throb",
        excitement: "gradient-excitement text-white font-bold hover:scale-105",
        mystery: "bg-mystery text-white font-medium hover:bg-mystery/90",
        focus: "bg-focus text-white font-medium hover:bg-focus/90",
        
        // Enhanced original variants
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/25",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent engagement-card",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-lg hover:shadow-secondary/25",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      psychology: {
        none: "",
        dopamine: "animate-dopamine-pulse",
        shimmer: "reward-shimmer",
        burst: "achievement-burst",
        fomo: "animate-fomo-pulse",
        scarcity: "animate-scarcity-blink",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      psychology: "none",
    },
  }
)

export interface AddictiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof addictiveButtonVariants> {
  asChild?: boolean
  loading?: boolean
  success?: boolean
  triggerBurst?: boolean
}

const AddictiveButton = React.forwardRef<HTMLButtonElement, AddictiveButtonProps>(
  ({ className, variant, size, psychology, asChild = false, loading, success, triggerBurst, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const [showBurst, setShowBurst] = React.useState(false)
    
    React.useEffect(() => {
      if (triggerBurst) {
        setShowBurst(true)
        const timer = setTimeout(() => setShowBurst(false), 600)
        return () => clearTimeout(timer)
      }
    }, [triggerBurst])
    
    return (
      <motion.div
        whileHover={{ scale: variant === 'urgency' ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Comp
          className={cn(addictiveButtonVariants({ variant, size, psychology, className }))}
          ref={ref}
          disabled={loading}
          {...props}
        >
          {/* Reward shimmer effect */}
          {(variant === 'reward' || psychology === 'shimmer') && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-reward-shimmer" />
          )}
          
          {/* Achievement burst effect */}
          {(showBurst || psychology === 'burst') && (
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
                    x: Math.cos(i * 45 * Math.PI / 180) * 30,
                    y: Math.sin(i * 45 * Math.PI / 180) * 30,
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
          
          {/* Loading state with dopamine colors */}
          {loading && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-background/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-4 h-4 border-2 border-reward border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}
          
          {/* Success state with achievement colors */}
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
          
          {/* FOMO indicator */}
          {psychology === 'fomo' && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-urgency rounded-full animate-fomo-pulse" />
          )}
          
          {/* Scarcity indicator */}
          {psychology === 'scarcity' && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-urgency rounded-full animate-scarcity-blink" />
          )}
          
          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
        </Comp>
      </motion.div>
    )
  }
)
AddictiveButton.displayName = "AddictiveButton"

export { AddictiveButton, addictiveButtonVariants }
