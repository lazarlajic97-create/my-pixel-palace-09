// Mock-Service der späteren SoVoice API (/api/calendar/*).
// Bewusst gleiche Signaturen wie der echte Backend-Aufruf, damit der Swap später trivial ist.
import type { Booking, EventType, AvailabilitySettings } from "./types";
import { EVENT_TYPES } from "./sovoice-data";
import { loadAvailability, loadBookings, upsertBooking } from "./storage";

export function getEventTypeBySlug(slug: string): EventType | undefined {
  return EVENT_TYPES.find((e) => e.slug === slug || e.id === slug);
}

function pad(n: number) { return String(n).padStart(2, "0"); }
export function ymd(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function toMinutes(t: string) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
function fromMinutes(min: number) { return `${pad(Math.floor(min / 60))}:${pad(min % 60)}`; }

function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && bStart < aEnd;
}

interface SlotsOptions {
  eventType: EventType;
  date: Date;
  availability?: AvailabilitySettings;
  bookings?: Booking[];
  now?: Date;
}

export function getAvailableSlots({ eventType, date, availability, bookings, now }: SlotsOptions): string[] {
  const av = availability ?? loadAvailability();
  const all = bookings ?? loadBookings();
  const _now = now ?? new Date();
  const dateStr = ymd(date);

  if (av.blockedDates.includes(dateStr)) return [];
  const rule = av.rules.find((r) => r.weekday === date.getDay());
  if (!rule || !rule.isActive) return [];

  const sameDayBookings = all.filter(
    (b) => b.date === dateStr && (b.status === "Bestätigt" || b.status === "Offen" || b.status === "Verschoben"),
  );
  if (sameDayBookings.length >= av.maxBookingsPerDay) return [];

  const dayStart = toMinutes(rule.startTime);
  const dayEnd = toMinutes(rule.endTime);
  const duration = eventType.durationMinutes;
  const buffer = av.bufferMinutes;
  const step = 30; // Slot-Raster

  const minNoticeMs = av.minimumNoticeHours * 3600_000;
  const earliestStart = new Date(_now.getTime() + minNoticeMs);

  const slots: string[] = [];
  for (let t = dayStart; t + duration <= dayEnd; t += step) {
    const slotEnd = t + duration;

    // Pausen
    const inBreak = rule.breaks.some((br) => overlaps(t, slotEnd, toMinutes(br.start), toMinutes(br.end)));
    if (inBreak) continue;

    // Bestehende Termine + Puffer
    const conflict = sameDayBookings.some((b) => {
      const bs = toMinutes(b.startTime) - buffer;
      const be = toMinutes(b.endTime) + buffer;
      return overlaps(t, slotEnd, bs, be);
    });
    if (conflict) continue;

    // Mindestvorlaufzeit
    const slotDate = new Date(date);
    slotDate.setHours(Math.floor(t / 60), t % 60, 0, 0);
    if (slotDate < earliestStart) continue;

    slots.push(fromMinutes(t));
  }
  return slots;
}

export function hasAvailableSlots(eventType: EventType, date: Date): boolean {
  return getAvailableSlots({ eventType, date }).length > 0;
}

function genToken() {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}

export interface CreateBookingInput {
  eventTypeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  website?: string;
  incomingCallsPerDay?: string;
  automationGoal?: string;
  message?: string;
  date: string;
  startTime: string;
}

export function createBooking(input: CreateBookingInput): Booking {
  const event = EVENT_TYPES.find((e) => e.id === input.eventTypeId);
  if (!event) throw new Error("Unbekannter Event-Typ");
  const startMin = toMinutes(input.startTime);
  const endMin = startMin + event.durationMinutes;
  const now = new Date().toISOString();
  const b: Booking = {
    id: "b_" + genToken(),
    eventTypeId: event.id,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone,
    companyName: input.companyName,
    industry: input.industry,
    website: input.website,
    incomingCallsPerDay: input.incomingCallsPerDay,
    automationGoal: input.automationGoal,
    message: input.message,
    date: input.date,
    startTime: input.startTime,
    endTime: fromMinutes(endMin),
    timezone: "Europe/Zurich",
    status: "Bestätigt",
    rescheduleToken: genToken() + genToken(),
    cancelToken: genToken() + genToken(),
    createdAt: now,
    updatedAt: now,
  };
  upsertBooking(b);
  return b;
}

export function rescheduleBooking(token: string, newDate: string, newStartTime: string): Booking | undefined {
  const all = loadBookings();
  const b = all.find((x) => x.rescheduleToken === token);
  if (!b) return undefined;
  const event = EVENT_TYPES.find((e) => e.id === b.eventTypeId);
  if (!event) return undefined;
  const startMin = toMinutes(newStartTime);
  b.date = newDate;
  b.startTime = newStartTime;
  b.endTime = fromMinutes(startMin + event.durationMinutes);
  b.status = "Verschoben";
  b.updatedAt = new Date().toISOString();
  upsertBooking(b);
  return b;
}

export function cancelBooking(token: string, reason?: string): Booking | undefined {
  const all = loadBookings();
  const b = all.find((x) => x.cancelToken === token);
  if (!b) return undefined;
  b.status = "Storniert";
  b.cancellationReason = reason;
  b.updatedAt = new Date().toISOString();
  upsertBooking(b);
  return b;
}
