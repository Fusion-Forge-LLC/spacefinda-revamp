"use client"

import React, { useState } from 'react'
import { addDays, format, parseISO, startOfDay } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { Lock } from 'iconsax-reactjs'
import { toast } from 'sonner'
import { CheckIn } from '../icons/icons'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import BookingSummary from './booking-summary'
import BookingNote from './booking-note'
import AuthFlow from '../authentication/auth-flow'
import { useAuth } from '../authentication/auth-provider'
import type { ApiApartment } from '@/lib/api/types'
import { quoteBooking } from '@/lib/apartments/mappers'
import { createBooking, initializePayment } from '@/lib/booking/actions'

const day = (date: Date) => format(date, 'yyyy-MM-dd')

// Picks dates and guests, then books and sends the guest to Paystack to pay
function CheckInComponent({ apartment }: { apartment: ApiApartment }) {
    const { user } = useAuth()
    const [range, setRange] = useState<DateRange | undefined>()
    const [guests, setGuests] = useState('')
    const [pickerOpen, setPickerOpen] = useState(false)
    const [showAuth, setShowAuth] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const maxGuests = apartment.maxGuests ?? 1
    const quote = quoteBooking(apartment, range?.from, range?.to)

    // Past days, days before the listing opens, and nights the host has blocked
    const today = startOfDay(new Date())
    const opens = apartment.availability?.startDate ? startOfDay(parseISO(apartment.availability.startDate)) : today
    const blocked = (apartment.blockedDates ?? []).map(({ from, to }) => ({ from: parseISO(from), to: addDays(parseISO(to), -1) }))
    const disabled = [{ before: opens > today ? opens : today }, ...blocked]

    const book = async () => {
        if (!range?.from || !range?.to || quote.nights < 1) {
            toast.error('Choose your check-in and check-out dates')
            setPickerOpen(true)
            return
        }
        if (!guests) {
            toast.error('Choose how many guests are staying')
            return
        }
        if (!user) {
            toast('Sign in to book this space')
            setShowAuth(true)
            return
        }

        setSubmitting(true)
        const booking = await createBooking({ apartmentId: apartment._id, checkIn: day(range.from), checkOut: day(range.to), guestsCount: Number(guests) })
        if (!booking.ok) {
            setSubmitting(false)
            if (booking.status === 401) setShowAuth(true)
            toast.error(booking.status === 409 ? 'Those dates were just taken. Please pick different dates.' : booking.message)
            return
        }

        const payment = await initializePayment(booking.data._id, 'paystack')
        if (!payment.ok) {
            setSubmitting(false)
            toast.error(payment.message)
            return
        }
        // Paystack sends the guest back to /payment/callback once they've paid
        window.location.assign(payment.data.paymentUrl)
    }

    const dateLabel = (date?: Date) => (date ? format(date, 'EEE d MMM') : 'Add date')

    return (
        <>
            <AuthFlow showModal={showAuth} setShowModal={setShowAuth} />
            <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
                <PopoverTrigger asChild>
                    <div className='grid grid-cols-2' role='button' tabIndex={0} aria-label='Choose your dates'>
                        <span className='p-3 rounded-l-xl border border-Grey-Light inline-flex justify-between items-center cursor-pointer'>
                            <span className='flex flex-col items-start gap-px text-sm font-["Geist"]'>
                                <span className='text-Text-dark font-medium'>Check - in</span>
                                <span className={range?.from ? 'text-Text-dark' : 'text-[#888]'}>{dateLabel(range?.from)}</span>
                            </span>
                            <CheckIn />
                        </span>
                        <span className='p-3 rounded-r-xl border-r border-y border-Grey-Light inline-flex justify-between items-center cursor-pointer'>
                            <span className='flex flex-col items-start gap-px text-sm font-["Geist"]'>
                                <span className='text-Text-dark font-medium'>Check - Out</span>
                                <span className={range?.to ? 'text-Text-dark' : 'text-[#888]'}>{dateLabel(range?.to)}</span>
                            </span>
                            <CheckIn className='-scale-x-100' />
                        </span>
                    </div>
                </PopoverTrigger>
                <PopoverContent align='end' className='w-auto p-0'>
                    <Calendar
                        mode='range'
                        selected={range}
                        onSelect={(next) => {
                            setRange(next)
                            if (next?.from && next?.to && next.from.getTime() !== next.to.getTime()) setPickerOpen(false)
                        }}
                        disabled={disabled}
                        excludeDisabled
                        startMonth={new Date()}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>

            <div>
                <label htmlFor={`add-guest-${apartment._id}`} className='p-3 rounded-xl border border-Grey-Light text-Text-dark font-medium flex flex-col items-start gap-px text-sm font-["Geist"]'>
                    Guest
                    <select
                        id={`add-guest-${apartment._id}`}
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className='text-[#888] w-full'
                    >
                        <option value=''>Add guest</option>
                        {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </label>
            </div>

            {quote.nights > 0 && <BookingSummary className='bg-text-Grey-Muted p-2' pricePerNight={apartment.pricePerNight ?? 0} quote={quote} />}

            <div className='text-Body-Text flex item-start gap-2 bg-primary-containers p-3 rounded-md my-3 text-sm'>
                <div className='shrink-0 pt-1'>
                    <Lock color='#16A34A' size={16} className=''/>
                </div>
                <p className=''><span className='text-Text-dark'>Your payment is held securely until check-in.</span> No money reaches the host before you arrive.</p>
            </div>

            <BookingNote policy={apartment.cancellationPolicy} />

            <Button type='button' onClick={book} disabled={submitting} className='w-full h-10 roundded-xl' size={"default"}>
                {submitting ? 'Taking you to payment...' : 'Confirm your booking'}
            </Button>
        </>
    )
}

export default CheckInComponent
