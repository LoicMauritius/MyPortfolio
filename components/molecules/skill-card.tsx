import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SkillCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function SkillCard({ icon, title, description, className }: SkillCardProps) {
  return (
    <Card
      className={cn(
        "border-border bg-background-card hover:border-primary/30 transition-colors duration-200",
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-lg bg-primary-ice flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-foreground-secondary leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
