"use client"

import { useEffect, useState } from "react"
import { Pencil } from "lucide-react"
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

  useEffect(() => {
    const loaded = loadTrip()
    setTrip(loaded)
    setActiveIndex(pickActiveDayIndex(loaded.days))
  }, [])

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-border border-t-primary" />
          <span className="text-sm">Laden…</span>
        </div>
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
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header
        className="sticky top-0 z-20 border-b border-border"
        style={{ background: "rgba(245,245,247,0.85)", backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)" }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Reiseplan</p>
            <h1 className="text-[17px] font-semibold leading-tight text-foreground">{trip.name}</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditing(true)}
            className="rounded-full text-primary hover:bg-primary/10"
          >
            <Pencil className="size-4" />
            <span className="ml-1.5 text-sm font-medium">Bearbeiten</span>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-background px-5 pb-6 pt-8">
        <div className="mx-auto max-w-3xl">
          {trip.subtitle && (
            <p className="text-[15px] leading-relaxed text-muted-foreground">{trip.subtitle}</p>
          )}
        </div>
      </section>

      {/* Day selector */}
      <div
        className="sticky top-[57px] z-10 border-b border-border px-5 py-3"
        style={{ background: "rgba(245,245,247,0.85)", backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)" }}
      >
        <div className="mx-auto max-w-3xl">
          <DaySelector days={trip.days} activeIndex={activeIndex} onSelect={setActiveIndex} />
        </div>
      </div>

      {/* Active day */}
      <main className="mx-auto max-w-3xl px-5 py-8">
        {activeDay ? (
          <DayTimeline day={activeDay} isToday={isToday} />
        ) : (
          <p className="text-muted-foreground">Noch keine Tage geplant.</p>
        )}
      </main>

      <footer className="border-t border-border px-5 py-5">
        <div className="mx-auto max-w-3xl text-[13px] text-muted-foreground">
          {trip.days.length} Tage · finn-auf-reisen.vercel.app
        </div>
      </footer>
    </div>
  )
}
