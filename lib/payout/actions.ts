"use server";

import { apiFetch } from "@/lib/api/client";
import type { ApiResult, DataResponse, PayoutMethod, ResolvedAccount } from "@/lib/api/types";

// Resolves the account holder's name from the account number and bank code (422 when it can't be found)
export async function verifyBankAccount(accountNumber: string, bankCode: string): Promise<ApiResult<ResolvedAccount>> {
  const query = new URLSearchParams({ account_number: accountNumber, bank_code: bankCode });
  const res = await apiFetch<DataResponse<ResolvedAccount>>(`/payout/banks/verify-account?${query}`, { auth: true });
  return res.ok ? { ok: true, data: res.data.data } : res;
}

export async function addPayoutMethod(input: { account_number: string; bank_code: string; bank_name: string; account_name: string }): Promise<ApiResult<PayoutMethod>> {
  const res = await apiFetch<DataResponse<PayoutMethod>>("/payout/methods", { method: "POST", body: input, auth: true });
  return res.ok ? { ok: true, data: res.data.data } : res;
}
