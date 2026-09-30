import React from 'react'
import { CheckIn } from '../icons/icons'
import { Button } from '../ui/button'
import BookingSummary from './booking-summary'
import BookingNote from './booking-note'
import { Lock } from 'iconsax-reactjs'

const items = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6+", value: "6+" },
]

function CheckInComponent() {
    return (
        <>
            <div className='grid grid-cols-2'>
                <button className='p-3 rounded-l-xl border border-Grey-Light inline-flex justify-between items-center'>
                    <span className='flex flex-col items-start gap-px text-sm font-["Geist"]'>
                        <span className='text-Text-dark font-medium'>Check - in</span>
                        <span className='text-[#888]'>Add date</span>
                    </span>
                    <CheckIn />
                </button>
                <button className='p-3 rounded-r-xl border-r border-y border-Grey-Light inline-flex justify-between items-center'>
                    <span className='flex flex-col items-start gap-px text-sm font-["Geist"]'>
                        <span className='text-Text-dark font-medium'>Check - Out</span>
                        <span className='text-[#888]'>Add date</span>
                    </span>
                    <CheckIn className='-scale-x-100' />
                </button>   
            </div>

            <div>
                <label htmlFor="add-guest" className='p-3 rounded-xl border border-Grey-Light text-Text-dark font-medium flex flex-col items-start gap-px text-sm font-["Geist"]'>
                    Guest
                    <select name="" id="add-guest" className='text-[#888] w-full'>
                        <option value="">{"Add guest"}</option>
                        {items.map((item) => {
                            return(
                                <option key={item.label} value={item.value}>{item.label}</option>
                            )
                        })}
                    </select>
                </label>
            </div>

            <BookingSummary className='bg-text-Grey-Muted p-2 md:hidden' amount={120000} />

            <div className='text-Body-Text flex item-start gap-2 bg-primary-containers p-3 rounded-md my-3 text-sm'>
                <div className='shrink-0 pt-1'>
                    <Lock color='#16A34A' size={16} className=''/>
                </div>
                <p className=''><span className='text-Text-dark'>Your payment is held securely until check-in.</span> No money reaches the host before you arrive.</p>
            </div>

            <BookingNote />

            <Button className='w-full h-10 roundded-xl' size={"default"}>
                Confirm your booking
            </Button>
        </>
    )
}

export default CheckInComponent