// Persistent admin state via localStorage (frontend-only)
import { useEffect, useState, useCallback } from "react";
import type { EventType, AvailabilitySettings, Integration, AdminUser } from "./types";
import {
  EVENT_TYPES,
  INTEGRATIONS,
  DEFAULT_AVAILABILITY,
  ADMIN_USERS,
  SEED_APPOINTMENTS,
} from "./sovoice-data";

const isBrowser = () => typeof window !== "undefined";

function load<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("sovoice:store", { detail: { key } }));
}

export function usePersistentState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => load<T>(key, initial));

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ key: string }>;
      if (ev.detail?.key === key) setState(load<T>(key, initial));
    };
    window.addEventListener("sovoice:store", handler);
    return () => window.removeEventListener("sovoice:store", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setAndSave = useCallback(
    (next: T | ((prev: T) => T)) => {
      setState(prev => {
        const value = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        save(key, value);
        return value;
      });
    },
    [key],
  );

  return [state, setAndSave] as const;
}

// -- Domain state --
export const K_EVENT_TYPES = "sovoice:event-types:v1";
export const K_INTEGRATIONS = "sovoice:integrations:v1";
export const K_AVAILABILITY = "sovoice:availability:v1";
export const K_PROFILE = "sovoice:profile:v1";
export const K_COMPANY = "sovoice:company:v1";
export const K_BRANDING = "sovoice:branding:v1";
export const K_NOTIFICATIONS = "sovoice:notifications:v1";
export const K_PRIVACY = "sovoice:privacy:v1";
export const K_TEAM = "sovoice:team:v1";
export const K_APPOINTMENTS = "sovoice:appointments:v1";

export type AppointmentRow = (typeof SEED_APPOINTMENTS)[number] & { id: string };

export const defaultProfile = {
  firstName: "Sandro",
  lastName: "Müller",
  email: "sandro@sovoice.ch",
  role: "Sales Lead",
};
export const defaultCompany = {
  name: "SoVoice AG",
  address: "Bahnhofstrasse 1, 8001 Zürich",
  phone: "+41 44 000 00 00",
  website: "sovoice.ch",
};
export const defaultBranding = {
  primary: "#2563eb",
  accent: "#22d3ee",
  buttonStyle: "Abgerundet",
  signature: "SoVoice Team",
};
export const defaultNotifications = {
  newBookingEmail: true,
  reminder24h: true,
  reminder1h: false,
  dailySummary: true,
};
export const defaultPrivacy = {
  euOnly: true,
  autoDelete: true,
  cookieBanner: true,
};

// Hooks
export const useEventTypes = () => usePersistentState<EventType[]>(K_EVENT_TYPES, EVENT_TYPES);
export const useIntegrations = () => usePersistentState<Integration[]>(K_INTEGRATIONS, INTEGRATIONS);
export const useAvailabilitySettings = () =>
  usePersistentState<AvailabilitySettings>(K_AVAILABILITY, DEFAULT_AVAILABILITY);
export const useProfile = () => usePersistentState(K_PROFILE, defaultProfile);
export const useCompany = () => usePersistentState(K_COMPANY, defaultCompany);
export const useBranding = () => usePersistentState(K_BRANDING, defaultBranding);
export const useNotificationPrefs = () => usePersistentState(K_NOTIFICATIONS, defaultNotifications);
export const usePrivacyPrefs = () => usePersistentState(K_PRIVACY, defaultPrivacy);
export const useTeam = () => usePersistentState<AdminUser[]>(K_TEAM, ADMIN_USERS);
export const useAppointments = () =>
  usePersistentState<AppointmentRow[]>(K_APPOINTMENTS, SEED_APPOINTMENTS as AppointmentRow[]);
