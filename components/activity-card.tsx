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
import { MapEmbed } from "@/components/map-embed"

const ICONS: Record<ActivityType, LucideIcon> = {
  "bike-tour": Bike,
  restaurant: UtensilsCrossed,
  dinner: Wine,
  sightseeing: Landmark,
  activity: Sparkles,
  transport: Car,
}

const TYPE_COLORS: Record<ActivityType, string> = {
  "bike-tour": "#34c759",
  restaurant: "#ff9500",
  dinner: "#ff2d55",
  sightseeing: "#0071e3",
  activity: "#af52de",
  transport: "#8e8e93",
}

export function ActivityCard({ activity, last }: { activity: Activity; last: boolean }) {
  const Icon = ICONS[activity.type]
  const color = TYPE_COLORS[activity.type]
  const query = activity.mapQuery?.trim() || activity.location

  return (
    <div
      className="overflow-hidden rounded-2xl bg-card"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-start gap-4 p-4">
        {/* Icon */}
        <div
          className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon className="size-5" style={{ color }} aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold tabular-nums text-muted-foreground">
              {activity.time}
            </span>
            <span
              className="text-[11px] font-semibold uppercase tracking-wide"
              style={{ color }}
            >
              {ACTIVITY_LABELS[activity.type]}
            </span>
          </div>
          <h3 className="mt-0.5 text-[17px] font-semibold leading-snug tracking-tight text-foreground">
            {activity.title}
          </h3>
          {activity.description && (
            <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
              {activity.description}
            </p>
          )}
        </div>
      </div>

      {query && (
        <div className="border-t border-border">
          <MapEmbed query={query} label={activity.location || query} />
        </div>
      )}
    </div>
  )
}
