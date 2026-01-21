"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Star, Clock, Euro } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Service, Locale } from "@/data"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"

interface ServiceCardProps {
  service: Service
  popular?: boolean
  className?: string
  variant?: "default" | "compact"
}

export function ServiceCard({ service, popular = false, className, variant = "default" }: ServiceCardProps) {
  const t = useTranslations("services")
  const locale = useLocale() as Locale

  // Show limited deliverables for better scannability (Hick's Law)
  const visibleDeliverables = service.deliverables[locale].slice(0, 4)
  const remainingCount = service.deliverables[locale].length - 4

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "group relative flex flex-col p-5 rounded-2xl border bg-background-card transition-all duration-300",
          popular
            ? "border-primary shadow-lg ring-1 ring-primary/20"
            : "border-border hover:border-primary/50 hover:shadow-md",
          className
        )}
      >
        {popular && (
          <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground gap-1 shadow-md">
            <Star className="w-3 h-3 fill-current" />
            {t("popularBadge")}
          </Badge>
        )}

        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-foreground leading-tight">{service.title[locale]}</h3>
          <p className="text-sm text-foreground-secondary line-clamp-2">{service.subtitle[locale]}</p>

          <div className="flex items-center gap-4 text-xs text-foreground-muted pt-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {service.duration[locale]}
            </span>
            <span className="flex items-center gap-1.5">
              <Euro className="w-3.5 h-3.5" />
              {service.priceRange[locale]}
            </span>
          </div>
        </div>

        <Button
          asChild
          size="sm"
          className={cn(
            "mt-4 w-full gap-2 group-hover:gap-3 transition-all",
            popular
              ? "bg-primary hover:bg-primary-hover text-primary-foreground"
              : "bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          )}
        >
          <Link href={`/services/${service.slug}`}>
            {t("cta")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col h-full rounded-2xl border bg-background-card transition-all duration-300",
        popular
          ? "border-primary shadow-xl ring-2 ring-primary/20 md:scale-[1.02]"
          : "border-border hover:border-primary/50 hover:shadow-lg",
        className
      )}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-primary text-primary-foreground gap-1.5 px-4 py-1.5 text-sm shadow-lg">
            <Star className="w-4 h-4 fill-current" />
            {t("popularBadge")}
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className={cn("p-6 pb-4 space-y-3", popular && "pt-8")}>
        <h3 className="font-bold text-xl text-foreground leading-tight">
          {service.title[locale]}
        </h3>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {service.subtitle[locale]}
        </p>
      </div>

      {/* Price & Duration - Key Decision Factors */}
      <div className="px-6 pb-4">
        <div className="flex flex-col gap-2 p-4 rounded-xl bg-primary-ice/50 border border-primary/10">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-muted flex items-center gap-2">
              <Euro className="w-4 h-4 text-primary" />
              {t("priceLabel")}
            </span>
            <span className="font-semibold text-foreground">{service.priceRange[locale]}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-muted flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              {t("durationLabel")}
            </span>
            <span className="font-medium text-foreground-secondary">{service.duration[locale]}</span>
          </div>
        </div>
      </div>

      {/* Deliverables */}
      <div className="px-6 pb-6 flex-1">
        <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-3">
          {t("includes")}
        </p>
        <ul className="space-y-2.5">
          {visibleDeliverables.map((deliverable) => (
            <li key={deliverable} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="leading-tight">{deliverable}</span>
            </li>
          ))}
          {remainingCount > 0 && (
            <li className="text-sm text-primary font-medium pl-6">
              +{remainingCount} {t("more")}
            </li>
          )}
        </ul>
      </div>

      {/* CTA */}
      <div className="p-6 pt-0 mt-auto">
        <Button
          asChild
          className={cn(
            "w-full gap-2 group-hover:gap-3 transition-all h-12 text-base",
            popular
              ? "bg-primary hover:bg-primary-hover text-primary-foreground shadow-md"
              : "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          )}
        >
          <Link href={`/services/${service.slug}`}>
            {t("cta")}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
