import { notFound } from "next/navigation"
import { ServiceDetailTemplate } from "@/components/templates/service-detail-template"
import { servicesData, type Locale } from "@/data"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"

interface ServicePageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

// Generate static params for all services
export async function generateStaticParams() {
  return servicesData.services.map((service) => ({
    slug: service.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const localeKey = locale as Locale
  const service = servicesData.services.find((s) => s.slug === slug)

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: `${service.title[localeKey]} | Services`,
    description: service.subtitle[localeKey],
    openGraph: {
      title: service.title[localeKey],
      description: service.subtitle[localeKey],
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params
  const localeKey = locale as Locale
  const t = await getTranslations("serviceDetail")

  // Find service by slug
  const service = servicesData.services.find((s) => s.slug === slug)

  // 404 if service not found
  if (!service) {
    notFound()
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t("home"), href: `/${locale}` },
    { label: t("services"), href: `/${locale}/services` },
    { label: service.title[localeKey] },
  ]

  return <ServiceDetailTemplate service={service} breadcrumbItems={breadcrumbItems} />
}
