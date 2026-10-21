import type { HostBooking } from "@/lib/dummy";

export const COMMISSION_RATE = 0.1;

export function getBookingAmounts(booking: HostBooking) {
  const subtotal = booking.pricePerNight * booking.nights;
  const commission = subtotal * COMMISSION_RATE;
  return { subtotal, commission, payout: subtotal - commission, total: subtotal + booking.cautionFee };
}
