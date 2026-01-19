import type React from "react"
import { cn } from "@/lib/utils"

interface TextProps {
  variant?: "default" | "secondary" | "muted"
  size?: "sm" | "base" | "lg"
  children: React.ReactNode
  className?: string
}

export function Text({ variant = "default", size = "base", children, className }: TextProps) {
  const variants = {
    default: "text-foreground font-normal",
    secondary: "text-foreground-secondary font-normal",
    muted: "text-foreground-muted font-light",
  }

  const sizes = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  }

  return <p className={cn(variants[variant], sizes[size], "leading-relaxed", className)}>{children}</p>
}
