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
        title: "Ankunft in Playa Blanca",
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
            title: "Spaziergang Papagayo-Strand",
            description: "Marie: Der Strand ist etwas abgelegen, aber ziemlich schoen. Erste Meeresluft nach dem Flug.",
            location: "Papagayo-Strand, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Papagayo Strand Playa Blanca Lanzarote",
          },
          {
            id: uid(),
            time: "21:00",
            type: "dinner",
            title: "Abendessen: La Chalanita",
            description: "Caro empfiehlt: Canneloni oder die veggi Lasagne – und unbedingt einen Sangria bianco fuer den Espaniol-Vibe!",
            location: "La Chalanita, Playa Blanca, Lanzarote, Spain",
            mapQuery: "La Chalanita Playa Blanca Lanzarote",
          },
        ],
      },
      {
        id: uid(),
        date: "2026-06-17",
        title: "Kuestenrunde Suedwest (~50 km)",
        summary: "Gravel-Bike-Tour ab Playa Blanca entlang der Suedwestkueste. Salinen, Lavahöhlen, gruener Kratersee, Feuerberge, weisses Dorf. Ca. 50 km, 500 hm.",
        activities: [
          {
            id: uid(),
            time: "09:30",
            type: "restaurant",
            title: "Fruehstueck: Panaderia Los Abuelos",
            description: "Lokale Baeckerei direkt in Playa Blanca – frische Broetchen und Kaffee fuer den Start.",
            location: "Panaderia Los Abuelos, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Panaderia Los Abuelos Playa Blanca Lanzarote",
          },
          {
            id: uid(),
            time: "11:00",
            type: "bike-tour",
            title: "Bike ausleihen: Papagayo Bike",
            description: "Caro empfiehlt: Hier bei Bedarf Drahtesel ausleihen – oder ein geiles Gravel! 25 EUR pro Tag fuer 2 Tage.",
            location: "Papagayo Bike, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Papagayo Bike Playa Blanca Lanzarote",
          },
          {
            id: uid(),
            time: "11:30",
            type: "bike-tour",
            title: "Stop 1: Mirador Salinas de Janubio",
            description: "Die groessten Salinen der Kanaren – tolle Fotomotive mit den schwarzen Lavafeldern im Hintergrund.",
            location: "Mirador Salinas de Janubio, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "12:15",
            type: "bike-tour",
            title: "Stop 2: Los Hervideros",
            description: "Brandung in den Lavahöhlen – spektakulaere Kuestenformation, bei Wellengang ein Erlebnis.",
            location: "Los Hervideros, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "13:00",
            type: "restaurant",
            title: "Stop 3: El Golfo – Mittag am Kratersee",
            description: "Frischer Fisch oder Tapas direkt am einzigartigen gruenen Kratersee. Grosse Mittagspause.",
            location: "El Golfo, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "14:30",
            type: "sightseeing",
            title: "Stop 4: Nationalpark Timanfaya",
            description: "Feuerberge und Geysir-Demonstration – die Marslandschaft der Insel. Besucherzentrum direkt an der Route.",
            location: "Parque Nacional de Timanfaya, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "16:00",
            type: "restaurant",
            title: "Stop 5: Yaiza – Kaffee im Dorf",
            description: "Eines der schoensten weiss-kubischen Doerfer Lanzarotes. Bar Stop liegt direkt hier.",
            location: "Yaiza, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "20:00",
            type: "dinner",
            title: "Abendessen: Sunset Lounge",
            description: "Direkt in Playa Blanca mit Blick aufs Meer – perfekt nach dem ersten Radltag.",
            location: "Sunset Lounge, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Sunset Lounge Playa Blanca Lanzarote",
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
        title: "Weinberge & Strand (~40 km)",
        summary: "Entspannte Gravel-Runde durch die Weinregion La Geria, dann Nachmittag am Papagayo-Strand. Ca. 40 km, 400 hm.",
        activities: [
          {
            id: uid(),
            time: "09:30",
            type: "restaurant",
            title: "Fruehstueck: Panaderia Los Abuelos",
            description: "Nochmal die lokale Baeckerei in Playa Blanca fuer den entspannten Start.",
            location: "Panaderia Los Abuelos, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Panaderia Los Abuelos Playa Blanca Lanzarote",
          },
          {
            id: uid(),
            time: "10:30",
            type: "bike-tour",
            title: "Start: Playa Blanca Richtung La Geria",
            description: "Playa Blanca → Yaiza → La Geria → Bodegas El Grifo → zurueck nach Playa Blanca. Kurze, schoene Runde durch die Vulkanlandschaft.",
            location: "Playa Blanca, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "11:15",
            type: "bike-tour",
            title: "Stop 1: Yaiza – kurze Pause",
            description: "Weisses Dorf als erster Stop – Kaffee und das schoene Ortsbild geniessen.",
            location: "Yaiza, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "12:00",
            type: "sightseeing",
            title: "Stop 2: La Geria – Weinberge",
            description: "Die beruehmten Weinberge in schwarzen Vulkanmulden – eines der einzigartigsten Landschaftsbilder der Welt.",
            location: "La Geria, Lanzarote, Spain",
          },
          {
            id: uid(),
            time: "12:30",
            type: "restaurant",
            title: "Stop 3: Bodegas El Grifo – Weinprobe",
            description: "Aelteste Bodega der Kanaren. Malvasia-Wein probieren und kurze Pause im Schatten.",
            location: "Bodegas El Grifo, La Geria, Lanzarote, Spain",
            mapQuery: "Bodegas El Grifo Lanzarote",
          },
          {
            id: uid(),
            time: "14:30",
            type: "activity",
            title: "Nachmittag: Papagayo-Strände",
            description: "Marie: Ziemlich schoen und etwas abgelegen. Baden, Schnorcheln und Entspannen an den goldenen Buchten direkt vor Playa Blanca.",
            location: "Playas de Papagayo, Lanzarote, Spain",
            mapQuery: "Playas de Papagayo Lanzarote",
          },
          {
            id: uid(),
            time: "20:00",
            type: "dinner",
            title: "Abendessen: Sunset Lounge",
            description: "Sonnenuntergangsdinner direkt in Playa Blanca – perfekter Abschluss der Lanzarote-Tage.",
            location: "Sunset Lounge, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Sunset Lounge Playa Blanca Lanzarote",
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
