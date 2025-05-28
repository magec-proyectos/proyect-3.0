
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface PremiumCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onTransitionEnd' | 'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' | 'onDrop' | 'draggable'> {
  tier?: 'premium' | 'vip' | 'elite'
  glowEffect?: boolean
}

const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, tier = 'premium', glowEffect = true, children, ...props }, ref) => {
    const tierStyles = {
      premium: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 dark:from-amber-950/20 dark:to-yellow-950/20 dark:border-amber-800",
      vip: "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 dark:from-purple-950/20 dark:to-indigo-950/20 dark:border-purple-800",
      elite: "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 dark:from-slate-950/20 dark:to-gray-950/20 dark:border-slate-800"
    }

    const glowStyles = {
      premium: glowEffect ? "shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/20" : "",
      vip: glowEffect ? "shadow-lg shadow-purple-500/10 hover:shadow-xl hover:shadow-purple-500/20" : "",
      elite: glowEffect ? "shadow-lg shadow-slate-500/10 hover:shadow-xl hover:shadow-slate-500/20" : ""
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-lg border p-6 transition-all duration-300",
          tierStyles[tier],
          glowStyles[tier],
          className
        )}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
PremiumCard.displayName = "PremiumCard"

export { PremiumCard }
