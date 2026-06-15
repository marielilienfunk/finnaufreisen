"use client"

import { CalendarDays } from "lucide-react"
import { type ItineraryDay, formatLongDate } from "@/lib/itinerary"
import { ActivityCard } from "@/components/activity-card"

export function DayTimeline({ day, isToday }: { day: ItineraryDay; isToday: boolean }) {
  const sorted = [...day.activities].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <article>
      <header className="mb-8 border-b border-border pb-8">
        <p className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-accent">
          <CalendarDays className="size-4" aria-hidden="true" />
          {isToday ? "Today's Itinerary" : "Itinerary"}
        </p>
        <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground text-balance sm:text-5xl">
          {day.title}
        </h2>
        <p className="mt-2 text-base text-muted-foreground">{formatLongDate(day.date)}</p>
        {day.summary && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80 text-pretty">
            {day.summary}
          </p>
        )}
      </header>

      {sorted.length === 0 ? (
        <p className="text-muted-foreground">No activities planned for this day yet.</p>
      ) : (
        <div>
          {sorted.map((activity, i) => (
            <ActivityCard key={activity.id} activity={activity} last={i === sorted.length - 1} />
          ))}
        </div>
      )}
    </article>
  )
}
