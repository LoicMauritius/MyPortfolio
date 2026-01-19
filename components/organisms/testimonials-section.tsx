"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "@/components/atoms/heading"
import { Text } from "@/components/atoms/text"
import { SectionBadge } from "@/components/atoms/section-badge"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

export function TestimonialsSection() {
  const t = useTranslations("testimonials")

  const testimonials = [
    {
      quote: t("items.0.quote"),
      author: t("items.0.author"),
      role: t("items.0.role"),
      image: t("items.0.image"),
      rating: 5,
    },
    {
      quote: t("items.1.quote"),
      author: t("items.1.author"),
      role: t("items.1.role"),
      image: t("items.1.image"),
      rating: 5,
    },
    {
      quote: t("items.2.quote"),
      author: t("items.2.author"),
      role: t("items.2.role"),
      image: t("items.2.image"),
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <SectionBadge className="mb-4">{t("badge")}</SectionBadge>
          <Heading level={2} className="mb-4 text-balance">
            {t("title")}
          </Heading>
          <Text variant="secondary" className="max-w-2xl mx-auto">
            {t("secondarySubtitle")}
          </Text>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="border-border bg-background-card">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-foreground-secondary mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-foreground-muted">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
