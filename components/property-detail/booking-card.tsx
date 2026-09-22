import { formatNaira } from '@/lib/utils'
import { CheckIn } from '../icons/icons'
import { Button } from '../ui/button'
import { Check } from 'lucide-react'
import { InfoCircle } from 'iconsax-reactjs'
import Link from "next/link"

const amount = 120000
const items = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6+", value: "6+" },
]

function BookingCard() {
    return (
        <aside className='py-5 pl-5 col-span-5 hidden md:block'>
            <div className='p-6 space-y-2 bg-white rounded-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] outline-1 -outline-offset-1 gap-4 w-full'>
                <form action="" className='space-y-3 border-b border-b-text-Grey-Muted pb-4'>
                    <header className='space-y-3'>
                        <h4 className='text-Text-dark text-2xl font-["Inter"]'>
                            <span className="font-semibold">{formatNaira(amount)} /</span>
                            <span className="text-Text-body-text text-base font-normal font-['Geist'] leading-6">{" "}night</span>
                        </h4>
                        <p className="justify-start text-Text-body-text text-base font-normal font-['Geist'] leading-6">
                            Refundable caution fee of ₦10,000 applies
                        </p>
                    </header>

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
                        <label htmlFor="add-guest" className='p-3 rounded-xl border border-Grey-Light flex flex-col text-Text-dark font-medium flex flex-col items-start gap-px text-sm font-["Geist"]'>
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

                    <Button className='w-full h-12 roundded-xl' size={"lg"}>
                        Book now
                    </Button>
                    
                    <div className='flex items-center justify-center text-sm leading-[150%] text-[#888]'>
                        <Check color='#888' size={14}/>
                        <span>Your payment is held securely until check-in day</span>
                    </div>
                </form>

                <ul className='space-y-2.5'>
                    <li className='flex items-center justify-between leading-[150%]'>
                        <span className='text-Body-Text'>{formatNaira(amount)} x 1 nights</span>
                        <span className='text-Text-dark'>{formatNaira(amount)}</span>
                    </li>
                    <li className='flex items-center justify-between leading-[150%]'>
                        <span className='text-Body-Text'>Caution fee</span>
                        <span className='text-Text-dark'>{formatNaira(10000)}</span>
                    </li>
                    <li className='bg-text-Grey-Muted h-px' />
                    <li className='flex items-center justify-between leading-[150%]'>
                        <span className='text-Body-Text'>Total</span>
                        <span className='text-Text-dark'>{formatNaira(130000)}</span>
                    </li>
                </ul>

                <div className='text-Body-Text flex item-start gap-2 bg-primary-containers p-3 rounded-md my-3'>
                    <div className='shrink-0 pt-1'>
                        <InfoCircle color='#205BF3' size={16} className=''/>
                    </div>
                    <p className=''>This listing has a Flexible cancellation policy. Cancel at least 24 hours check-in for a full rent  refund.</p>
                </div>

                <p className='text-Body-Text text-center'>
                    Something feels off? <Link href='/report-lsting' className='text-primary underline'>Report this listings</Link>
                </p>
            </div> 
        </aside>
    )
}

export default BookingCard