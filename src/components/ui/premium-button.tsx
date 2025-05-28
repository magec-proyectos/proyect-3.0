
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const premiumButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        premium: "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black font-semibold shadow-lg hover:shadow-xl hover:shadow-amber-500/25",
        vip: "bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25",
        elite: "bg-gradient-to-r from-slate-800 via-slate-700 to-black text-white font-semibold shadow-lg hover:shadow-xl border border-slate-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "premium",
      size: "default",
    },
  }
)

export interface PremiumButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onTransitionEnd' | 'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' | 'onDrop' | 'draggable'>,
    VariantProps<typeof premiumButtonVariants> {
  asChild?: boolean
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : motion.button

    if (asChild) {
      return (
        <Slot
          className={cn(premiumButtonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <motion.button
        className={cn(premiumButtonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      </motion.button>
    )
  }
)
PremiumButton.displayName = "PremiumButton"

export { PremiumButton, premiumButtonVariants }
