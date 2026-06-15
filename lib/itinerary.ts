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

const STORAGE_KEY = "daily-itinerary-trip-canaries-v3"

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
        summary: "Anreise nach Playa Blanca, ankommen und erster Abend am Meer.",
        activities: [
          {
            id: uid(),
            time: "17:00",
            type: "transport",
            title: "Ankunft Flughafen Lanzarote",
            description: "Landung in Arrecife. Weiter nach Playa Blanca: Bus (ca. 1:20 h) oder Taxi (ca. 30 Min, ~50 EUR).",
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
            title: "Spaziergang am Papagayo-Strand",
            description: "Erste frische Meeresluft. Der Strand ist etwas abgelegen, aber ziemlich schoen. (Tipp von Marie)",
            location: "Papagayo-Strand, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Papagayo Strand Playa Blanca Lanzarote",
          },
          {
            id: uid(),
            time: "21:00",
            type: "dinner",
            title: "Abendessen: La Chalanita",
            description: "Caro empfiehlt: Canneloni oder die veggi Lasagne. Dazu unbedingt einen Sangria bianco fuer den espaniol-Vibe!",
            location: "La Chalanita, Playa Blanca, Lanzarote, Spain",
            mapQuery: "La Chalanita Playa Blanca Lanzarote",
          },
        ],
      },
      {
        id: uid(),
        date: "2026-06-17",
        title: "Kuestenrunde Sued-Lanzarote",
        summary: "Moderate Gravel-Bike-Tour entlang der Suedwestkueste: Janubio - Los Hervideros - El Golfo - Timanfaya - Yaiza. Ca. 45-55 km, 400-700 hm.",
        activities: [
          {
            id: uid(),
            time: "10:00",
            type: "restaurant",
            title: "Fruehstueck: Panaderia Los Abuelos",
            description: "Lokale Baeckerei in Playa Blanca – perfekt fuer den Start in den Radltag.",
            location: "Panaderia Los Abuelos, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Panaderia Los Abuelos Playa Blanca Lanzarote",
          },
          {
            id: uid(),
            time: "11:00",
            type: "bike-tour",
            title: "Gravel Bike ausleihen: Papagayo Bike",
            description: "Caro empfiehlt: Hier bei Bedarf schon Drahtesel ausleihen – oder halt ein geiles Gravel! 25 EUR pro Tag.",
            location: "Papagayo Bike, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Papagayo Bike Playa Blanca Lanzarote",
          },
          {
            id: uid(),
            time: "11:30",
            type: "bike-tour",
            title: "Stop 1: Mirador Salinas de Janubio",
            description: "Die groessten Salinen der Kanaren – tolle Fotomotive mit den schwarzen Lavafeldern.",
            location: "Mirador Salinas de Janubio, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "12:30",
            type: "bike-tour",
            title: "Stop 2: Los Hervideros",
            description: "Brandung in den Lavahöhlen – spektakulaere Kuestenformation, bei Wellengang ein Erlebnis.",
            location: "Los Hervideros, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "13:30",
            type: "restaurant",
            title: "Stop 3: El Golfo – Mittag am Kratersee",
            description: "Frischer Fisch oder Tapas direkt am einzigartigen gruenen Kratersee. Perfekte Mittagspause.",
            location: "El Golfo, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "15:00",
            type: "sightseeing",
            title: "Stop 4: Nationalpark Timanfaya",
            description: "Feuerberge, Geysir-Demonstration und Marslandschaft. Besucherzentrum direkt an der Route.",
            location: "Parque Nacional de Timanfaya, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "16:30",
            type: "bike-tour",
            title: "Stop 5: Yaiza",
            description: "Eines der schoensten weiss-kubischen Doerfer der Insel – kurze Kaffeepause.",
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
            title: "WM: England vs. Croatia – Slainte Irish Pub",
            description: "Caro empfiehlt: hier Fussi schauen – woahhhh!",
            location: "Slainte Bar, The Irish Pub, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Slainte Bar Irish Pub Playa Blanca Lanzarote",
          },
        ],
      },
      {
        id: uid(),
        date: "2026-06-18",
        title: "Grosse Inselrunde",
        summary: "Ganztagestour quer ueber die Insel: Weinberge, Bergdoerfer, Steilkueste, Lavahöhlen und Meer. 80-100 km, 1.000-1.500 hm.",
        activities: [
          {
            id: uid(),
            time: "10:00",
            type: "restaurant",
            title: "Fruehstueck: Oppa Specialty Coffee",
            description: "Kinga empfiehlt dieses Cafe sehr. Specialty Coffee und gutes Fruehstueck fuer den langen Tag.",
            location: "Oppa Specialty Coffee and Breakfast, Lanzarote, Spain",
            mapQuery: "Oppa Specialty Coffee Breakfast Lanzarote",
          },
          {
            id: uid(),
            time: "11:00",
            type: "bike-tour",
            title: "Start: Playa Blanca",
            description: "Playa Blanca → La Geria → Bodegas El Grifo → Teguise → Museo Lagomar → Haria → Mirador del Rio → Jameos del Agua → Arrieta → zurueck.",
            location: "Playa Blanca, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "12:00",
            type: "bike-tour",
            title: "Stop 1: La Geria + Bodegas El Grifo",
            description: "Weinberge in schwarzen Vulkanmulden – einzigartiges Landschaftsbild. Kurze Weinprobe bei Bodegas El Grifo direkt an der Route.",
            location: "La Geria, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "13:00",
            type: "bike-tour",
            title: "Stop 2: Teguise + Museo Lagomar",
            description: "Ehemalige Inselhauptstadt. Das Museo Lagomar (Hoehlenhaus von Omar Sharif) ist ein verstecktes Highlight.",
            location: "Teguise, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "14:00",
            type: "bike-tour",
            title: "Stop 3: Haria – Kaffee im Palmendorf",
            description: "Das Tal der tausend Palmen – perfekter Kaffee-Stopp. La Puerta Verde hier ausprobieren (Kinga: war sehr suess).",
            location: "Haría, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "15:00",
            type: "sightseeing",
            title: "Stop 4: Mirador del Rio",
            description: "Kinga empfiehlt: Kein schlechter Ausblick auf La Graciosa und den Vulcano! Vielleicht auch zum Sonnenuntergang mit einem Corona in der Hand.",
            location: "Mirador del Río, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "15:45",
            type: "sightseeing",
            title: "Stop 5: Jameos del Agua",
            description: "Kinga empfiehlt: Falls du dich mal nach Kultur sehnst. Lavahöhle mit Lagune und Konzertsaal von Cesar Manrique.",
            location: "Jameos del Agua, Haría, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "17:00",
            type: "restaurant",
            title: "Stop 6: Arrieta – Pause am Meer",
            description: "Direkt am Meer. Perfekt fuer Mittagessen oder Eis nach der langen Bergstrecke. Punta Mujeres liegt gleich nebenan.",
            location: "Arrieta, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "20:00",
            type: "dinner",
            title: "Abendessen: Mirador de El Risco de Famara",
            description: "Atemberaubender Ausblick ueber die Famara-Klippen zum Abschluss des groessten Radltags.",
            location: "Mirador de El Risco de Famara, Lanzarote, Spain",
            mapQuery: "Mirador de El Risco de Famara Parque El Bosquecillo Lanzarote",
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
  return buildSeedTrip()
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
