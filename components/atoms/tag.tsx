import { cn } from "@/lib/utils"
import type React from "react"

interface TagProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "accent"
  size?: "sm" | "md"
  className?: string
}

export function Tag({ children, variant = "default", size = "md", className }: TagProps) {
  const variants = {
    default: "bg-primary-ice text-primary border-transparent",
    outline: "bg-transparent text-foreground border-border",
    accent: "bg-primary text-primary-foreground border-transparent"
  }

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
