"use client"

import {
  Bike,
  Car,
  Landmark,
  type LucideIcon,
  Sparkles,
  UtensilsCrossed,
  Wine,
} from "lucide-react"
import { type Activity, ACTIVITY_LABELS, type ActivityType } from "@/lib/itinerary"
import { Badge } from "@/components/ui/badge"
import { MapEmbed } from "@/components/map-embed"

const ICONS: Record<ActivityType, LucideIcon> = {
  "bike-tour": Bike,
  restaurant: UtensilsCrossed,
  dinner: Wine,
  sightseeing: Landmark,
  activity: Sparkles,
  transport: Car,
}

export function ActivityCard({ activity, last }: { activity: Activity; last: boolean }) {
  const Icon = ICONS[activity.type]
  const query = activity.mapQuery?.trim() || activity.location

  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* Timeline rail */}
      <div className="flex flex-col items-center">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        {!last && <div className="mt-1 w-px grow bg-border" aria-hidden="true" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-sm font-medium text-primary">{activity.time}</span>
          <Badge variant="secondary" className="font-normal">
            {ACTIVITY_LABELS[activity.type]}
          </Badge>
        </div>

        <h3 className="mt-2 font-serif text-xl leading-tight text-foreground text-pretty">
          {activity.title}
        </h3>

        {activity.description && (
          <p className="mt-1 leading-relaxed text-muted-foreground">{activity.description}</p>
        )}

        {query && (
          <div className="mt-4 max-w-xl">
            <MapEmbed query={query} label={activity.location || query} />
          </div>
        )}
      </div>
    </div>
  )
}
