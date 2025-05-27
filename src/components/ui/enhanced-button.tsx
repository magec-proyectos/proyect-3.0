
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const enhancedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent shadow-sm hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl",
        neon: "bg-dark-card border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black shadow-lg hover:shadow-neon-blue/50",
        sport: "bg-gradient-to-r text-white shadow-lg hover:shadow-xl transform hover:scale-105",
        glass: "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-lg",
        success: "bg-success-500 text-white hover:bg-success-600 shadow-md hover:shadow-lg",
        warning: "bg-warning-500 text-black hover:bg-warning-600 shadow-md hover:shadow-lg",
        error: "bg-error-500 text-white hover:bg-error-600 shadow-md hover:shadow-lg",
        info: "bg-info-500 text-white hover:bg-info-600 shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-11 px-6 py-3 text-sm",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-13 rounded-lg px-8 py-4 text-base font-semibold",
        xl: "h-16 rounded-xl px-10 py-5 text-lg font-bold",
        icon: "h-11 w-11",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce-soft",
        glow: "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
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
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
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
    children, 
    icon,
    iconPosition = 'left',
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <motion.div
        whileHover={{ scale: size === 'xl' ? 1.02 : 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Comp
          className={cn(enhancedButtonVariants({ variant, size, animation, className }))}
          ref={ref}
          disabled={loading || props.disabled}
          {...props}
        >
          {/* Loading overlay */}
          {loading && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}
          
          {/* Success overlay */}
          {success && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-success-500/90 rounded-lg"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
          
          {/* Content wrapper */}
          <span className="relative z-10 flex items-center gap-2">
            {icon && iconPosition === 'left' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
          </span>

          {/* Shimmer effect for glow animation */}
          {animation === 'glow' && (
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-lg" />
          )}
        </Comp>
      </motion.div>
    )
  }
)
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, enhancedButtonVariants }
