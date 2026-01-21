import projectsJson from './projects.json';
import servicesJson from './services.json';
import type { ProjectsData, ServicesData } from './types';

// Typage explicite des données JSON
export const projectsData = projectsJson satisfies ProjectsData;
export const servicesData: ServicesData = servicesJson as ServicesData;

// Export des types
export * from './types';
