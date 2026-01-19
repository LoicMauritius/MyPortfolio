"use client"

import { useEffect } from "react"

const SECTION_IDS = ["results", "projects", "services", "testimonials", "contact"]

export function useScrollSpy() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            const newHash = `#${id}`

            if (window.location.hash !== newHash) {
              window.history.replaceState(null, "", newHash)
            }
            return
          }
        }

        // Si aucune section n'est visible et qu'on est en haut de la page
        if (window.scrollY < 200 && window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname)
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    )

    // Observer toutes les sections
    for (const id of SECTION_IDS) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }

    // Gérer le scroll en haut de page pour nettoyer le hash
    const handleScroll = () => {
      if (window.scrollY < 200 && window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
}
