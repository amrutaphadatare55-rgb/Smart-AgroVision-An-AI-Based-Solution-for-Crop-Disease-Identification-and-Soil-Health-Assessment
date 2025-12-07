"use client"

export const GUEST_START_KEY = "guest_start"
export const GUEST_DURATION_KEY = "guest_duration"

// Default guest duration: 10 minutes
export const DEFAULT_GUEST_DURATION_MS = 10 * 60 * 1000

export function startGuestSession(durationMs: number = DEFAULT_GUEST_DURATION_MS) {
  try {
    const now = Date.now()
    localStorage.setItem(GUEST_START_KEY, String(now))
    localStorage.setItem(GUEST_DURATION_KEY, String(durationMs))
  } catch (e) {
    // ignore
  }
}

export function clearGuestSession() {
  try {
    localStorage.removeItem(GUEST_START_KEY)
    localStorage.removeItem(GUEST_DURATION_KEY)
  } catch (e) {}
}

export function getGuestInfo(): { start?: number; duration?: number } {
  try {
    const s = localStorage.getItem(GUEST_START_KEY)
    const d = localStorage.getItem(GUEST_DURATION_KEY)
    return {
      start: s ? Number(s) : undefined,
      duration: d ? Number(d) : undefined,
    }
  } catch (e) {
    return {}
  }
}

export function isGuestActive(): boolean {
  try {
    const info = getGuestInfo()
    if (!info.start) return false
    const duration = info.duration ?? DEFAULT_GUEST_DURATION_MS
    return Date.now() - info.start < duration
  } catch (e) {
    return false
  }
}

export function getGuestRemainingMs(): number {
  try {
    const info = getGuestInfo()
    if (!info.start) return 0
    const duration = info.duration ?? DEFAULT_GUEST_DURATION_MS
    const rem = duration - (Date.now() - info.start)
    return rem > 0 ? rem : 0
  } catch (e) {
    return 0
  }
}
