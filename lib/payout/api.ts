// Server-side reads for the host's payout accounts
import { apiFetch } from "@/lib/api/client";
import type { Bank, DataResponse, PayoutMethod } from "@/lib/api/types";

export async function getPayoutMethods(): Promise<PayoutMethod[]> {
  const res = await apiFetch<DataResponse<PayoutMethod[]>>("/payout/methods", { auth: true });
  return res.ok ? res.data.data ?? [] : [];
}

// Paystack's bank list for the dropdown, active banks only, A–Z
export async function getBanks(): Promise<Bank[]> {
  const res = await apiFetch<DataResponse<Bank[]>>("/payout/banks?country=nigeria", { auth: true });
  if (!res.ok) return [];
  const seen = new Set<string>();
  return (res.data.data ?? [])
    .filter((b) => b.active !== false && b.code && !seen.has(b.code) && seen.add(b.code))
    .sort((a, b) => a.name.localeCompare(b.name));
}
