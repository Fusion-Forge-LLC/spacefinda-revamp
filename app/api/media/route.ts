// Proxies listing photo uploads to the backend's POST /media/image with the signed-in user's token.
// A route handler (not a server action) because server action bodies are capped at 1MB by default.
import { API_URL } from "@/lib/api/client";
import { getToken } from "@/lib/auth/session";

export async function POST(request: Request) {
  const token = await getToken();
  if (!token) return Response.json({ message: "Please sign in to continue." }, { status: 401 });

  let res: Response;
  try {
    res = await fetch(`${API_URL}/media/image`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: await request.formData(),
      signal: AbortSignal.timeout(60_000),
    });
  } catch {
    return Response.json({ message: "The upload took too long. Please try again." }, { status: 504 });
  }

  const json = await res.json().catch(() => null);
  return Response.json(json ?? { message: "Upload failed. Please try again." }, { status: res.status });
}
