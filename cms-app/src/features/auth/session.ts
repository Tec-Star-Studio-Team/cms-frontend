import type { AuthSession } from "./user";

export const SESSION_STORAGE_KEY = "cms.session";

export function isSessionExpired(
  session: AuthSession,
  now: Date = new Date(),
): boolean {
  return new Date(session.expiresAt).getTime() <= now.getTime();
}

export function readStoredSession(): AuthSession | null {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as AuthSession;
    return isSessionExpired(session) ? null : session;
  } catch {
    return null;
  }
}
