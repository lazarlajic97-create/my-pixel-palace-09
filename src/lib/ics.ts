// Minimaler .ics-Generator für Kalender-Downloads
import type { Booking } from "./types";
import { EVENT_TYPES } from "./sovoice-data";

function toICSDate(date: string, time: string) {
  // 2026-06-23 + 10:00 -> 20260623T100000
  return `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
}

export function bookingToICS(b: Booking): string {
  const event = EVENT_TYPES.find((e) => e.id === b.eventTypeId);
  const title = event?.title ?? "SoVoice Termin";
  const dt = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SoVoice Calendar//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${b.id}@sovoice-calendar.com`,
    `DTSTAMP:${dt}`,
    `DTSTART;TZID=Europe/Zurich:${toICSDate(b.date, b.startTime)}`,
    `DTEND;TZID=Europe/Zurich:${toICSDate(b.date, b.endTime)}`,
    `SUMMARY:${title} – SoVoice Calendar`,
    `DESCRIPTION:Dein ${title} mit dem SoVoice Team. Bei Fragen antworte einfach auf die Bestätigungs-E-Mail.`,
    `ORGANIZER;CN=SoVoice Team:mailto:team@sovoice.ch`,
    `ATTENDEE;CN=${b.firstName} ${b.lastName}:mailto:${b.email}`,
    "LOCATION:Online · Google Meet",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadICS(b: Booking) {
  if (typeof window === "undefined") return;
  const ics = bookingToICS(b);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `sovoice-termin-${b.date}-${b.startTime.replace(":", "")}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
