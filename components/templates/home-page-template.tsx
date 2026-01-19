import { Header } from "@/components/organisms/header"
import { HeroSection } from "@/components/organisms/hero-section"
import { SocialProofSection } from "@/components/organisms/social-proof-section"
import { BenefitsSection } from "@/components/organisms/benefits-section"
import { ProjectsSection } from "@/components/organisms/projects-section"
import { ServicesSection } from "@/components/organisms/services-section"
import { TestimonialsSection } from "@/components/organisms/testimonials-section"
import { GuaranteeSection } from "@/components/organisms/guarantee-section"
import { ContactSection } from "@/components/organisms/contact-section"
import { Footer } from "@/components/organisms/footer"
import { ScrollSpyProvider } from "@/components/providers/scroll-spy-provider"
import type { Project, Service } from "@/data"

interface HomePageTemplateProps {
  projects: Project[]
  services: Service[]
}

export function HomePageTemplate({ projects, services }: HomePageTemplateProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollSpyProvider />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SocialProofSection />
        <BenefitsSection />
        <ProjectsSection projects={projects} />
        <ServicesSection services={services} />
        <GuaranteeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}