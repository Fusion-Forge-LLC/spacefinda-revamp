import { notFound } from 'next/navigation'
import Receipt from '@/components/dashboard/payment/receipt'
import { getMyBookings } from '@/lib/booking/api'
import { toPayment } from '@/lib/apartments/mappers'

// There's no single-booking endpoint for guests yet, so find it in the guest's bookings
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const booking = (await getMyBookings()).find((b) => b._id === id && b.paymentStatus !== 'unpaid')

  if (!booking) notFound()

  return <Receipt payment={toPayment(booking)} />
}
