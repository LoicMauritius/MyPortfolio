import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureItemProps {
  text: string
  icon?: React.ReactNode
  className?: string
}

export function FeatureItem({ text, icon, className }: FeatureItemProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        {icon || <Check className="w-3 h-3 text-primary" />}
      </div>
      <span className="text-foreground-secondary leading-relaxed">{text}</span>
    </div>
  )
}
