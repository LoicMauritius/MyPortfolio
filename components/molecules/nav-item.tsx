"use client"

import type React from "react"

import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
  className?: string
}

export function NavItem({ href, children, isActive, className }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground-secondary font-normal transition-colors duration-200",
        "hover:text-primary",
        isActive && "text-primary font-semibold",
        className,
      )}
    >
      {children}
    </Link>
  )
}
