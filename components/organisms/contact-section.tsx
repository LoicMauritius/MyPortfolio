"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "@/components/atoms/heading"
import { Text } from "@/components/atoms/text"
import { SectionBadge } from "@/components/atoms/section-badge"
import { Send, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useCalendly } from "@/components/providers/calendly-provider"
import { useTranslations } from "next-intl"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
  })
  const { openCalendly } = useCalendly()
  const t = useTranslations("contact")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", company: "", project: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-primary-ice/30">
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

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="flex flex-col justify-center">
            <h3 className="font-semibold text-foreground text-xl mb-6">{t("benefits.title")}</h3>
            <div className="space-y-4 mb-8">
              {[
                t("benefits.audit"),
                t("benefits.recommendations"),
                t("benefits.estimate"),
                t("benefits.questions"),
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground-secondary">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-background-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-ice flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t("callCard.title")}</p>
                  <p className="text-sm text-foreground-muted">{t("callCard.duration")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                <Clock className="w-4 h-4" />
                <span>{t("callCard.availability")}</span>
              </div>
            </div>
          </div>

          <Card className="border-border bg-background-card">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      {t("form.name")} {t("form.required")}
                    </Label>
                    <Input
                      id="name"
                      placeholder="Jean Dupont"
                      className="border-border bg-background focus:border-primary"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      {t("form.email")} {t("form.required")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jean@entreprise.com"
                      className="border-border bg-background focus:border-primary"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-foreground">
                    {t("form.company")}
                  </Label>
                  <Input
                    id="company"
                    placeholder={t("form.company")}
                    className="border-border bg-background focus:border-primary"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project" className="text-foreground">
                    {t("form.project")} {t("form.required")}
                  </Label>
                  <Textarea
                    id="project"
                    placeholder={t("form.projectPlaceholder")}
                    rows={4}
                    className="border-border bg-background focus:border-primary resize-none"
                    value={formData.project}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Button
                    type="button"
                    onClick={openCalendly}
                    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground gap-2"
                    size="lg"
                  >
                    {t("form.submitPrimary")}
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-primary-ice gap-2"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("form.sending") : t("form.submitSecondary")}
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{t("form.success")}</span>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{t("form.error")}</span>
                  </div>
                )}
                <p className="text-xs text-center text-foreground-muted">
                  {t("form.responseTime")}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
