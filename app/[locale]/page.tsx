import { HomePageTemplate } from "@/components/templates"
import { projectsData, servicesData } from "@/data"

export default function HomePage() {
  const projects = projectsData.projects
  const services = servicesData.services

  return (
    <HomePageTemplate projects={projects} services={services} />
  )
}
