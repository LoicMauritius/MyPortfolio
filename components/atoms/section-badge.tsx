import type React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SectionBadgeProps {
  children: React.ReactNode
  className?: string
}

export function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <Badge variant="secondary" className={cn("bg-primary-ice text-primary font-semibold px-3 py-1 text-sm", className)}>
      {children}
    </Badge>
  )
}
