import { notFound } from 'next/navigation'
import BookingDetail from '@/components/host/bookings/booking-detail'
import { getHostBooking } from '@/lib/host/api'
import { toHostBooking } from '@/lib/host/mappers'

// The [ref] segment holds the booking's API id
export default async function Page({ params }: { params: Promise<{ ref: string }> }) {
  const { ref: id } = await params
  const booking = await getHostBooking(id)

  if (!booking) notFound()

  return <BookingDetail booking={toHostBooking(booking)} />
}
