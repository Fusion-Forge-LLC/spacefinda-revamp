import { notFound } from 'next/navigation'
import Receipt from '@/components/dashboard/payment/receipt'
import { DUMMY_PAYMENTS } from '@/lib/dummy'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payment = DUMMY_PAYMENTS.find((p) => p.id === id)

  if (!payment) notFound()

  return <Receipt payment={payment} />
}
