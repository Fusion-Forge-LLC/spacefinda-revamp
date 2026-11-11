// Server-side only: reads the auth cookie and the server-only API_URL
import { getToken } from "@/lib/auth/session";
import type { ApiErrorBody, ApiResult } from "./types";

export const API_URL = process.env.API_URL ?? "https://api.spacefindatechnologies.com/v2";
// Fail instead of leaving a modal spinning if the backend hangs
const TIMEOUT_MS = 20_000;

interface ApiFetchOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  // Attach the logged-in user's token as a bearer header
  auth?: boolean;
}

export async function apiFetch<T>(path: string, { method = "GET", body, auth = false }: ApiFetchOptions = {}): Promise<ApiResult<T>> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = await getToken();
    if (!token) return { ok: false, status: 401, message: "Please sign in to continue." };
    headers.Authorization = `Bearer ${token}`;
  }

  const started = Date.now();
  // Dev-only trace of each backend call (no bodies, so no passwords or codes in the log)
  const trace = (status: number | string, message?: string) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[api] ${method} ${path} -> ${status} in ${Date.now() - started}ms${message ? ` (${message})` : ""}`);
    }
  };

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === "TimeoutError";
    trace(timedOut ? "TIMEOUT" : "NETWORK ERROR");
    return {
      ok: false,
      status: 0,
      message: timedOut ? "The server took too long to respond. Please try again." : "Couldn't reach the server. Check your connection and try again.",
    };
  }

  const json = await res.json().catch(() => null);
  trace(res.status, (json as { message?: string } | null)?.message);

  if (!res.ok) {
    const err = json as Partial<ApiErrorBody> | null;
    return {
      ok: false,
      status: res.status,
      message: validationMessage(err?.error) || err?.message || err?.error || "Something went wrong. Please try again.",
      errors: err?.errors,
      body: json,
    };
  }

  return { ok: true, data: json as T };
}

// Zod failures come back as `error: "[{ path, message }, ...]"` (a JSON string); show the first problem instead of a generic message
function validationMessage(error: unknown): string | undefined {
  if (typeof error !== "string" || !error.trim().startsWith("[")) return undefined;
  try {
    const [first] = JSON.parse(error) as { path?: (string | number)[]; message?: string }[];
    if (!first?.message) return undefined;
    const field = first.path?.filter((p) => typeof p === "string").pop();
    return field ? `${field}: ${first.message}` : first.message;
  } catch {
    return undefined;
  }
}
