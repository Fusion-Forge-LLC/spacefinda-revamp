// Server-side reads for the signed-in guest's bookings
import { apiFetch } from "@/lib/api/client";
import type { ApiGuestBooking, DataResponse } from "@/lib/api/types";

export async function getMyBookings(): Promise<ApiGuestBooking[]> {
  const res = await apiFetch<DataResponse<ApiGuestBooking[]>>("/booking/me", { auth: true });
  return res.ok ? res.data.data ?? [] : [];
}
