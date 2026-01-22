"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/atoms/heading"
import { Text } from "@/components/atoms/text"
import { Shield, ArrowRight, CheckCircle } from "lucide-react"
import { useCalendly } from "@/components/providers/calendly-provider"
import { useTranslations } from "next-intl"

export function GuaranteeSection() {
  const { openCalendly } = useCalendly()
  const t = useTranslations("guarantee")

  const values = Array.from({ length: 4 }, (_, i) => t(`values.${i}`))

  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <Heading level={2} className="mb-4 text-primary-foreground text-balance">
            {t("title")}
          </Heading>
          <Text className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            {t("subtitle")}
          </Text>

          <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-xl mx-auto text-left">
            {values.map((value) => (
              <div key={value} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary-foreground shrink-0" />
                <span className="text-sm text-primary-foreground/90">{value}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={openCalendly}
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2"
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-sm text-primary-foreground/60 mt-4">{t("callInfo")}</p>
        </div>
      </div>
    </section>
  )
}
