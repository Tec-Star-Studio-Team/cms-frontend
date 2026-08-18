import { readStoredSession } from "@/features/auth/session";
import { dispatchUnauthorized } from "@/features/auth/authEvents";

const ARTIFICIAL_DELAY_MS = Number(import.meta.env.VITE_API_DELAY_MS ?? 0);

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function apiFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  if (ARTIFICIAL_DELAY_MS > 0) {
    await delay(ARTIFICIAL_DELAY_MS);
  }

  const session = readStoredSession();

  const headers = new Headers(init?.headers);
  if (session) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    dispatchUnauthorized();
  }

  return response;
}
