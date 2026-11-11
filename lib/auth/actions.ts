"use server";

import { apiFetch } from "@/lib/api/client";
import type {
  ApiResult,
  AuthResponse,
  LiveLoginResponse,
  HostTermsResponse,
  LoginResponse,
  MessageResponse,
  User,
} from "@/lib/api/types";
import { clearSession, getCurrentUser, setSession } from "./session";

type Result<T = undefined> = ApiResult<T>;

// Strip the payload so tokens never cross into client code
const toMessage = (res: ApiResult<unknown>): Result =>
  res.ok ? { ok: true, data: undefined } : res;

// Prefer the full /user/me profile (it has roles); fall back to what the auth response gave us
async function sessionUser(fallback: User): Promise<User> {
  return (await getCurrentUser()) ?? fallback;
}

export async function register(input: { firstName: string; lastName: string; email: string; password: string }): Promise<Result> {
  // The live API saves a single `fullname`; first/last are sent too to match the docs
  const body = { ...input, fullname: `${input.firstName.trim()} ${input.lastName.trim()}` };
  // Register returns a token too, but the user is only signed in after verifying their email
  return toMessage(await apiFetch<AuthResponse>("/auth/register", { method: "POST", body }));
}

// Updates the signed-in user and returns the fresh profile. The backend only saves to the user
// record when `fullname` or `phone` is in the body, so a photo change must carry one of them.
export async function updateProfile(input: { fullname?: string; phone?: string; avatarUrl?: string }): Promise<Result<User | null>> {
  const res = await apiFetch<MessageResponse>("/user/profile", { method: "PATCH", body: input, auth: true });
  if (!res.ok) return res;
  return { ok: true, data: await getCurrentUser() };
}

export async function login(input: { email: string; password: string }): Promise<Result<User>> {
  const res = await apiFetch<LiveLoginResponse>("/auth/login", { method: "POST", body: input });
  if (!res.ok) return res;

  const token = res.data.data?.token ?? res.data.token;
  const user = res.data.data?.user ?? res.data.user;

  // No token means the account isn't verified yet; the backend has already emailed a code
  if (!token) {
    return { ok: false, status: 403, code: "unverified", message: res.data.message || "Please verify your email to continue." };
  }

  await setSession(token);
  return { ok: true, data: await sessionUser({ ...user, email: user?.email ?? input.email }) };
}

export async function sendOtp(email: string): Promise<Result> {
  return toMessage(await apiFetch<MessageResponse>("/auth/send-otp", { method: "POST", body: { email } }));
}

export async function resendOtp(email: string): Promise<Result> {
  return toMessage(await apiFetch<MessageResponse>("/auth/resend-otp", { method: "POST", body: { email } }));
}

export async function verifyOtp(input: { email: string; otpCode: string }): Promise<Result<User>> {
  const res = await apiFetch<LoginResponse>("/auth/verify-otp", { method: "POST", body: input });
  if (!res.ok) return res;
  await setSession(res.data.token);
  const { _id, name, email } = res.data.userProfile;
  return { ok: true, data: await sessionUser({ _id, name, email }) };
}

export async function resetPassword(input: { email: string; otpCode: string; newPassword: string }): Promise<Result> {
  return toMessage(await apiFetch<MessageResponse>("/auth/reset", { method: "PATCH", body: input }));
}

export async function logout(): Promise<void> {
  await clearSession();
}

export async function fetchCurrentUser(): Promise<User | null> {
  return getCurrentUser();
}

// Called from "I understand" on the host terms page; safe to call more than once
export async function acceptHostTerms(): Promise<Result<User | null>> {
  const res = await apiFetch<HostTermsResponse>("/property/accept-terms", {
    method: "POST",
    body: { accepted: true },
    auth: true,
  });
  if (!res.ok) return res;
  return { ok: true, data: await getCurrentUser() };
}
