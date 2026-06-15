"use client"

import { useEffect, useState } from "react"
import { Compass, Pencil, Sunrise } from "lucide-react"
import {
  type Trip,
  loadTrip,
  pickActiveDayIndex,
  saveTrip,
  todayISO,
} from "@/lib/itinerary"
import { Button } from "@/components/ui/button"
import { DaySelector } from "@/components/day-selector"
import { DayTimeline } from "@/components/day-timeline"
import { ItineraryEditor } from "@/components/itinerary-editor"

export function ItineraryApp() {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [editing, setEditing] = useState(false)

  // Load from localStorage on mount and auto-select today's day.
  useEffect(() => {
    const loaded = loadTrip()
    setTrip(loaded)
    setActiveIndex(pickActiveDayIndex(loaded.days))
  }, [])

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading your itinerary…
      </div>
    )
  }

  if (editing) {
    return (
      <ItineraryEditor
        trip={trip}
        onCancel={() => setEditing(false)}
        onSave={(next) => {
          saveTrip(next)
          setTrip(next)
          setActiveIndex(pickActiveDayIndex(next.days))
          setEditing(false)
        }}
      />
    )
  }

  const activeDay = trip.days[activeIndex]
  const isToday = activeDay?.date === todayISO()

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Compass className="size-5 text-primary" aria-hidden="true" />
            <span className="font-serif text-lg text-foreground">{trip.name || "Daily Itinerary"}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            <Pencil className="size-4" aria-hidden="true" />
            Edit
          </Button>
        </div>
      </header>

      {/* Hero / greeting */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <p className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-accent">
            <Sunrise className="size-4" aria-hidden="true" />
            Good morning
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground text-balance sm:text-5xl">
            {trip.name}
          </h1>
          {trip.subtitle && (
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {trip.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Day selector */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
          <DaySelector days={trip.days} activeIndex={activeIndex} onSelect={setActiveIndex} />
        </div>
      </div>

      {/* Active day */}
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {activeDay ? (
          <DayTimeline day={activeDay} isToday={isToday} />
        ) : (
          <p className="text-muted-foreground">No days planned yet. Click Edit to add one.</p>
        )}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-6 text-sm text-muted-foreground sm:px-6">
          Plan saved to this browser · {trip.days.length} day{trip.days.length === 1 ? "" : "s"}
        </div>
      </footer>
    </div>
  )
}
