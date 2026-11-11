import MyProfile from '@/components/dashboard/profile/my-profile'
import { getMyBookings } from '@/lib/booking/api'

export default async function Page() {
  // A completed stay is a paid booking whose checkout date has passed (or the backend marked completed)
  const now = new Date()
  const completed = (await getMyBookings()).filter(
    (b) => b.status === 'completed' || (b.status === 'confirmed' && b.paymentStatus === 'paid' && new Date(b.checkOut) < now)
  )

  return (
    <MyProfile
      stats={{
        completedStays: completed.length,
        nightsStayed: completed.reduce((sum, b) => sum + (b.pricing?.nights ?? 0), 0),
        // There's no reviews endpoint yet
        reviewsReceived: 0,
      }}
    />
  )
}
