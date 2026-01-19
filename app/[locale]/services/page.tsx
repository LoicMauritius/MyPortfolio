import { ServicesPageTemplate } from "@/components/templates"
import { servicesData } from "@/data"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("servicesPage")

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default function ServicesPage() {
  return <ServicesPageTemplate services={servicesData.services} />
}
