import { cn } from "@/lib/utils"

interface ProcessStepProps {
  step: string
  description: string
  number: number
  isLast?: boolean
  className?: string
}

export function ProcessStep({ step, description, number, isLast = false, className }: ProcessStepProps) {
  return (
    <div className={cn("relative flex gap-4", className)}>
      {/* Number badge */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
          {number}
        </div>
        {!isLast && <div className="w-0.5 h-full bg-border mt-2" />}
      </div>

      {/* Content */}
      <div className="pb-8">
        <h4 className="font-semibold text-foreground mb-2">{step}</h4>
        <p className="text-sm text-foreground-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
