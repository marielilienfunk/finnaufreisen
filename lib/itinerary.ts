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
  /** Optional selectable options shown as bubbles, e.g. restaurant choices */
  options?: string[]
  /** Optional per-option details (description + map). Index matches options[]. */
  optionDetails?: { description?: string; location?: string; mapQuery?: string }[]
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
            title: "Abendessen: Ort folgt",
            description: "Ort folgt.",
            location: "Playa Blanca, Lanzarote, Spain",
            options: ["La Chalanita", "1926 Pizzeria Napoletana"],
            optionDetails: [
              { description: "Caro: Lecki Schmecki ich war da noch nie aber wuerde mir auf jeden Fall die Canneloni reindonnern oder die veggi Lasagne. Fuer den espanioloooo vibe einen Sangria (am besten bianco !!!) Send pics du Mausebaer", mapQuery: "La Chalanita Playa Blanca Lanzarote", location: "La Chalanita, Playa Blanca, Lanzarote, Spain" },
              { description: "Mereli: Hier lecker pizziiiiii", mapQuery: "1926 Pizzeria Napoletana Playa Blanca", location: "1926 Pizzeria Napoletana, Playa Blanca, Lanzarote, Spain" },
            ],
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
            title: "Fruehstueck: Panaderia M&M",
            description: "Mereli: hier was holen zum Fruehstueck",
            location: "Panaderia M&M, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Panaderia M&M Playa Blanca Lanzarote",
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
            options: ["Option 1", "Option 2", "Option 3"],
            title: "Abendessen: Ort folgt",
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
        title: "Weinberge & Strand (~40 km)",
        summary: "Entspannte Gravel-Runde durch die Weinregion La Geria, dann Nachmittag am Papagayo-Strand. Ca. 40 km, 400 hm.",
        activities: [
          {
            id: uid(),
            time: "09:30",
            type: "restaurant",
            title: "Fruehstueck: Cappuccino Grand Cafe",
            description: "Mereli: hier auch lecker Fruehstueck",
            location: "Cappuccino Grand Cafe, Playa Blanca, Lanzarote, Spain",
            mapQuery: "Cappuccino Grand Cafe Playa Blanca Lanzarote",
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
            options: ["Option 1", "Option 2", "Option 3"],
            title: "Abendessen: Ort folgt",
            description: "Ort folgt.",
            location: "Playa Blanca, Lanzarote, Spain",
          },
        ],
      },
      {
        id: uid(),
        date: "2026-06-19",
        title: "Fähre nach Fuerteventura",
        summary: "Fruehstueck in Playa Blanca, dann frueh mit der Faehre nach Corralejo. Unterkunft beziehen und ersten Abend in Corralejo erkunden.",
        activities: [
          {
            id: uid(),
            time: "11:30",
            type: "restaurant",
            title: "Spaetes Fruehstueck: Cafe La Ola",
            description: "Kinga: schrecklicher Kaffee aber sie haben Hafermilch. Yeey! Erstes Fruehstueck auf Fuerteventura nach der Ankunft.",
            location: "Cafe La Ola, Corralejo, Fuerteventura, Spain",
            mapQuery: "Cafe La Ola Corralejo Fuerteventura",
          },
          {
            id: uid(),
            time: "10:00",
            type: "transport",
            title: "Faehre Playa Blanca nach Corralejo",
            description: "Ueberfahrt ca. 30 Min. Zwei Anbieter: Lineas Romero und Naviera Armas – beide fahren mehrmals taeglich. Tickets online im Voraus buchen: lineasromero.com oder navieraarmas.com. Preis ca. 15-20 EUR pro Person. Abfahrt ab Estacion Maritima Playa Blanca.",
            location: "Estacion Maritima Playa Blanca, Lanzarote, Spain",
            mapQuery: "Estacion Maritima Playa Blanca Lanzarote",
          },
          {
            id: uid(),
            time: "11:00",
            type: "activity",
            title: "Ankunft & Unterkunft Corralejo",
            description: "Einchecken, auspacken und durch den Hafenort bummeln.",
            location: "Corralejo, Fuerteventura, Spain",
          },
          {
            id: uid(),
            time: "13:00",
            type: "restaurant",
            options: ["Option 1", "Option 2", "Option 3"],
            title: "Mittagessen: Ort folgt",
            description: "Ort folgt.",
            location: "Corralejo, Fuerteventura, Spain",
          },
          {
            id: uid(),
            time: "20:00",
            type: "dinner",
            title: "Abendessen: MALVERDE TAQUERIA",
            description: "Kingo: Alles probieren! Alles ganz toll lecker – grandios und absolutes Highlight!",
            location: "MALVERDE TAQUERIA, Corralejo, Fuerteventura, Spain",
            mapQuery: "Malverde Taqueria Corralejo Fuerteventura",
          },
          {
            id: uid(),
            time: "22:00",
            type: "activity",
            title: "Absacker: Weirdos Elephant Bar",
            description: "An bestimmten Tagen gibt es Karaoke – absolut iconic. Alter Boazn-Vibe, Briten bestaunen. (Tipp aus der Liste)",
            location: "Weirdos Elephant Bar, Corralejo, Fuerteventura, Spain",
            mapQuery: "Weirdos Elephant Bar Corralejo Fuerteventura",
          },
        ],
      },
      {
        id: uid(),
        date: "2026-06-20",
        title: "Radltour El Cotillo (~45 km)",
        summary: "Gravel-Bike-Tour von Corralejo zur Westküste: Lajares, El Cotillo, Naturpools – und nachmittags zurück zum Strand. Ca. 45 km.",
        activities: [
          {
            id: uid(),
            time: "09:00",
            type: "restaurant",
            title: "Fruehstueck: Panaderia Los Abuelos",
            description: "Ort folgt.",
            location: "Panaderia Los Abuelos, Fuerteventura, Spain",
            mapQuery: "Panaderia Los Abuelos Fuerteventura",
          },
          {
            id: uid(),
            time: "10:00",
            type: "bike-tour",
            title: "Bike ausleihen: Dune e-Bike",
            description: "Caro empfiehlt: Hier Gravel ausleihen und tolle Radltour machen!",
            location: "Dune e Bike rent and excursion, Corralejo, Fuerteventura, Spain",
            mapQuery: "Dune e Bike Corralejo Fuerteventura",
          },
          {
            id: uid(),
            time: "10:30",
            type: "bike-tour",
            title: "Stop 1: Lajares – ALMIRANTE BRUNCH",
            description: "Schönes Dorf in der Inselmitte. ALMIRANTE BRUNCH für Kaffee oder zweites Frühstück.",
            location: "Lajares, Fuerteventura, Spain",
          },
          {
            id: uid(),
            time: "12:00",
            type: "restaurant",
            title: "Stop 2: El Cotillo – Happy Cactus",
            description: "Veggie-Highlight: Burger erschreckend gut, Croquetas wenn verfügbar. Papas con Mojo nicht vergessen! Sonnenuntergang und Strand direkt nebenan.",
            location: "Restaurante Happy Cactus El Cotillo, Fuerteventura, Spain",
            mapQuery: "Restaurante Happy Cactus El Cotillo Fuerteventura",
          },
          {
            id: uid(),
            time: "14:00",
            type: "activity",
            title: "Stop 3: Piscinas Naturales de Playa de los Charcos",
            description: "Natürliche Lavapools direkt am Meer – zum Schwimmen und Schnorcheln perfekt.",
            location: "Piscinas naturales de Playa de los Charcos, Fuerteventura, Spain",
            mapQuery: "Piscinas naturales Playa de los Charcos Fuerteventura",
          },
          {
            id: uid(),
            time: "16:00",
            type: "activity",
            title: "Nachmittag: Strand bei Corralejo",
            description: "Zurück in Corralejo, Abkühlung an den weißen Sanddünen.",
            location: "Grandes Playas, Corralejo, Fuerteventura, Spain",
          },
          {
            id: uid(),
            time: "20:00",
            type: "dinner",
            title: "Abendessen: Restaurante Acorralado",
            description: "Spontan und ungeplant – brutales Preis-Leistungs-Verhältnis, viele Locals, 700 Jahre alter sympathisch granting Kellner. Alles fix, lecker und günstig.",
            location: "Restaurante Acorralado, Corralejo, Fuerteventura, Spain",
            mapQuery: "Restaurante Acorralado Corralejo Fuerteventura",
          },
        ],
      },
      {
        id: uid(),
        date: "2026-06-21",
        title: "Letzter Morgen & Fähre zurück",
        summary: "Entspannter Abschlussmorgen in Corralejo, dann mittags Fähre zurück nach Lanzarote zum Flughafen.",
        activities: [
          {
            id: uid(),
            time: "09:00",
            type: "restaurant",
            title: "Frühstück: Amiga Mia",
            description: "Nochmal die beste Dachterrasse in Corralejo zum Abschied.",
            location: "Amiga Mia, Corralejo, Fuerteventura, Spain",
            mapQuery: "Amiga Mia Cafeteria Heladeria Corralejo Fuerteventura",
          },
          {
            id: uid(),
            time: "10:00",
            type: "activity",
            title: "Letzter Strandspaziergang Corralejo",
            description: "Letzte Meeresluft auf Fuerteventura.",
            location: "Corralejo, Fuerteventura, Spain",
          },
          {
            id: uid(),
            time: "12:00",
            type: "transport",
            title: "Fähre Corralejo → Playa Blanca",
            description: "Rückfahrt nach Lanzarote, ca. 30 Minuten. Genaue Uhrzeit folgt.",
            location: "Ferry Terminal Corralejo, Fuerteventura, Spain",
            mapQuery: "Corralejo Ferry Terminal Fuerteventura",
          },
          {
            id: uid(),
            time: "14:00",
            type: "transport",
            title: "Flughafen Lanzarote",
            description: "Von Playa Blanca zum Flughafen Arrecife. Genaue Uhrzeit folgt.",
            location: "Aeropuerto de Lanzarote, Arrecife, Spain",
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
