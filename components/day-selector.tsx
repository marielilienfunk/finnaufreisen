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
    <nav aria-label="Reisetage" className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
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
              "flex shrink-0 flex-col items-center rounded-xl px-4 py-2 text-center transition-all duration-200",
              active
                ? "bg-primary text-white shadow-sm"
                : "bg-card text-foreground hover:bg-secondary",
            )}
            style={active ? {} : { border: "1px solid var(--border)" }}
          >
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider",
                active ? "text-white/70" : "text-muted-foreground",
              )}
            >
              {isToday ? "Heute" : `Tag ${i + 1}`}
            </span>
            <span className="mt-0.5 text-[13px] font-medium">{formatShortDate(day.date)}</span>
          </button>
        )
      })}
    </nav>
  )
}
