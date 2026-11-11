"use server";

import { apiFetch } from "@/lib/api/client";
import type { ApiListing, ApiResult, DataResponse, MessageResponse } from "@/lib/api/types";

type Result<T = undefined> = ApiResult<T>;

const listingPath = (id: string) => `/host/listings/${encodeURIComponent(id)}`;

async function listingCall(path: string, method: "POST" | "PATCH" | "DELETE", body?: unknown): Promise<Result<ApiListing | null>> {
  const res = await apiFetch<DataResponse<ApiListing | null>>(path, { method, body, auth: true });
  return res.ok ? { ok: true, data: res.data.data ?? null } : res;
}

// Called once the host agrees to the terms; every later call needs the draft's _id
export async function createListingDraft(): Promise<Result<string>> {
  const res = await listingCall("/host/listings", "POST");
  if (!res.ok) return res;
  if (!res.data?._id) return { ok: false, status: 500, message: "Couldn't start your listing. Please try again." };
  return { ok: true, data: res.data._id };
}

// Next button: validated strictly and marks the step complete. Save and exit: saves whatever is valid and stays on the step.
export async function saveListingStep(id: string, step: number, body: Record<string, unknown>, saveAndExit = false): Promise<Result<ApiListing | null>> {
  return listingCall(`${listingPath(id)}/steps/${step}${saveAndExit ? "?saveAndExit=true" : ""}`, "PATCH", body);
}

// 422 means some steps are incomplete; `brokenSteps` lists them so the form can send the host back to the first
export async function submitListing(id: string): Promise<Result<ApiListing | null> & { brokenSteps?: number[] }> {
  const res = await listingCall(`${listingPath(id)}/submit`, "POST");
  if (res.ok || res.status !== 422) return res;
  const errors = (res.body as { errors?: Record<string, unknown> } | undefined)?.errors ?? {};
  const brokenSteps = Object.keys(errors).map(Number).filter(Boolean).sort((a, b) => a - b);
  return { ...res, brokenSteps };
}

const toMessage = (res: ApiResult<unknown>): Result => (res.ok ? { ok: true, data: undefined } : res);

export async function deleteListing(id: string): Promise<Result> {
  return toMessage(await apiFetch<MessageResponse>(listingPath(id), { method: "DELETE", auth: true }));
}

// The same endpoint pauses an active listing and resumes a paused one
export async function togglePauseListing(id: string): Promise<Result> {
  return toMessage(await apiFetch<MessageResponse>(`${listingPath(id)}/pause`, { method: "PATCH", auth: true }));
}

// Pulls a listing out of review; it goes back to being a draft
export async function withdrawListing(id: string): Promise<Result> {
  return toMessage(await apiFetch<MessageResponse>(`${listingPath(id)}/withdraw`, { method: "PATCH", auth: true }));
}
