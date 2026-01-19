"use client"

import { Link } from "@/i18n/navigation"
import NextLink from "next/link"
import { Linkedin, Github, Twitter } from "lucide-react"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("header")
  const tFooter = useTranslations("footer")

  const navigation = [
    { label: t("nav.results"), href: "#results" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.testimonials"), href: "#testimonials" },
    { label: t("nav.projects"), href: "#projects" },
  ]
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">ML</span>
            </div>
            <span className="font-semibold">{t("name")}</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-background/70 hover:text-background transition-colors text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            <NextLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </NextLink>
            <NextLink
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </NextLink>
            <NextLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </NextLink>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/10 text-center">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} {t("name")}. {tFooter("rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
