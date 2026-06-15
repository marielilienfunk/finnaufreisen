"use client"

import { ExternalLink, MapPin } from "lucide-react"
import { mapEmbedUrl, mapLinkUrl } from "@/lib/itinerary"

export function MapEmbed({ query, label }: { query: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-b-2xl bg-muted">
      <iframe
        title={`Map of ${label}`}
        src={mapEmbedUrl(query)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-48 w-full border-0"
      />
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
