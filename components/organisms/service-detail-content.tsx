"use client"

import { Clock, Euro, Target, CheckCircle, Lightbulb, ArrowRight } from "lucide-react"
import { Heading } from "@/components/atoms/heading"
import { Text } from "@/components/atoms/text"
import { SectionBadge } from "@/components/atoms/section-badge"
import { Tag } from "@/components/atoms/tag"
import { ProcessStep } from "@/components/molecules/process-step"
import { DeliverableItem } from "@/components/molecules/deliverable-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Service, Locale } from "@/data"
import { useTranslations, useLocale } from "next-intl"
import { useCalendly } from "@/components/providers/calendly-provider"
import { cn } from "@/lib/utils"

interface ServiceDetailContentProps {
  service: Service
  className?: string
}

export function ServiceDetailContent({ service, className }: ServiceDetailContentProps) {
  const t = useTranslations("serviceDetail")
  const locale = useLocale() as Locale
  const { openCalendly } = useCalendly()

  return (
    <div className={cn("space-y-12", className)}>
      {/* Header Section */}
      <div className="space-y-6">
        <SectionBadge>{t("service")}</SectionBadge>

        <Heading level={1} className="text-balance">
          {service.title[locale]}
        </Heading>

        <Text size="lg" className="max-w-3xl">
          {service.subtitle[locale]}
        </Text>

        {/* Quick Info Cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="border-border bg-background-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-ice flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-foreground-muted">{t("duration")}</p>
                <p className="font-semibold text-foreground">{service.duration[locale]}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-background-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-ice flex items-center justify-center">
                <Euro className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-foreground-muted">{t("pricing")}</p>
                <p className="font-semibold text-foreground">{service.priceRange[locale]}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-background-card">
            <CardContent className="p-4">
              <Button onClick={openCalendly} className="w-full gap-2" size="sm">
                <Target className="w-4 h-4" />
                {service.cta[locale]}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div className="space-y-4">
        <Heading level={2}>{t("overview")}</Heading>
        <Text variant="secondary" className="leading-relaxed">
          {service.description[locale]}
        </Text>
      </div>

      {/* Problem Solved */}
      {service.problemSolved[locale] && (
        <Card className="border-primary/20 bg-primary-ice/30">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <Heading level={3}>{t("problemSolved")}</Heading>
            </div>
            <Text variant="secondary" className="leading-relaxed">
              {service.problemSolved[locale]}
            </Text>
          </CardContent>
        </Card>
      )}

      {/* Deliverables */}
      {service.deliverables[locale] && service.deliverables[locale].length > 0 && (
        <div className="space-y-6">
          <Heading level={2}>{t("deliverables")}</Heading>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.deliverables[locale].map((deliverable, index) => (
              <DeliverableItem key={index} text={deliverable} />
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Process */}
      {service.process[locale] && service.process[locale].length > 0 && (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Heading level={2}>{t("process")}</Heading>
            <Text variant="secondary" className="max-w-2xl mx-auto">
              {t("processDescription")}
            </Text>
          </div>

          <Card className="border-border bg-background-card">
            <CardContent className="p-8">
              {service.process[locale].map((step, index) => (
                <ProcessStep
                  key={index}
                  step={step.step}
                  description={step.description}
                  number={index + 1}
                  isLast={index === service.process[locale].length - 1}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      <Separator />

      {/* Technologies & Skills */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Technologies */}
        {service.technologies && service.technologies.length > 0 && (
          <div className="space-y-4">
            <Heading level={3}>{t("technologies")}</Heading>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <Tag key={tech} variant="outline">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* Competences */}
        {service.competences && service.competences.length > 0 && (
          <div className="space-y-4">
            <Heading level={3}>{t("competences")}</Heading>
            <div className="flex flex-wrap gap-2">
              {service.competences.map((comp) => (
                <Tag key={comp} variant="accent">
                  {comp}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <Card className="border-primary bg-primary-ice/50">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-3">
            <Heading level={2}>{t("readyToStart")}</Heading>
            <Text variant="secondary" className="max-w-xl mx-auto">
              {t("ctaDescription")}
            </Text>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={openCalendly} size="lg" className="gap-2">
              {service.cta[locale]}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-foreground-muted">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>{t("freeConsultation")}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
