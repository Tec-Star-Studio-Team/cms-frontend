const ARTIFICIAL_DELAY_MS = Number(import.meta.env.VITE_API_DELAY_MS ?? 0);

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function apiFetch(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  if (ARTIFICIAL_DELAY_MS > 0) {
    await delay(ARTIFICIAL_DELAY_MS);
  }

  return fetch(input, init);
}
