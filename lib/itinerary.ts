export type ActivityType =
  | "bike-tour"
  | "restaurant"
  | "dinner"
  | "sightseeing"
  | "activity"
  | "transport"

export type Activity = {
  id: string
  time: string // "09:30"
  type: ActivityType
  title: string
  description: string
  /** Human-readable place name, e.g. "Trattoria da Enzo, Rome" */
  location: string
  /** Optional query used for the embedded Google Map. Falls back to `location`. */
  mapQuery?: string
}

export type ItineraryDay = {
  id: string
  /** ISO date, e.g. "2026-06-15" */
  date: string
  title: string
  summary: string
  activities: Activity[]
}

export type Trip = {
  name: string
  subtitle: string
  days: ItineraryDay[]
}

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  "bike-tour": "Bike Tour",
  restaurant: "Restaurant",
  dinner: "Dinner",
  sightseeing: "Sightseeing",
  activity: "Activity",
  transport: "Transport",
}

const STORAGE_KEY = "daily-itinerary-trip-canaries-v2"

/** Returns today's date as a local "YYYY-MM-DD" string. */
export function todayISO(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

export function mapEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
}

export function mapLinkUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}

/** Seed trip — Lanzarote (16.–19. Juni) und dann Fuerteventura (bis 21. Juni). */
function buildSeedTrip(): Trip {
  return {
    name: "Kanaren-Reise",
    subtitle: "16.–21. Juni: Vier Tage Lanzarote, dann hinüber nach Fuerteventura.",
    days: [
      {
        id: uid(),
        date: "2026-06-16",
        title: "Ankunft auf Lanzarote",
        summary: "Anreise nach Lanzarote, Unterkunft beziehen und erster Abend in Playa Blanca.",
        activities: [
          {
            id: uid(),
            time: "17:00",
            type: "transport",
            title: "Ankunft Flughafen Lanzarote",
            description: "Landung in Arrecife. Weiter nach Playa Blanca: Bus (ca. 1:20 h) oder Taxi (ca. 30 Min, ~50 €).",
            location: "Aeropuerto de Lanzarote, Arrecife, Spain",
          },
          {
            id: uid(),
            time: "19:00",
            type: "activity",
            title: "Ankunft Unterkunft",
            description: "Einchecken, auspacken und ankommen.",
            location: "Playa Blanca, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "19:30",
            type: "sightseeing",
            title: "Spaziergang am Strand",
            description: "Erste frische Meeresluft und die Beine nach dem Flug vertreten.",
            location: "Playa Blanca, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "21:00",
            type: "dinner",
            title: "Abendessen: La Chalanita",
            description: "Erster Abend auf Lanzarote – lokale Küche direkt in Playa Blanca.",
            location: "La Chalanita, Playa Blanca, Lanzarote, Spain",
            mapQuery: "La Chalanita Playa Blanca Lanzarote",
          },
        ],
      },
      {
        id: uid(),
        date: "2026-06-17",
        title: "Gravel Bike Runde",
        summary: "Gravel-Bike-Tour entlang der Südwestküste: Janubio → Los Hervideros → El Golfo → Timanfaya → Yaiza → Playa Blanca. Ca. 45–55 km, 400–700 hm, 3–5 Stunden mit Pausen.",
        activities: [
          {
            id: uid(),
            time: "10:00",
            type: "restaurant",
            title: "Frühstück",
            description: "Ort folgt.",
            location: "Playa Blanca, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "11:00",
            type: "bike-tour",
            title: "Gravel Bike ausleihen – Papagayo Bike",
            description: "Leihrad für 2 Tage, 25 € / Tag. Dann Start der Tour Richtung Janubio.",
            location: "Papagayo Bike, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Papagayo Bike Playa Blanca Lanzarote",
          },
          {
            id: uid(),
            time: "11:30",
            type: "bike-tour",
            title: "Stop 1: Salinas de Janubio",
            description: "Tolle Fotomotive – die größten Salinen der Kanaren.",
            location: "Salinas de Janubio, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "12:30",
            type: "bike-tour",
            title: "Stop 2: Los Hervideros",
            description: "Brandung in den Lavahöhlen – spektakuläre Küstenformation.",
            location: "Los Hervideros, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "13:30",
            type: "restaurant",
            title: "Stop 3: El Golfo – Pause am Meer",
            description: "Café oder frischer Fisch direkt am türkisfarbenen Kratersee.",
            location: "El Golfo, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "15:00",
            type: "sightseeing",
            title: "Stop 4: Nationalpark Timanfaya",
            description: "Feuerberge und Geysir-Demonstration – die spektakuläre Vulkanlandschaft der Insel.",
            location: "Parque Nacional de Timanfaya, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "16:30",
            type: "bike-tour",
            title: "Stop 5: Yaiza",
            description: "Eines der schönsten weißen Dörfer der Insel – kurze Pause.",
            location: "Yaiza, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "20:00",
            type: "dinner",
            title: "Abendessen",
            description: "Ort folgt.",
            location: "Playa Blanca, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "22:00",
            type: "activity",
            title: "WM: England vs. Croatia – Irish Pub",
            description: "Fußball schauen im Irish Pub in Playa Blanca.",
            location: "Irish Pub, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Irish Pub Playa Blanca Lanzarote",
          },
        ],
      },
      {
        id: uid(),
        date: "2026-06-18",
        title: "Große Inselrunde",
        summary: "Ganztagestour quer über die Insel: Weinberge, Bergdörfer, Steilküste und Meer. 80–100 km, 1.000–1.500 hm.",
        activities: [
          {
            id: uid(),
            time: "10:00",
            type: "restaurant",
            title: "Frühstück",
            description: "Ort folgt.",
            location: "Playa Blanca, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "11:00",
            type: "bike-tour",
            title: "Start der Ganztagestour",
            description: "Playa Blanca → La Geria → Teguise → Haría → Mirador del Río → Arrieta → zurück.",
            location: "Playa Blanca, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "12:00",
            type: "bike-tour",
            title: "Stop 1: La Geria",
            description: "Die berühmten Weinberge in schwarzen Vulkanmulden – einzigartiges Landschaftsbild.",
            location: "La Geria, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "13:00",
            type: "bike-tour",
            title: "Stop 2: Teguise",
            description: "Ehemalige Inselhauptstadt mit schönen Plätzen und Cafés – kurze Pause.",
            location: "Teguise, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "14:00",
            type: "bike-tour",
            title: "Stop 3: Haría",
            description: "Das „Tal der tausend Palmen" – perfekter Kaffee-Stopp.",
            location: "Haría, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "15:00",
            type: "sightseeing",
            title: "Stop 4: Mirador del Río",
            description: "Der vielleicht spektakulärste Aussichtspunkt der Insel – Blick auf La Graciosa.",
            location: "Mirador del Río, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "16:30",
            type: "restaurant",
            title: "Stop 5: Arrieta – Mittagessen oder Eis",
            description: "Direkt am Meer. Perfekt für eine große Pause nach der Bergstrecke.",
            location: "Arrieta, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "20:00",
            type: "dinner",
            title: "Abendessen",
            description: "Ort folgt.",
            location: "Playa Blanca, Lanzarote, Spain",
          },
        ],
      },
      {
        id: uid(),
        date: "2026-06-19",
        title: "Fähre nach Fuerteventura",
        summary: "Vormittags letzter Strand, dann mit der Fähre von Playa Blanca nach Corralejo.",
        activities: [
          {
            id: uid(),
            time: "09:00",
            type: "activity",
            title: "Strandmorgen Papagayo",
            description: "Letztes Bad an den goldenen Papagayo-Buchten im Süden.",
            location: "Playas de Papagayo, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "13:00",
            type: "transport",
            title: "Fähre Playa Blanca → Corralejo",
            description: "Überfahrt nach Fuerteventura, ca. 30 Minuten über die Meerenge.",
            location: "Estación Marítima Playa Blanca, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "16:00",
            type: "sightseeing",
            title: "Altstadt von Corralejo",
            description: "Ankommen, Unterkunft beziehen und durch den Hafenort bummeln.",
            location: "Corralejo, Fuerteventura, Spain",
          },
          {
            id: uid(),
            time: "20:00",
            type: "dinner",
            title: "Abendessen in Corralejo",
            description: "Frischer Thunfisch am Hafen zum ersten Abend auf Fuerteventura.",
            location: "Restaurante Avenida, Corralejo, Fuerteventura, Spain",
          },
        ],
      },
      {
        id: uid(),
        date: "2026-06-20",
        title: "Dünen von Corralejo",
        summary: "Der Naturpark mit seinen weiten Sanddünen und türkisem Wasser.",
        activities: [
          {
            id: uid(),
            time: "09:30",
            type: "bike-tour",
            title: "Radtour zu den Dünen",
            description: "Entlang der Küste durch den Parque Natural de Corralejo.",
            location: "Parque Natural de Corralejo, Fuerteventura, Spain",
          },
          {
            id: uid(),
            time: "12:00",
            type: "activity",
            title: "Baden am Grandes Playas",
            description: "Schwimmen und Schnorcheln an den weißen Sandstränden.",
            location: "Grandes Playas, Corralejo, Fuerteventura, Spain",
          },
          {
            id: uid(),
            time: "14:30",
            type: "restaurant",
            title: "Mittagessen am Strand",
            description: "Leichte Bowls und Smoothies in einem Beach-Café.",
            location: "El Cotillo, Fuerteventura, Spain",
          },
          {
            id: uid(),
            time: "20:00",
            type: "dinner",
            title: "Abendessen in El Cotillo",
            description: "Sonnenuntergangsdinner an der wilden Westküste.",
            location: "La Vaca Azul, El Cotillo, Fuerteventura, Spain",
          },
        ],
      },
      {
        id: uid(),
        date: "2026-06-21",
        title: "Süden & Abreise",
        summary: "Letzter Tag auf Fuerteventura mit Aussicht und entspanntem Abschied.",
        activities: [
          {
            id: uid(),
            time: "10:00",
            type: "sightseeing",
            title: "Mirador Morro Velosa",
            description: "Panoramablick über die Inselmitte mit Manrique-Aussichtspunkt.",
            location: "Mirador Morro Velosa, Betancuria, Fuerteventura, Spain",
          },
          {
            id: uid(),
            time: "12:30",
            type: "restaurant",
            title: "Mittagessen in Betancuria",
            description: "Letztes Essen im historischen Inseldorf, kanarischer Ziegenkäse.",
            location: "Casa Santa María, Betancuria, Fuerteventura, Spain",
          },
          {
            id: uid(),
            time: "16:00",
            type: "transport",
            title: "Abreise Flughafen Fuerteventura",
            description: "Mietwagen abgeben und ab zum Flughafen für den Rückflug.",
            location: "Aeropuerto de Fuerteventura, Spain",
          },
        ],
      },
    ],
  }
}

export function loadTrip(): Trip {
  if (typeof window === "undefined") return buildSeedTrip()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return buildSeedTrip()
    const parsed = JSON.parse(raw) as Trip
    if (!parsed?.days) return buildSeedTrip()
    return parsed
  } catch {
    return buildSeedTrip()
  }
}

export function saveTrip(trip: Trip): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trip))
}

/** Picks the day matching today, otherwise the next upcoming day, otherwise the last day. */
export function pickActiveDayIndex(days: ItineraryDay[]): number {
  if (days.length === 0) return 0
  const today = todayISO()
  const exact = days.findIndex((d) => d.date === today)
  if (exact !== -1) return exact
  const upcoming = days.findIndex((d) => d.date > today)
  if (upcoming !== -1) return upcoming
  return days.length - 1
}
