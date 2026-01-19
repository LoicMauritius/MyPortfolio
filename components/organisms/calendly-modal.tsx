"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCalendly } from "@/components/providers/calendly-provider"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"

export function CalendlyModal() {
  const { isOpen, closeCalendly } = useCalendly()
  const t = useTranslations("calendly")

  useEffect(() => {
    if (isOpen) {
      // Load Calendly script
      const script = document.createElement("script")
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      document.body.appendChild(script)

      return () => {
        // Cleanup script on unmount
        if (script.parentNode) {
          document.body.removeChild(script)
        }
      }
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={closeCalendly}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-foreground">
              {t("title")}
            </DialogTitle>
          </div>
          <p className="text-sm text-foreground-secondary">
            {t("subtitle")}
          </p>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <div
            className="calendly-inline-widget w-full"
            data-url="https://calendly.com/loicmauritius/30min"
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
