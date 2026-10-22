import { CreditCard, ShieldCheck, TrendingUp } from 'lucide-react'
import PageHeading from '@/components/dashboard/page-heading'
import EmptyState from '@/components/host/empty-state'
import SectionCard from '@/components/host/section-card'
import AddBankForm from '@/components/host/payout/add-bank-form'
import BankAccountCard from '@/components/host/payout/bank-account-card'
import ExportButton from '@/components/host/payout/export-button'
import PayoutHistory from '@/components/host/payout/payout-history'
import PayoutTable from '@/components/host/payout/payout-table'
import { DUMMY_HOST, DUMMY_HOST_PAYOUTS, DUMMY_HOST_STATS, DUMMY_PAYOUT_SUMMARY } from '@/lib/dummy'
import { cn, formatNaira } from '@/lib/utils'

export default function Page() {
  const { bank } = DUMMY_HOST
  const hasBank = !!bank
  const payouts = DUMMY_HOST_PAYOUTS
  const upcoming = payouts.filter((p) => p.status === 'upcoming')
  const paid = payouts.filter((p) => p.status === 'paid')
  const pending = upcoming.reduce((sum, p) => sum + p.amount, 0)
  const s = DUMMY_PAYOUT_SUMMARY

  const summary = [
    { label: 'Total earned (All time)', value: s.totalEarned, note: `Across ${DUMMY_HOST_STATS.listingCount} listings`, className: 'bg-navy text-white border-navy', noteClass: 'text-green-400' },
    { label: 'This month', value: s.thisMonth, note: `${s.monthChange}% vs last month`, className: 'bg-white', noteClass: 'text-green-600', trend: true },
    { label: 'Pending release', value: pending, note: 'Upcoming check-in', className: 'bg-amber-50/60 border-amber-100', noteClass: 'text-amber-700', trend: true },
  ]

  return (
    <div className='flex flex-col gap-4 md:gap-6'>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <PageHeading className='mb-0' title='Payout' description='Your earnings history and bank account details for receiving payouts.' />
        {paid.length > 0 && <ExportButton payouts={paid} />}
      </div>

      {!hasBank && <AddBankForm />}

      {payouts.length === 0 ? (
        <>
          {hasBank && <BankAccountCard bank={bank} />}
          <EmptyState
            icon={CreditCard}
            title='No earnings yet'
            description='Your payout history and earnings will appear here once renters start booking your space. Payouts are released automatically on the day your guest checks in.'
          />
        </>
      ) : (
        <>
          <div className='grid gap-3 md:grid-cols-3 md:gap-4'>
            {summary.map(({ label, value, note, className, noteClass, trend }) => (
              <div key={label} className={cn('rounded-2xl border border-gray-100 p-4 md:p-5', className)}>
                <p className='text-xs md:text-sm opacity-80'>{label}</p>
                <p className='mt-1 text-xl md:text-2xl font-medium'>{formatNaira(value)}</p>
                <p className={cn('mt-2 flex items-center gap-1 text-xs', noteClass)}>
                  {trend && <TrendingUp className='size-3' />}
                  {note}
                </p>
              </div>
            ))}
          </div>

          {upcoming.length > 0 && (
            <SectionCard
              title='Upcoming payouts'
              action={<span className='shrink-0 whitespace-nowrap rounded-full bg-primary px-3 py-1.5 text-xs md:text-sm text-white'>{formatNaira(pending)}<span className='max-md:hidden'> total</span> pending</span>}
            >
              <div className='pt-3'>
                <PayoutTable payouts={upcoming} headerClassName='bg-primary-containers' />
              </div>
              <p className='mt-4 flex gap-2 rounded-lg bg-primary-containers px-3 py-2.5 text-xs md:text-sm text-primary'>
                <ShieldCheck className='mt-0.5 size-3.5 shrink-0' />
                {hasBank
                  ? "Funds are held in SpaceFinda's Paystack balance and released automatically on check-in day. You never need to request a payout manually."
                  : "Funds are held in SpaceFinda's Paystack balance. Add your bank account above so they're released automatically on check-in day."}
              </p>
            </SectionCard>
          )}

          {hasBank && <BankAccountCard bank={bank} />}
          <PayoutHistory payouts={paid} />
        </>
      )}
    </div>
  )
}
