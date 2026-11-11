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
  if (!res.ok) return res;

  // Swagger documents data.paymentUrl, but accept the provider's own field names in case the backend passes them through
  const data = (res.data?.data ?? {}) as Partial<PaymentInit> & Record<string, unknown>;
  const nested = (data.data ?? {}) as Record<string, unknown>;
  const paymentUrl = [data.paymentUrl, data.authorization_url, data.link, nested.authorization_url, nested.link].find(isHttpUrl);
  if (!paymentUrl) {
    // Without this check, assign(undefined) sends the guest to /listings/undefined
    console.error("[api] /transaction/initialize returned no payment URL:", JSON.stringify(res.data));
    return { ok: false, status: 502, message: "We couldn't open the payment page. Please try again in a moment." };
  }
  return { ok: true, data: { ...data, paymentUrl } as PaymentInit };
}

function isHttpUrl(value: unknown): value is string {
  return typeof value === "string" && /^https?:\/\//.test(value);
}

// Asks the provider whether the payment went through; "pending" means call again in a few seconds
export async function verifyPayment(reference: string): Promise<ApiResult<PaymentVerification>> {
  const res = await apiFetch<DataResponse<PaymentVerification>>(`/transaction/verify/${encodeURIComponent(reference)}`, { auth: true });
  return res.ok ? { ok: true, data: res.data.data } : res;
}
