
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { HoverEffect, RippleEffect } from "./advanced-micro-interactions"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-elevation-2 hover:shadow-elevation-3",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-elevation-2 hover:shadow-elevation-3",
        outline: "border-2 border-input glass-button hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-elevation-1 hover:shadow-elevation-2",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline shadow-none",
        gradient: "bg-gradient-brand text-primary-foreground shadow-glass hover:shadow-glass-lg interactive-lift",
        neon: "glass-button border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-glow-blue",
        glass: "glass-card text-foreground hover:shadow-glass-lg interactive-lift",
        success: "bg-success-500 text-white hover:bg-success-600 shadow-elevation-2 hover:shadow-elevation-3",
        warning: "bg-warning-500 text-black hover:bg-warning-600 shadow-elevation-2 hover:shadow-elevation-3",
        error: "bg-error-500 text-white hover:bg-error-600 shadow-elevation-2 hover:shadow-elevation-3",
        info: "bg-info-500 text-white hover:bg-info-600 shadow-elevation-2 hover:shadow-elevation-3",
        modern: "btn-modern interactive-scale",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base font-semibold",
        xl: "h-14 rounded-xl px-10 text-lg font-bold",
        icon: "h-10 w-10",
      },
      microInteraction: {
        none: "",
        lift: "",
        glow: "",
        tilt: "",
        shimmer: "",
        ripple: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      microInteraction: "lift"
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, microInteraction = "lift", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    // Separate drag-related props that conflict with Framer Motion
    const {
      onDrag,
      onDragEnd,
      onDragEnter,
      onDragExit,
      onDragLeave,
      onDragOver,
      onDragStart,
      onDrop,
      draggable,
      ...safeProps
    } = props

    const buttonContent = (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...safeProps}
      >
        {children}
      </motion.button>
    )

    if (microInteraction === "none") {
      return buttonContent
    }

    if (microInteraction === "ripple") {
      return (
        <RippleEffect>
          <HoverEffect variant="lift" intensity="subtle">
            {buttonContent}
          </HoverEffect>
        </RippleEffect>
      )
    }

    return (
      <HoverEffect variant={microInteraction || "lift"} intensity="moderate">
        {buttonContent}
      </HoverEffect>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
