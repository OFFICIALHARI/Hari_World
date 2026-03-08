import { create } from "zustand"

export const sections = [
  "asia",
  "europe",
  "northAmerica",
  "southAmerica",
  "africa",
  "australia",
  "antarctica",
] as const

export type Section = (typeof sections)[number]

// Continent labels for display
export const continentLabels: Record<Section, string> = {
  asia: "About Me",
  europe: "Skills",
  northAmerica: "Projects",
  southAmerica: "Education",
  africa: "Achievements",
  australia: "Certifications",
  antarctica: "Connect",
}

// 5-word taglines for each continent specialty
export const continentTaglines: Record<Section, string> = {
  asia: "Ancient wisdom meets innovation",
  europe: "Diverse skills, unified excellence",
  northAmerica: "Where ideas become reality",
  southAmerica: "Foundation of endless growth",
  africa: "Celebrating milestones and victories",
  australia: "Validated expertise, proven competence",
  antarctica: "Let's explore together always",
}

// Continent names for map display
export const continentNames: Record<Section, string> = {
  asia: "ASIA",
  europe: "EUROPE",
  northAmerica: "NORTH AMERICA",
  southAmerica: "SOUTH AMERICA",
  africa: "AFRICA",
  australia: "AUSTRALIA",
  antarctica: "ANTARCTICA",
}

type State = {
  isLanding: boolean
  currentIndex: number
  startJourney: () => void
  goToLanding: () => void
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

export const useNavigationStore = create<State>((set) => ({
  isLanding: true,
  currentIndex: 0,

  startJourney: () => set({ isLanding: false }),
  
  goToLanding: () => set({ isLanding: true, currentIndex: 0 }),

  next: () =>
    set((s) => ({
      currentIndex: Math.min(s.currentIndex + 1, sections.length - 1),
    })),

  prev: () =>
    set((s) => ({
      currentIndex: Math.max(s.currentIndex - 1, 0),
    })),

  goTo: (index) => set({ currentIndex: index }),
}))
