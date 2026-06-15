"use client"

import { useEffect, useState } from "react"
import { ExternalLink, MapPin, ImageOff } from "lucide-react"
import { mapLinkUrl } from "@/lib/itinerary"

interface WikiPhoto {
  src: string
  title: string
  pageUrl: string
}

async function fetchWikiPhoto(query: string): Promise<WikiPhoto | null> {
  const placeName = query.split(",")[0].trim()

  const endpoints = [
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(placeName)}`,
    `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(placeName)}`,
    `https://de.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(placeName)}`,
  ]

  for (const url of endpoints) {
    try {
      const res = await fetch(url)
      if (!res.ok) continue
      const data = await res.json()
      if (!data.thumbnail?.source) continue
      const larger = data.thumbnail.source.replace(/\/\d+px-/, "/800px-")
      return {
        src: larger,
        title: data.title,
        pageUrl: data.content_urls?.desktop?.page ?? "",
      }
    } catch {
      continue
    }
  }
  return null
}

export function MapEmbed({ query, label }: { query: string; label: string }) {
  const [photo, setPhoto] = useState<WikiPhoto | null | "loading">("loading")

  useEffect(() => {
    fetchWikiPhoto(query).then((p) => setPhoto(p))
  }, [query])

  return (
    <div className="overflow-hidden rounded-b-2xl bg-muted">
      {/* Photo area */}
      <div className="relative h-48 w-full bg-secondary">
        {photo === "loading" && (
          <div className="flex h-full items-center justify-center">
            <div className="size-6 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
        )}

        {photo === null && (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff className="size-6" />
            <span className="text-xs">Kein Foto verfügbar</span>
          </div>
        )}

        {photo && photo !== "loading" && (
          <>
            <img
              src={photo.src}
              alt={photo.title}
              className="h-full w-full object-cover"
            />
            {/* Attribution overlay */}
            <a
              href={photo.pageUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-1.5 right-2 rounded-md px-1.5 py-0.5 text-[10px] text-white/80 hover:text-white"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            >
              © Wikipedia · {photo.title}
            </a>
          </>
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
