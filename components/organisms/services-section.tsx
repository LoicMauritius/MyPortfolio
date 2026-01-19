"use client"

import { Heading } from "@/components/atoms/heading"
import { Text } from "@/components/atoms/text"
import { SectionBadge } from "@/components/atoms/section-badge"
import { ServiceCard } from "@/components/molecules/service-card"
import type { Service } from "@/data"
import { useTranslations } from "next-intl"

interface ServicesSectionProps {
  services: Service[]
  title?: string
  subtitle?: string
  badge?: string
  popularIndex?: number
  variant?: "default" | "page"
}

export function ServicesSection({
  services,
  title,
  subtitle,
  badge,
  popularIndex = 1,
  variant = "default"
}: ServicesSectionProps) {
  const t = useTranslations("services")

  // For page variant, show featured service first then others
  const sortedServices = variant === "page"
    ? [...services].sort((a, b) => {
        const aIndex = services.indexOf(a)
        const bIndex = services.indexOf(b)
        if (aIndex === popularIndex) return -1
        if (bIndex === popularIndex) return 1
        return 0
      })
    : services

  return (
    <section id="services" className="py-16 md:py-24 lg:py-28 bg-primary-ice/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <SectionBadge className="mb-4">{badge || t("badge")}</SectionBadge>
          <Heading level={2} className="mb-4 text-balance">
            {title || t("title")}
          </Heading>
          <Text variant="secondary" className="text-base md:text-lg">
            {subtitle || t("subtitle") + t("subtitlebis")}
          </Text>
        </div>

        {/* Mobile-first responsive grid */}
        {/* Mobile: 1 col | Tablet: 2 col | Desktop: 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 mx-auto max-w-7xl">
          {sortedServices.map((service) => {
            const originalIndex = services.findIndex(s => s.slug === service.slug)
            return (
              <ServiceCard
                key={service.slug}
                service={service}
                popular={originalIndex === popularIndex}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
