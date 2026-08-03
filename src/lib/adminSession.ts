export const ADMIN_SESSION_KEY = "logiservicios_monaco_admin_session_v1";
export const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;

export function readAdminSession(): boolean {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return false;
    const { at } = JSON.parse(raw) as { at?: number };
    return Boolean(at && Date.now() - at < ADMIN_SESSION_TTL_MS);
  } catch {
    return false;
  }
}

export function writeAdminSession(pin: string) {
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ at: Date.now(), pin }));
}

export function getAdminPinFromSession(): string | undefined {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return undefined;
    const { at, pin } = JSON.parse(raw) as { at?: number; pin?: string };
    if (!at || Date.now() - at >= ADMIN_SESSION_TTL_MS) return undefined;
    return pin;
  } catch {
    return undefined;
  }
}

export function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
