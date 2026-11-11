// Server-side only: the JWT lives in an httpOnly cookie so client JS never sees it
import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import type { User, UserResponse } from "@/lib/api/types";

export const AUTH_COOKIE = "sf_token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function getToken() {
  return (await cookies()).get(AUTH_COOKIE)?.value;
}

// Only callable from server actions or route handlers (cookies can't be set while rendering)
export async function setSession(token: string) {
  (await cookies()).set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  (await cookies()).delete(AUTH_COOKIE);
}

// The logged-in user, or null when there's no token or it has expired
export async function getCurrentUser(): Promise<User | null> {
  if (!(await getToken())) return null;
  const res = await apiFetch<UserResponse>("/user/me", { auth: true });
  return res.ok ? res.data.data : null;
}
