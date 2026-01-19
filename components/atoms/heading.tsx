import { cn } from "@/lib/utils"
import type React from "react"

interface HeadingProps {
  level?: 1 | 2 | 3 | 4
  children: React.ReactNode
  className?: string
}

export function Heading({ level = 2, children, className }: HeadingProps) {
  const baseStyles = "font-semibold text-foreground tracking-tight text-balance"

  const sizes = {
    1: "text-4xl md:text-5xl lg:text-6xl",
    2: "text-3xl md:text-4xl",
    3: "text-xl md:text-2xl",
    4: "text-lg md:text-xl",
  }

  const Component = (level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : "h4") as "h1" | "h2" | "h3" | "h4"

  return <Component className={cn(baseStyles, sizes[level], className)}>{children}</Component>
}
