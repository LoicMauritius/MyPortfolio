"use client"

import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Languages } from "lucide-react"
import { useLocale } from "next-intl"
import { useTransition } from "react"

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      startTransition(() => {
        router.replace(pathname, { locale: newLocale })
        router.refresh()
      })
    }
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-1 bg-background-card rounded-lg border border-border",
        className
      )}
    >
      <Languages className="w-4 h-4 text-foreground-muted ml-1" />

      <Select
        value={locale}
        onValueChange={switchLocale}
        disabled={isPending}
      >
        <SelectTrigger
          className={cn(
            "h-8 w-[90px] text-sm font-medium bg-transparent border-none shadow-none focus:ring-0"
          )}
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent align="end">
          {routing.locales.map((l) => (
            <SelectItem key={l} value={l}>
              {l.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

}