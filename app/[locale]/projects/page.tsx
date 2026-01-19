import { Header } from "@/components/organisms/header"
import { Footer } from "@/components/organisms/footer"
import { ProjectsSection } from "@/components/organisms/projects-section"
import { projectsData } from "@/data"
import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tous les Projets | Portfolio",
  description: "Découvrez tous mes projets de développement web",
}

export default async function ProjectsPage() {
  const t = await getTranslations("projects")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ProjectsSection
          projects={projectsData.projects}
          title={t("allProjectsTitle")}
          subtitle={t("allProjectsSubtitle")}
          showViewAll={false}
        />
      </main>
      <Footer />
    </div>
  )
}
