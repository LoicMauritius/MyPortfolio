import { notFound } from "next/navigation"
import { ProjectDetailTemplate } from "@/components/templates/project-detail-template"
import { projectsData, type Locale } from "@/data"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"

interface ProjectPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    slug: project.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const localeKey = locale as Locale
  const project = projectsData.projects.find((p) => p.slug === slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title[localeKey]} | Portfolio`,
    description: project.shortDescription[localeKey],
    openGraph: {
      title: project.title[localeKey],
      description: project.shortDescription[localeKey],
      images: project.images[0] ? [project.images[0]] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params
  const localeKey = locale as Locale
  const t = await getTranslations("projectDetail")

  // Find project by slug
  const project = projectsData.projects.find((p) => p.slug === slug)

  // 404 if project not found
  if (!project) {
    notFound()
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t("home"), href: `/` },
    { label: t("projects"), href: `/projects` },
    { label: project.title[localeKey] },
  ]

  return <ProjectDetailTemplate project={project} breadcrumbItems={breadcrumbItems} />
}
