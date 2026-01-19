"use client"

import { Header } from "@/components/organisms/header"
import { Footer } from "@/components/organisms/footer"
import { ServiceCard } from "@/components/molecules/service-card"
import { Heading } from "@/components/atoms/heading"
import { Text } from "@/components/atoms/text"
import { SectionBadge } from "@/components/atoms/section-badge"
import { Button } from "@/components/ui/button"
import { useCalendly } from "@/components/providers/calendly-provider"
import type { Service, Locale } from "@/data"
import { useTranslations, useLocale } from "next-intl"
import {
  ArrowRight,
  Globe,
  Wrench,
  Rocket,
  Zap,
  CheckCircle,
  HelpCircle
} from "lucide-react"

interface ServicesPageTemplateProps {
  services: Service[]
}

// Icon mapping for services
const serviceIcons: Record<string, React.ElementType> = {
  "site-web-landing-technique": Globe,
  "application-web-outils-metier": Wrench,
  "mvp-plateforme-saas": Rocket,
  "automatisation-prototypage-ia": Zap,
}

export function ServicesPageTemplate({ services }: ServicesPageTemplateProps) {
  const t = useTranslations("servicesPage")
  const locale = useLocale() as Locale
  const { openCalendly } = useCalendly()

  // Featured service index (Application web - most popular)
  const featuredIndex = 1

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary-ice/50 to-background overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.05)_0%,transparent_50%)]" />

          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <SectionBadge>{t("badge")}</SectionBadge>

              <Heading level={1} className="text-balance">
                {t("title")}
              </Heading>

              <Text size="lg" variant="secondary" className="max-w-2xl mx-auto">
                {t("subtitle")}
              </Text>

              {/* Quick decision helper */}
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    document.getElementById('decision-helper')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <HelpCircle className="w-4 h-4" />
                  {t("helpMeChoose")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid - Mobile First */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {/* Mobile: Stack cards vertically for easy scanning */}
            {/* Tablet: 2 columns */}
            {/* Desktop: Featured card larger, others in grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  popular={index === featuredIndex}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Decision Helper - Applying Hick's Law */}
        <section id="decision-helper" className="py-16 md:py-24 bg-background-card border-y border-border">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Heading level={2} className="mb-4">
                  {t("decisionHelper.title")}
                </Heading>
                <Text variant="secondary">
                  {t("decisionHelper.subtitle")}
                </Text>
              </div>

              {/* Simplified decision tree */}
              <div className="space-y-4">
                {services.map((service, index) => {
                  const Icon = serviceIcons[service.slug] || Globe
                  const isPopular = index === featuredIndex

                  return (
                    <div
                      key={service.slug}
                      className={`
                        relative p-5 md:p-6 rounded-2xl border transition-all duration-300
                        ${isPopular
                          ? 'bg-primary-ice/50 border-primary/30 shadow-md'
                          : 'bg-background border-border hover:border-primary/30 hover:shadow-sm'
                        }
                      `}
                    >
                      {isPopular && (
                        <span className="absolute -top-2.5 right-4 px-3 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          {t("decisionHelper.recommended")}
                        </span>
                      )}

                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                        {/* Icon */}
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                          ${isPopular ? 'bg-primary text-primary-foreground' : 'bg-primary-ice text-primary'}
                        `}>
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-foreground mb-1">
                            {service.title[locale]}
                          </h3>
                          <p className="text-sm text-foreground-muted mb-2">
                            {t(`decisionHelper.needs.${service.slug}`)}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="text-foreground-secondary">
                              {service.priceRange[locale]}
                            </span>
                            <span className="text-foreground-muted">•</span>
                            <span className="text-foreground-muted">
                              {service.duration[locale]}
                            </span>
                          </div>
                        </div>

                        {/* CTA */}
                        <Button
                          asChild
                          variant={isPopular ? "default" : "outline"}
                          className="shrink-0 gap-2 mt-2 md:mt-0"
                        >
                          <a href={`/${locale}/services/${service.slug}`}>
                            {t("decisionHelper.learnMore")}
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <Heading level={2}>
                  {t("cta.title")}
                </Heading>
                <Text variant="secondary" size="lg">
                  {t("cta.subtitle")}
                </Text>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={openCalendly} className="gap-2">
                  {t("cta.button")}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-foreground-muted">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{t("cta.reassurance")}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
