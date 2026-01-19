"use client"

import Image from "next/image"
import { ExternalLink, Github, Calendar, CheckCircle } from "lucide-react"
import { Heading } from "@/components/atoms/heading"
import { Text } from "@/components/atoms/text"
import { SectionBadge } from "@/components/atoms/section-badge"
import { Tag } from "@/components/atoms/tag"
import { FeatureItem } from "@/components/molecules/feature-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Project, Locale } from "@/data"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "@/lib/utils"

interface ProjectDetailContentProps {
  project: Project
  className?: string
}

export function ProjectDetailContent({ project, className }: ProjectDetailContentProps) {
  const t = useTranslations("projectDetail")
  const locale = useLocale() as Locale

  return (
    <div className={cn("space-y-12", className)}>
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <SectionBadge>{project.status[locale]}</SectionBadge>
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <Calendar className="w-4 h-4" />
            <time dateTime={project.date}>
              {new Date(project.date).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
                year: "numeric",
                month: "long",
              })}
            </time>
          </div>
        </div>

        <Heading level={1} className="text-balance">
          {project.title[locale]}
        </Heading>

        <Text size="lg" variant="secondary" className="max-w-3xl">
          {project.description[locale]}
        </Text>

        {/* Links */}
        {(project.links.demo || project.links.github) && (
          <div className="flex flex-wrap gap-3">
            {project.links.demo && (
              <Button asChild size="lg" className="gap-2">
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  {t("viewDemo")}
                </a>
              </Button>
            )}
            {project.links.github && (
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  {t("viewCode")}
                </a>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Images Gallery */}
      {project.images && project.images.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {project.images.map((image, index) => (
              <Card key={index} className="overflow-hidden border-border">
                <div className="relative aspect-video">
                  <Image
                    src={image}
                    alt={`${project.title[locale]} - Screenshot ${index + 1}`}
                    fill
                    objectFit="contain"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Context */}
      {project.context[locale] && (
        <div className="space-y-4">
          <Heading level={2}>{t("context")}</Heading>
          <Text variant="secondary" className="leading-relaxed">
            {project.context[locale]}
          </Text>
        </div>
      )}

      {/* Problem & Solution */}
      <div className="grid md:grid-cols-2 gap-8">
        {project.problem[locale] && (
          <Card className="border-border bg-background-card">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <Heading level={3}>{t("problem")}</Heading>
              </div>
              <Text variant="secondary" className="leading-relaxed">
                {project.problem[locale]}
              </Text>
            </CardContent>
          </Card>
        )}

        {project.solution[locale] && (
          <Card className="border-border bg-background-card">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <span className="text-xl">💡</span>
                </div>
                <Heading level={3}>{t("solution")}</Heading>
              </div>
              <Text variant="secondary" className="leading-relaxed">
                {project.solution[locale]}
              </Text>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Features */}
      {project.features[locale] && project.features[locale].length > 0 && (
        <div className="space-y-6">
          <Heading level={2}>{t("features")}</Heading>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.features[locale].map((feature, index) => (
              <FeatureItem key={index} text={feature} />
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {project.results[locale] && (
        <Card className="border-primary/20 bg-primary-ice/30">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-primary" />
              <Heading level={3}>{t("results")}</Heading>
            </div>
            <Text variant="secondary" className="leading-relaxed">
              {project.results[locale]}
            </Text>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Technologies & Skills */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="space-y-4">
            <Heading level={3}>{t("technologies")}</Heading>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Tag key={tech} variant="outline">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* Competences */}
        {project.competences && project.competences.length > 0 && (
          <div className="space-y-4">
            <Heading level={3}>{t("competences")}</Heading>
            <div className="flex flex-wrap gap-2">
              {project.competences.map((comp) => (
                <Tag key={comp} variant="accent">
                  {comp}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
