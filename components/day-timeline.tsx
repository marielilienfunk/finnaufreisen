"use client"

import { type ItineraryDay, formatLongDate } from "@/lib/itinerary"
import { ActivityCard } from "@/components/activity-card"

export function DayTimeline({ day, isToday }: { day: ItineraryDay; isToday: boolean }) {
  const sorted = [...day.activities].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <article>
      <header className="mb-8">
        <p className="text-[12px] font-semibold uppercase tracking-widest text-primary">
          {isToday ? "Heute" : formatLongDate(day.date)}
        </p>
        <h2 className="mt-1.5 text-[28px] font-bold leading-tight tracking-tight text-foreground">
          {day.title}
        </h2>
        {!isToday && (
          <p className="mt-0.5 text-[13px] text-muted-foreground">{formatLongDate(day.date)}</p>
        )}
        {day.summary && (
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {day.summary}
          </p>
        )}
      </header>

      {sorted.length === 0 ? (
        <p className="text-muted-foreground">Noch keine Aktivitäten für diesen Tag.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((activity, i) => (
            <ActivityCard key={activity.id} activity={activity} last={i === sorted.length - 1} />
          ))}
        </div>
      )}
    </article>
  )
}
