"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/atoms/heading"
import { Text } from "@/components/atoms/text"
import { SectionBadge } from "@/components/atoms/section-badge"
import { ProjectCard } from "@/components/molecules/project-card"
import { ArrowRight } from "lucide-react"
import type { Project, Locale } from "@/data"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"

interface ProjectsSectionProps {
  projects: Project[]
  title?: string
  subtitle?: string
  badge?: string
  showViewAll?: boolean
}

export function ProjectsSection({
  projects,
  title,
  subtitle,
  badge,
  showViewAll = true
}: ProjectsSectionProps) {
  const t = useTranslations("projects")
  const locale = useLocale() as Locale

  return (
    <section id="projects" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <SectionBadge className="mb-4">{badge || t("badge")}</SectionBadge>
          <Heading level={2} className="mb-4 text-balance">
            {title || t("title")}
          </Heading>
          <Text variant="secondary" className="max-w-2xl mx-auto">
            {subtitle || t("subtitle")}
          </Text>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title[locale]}
              description={project.shortDescription[locale]}
              image={project.images[0] || "/placeholder.svg"}
              tags={project.technologies}
              href={`/projects/${project.slug}`}
            />
          ))}
        </div>

        {showViewAll && (
          <div className="text-center">
            <Link
              href="/projects" 
              className="inline-flex items-center justify-center rounded-md border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2 bg-transparent border px-8 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              {t("viewAll")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
