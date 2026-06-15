"use client"

import { useState } from "react"
import { ExternalLink, MapPin, ImageOff } from "lucide-react"
import { mapLinkUrl } from "@/lib/itinerary"

export function MapEmbed({ query, label }: { query: string; label: string }) {
  const [imgError, setImgError] = useState(false)

  const searchTerm = query.split(",").slice(0, 2).join(" ").trim()
  const photoUrl = `https://source.unsplash.com/800x400/?${encodeURIComponent(searchTerm)}`
  const unsplashSearchUrl = `https://unsplash.com/s/photos/${encodeURIComponent(searchTerm)}`

  return (
    <div className="overflow-hidden rounded-b-2xl bg-muted">
      {/* Photo */}
      <div className="relative h-48 w-full bg-secondary">
        {!imgError ? (
          <>
            <img
              src={photoUrl}
              alt={label}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
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
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff className="size-6" />
            <span className="text-xs">Kein Foto verfügbar</span>
          </div>
        )}
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
