"use client"

import { cn } from "@/lib/utils"
import { type ItineraryDay, formatShortDate, todayISO } from "@/lib/itinerary"

export function DaySelector({
  days,
  activeIndex,
  onSelect,
}: {
  days: ItineraryDay[]
  activeIndex: number
  onSelect: (index: number) => void
}) {
  const today = todayISO()

  return (
    <nav aria-label="Trip days" className="flex gap-2 overflow-x-auto pb-1">
      {days.map((day, i) => {
        const active = i === activeIndex
        const isToday = day.date === today
        return (
          <button
            key={day.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "flex shrink-0 flex-col items-start rounded-md border px-4 py-2.5 text-left transition-colors",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-secondary",
            )}
          >
            <span
              className={cn(
                "font-mono text-[0.7rem] uppercase tracking-wider",
                active ? "text-primary-foreground/80" : "text-muted-foreground",
              )}
            >
              Day {i + 1}
              {isToday ? " · Today" : ""}
            </span>
            <span className="mt-0.5 text-sm font-medium">{formatShortDate(day.date)}</span>
          </button>
        )
      })}
    </nav>
  )
}
