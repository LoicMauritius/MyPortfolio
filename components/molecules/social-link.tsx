import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  className?: string
}

export function SocialLink({ href, icon, label, className }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "w-10 h-10 rounded-lg bg-background-card border border-border",
        "flex items-center justify-center",
        "text-foreground-secondary hover:text-primary hover:border-primary",
        "transition-all duration-200",
        className,
      )}
    >
      {icon}
    </Link>
  )
}
