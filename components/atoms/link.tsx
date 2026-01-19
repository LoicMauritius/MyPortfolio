import NextLink from "next/link"
import { Link as I18nLink } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import type React from "react"

interface LinkProps {
  href: string
  children: React.ReactNode
  variant?: "default" | "nav" | "button"
  external?: boolean
  className?: string
}

export function Link({ href, children, variant = "default", external = false, className }: LinkProps) {
  const variants = {
    default: "text-primary hover:underline underline-offset-4 transition-colors",
    nav: "text-foreground-secondary hover:text-primary transition-colors",
    button: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover transition-colors"
  }

  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {}

  // Use NextLink for external links, I18nLink for internal links
  const LinkComponent = external ? NextLink : I18nLink

  return (
    <LinkComponent
      href={href}
      className={cn(variants[variant], className)}
      {...linkProps}
    >
      {children}
    </LinkComponent>
  )
}
