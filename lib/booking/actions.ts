"use server";

import { apiFetch } from "@/lib/api/client";
import type { ApiGuestBooking, ApiResult, DataResponse, PaymentInit, PaymentProvider, PaymentVerification } from "@/lib/api/types";

// The booking starts pending and unpaid; the server works out the price
export async function createBooking(input: { apartmentId: string; checkIn: string; checkOut: string; guestsCount: number }): Promise<ApiResult<ApiGuestBooking>> {
  const res = await apiFetch<DataResponse<ApiGuestBooking>>("/booking", { method: "POST", body: input, auth: true });
  return res.ok ? { ok: true, data: res.data.data } : res;
}

// Returns the provider's checkout page; the provider sends the guest back to the backend's PAYMENT_CALLBACK_URL
export async function initializePayment(bookingId: string, provider: PaymentProvider = "paystack"): Promise<ApiResult<PaymentInit>> {
  const res = await apiFetch<DataResponse<PaymentInit>>("/transaction/initialize", { method: "POST", body: { bookingId, provider }, auth: true });
  return res.ok ? { ok: true, data: res.data.data } : res;
}

// Asks the provider whether the payment went through; "pending" means call again in a few seconds
export async function verifyPayment(reference: string): Promise<ApiResult<PaymentVerification>> {
  const res = await apiFetch<DataResponse<PaymentVerification>>(`/transaction/verify/${encodeURIComponent(reference)}`, { auth: true });
  return res.ok ? { ok: true, data: res.data.data } : res;
}
