import { Header } from "@/components/organisms/header"
import { Footer } from "@/components/organisms/footer"
import { ServiceDetailContent } from "@/components/organisms/service-detail-content"
import { Breadcrumb } from "@/components/molecules/breadcrumb"
import type { Service } from "@/data"

interface ServiceDetailTemplateProps {
  service: Service
  breadcrumbItems: Array<{ label: string; href?: string }>
}

export function ServiceDetailTemplate({ service, breadcrumbItems }: ServiceDetailTemplateProps) {
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

        {/* Service Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <ServiceDetailContent service={service} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
