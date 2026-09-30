import { InfoCircle } from 'iconsax-reactjs'
import React from 'react'

function BookingNote() {
    return (
        <div className='text-Body-Text flex item-start gap-2 bg-[#F0FDF5] p-3 rounded-md my-3 text-sm sm:text-base'>
            <div className='shrink-0 pt-1'>
                <InfoCircle color='#205BF3' size={16} className=''/>
            </div>
            <p className=''>This listing has a Flexible cancellation policy. Cancel at least 24 hours check-in for a full rent  refund.</p>
        </div>
    )
}

export default BookingNote