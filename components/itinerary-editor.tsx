"use client"

import { useState } from "react"
import { ArrowLeft, GripVertical, Plus, Save, Trash2 } from "lucide-react"
import {
  type Activity,
  ACTIVITY_LABELS,
  type ActivityType,
  type ItineraryDay,
  type Trip,
  todayISO,
  uid,
} from "@/lib/itinerary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function emptyActivity(): Activity {
  return {
    id: uid(),
    time: "09:00",
    type: "activity",
    title: "",
    description: "",
    location: "",
  }
}

function emptyDay(): ItineraryDay {
  return {
    id: uid(),
    date: todayISO(),
    title: "",
    summary: "",
    activities: [emptyActivity()],
  }
}

export function ItineraryEditor({
  trip,
  onSave,
  onCancel,
}: {
  trip: Trip
  onSave: (trip: Trip) => void
  onCancel: () => void
}) {
  const [draft, setDraft] = useState<Trip>(() => structuredClone(trip))
  const [activeDay, setActiveDay] = useState(0)

  const day = draft.days[activeDay]

  function updateTrip(patch: Partial<Trip>) {
    setDraft((d) => ({ ...d, ...patch }))
  }

  function updateDay(index: number, patch: Partial<ItineraryDay>) {
    setDraft((d) => {
      const days = [...d.days]
      days[index] = { ...days[index], ...patch }
      return { ...d, days }
    })
  }

  function addDay() {
    setDraft((d) => ({ ...d, days: [...d.days, emptyDay()] }))
    setActiveDay(draft.days.length)
  }

  function removeDay(index: number) {
    setDraft((d) => {
      const days = d.days.filter((_, i) => i !== index)
      return { ...d, days: days.length ? days : [emptyDay()] }
    })
    setActiveDay((i) => Math.max(0, Math.min(i, draft.days.length - 2)))
  }

  function updateActivity(actIndex: number, patch: Partial<Activity>) {
    setDraft((d) => {
      const days = [...d.days]
      const activities = [...days[activeDay].activities]
      activities[actIndex] = { ...activities[actIndex], ...patch }
      days[activeDay] = { ...days[activeDay], activities }
      return { ...d, days }
    })
  }

  function addActivity() {
    setDraft((d) => {
      const days = [...d.days]
      days[activeDay] = {
        ...days[activeDay],
        activities: [...days[activeDay].activities, emptyActivity()],
      }
      return { ...d, days }
    })
  }

  function removeActivity(actIndex: number) {
    setDraft((d) => {
      const days = [...d.days]
      days[activeDay] = {
        ...days[activeDay],
        activities: days[activeDay].activities.filter((_, i) => i !== actIndex),
      }
      return { ...d, days }
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to itinerary
        </button>
        <Button onClick={() => onSave(draft)}>
          <Save className="size-4" aria-hidden="true" />
          Save changes
        </Button>
      </div>

      <h1 className="font-serif text-3xl text-foreground">Edit itinerary</h1>
      <p className="mt-1 text-muted-foreground">
        Update the trip and each day. Changes are saved to this browser.
      </p>

      {/* Trip details */}
      <section className="mt-8 rounded-lg border border-border bg-card p-5">
        <h2 className="font-serif text-xl text-foreground">Trip details</h2>
        <div className="mt-4 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="trip-name">Trip name</Label>
            <Input
              id="trip-name"
              value={draft.name}
              onChange={(e) => updateTrip({ name: e.target.value })}
              placeholder="e.g. Tuscany by Bike"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="trip-subtitle">Subtitle</Label>
            <Input
              id="trip-subtitle"
              value={draft.subtitle}
              onChange={(e) => updateTrip({ subtitle: e.target.value })}
              placeholder="A short description of the trip"
            />
          </div>
        </div>
      </section>

      {/* Day tabs */}
      <section className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          {draft.days.map((d, i) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDay(i)}
              className={
                "rounded-md border px-3 py-1.5 text-sm transition-colors " +
                (i === activeDay
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-secondary")
              }
            >
              Day {i + 1}
            </button>
          ))}
          <Button variant="outline" size="sm" onClick={addDay}>
            <Plus className="size-4" aria-hidden="true" />
            Add day
          </Button>
        </div>
      </section>

      {/* Active day editor */}
      {day && (
        <section className="mt-4 rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-xl text-foreground">Day {activeDay + 1}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeDay(activeDay)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Remove day
            </Button>
          </div>

          <div className="mt-4 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="day-date">Date</Label>
                <Input
                  id="day-date"
                  type="date"
                  value={day.date}
                  onChange={(e) => updateDay(activeDay, { date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="day-title">Title</Label>
                <Input
                  id="day-title"
                  value={day.title}
                  onChange={(e) => updateDay(activeDay, { title: e.target.value })}
                  placeholder="e.g. Florence to Greve"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="day-summary">Summary</Label>
              <Textarea
                id="day-summary"
                value={day.summary}
                onChange={(e) => updateDay(activeDay, { summary: e.target.value })}
                placeholder="A short overview of the day"
                rows={2}
              />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Activities</h3>
            <Button variant="outline" size="sm" onClick={addActivity}>
              <Plus className="size-4" aria-hidden="true" />
              Add activity
            </Button>
          </div>

          <div className="mt-4 grid gap-4">
            {day.activities.map((activity, ai) => (
              <div key={activity.id} className="rounded-md border border-border bg-background p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GripVertical className="size-4" aria-hidden="true" />
                    Activity {ai + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeActivity(ai)}
                    aria-label="Remove activity"
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor={`time-${activity.id}`}>Time</Label>
                      <Input
                        id={`time-${activity.id}`}
                        type="time"
                        value={activity.time}
                        onChange={(e) => updateActivity(ai, { time: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`type-${activity.id}`}>Type</Label>
                      <Select
                        value={activity.type}
                        onValueChange={(v) => updateActivity(ai, { type: v as ActivityType })}
                      >
                        <SelectTrigger id={`type-${activity.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(ACTIVITY_LABELS) as ActivityType[]).map((t) => (
                            <SelectItem key={t} value={t}>
                              {ACTIVITY_LABELS[t]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`title-${activity.id}`}>Title</Label>
                    <Input
                      id={`title-${activity.id}`}
                      value={activity.title}
                      onChange={(e) => updateActivity(ai, { title: e.target.value })}
                      placeholder="e.g. Dinner at Osteria Le Logge"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`desc-${activity.id}`}>Description</Label>
                    <Textarea
                      id={`desc-${activity.id}`}
                      value={activity.description}
                      onChange={(e) => updateActivity(ai, { description: e.target.value })}
                      placeholder="Details about this stop"
                      rows={2}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`loc-${activity.id}`}>Location</Label>
                    <Input
                      id={`loc-${activity.id}`}
                      value={activity.location}
                      onChange={(e) => updateActivity(ai, { location: e.target.value })}
                      placeholder="e.g. Osteria Le Logge, Siena, Italy"
                    />
                    <p className="text-xs text-muted-foreground">
                      Used for the embedded Google Map and the &quot;Open in Maps&quot; link.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(draft)}>
          <Save className="size-4" aria-hidden="true" />
          Save changes
        </Button>
      </div>
    </div>
  )
}
