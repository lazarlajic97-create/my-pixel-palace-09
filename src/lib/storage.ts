// LocalStorage-Persistenz für SoVoice Calendar (Frontend-only, später durch Backend ersetzbar)
import type { Booking, AvailabilitySettings } from "./types";
import { DEFAULT_AVAILABILITY } from "./sovoice-data";

const KEY_BOOKINGS = "sovoice:bookings:v1";
const KEY_AVAILABILITY = "sovoice:availability:v1";

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadBookings(): Booking[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(KEY_BOOKINGS);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings: Booking[]) {
  if (!isBrowser()) return;
  localStorage.setItem(KEY_BOOKINGS, JSON.stringify(bookings));
}

export function findBookingById(id: string): Booking | undefined {
  return loadBookings().find((b) => b.id === id);
}

export function upsertBooking(b: Booking) {
  const all = loadBookings();
  const idx = all.findIndex((x) => x.id === b.id);
  if (idx >= 0) all[idx] = b;
  else all.unshift(b);
  saveBookings(all);
  return b;
}

export function findBookingByToken(token: string, type: "reschedule" | "cancel"): Booking | undefined {
  const all = loadBookings();
  return all.find((b) => (type === "reschedule" ? b.rescheduleToken === token : b.cancelToken === token));
}

export function loadAvailability(): AvailabilitySettings {
  if (!isBrowser()) return DEFAULT_AVAILABILITY;
  try {
    const raw = localStorage.getItem(KEY_AVAILABILITY);
    return raw ? (JSON.parse(raw) as AvailabilitySettings) : DEFAULT_AVAILABILITY;
  } catch {
    return DEFAULT_AVAILABILITY;
  }
}

export function saveAvailability(a: AvailabilitySettings) {
  if (!isBrowser()) return;
  localStorage.setItem(KEY_AVAILABILITY, JSON.stringify(a));
}
