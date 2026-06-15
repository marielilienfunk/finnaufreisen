"use client"

import { ExternalLink, MapPin } from "lucide-react"
import { mapEmbedUrl, mapLinkUrl } from "@/lib/itinerary"

export function MapEmbed({ query, label }: { query: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-muted">
      <iframe
        title={`Map of ${label}`}
        src={mapEmbedUrl(query)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-44 w-full border-0"
      />
      <a
        href={mapLinkUrl(query)}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between gap-2 bg-card px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
      >
        <span className="flex min-w-0 items-center gap-2">
          <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate">{label}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
          Open in Maps
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </span>
      </a>
    </div>
  )
}
