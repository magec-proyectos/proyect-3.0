
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const premiumButtonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-blue-500/25 hover:shadow-2xl border border-blue-500/20",
        secondary: "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg hover:shadow-emerald-500/25 hover:shadow-2xl border border-emerald-500/20",
        premium: "bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-purple-500/30 hover:shadow-2xl border border-purple-500/20 bg-size-200 hover:bg-pos-100",
        glass: "glass-button text-white shadow-lg hover:shadow-white/10",
        outline: "border-2 border-primary/30 bg-transparent text-primary hover:bg-primary/10 hover:border-primary/60 shadow-lg hover:shadow-primary/20",
        ghost: "hover:bg-accent hover:text-accent-foreground shadow-none",
        destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-red-500/25 hover:shadow-2xl border border-red-500/20",
      },
      size: {
        sm: "h-10 px-4 py-2 text-xs rounded-xl",
        default: "h-12 px-6 py-3 text-sm",
        lg: "h-14 px-8 py-4 text-base rounded-3xl",
        xl: "h-16 px-10 py-5 text-lg rounded-3xl font-bold",
        icon: "h-12 w-12 rounded-2xl",
      },
      animation: {
        none: "",
        glow: "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        shimmer: "bg-gradient-to-r from-current via-white/20 to-current bg-size-200 animate-shimmer",
        pulse: "animate-pulse-premium",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      animation: "glow",
    },
  }
)

export interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof premiumButtonVariants> {
  asChild?: boolean
  loading?: boolean
  success?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
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
    const Comp = asChild ? Slot : motion.button
    
    const buttonVariants = {
      initial: { scale: 1 },
      hover: { 
        scale: size === 'xl' ? 1.02 : 1.05,
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      },
      tap: { 
        scale: 0.95,
        y: 0,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }
    }

    return (
      <Comp
        className={cn(premiumButtonVariants({ variant, size, animation, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        variants={!asChild ? buttonVariants : undefined}
        initial={!asChild ? "initial" : undefined}
        whileHover={!asChild ? "hover" : undefined}
        whileTap={!asChild ? "tap" : undefined}
        {...props}
      >
        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Overlay de carga */}
        {loading && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 w-5 h-5 border border-current/30 rounded-full" />
            </div>
          </motion.div>
        )}
        
        {/* Overlay de éxito */}
        {success && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-emerald-500/90 rounded-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <motion.svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </motion.div>
        )}
        
        {/* Contenido del botón */}
        <span className="relative z-10 flex items-center gap-3">
          {icon && iconPosition === 'left' && (
            <motion.span 
              className="flex-shrink-0"
              animate={{ rotate: loading ? 360 : 0 }}
              transition={{ duration: 2, repeat: loading ? Infinity : 0, ease: "linear" }}
            >
              {icon}
            </motion.span>
          )}
          
          <span className="font-semibold tracking-wide">{children}</span>
          
          {icon && iconPosition === 'right' && (
            <motion.span 
              className="flex-shrink-0"
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            >
              {icon}
            </motion.span>
          )}
        </span>

        {/* Efecto de ondas al hacer clic */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ scale: 0, opacity: 0.5 }}
          whileTap={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ 
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)" 
          }}
        />
      </Comp>
    )
  }
)
PremiumButton.displayName = "PremiumButton"

export { PremiumButton, premiumButtonVariants }
