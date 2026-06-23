// SoVoice Calendar – Domain Types (mirrors cal_* tables aus Architecture-PDF)

export type BookingStatus = "Bestätigt" | "Offen" | "Verschoben" | "Storniert" | "Abgeschlossen";

export interface EventType {
  id: string;
  slug: string;
  title: string;
  description: string;
  durationMinutes: number;
  color: string; // tailwind gradient classes
  benefits: string[];
  isActive: boolean;
  internalNotes?: string;
  meetingType: "Google Meet" | "Zoom" | "Microsoft Teams" | "Telefon";
}

export interface Booking {
  id: string;
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
  date: string;        // YYYY-MM-DD
  startTime: string;   // HH:mm
  endTime: string;     // HH:mm
  timezone: string;
  status: BookingStatus;
  cancellationReason?: string;
  rescheduleToken: string;
  cancelToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilityRule {
  weekday: number; // 0=So..6=Sa
  isActive: boolean;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  breaks: Array<{ start: string; end: string }>;
}

export interface AvailabilitySettings {
  rules: AvailabilityRule[];
  bufferMinutes: number;
  minimumNoticeHours: number;
  maxBookingsPerDay: number;
  timezone: string;
  blockedDates: string[]; // YYYY-MM-DD
}

export type IntegrationStatus = "Verbunden" | "Nicht verbunden" | "Fehler" | "Einrichtung erforderlich";

export interface Integration {
  id: string;
  name: string;
  provider: string;
  description: string;
  status: IntegrationStatus;
  category: "Kalender" | "Meeting" | "CRM" | "Automation" | "Benachrichtigung";
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Member" | "Viewer";
  avatar?: string;
}

export interface NotificationLog {
  id: string;
  bookingId: string;
  type: "Bestätigung" | "Erinnerung" | "Admin" | "Storno" | "Verschiebung";
  recipient: string;
  status: "Versendet" | "Geplant" | "Fehler";
  sentAt: string;
}
