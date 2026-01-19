import { Header } from "@/components/organisms/header"
import { Footer } from "@/components/organisms/footer"
import { ProjectDetailContent } from "@/components/organisms/project-detail-content"
import { Breadcrumb } from "@/components/molecules/breadcrumb"
import type { Project } from "@/data"

interface ProjectDetailTemplateProps {
  project: Project
  breadcrumbItems: Array<{ label: string; href?: string }>
}

export function ProjectDetailTemplate({ project, breadcrumbItems }: ProjectDetailTemplateProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="py-6 bg-primary-ice/20 border-b border-border">
          <div className="container mx-auto px-4 md:px-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </section>

        {/* Project Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <ProjectDetailContent project={project} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
