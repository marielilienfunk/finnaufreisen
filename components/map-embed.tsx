"use client"

import { useState } from "react"
import { ExternalLink, MapPin } from "lucide-react"
import { mapLinkUrl } from "@/lib/itinerary"

// Reliable Unsplash fallback photos by activity type (permanent URLs by photo ID)
const TYPE_FALLBACKS: Record<string, string> = {
  "bike-tour": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  restaurant: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  dinner: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
  sightseeing: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
  activity: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
  transport: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
}

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"

export function MapEmbed({
  query,
  label,
  activityType,
}: {
  query: string
  label: string
  activityType?: string
}) {
  const searchTerm = query.split(",").slice(0, 2).join(" ").trim()
  const primaryUrl = `https://source.unsplash.com/800x400/?${encodeURIComponent(searchTerm)}`
  const fallbackUrl = (activityType && TYPE_FALLBACKS[activityType]) || DEFAULT_FALLBACK

  const [src, setSrc] = useState(primaryUrl)
  const [triedFallback, setTriedFallback] = useState(false)
  const unsplashSearchUrl = `https://unsplash.com/s/photos/${encodeURIComponent(searchTerm)}`

  const handleError = () => {
    if (!triedFallback) {
      setTriedFallback(true)
      setSrc(fallbackUrl)
    }
  }

  return (
    <div className="overflow-hidden rounded-b-2xl bg-muted">
      {/* Photo */}
      <div className="relative h-48 w-full bg-secondary">
        <img
          key={src}
          src={src}
          alt={label}
          className="h-full w-full object-cover"
          onError={handleError}
        />
        <a
          href={unsplashSearchUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-1.5 right-2 rounded-md px-1.5 py-0.5 text-[10px] text-white/80 hover:text-white"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
        >
          © Unsplash
        </a>
      </div>

      {/* Maps link */}
      <a
        href={mapLinkUrl(query)}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between gap-2 bg-card px-4 py-3 transition-colors hover:bg-secondary"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate text-[14px] font-medium text-foreground">{label}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 text-[12px] text-muted-foreground">
          In Google Maps öffnen
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </span>
      </a>
    </div>
  )
}
