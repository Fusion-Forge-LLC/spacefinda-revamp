import type { Metadata } from 'next'
import PaymentStatus from '@/components/payment/payment-status'

export const metadata: Metadata = { title: 'Confirming your payment | Spacefinda' }

// Paystack returns ?reference= (and ?trxref=), Flutterwave returns ?tx_ref=
export default async function Page({ searchParams }: { searchParams: Promise<{ reference?: string; trxref?: string; tx_ref?: string }> }) {
  const { reference, trxref, tx_ref } = await searchParams
  return <PaymentStatus reference={reference ?? trxref ?? tx_ref ?? ''} />
}
