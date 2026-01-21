"use client"

import { useState } from "react"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { NavItem } from "@/components/molecules/nav-item"
import { LanguageSwitcher } from "@/components/molecules/language-switcher"
import { Menu, Calendar } from "lucide-react"
import { useCalendly } from "@/components/providers/calendly-provider"
import { useTranslations } from "next-intl"
import Image from "next/image"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { openCalendly } = useCalendly()
  const t = useTranslations("header")
  const tCommon = useTranslations("common")

  const navigation = [
    { label: t("nav.about"), href: "/" },
    { label: t("nav.results"), href: "/#results" },
    { label: t("nav.projects"), href: "/#projects" },
    /*{ label: t("nav.services"), href: "/#services" },*/
    { label: t("nav.contact"), href: "/#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center">
              <Image
                src="/LM_logo.png"
                alt="logo"
                width={32}
                height={32}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="font-semibold text-foreground">{t("name")}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <NavItem key={item.href} href={item.href}>
                {item.label}
              </NavItem>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              onClick={openCalendly}
              className="bg-primary hover:bg-primary-hover text-primary-foreground gap-2"
            >
              <Calendar className="w-4 h-4" />
              {tCommon("bookCall")}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t("mobileMenu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <SheetTitle className="sr-only">{t("navMenu")}</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-foreground-secondary hover:text-primary transition-colors text-lg"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  <LanguageSwitcher className="w-full justify-center" />
                </div>
                <Button
                  onClick={() => {
                    openCalendly()
                    setIsOpen(false)
                  }}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  {tCommon("bookCall")}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
