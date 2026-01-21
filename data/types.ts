// Localized string type for multilingual content
export type Locale = "fr" | "en";

export interface LocalizedString {
  fr: string;
  en: string;
}

export interface LocalizedStringArray {
  fr: string[];
  en: string[];
}

export interface LocalizedProcess {
  fr: { step: string; description: string }[];
  en: { step: string; description: string }[];
}

export interface Project {
  slug: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  context: LocalizedString;
  problem: LocalizedString;
  solution: LocalizedString;
  results: LocalizedString;
  competences: string[];
  technologies: string[];
  features: LocalizedStringArray;
  images: string[];
  links: {
    demo?: string | null
    github?: string | null
  }
  status: LocalizedString;
  date: string;
}

export interface Service {
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  problemSolved: LocalizedString;
  deliverables: LocalizedStringArray;
  competences: string[];
  technologies: string[];
  process: LocalizedProcess;
  duration: LocalizedString;
  priceRange: LocalizedString;
  cta: LocalizedString;
}

export interface ProjectsData {
  projects: Project[];
}

export interface ServicesData {
  services: Service[];
}

// Helper function to get localized value
export function getLocalizedValue<T>(
  localizedObj: { fr: T; en: T },
  locale: Locale
): T {
  return localizedObj[locale];
}
