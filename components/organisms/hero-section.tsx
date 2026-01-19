"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/atoms/heading"
import { Text } from "@/components/atoms/text"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { StringList } from "@/components/molecules";
import { useTranslations } from 'next-intl';
import { useCalendly } from "@/components/providers/calendly-provider"

export function HeroSection() {
  const t = useTranslations('hero');
  const { openCalendly } = useCalendly();

  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-ice/30 -skew-x-12 translate-x-1/4" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Heading level={1} className="mb-6 text-balance">
              {t('title.part1')}
              <span className='text-primary'>{t('title.part2')}</span>
            </Heading>

            <Text variant="secondary" size="lg" className="mb-6 max-w-xl">
              {t('subtitle')}
            </Text>

            <StringList items={[t("features.modern"), t("features.clean"), t("features.vision"), t("features.tech_debt")]} />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={openCalendly}
                size="lg"
                className="bg-primary hover:bg-primary-hover text-primary-foreground gap-2"
              >
                {t("cta.primary")}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link
                href={'#projects'}
                className="border border-black/20 border-border px-5 rounded-lg text-foreground hover:bg-primary-ice hover:border-primary/30 gap-2 bg-transparent inline-flex items-center justify-center"
              >
                <Play className="w-4 h-4" />
                {t("cta.secondary")}
              </Link>
            </div>

            <p className="text-sm text-foreground-muted mt-4">{t("freeCall")}</p>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-6" />
              <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-background-card shadow-2xl">
                <Image
                  src="/Mauritius_loic.jpg"
                  alt={t("imageAlt")}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Badge disponibilité */}
              <div className="absolute -bottom-4 -left-4 bg-background-card rounded-xl shadow-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t("availability.status")}</p>
                    <p className="text-xs italic font-semibold text-foreground">{t("availability.slots")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

