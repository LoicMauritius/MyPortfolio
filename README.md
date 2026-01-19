# Portfolio - Loïc Mauritius

Portfolio professionnel de développeur web full stack, construit avec les dernières technologies React et Next.js.

## Stack Technique

| Catégorie | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| Framework | Next.js | 16.1.1 | App Router, RSC, optimisations automatiques |
| UI | React | 19.2.3 | Concurrent features, Server Components |
| Langage | TypeScript | 5.x | Typage strict, meilleure DX |
| Styling | Tailwind CSS | 4.1.9 | Utility-first, configuration CSS native |
| Composants UI | shadcn/ui + Radix UI | - | Accessibilité, personnalisation totale |
| i18n | next-intl | 4.7.0 | SSR/SSG compatible, routing intégré |
| Email | Resend | 6.7.0 | API moderne, templates React |
| Analytics | Vercel Analytics | 1.6.1 | Zero-config, privacy-friendly |
| Package Manager | pnpm | - | Rapide, économe en espace disque |

## Architecture du Projet

```
portfoliov2/
├── app/
│   ├── [locale]/                 # Routes localisées (fr/en)
│   │   ├── layout.tsx            # Layout racine avec providers
│   │   ├── page.tsx              # Page d'accueil
│   │   ├── globals.css           # Styles globaux + variables CSS
│   │   ├── projects/
│   │   │   ├── page.tsx          # Liste des projets
│   │   │   └── [slug]/page.tsx   # Détail projet
│   │   └── services/
│   │       ├── page.tsx          # Liste des services
│   │       └── [slug]/page.tsx   # Détail service
│   └── api/
│       └── contact/route.ts      # API endpoint formulaire contact
├── components/
│   ├── atoms/                    # Composants de base (Heading, Text, Badge)
│   ├── molecules/                # Combinaisons simples (Cards, NavItem)
│   ├── organisms/                # Sections complètes (Header, Footer, Sections)
│   ├── templates/                # Layouts de pages
│   ├── providers/                # Context providers
│   └── ui/                       # Composants shadcn/ui
├── data/
│   ├── projects.json             # Données des projets (multilingue)
│   ├── services.json             # Données des services (multilingue)
│   ├── types.ts                  # Interfaces TypeScript
│   └── index.ts                  # Exports centralisés
├── hooks/
│   ├── use-mobile.ts             # Détection responsive
│   ├── use-scroll-spy.ts         # Synchronisation URL/scroll
│   └── use-toast.ts              # Notifications toast
├── i18n/
│   ├── routing.ts                # Configuration locales
│   ├── request.ts                # Chargement messages serveur
│   ├── navigation.ts             # Composants navigation localisés
│   └── messages/
│       ├── fr.json               # Traductions françaises
│       └── en.json               # Traductions anglaises
└── lib/
    └── utils.ts                  # Utilitaires (cn, etc.)
```

## Design System - Atomic Design

Le projet suit la méthodologie **Atomic Design** pour une architecture de composants scalable :

### Atoms (`components/atoms/`)
Éléments de base, sans dépendances :
- **`heading.tsx`** : Titres sémantiques h1-h4 avec tailles responsives
- **`text.tsx`** : Paragraphes avec variantes (default, secondary, muted)
- **`section-badge.tsx`** : Badge de section avec style primaire

### Molecules (`components/molecules/`)
Combinaisons de 2-3 atoms :
- **`project-card.tsx`** : Carte projet avec image, tags, hover effects
- **`service-card.tsx`** : Carte service avec deliverables, CTA vers `/services/[slug]`
- **`skill-card.tsx`** : Carte compétence avec icône
- **`nav-item.tsx`** : Lien navigation avec états actif/hover
- **`social-link.tsx`** : Lien réseau social (target="_blank", rel="noopener")

### Organisms (`components/organisms/`)
Sections complètes de page :
- **`header.tsx`** : Navigation sticky, menu mobile (Sheet), CTA
- **`hero-section.tsx`** : Hero avec titre, sous-titre, CTAs
- **`projects-section.tsx`** : Grille de projets
- **`services-section.tsx`** : Grille de services avec badge "Recommandé"
- **`contact-section.tsx`** : Formulaire de contact avec envoi via Resend
- **`calendly-modal.tsx`** : Modal de prise de RDV Calendly
- **`footer.tsx`** : Footer avec liens et informations

### Templates (`components/templates/`)
Composition d'organisms pour les pages :
- **`home-page-template.tsx`** : Compose toutes les sections de la homepage + ScrollSpyProvider

## Fonctionnalités Implémentées

### 1. Internationalisation (i18n)

**Configuration** : `i18n/routing.ts`
```typescript
export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});
```

**Utilisation dans les composants** :
```typescript
// Client Component
"use client"
import { useTranslations } from 'next-intl'
const t = useTranslations('section')

// Server Component
import { getTranslations } from 'next-intl/server'
const t = await getTranslations('section')
```

**Navigation localisée** : Utiliser `@/i18n/navigation` au lieu de `next/link`

### 2. Formulaire de Contact avec Resend

**Endpoint** : `POST /api/contact`

**Champs** :
| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| name | string | Oui | Nom du contact |
| email | string | Oui | Email (utilisé pour replyTo) |
| company | string | Non | Entreprise |
| project | string | Oui | Description du projet |

**Variables d'environnement** :
```env
RESEND_API=re_xxxxxxxxxxxxx
CONTACT_EMAIL=votre@email.com  # Optionnel, défaut: loicmauritius@gmail.com
```

**Implémentation** : Le formulaire dans `ContactSection` gère les états (idle, success, error) et affiche des messages de feedback localisés.

### 3. Scroll Spy - Synchronisation URL

**Hook** : `hooks/use-scroll-spy.ts`

**Fonctionnement** :
- Utilise `IntersectionObserver` pour détecter les sections visibles
- Met à jour l'URL avec `history.replaceState` (pas d'ajout à l'historique)
- Sections observées : `#results`, `#projects`, `#services`, `#testimonials`, `#contact`
- Nettoie le hash quand scroll < 200px

**Configuration IntersectionObserver** :
```typescript
{
  rootMargin: "-20% 0px -60% 0px",  // Zone de détection centrée
  threshold: 0
}
```

### 4. Système de Booking Calendly

**Provider** : `components/providers/calendly-provider.tsx`

**Utilisation** :
```typescript
import { useCalendly } from '@/components/providers/calendly-provider'

const { openCalendly } = useCalendly()

<Button onClick={openCalendly}>Réserver un appel</Button>
```

**Fonctionnement** :
- Modal Dialog contrôlée par Context
- Widget Calendly chargé dynamiquement
- URL Calendly : `https://calendly.com/loicmauritius/30min`

### 5. Gestion des Données Multilingues

**Structure des données** (`data/types.ts`) :
```typescript
interface LocalizedString {
  fr: string;
  en: string;
}

interface Project {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  // ...
}
```

**Utilisation** :
```typescript
import { projectsData, type Project, type Locale } from '@/data'
const locale = useLocale() as Locale
const title = project.title[locale]
```

## Installation et Développement

### Prérequis
- Node.js 20+
- pnpm

### Installation

```bash
# Cloner le repository
git clone <repo-url>
cd portfoliov2

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés
```

### Commandes

```bash
pnpm dev      # Serveur de développement (http://localhost:3000)
pnpm build    # Build de production
pnpm start    # Serveur de production
pnpm lint     # Linter ESLint
```

### Variables d'Environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `RESEND_API` | Clé API Resend pour l'envoi d'emails | Oui |
| `CONTACT_EMAIL` | Email de réception des messages | Non |

## Conventions de Code

### Composants
- Export nommé (pas de default export)
- `"use client"` si hooks React utilisés
- Interface props suffixée par `Props`
- Utiliser `cn()` pour merger les classNames

### Styling
- Tailwind utility classes uniquement
- CSS variables pour le theming : `--primary`, `--foreground`, etc.
- Breakpoints : `md:` (768px), `lg:` (1024px)

### Données
- Toutes les chaînes UI dans les fichiers i18n
- Données structurées dans `data/` avec typage strict
- Accès via locale : `data[locale]`

## Structure des Pages

### Homepage (`/[locale]`)
```
Header (sticky)
├── HeroSection
├── SocialProofSection
├── BenefitsSection (id="results")
├── ProjectsSection (id="projects")
├── ServicesSection (id="services")
├── GuaranteeSection
├── ContactSection (id="contact")
└── Footer
```

### Pages Projets
- `/[locale]/projects` : Liste de tous les projets
- `/[locale]/projects/[slug]` : Détail d'un projet

### Pages Services
- `/[locale]/services` : Liste de tous les services
- `/[locale]/services/[slug]` : Détail d'un service

## Déploiement

### Vercel (Recommandé)
1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Déployer

### Docker
```dockerfile
# Dockerfile inclus pour développement/debugging
FROM node:25
RUN npm install -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install
CMD ["sh"]
```

## Licence

Tous droits réservés - Loïc Mauritius
