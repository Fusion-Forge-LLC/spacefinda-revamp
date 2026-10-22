import { notFound } from 'next/navigation'
import BookingDetail from '@/components/host/bookings/booking-detail'
import { DUMMY_HOST_BOOKINGS } from '@/lib/dummy'

export default async function Page({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params
  const booking = DUMMY_HOST_BOOKINGS.find((b) => b.ref === ref)

  if (!booking) notFound()

  return <BookingDetail booking={booking} />
}
