"use client"

import { Heading } from "@/components/atoms/heading"
import { useTranslations } from "next-intl"

export function SocialProofSection() {
  const t = useTranslations("socialProof.stats")

  const stats = [
    { value: t("projects.value"), label: t("projects.label") },
    { value: t("quality.value"), label: t("quality.label") },
    { value: t("outsourcing.value"), label: t("outsourcing.label") },
    { value: t("maintenance.value"), label: t("maintenance.label") },
  ]

  return (
    <section className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <Heading level={2} className="text-background mb-1">
                {stat.value}
              </Heading>
              <p className="text-background/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
