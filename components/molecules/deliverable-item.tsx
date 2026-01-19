import { Package } from "lucide-react"
import { cn } from "@/lib/utils"

interface DeliverableItemProps {
  text: string
  className?: string
}

export function DeliverableItem({ text, className }: DeliverableItemProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        <Package className="w-3 h-3 text-primary" />
      </div>
      <span className="text-foreground-secondary leading-relaxed">{text}</span>
    </div>
  )
}
