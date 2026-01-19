"use client"

import { Heading } from "@/components/atoms/heading"
import { Text } from "@/components/atoms/text"
import { SectionBadge } from "@/components/atoms/section-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Layers, Settings, Shield, CheckCircle, HeartHandshake, GraduationCap } from "lucide-react"
import { useTranslations } from "next-intl"

export function BenefitsSection() {
  const t = useTranslations("benefits")

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("items.maintainable.title"),
      description: t("items.maintainable.description"),
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: t("items.productVision.title"),
      description: t("items.productVision.description"),
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: t("items.communication.title"),
      description: t("items.communication.description"),
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: t("items.quality.title"),
      description: t("items.quality.description"),
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: t("items.structured.title"),
      description: t("items.structured.description"),
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: t("items.improvement.title"),
      description: t("items.improvement.description"),
    },
  ]

  return (
    <section id="results" className="py-20 md:py-28 bg-primary-ice/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <SectionBadge className="mb-4">{t("badge")}</SectionBadge>
          <Heading level={2} className="mb-4 text-balance">
            {t("title")}
          </Heading>
          <Text variant="secondary" className="max-w-2xl mx-auto">
            {t("subtitle")}
          </Text>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <Card
              key={benefit.title}
              className="border-border bg-background-card hover:border-primary/30 transition-colors duration-200"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary-ice flex items-center justify-center text-primary mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
