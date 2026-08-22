/** Shared API client for all frontend modules. */
const apiBaseUrl = import.meta.env.VITE_API_URL ?? "/api/v1";

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
  });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  return response.json() as Promise<T>;
}