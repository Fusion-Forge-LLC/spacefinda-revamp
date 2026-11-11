import Payments from '@/components/dashboard/payment/payments'
import { getMyBookings } from '@/lib/booking/api'
import { toPayment } from '@/lib/apartments/mappers'

export default async function Page() {
  // Only bookings that were actually paid have a payment record (refunded ones show as cancelled)
  const bookings = await getMyBookings()
  const now = new Date()
  const payments = bookings.filter((b) => b.paymentStatus === 'paid' || b.paymentStatus === 'refunded').map((b) => toPayment(b, now))

  return <Payments payments={payments} />
}
