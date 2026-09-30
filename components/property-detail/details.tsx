"use client"

import React from 'react'
import Wrapper from '../wrapper/wrapper'
import { Location, Verify, Profile2User, InfoCircle, House, Clock, Sms,
    Wifi, 
    Monitor, 
    Briefcase,
    SecurityUser,
    Forbidden,
    CloseCircle,
    ShieldSecurity,
    ShieldTick,
    Call,
    Autobrightness,
    Lock,
    TickCircle
 } from 'iconsax-reactjs'
import { Bed, Bathtub, AirConditioner, Regrigerator, CarPark, Knife } from '../icons/icons'
import { formatLabel } from '@/lib/utils';
import { Rating } from './rating';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { AmenityItem } from '@/@types/types';
import { FireExtinguisher } from 'lucide-react';
import Link from 'next/link';
import BaseImage from "@/public/images/basemap-image.png"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DialogMessage } from '../ui/modal/dialog-message';
import { DrawerDialog } from '../ui/drawer/responsive-drawer';
import ReviewCard from './review-card';
import { amenities, protection, refundOPtion } from '@/content/site';
import { useIsMobile } from '@/hooks/use-media-query';

const propertyDetails = {
    guests: 2,
    bedroom: 2,
    bed: 2,
    bathtub: 2,
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  guests: Profile2User,
  bedroom: House,
  bed: Bed,
  bathtub: Bathtub,


};

export const propertyAmenities: AmenityItem[] = [
  {
    id: 'free_wifi',
    label: 'Free Wifi',
    icon: Wifi,
  },
  {
    id: 'air_condition',
    label: 'Air Condition',
    icon: AirConditioner,
  },
  {
    id: 'regrigerator',
    label: 'Regrigerator',
    icon: Regrigerator,
  },
  {
    id: 'workspace_desk',
    label: 'Workspace Desk',
    icon: Briefcase,
  },
  {
    id: 'smart_tv',
    label: 'Smart TV',
    icon: Monitor,
  },
  {
    id: 'parking',
    label: 'Parking',
    icon: CarPark,
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: Knife
  },
  {
    id: 'guard',
    label: 'Security Guard',
    icon: SecurityUser
  }
];

const rules = {
    checkIn: "12:00 PM",
    checkOut: "1:00 AM",
    maxGuest: 2,
    smoking: false,
    cancelation: "24 hrs"
}

const reviews = [
    {
        name: "Abdullahi Khadijah",
        image: "/images/profile/425a32c0973170d750514947064f636e2aeef239.jpg",
        date: "January 2026",
        rating: 5,
        note: "Really clean and comfortable space. Everything was exactly as described. The host was responsive and the whole booking process was smooth. Would definitely stay again."
    },
    {
        name: "Adaeze Okonkwo",
        image: "/images/profile/81b5fea648eba2a75d270f261bd259114c668e29.jpg",
        date: "January 2026",
        rating: 5,
        note: "Excellent apartment. The generator came on immediately during power cuts which I really appreciated. Location is great and very secure. Highly recommend."
    },
    {
        name: "Chisom Ike",
        image: "/images/profile/ca043b1ef4cc927e1a5be6a5e0fabaf1b067fd6d.jpg",
        date: "February 2026",
        rating: 5,
        note: "Nice space overall. WiFi was solid and the kitchen had everything I needed. The caution fee was refunded quickly after checkout which was reassuring. Good experience."
    },
    {
        name: "Emeka Madu",
        image: "/images/profile/ca043b1ef4cc927e1a5be6a5e0fabaf1b067fd6d.jpg",
        date: "March 2026",
        rating: 5,
        note: "First time using SpaceFinda and I was impressed. The payment process was clear and I felt safe knowing my money was held until I actually checked in. The apartment itself was great."
    },
]

const safetyInformation = [

    {
        id: 1,
        icon: ShieldSecurity,
        label: "Security guard on premises"
    },
    {
        id: 2,
        icon: Profile2User,
        label: "Fire extinguisher available"
    },
    {
        id: 3,
        icon: FireExtinguisher,
        label: "Smoke detector installed"
    },
    {
        id: 4,
        icon: ShieldTick,
        label: "Secured compound with gate"
    },
    {
        id: 5,
        icon: Call,
        label: "Emergency contact"
    },
    {
        id: 6,
        icon: Autobrightness,
        label: "Well-lit entrace and stairway"
    },
]

const bookWithConfidence = [
    "Book with confidence",
    "This listing is reviewed and verified by SpaceFinda before going live.",
    "Your payment is held securely until the day you check in. It never reaches the host before your arrival.",
    "A caution fee is collected and held separately. It is returned to you after checkout if no damage is reported."
]

function Details() {
    const isMobile = useIsMobile();

    const entries = Object.entries(propertyDetails).filter(
        ([_, value]) => value !== undefined && value !== null
    );

    return (
        <section className='col-span-7'>
                <div className="space-y-2 border-b border-b-[#E9E9E9] py-6 max-md:px-4">
                    <div className='flex items-center gap-1'>
                        <span className='flex items-center gap-1 md:gap-2 text-sm text-[#9E8549] bg-[#F7F7EF] px-2 md:px-3 py-1 md:py-1.5 rounded-lg w-fit text-nowrap'>
                            <Verify size="14" color="#9E8549"/>
                            Spacefinda Verified
                        </span>

                        <span className='flex items-center gap-1 md:gap-2 text-sm text-[#454545] px-3 py-1.5'>
                            <Location size="14" color="#9E8549"/>
                            <span className='max-md:hidden'>123 Main Street,</span> Ibadan, Nigeria
                        </span>
                    </div>

                    <ul className="flex items-center gap-2 text-sm text-gray-700 flex-wrap">
                        {entries.map(([key, value], index) => {
                            // Dynamically pick icon or fallback to default Info icon
                            const IconComponent = ICON_MAP[key.toLowerCase()] || InfoCircle;
                            const formattedLabel = formatLabel(key, value);

                            return (
                                <li key={key} className="flex items-center gap-2 text-Body-Text">
                                    <div className="flex items-center gap-1.5">
                                        <IconComponent size="18" color="#616161" className="text-gray-600" variant="Linear" />
                                        <span>
                                            {value} {formattedLabel}
                                        </span>
                                    </div>

                                    {/* Separator dot rendered except after the last item */}
                                    {index < entries.length - 1 && (
                                        <span className="text-gray-400 text-xs select-none">•</span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                
                    <Rating rating={4.5} totalReviews={1250} formatCompact />
                </div>

                <div className='flex flex-col-reverse md:flex-col'>
                    <article className='space-y-2 py-6 border-b max-md:px-4 border-b-[#E9E9E9]'>
                        <h3 className='font-semibold text-2xl tracking-[-3%] leading-[120%] font-inter text-Text-dark'>About this space</h3>
                        <p className='text-Body-Text text-sm sm:text-base font-["Geist"]'>
                            A comfortable and fully furnished 2-bedroom apartment in the heart of Bodija. Perfect for short stays, business trips or weekend getaways. The apartment is clean, secure and comes with all the essentials you need for a relaxed stay. The space is located in a quiet...
                        </p>

                        <button className='font-["Geist"] text-Text-dark text-sm sm:text-base underline font-medium'>
                            Show more
                        </button>
                    </article>

                    <div className='flex flex-col md:flex-row max-md:px-4 max-md:gap-4 justify-between items-center py-6 border-b border-b-[#E9E9E9]'>
                        <div className='flex items-start md:items-center gap-4'>
                            <div className="md:w-24 md:h-24 w-12 relative aspect-square rounded-full overflow-hidden shrink-0">
                                <Image
                                    src="/images/listings/taiwo-adeyemi.jpg"
                                    alt="Host image"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <div className='space-y-2'>
                                <h5 className='font-medium text-xl leading-[120%] font-inter text-Text-dark'>
                                    Hosted by John Doe {" "}
                                    <Badge className='bg-[#F7F7EF] text-[#9E8549]'>
                                        <Verify color='#9E8549' size={14} />
                                        Verified Host
                                    </Badge>
                                </h5>
                                <p className='text-Body-Text text-sm sm:text-base font-["Geist"]'>
                                    Member since January 2026
                                </p>
                                <p className='text-Body-Text text-sm sm:text-base font-["Geist"] flex items-center gap-1'>
                                    <Clock variant={"Linear"} color="#888888" size={16}/> <span>Typically responds within 2 hours</span>
                                </p>
                            </div>
                        </div>

                        <DialogMessage />
                    </div>
                </div>

                <div className='py-6 space-y-5 max-md:px-4'>
                    <h4 className='font-semibold text-lg md:text-2xl tracking-[-3%] leading-[120%] font-inter text-Text-dark'>
                        What you Enjoy
                    </h4>
                    <ul className="grid grid-cols-2 gap-4 max-w-md font-['Geist'] text-Body-Text">
                        {propertyAmenities.map(({ id, label, icon: IconComponent }) => (
                            <li key={id} className="flex items-center gap-2.5 text-gray-700">
                                <IconComponent size={22} color='#616161' className=" shrink-0" variant="Linear" />
                                <span className="leading-[150%]">{label}</span>
                            </li>
                        ))}
                    </ul>
                    <DrawerDialog 
                        triggerBtn={<button className='flex items-center justify-center max-md:h-12 max-md:w-full gap-2 bg-text-Grey-Muted hover:bg-[#D6E3FF] text-Body-Text text-sm sm:text-base font-["Geist"] font-medium px-4 py-2 rounded-lg'>
                            Show all amenities
                        </button>}
                        title='Amenities'
                        subtitle=""
                    >
                        {amenities.map((category) => (
                            <div key={category.category} className='border-b border-b-text-Grey-Muted text-Body-Text text-sm sm:text-base first:pt-0 last:pb-0 last:border-b-0 py-3'>
                                <h3 className='text-[#454545] font-medium mb-4'>{category.category}</h3>

                                <div className="grid grid-cols-12 gap-3">
                                    {category.items.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div key={item.name} className="flex items-center gap-2 sm:gap-3 odd:col-span-7 even:col-span-5">
                                                <Icon className="h-5 w-5 shrink-0" color='#888888' />
                                                <span className='text-nowrap'>{item.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </DrawerDialog>
                </div>

                <div className='py-6 space-y-5 border-y border-y-grey-200 px-4'>
                    <h4 className='font-semibold text-lg md:text-2xl tracking-[-3%] leading-[120%] font-inter text-Text-dark'>
                        House Rules & Policies
                    </h4>
                    <ul className="font-['Geist'] text-Body-Text text-sm md:text-base space-y-2">
                        <li className="text-gray-700 flex items-center gap-1">
                            <Clock size={isMobile ? 14 : 16} color='#616161' className=" shrink-0" variant="Linear" />
                            Check in:
                            <span className="leading-[150%] text-Text-Dark">{rules.checkIn}</span>
                        </li>
                        <li className="text-gray-700 flex items-center gap-1">
                            <Clock size={isMobile ? 14 : 16} color='#616161' className=" shrink-0" variant="Linear" />
                                Check Out:
                            <span className="leading-[150%] text-Text-Dark">{rules.checkOut}</span>
                        </li>
                        <li className="text-gray-700 flex items-center gap-1">
                            <Profile2User size={isMobile ? 14 : 16} color='#616161' className=" shrink-0" variant="Linear" />
                                Max guests:
                            <span className="leading-[150%] text-Text-Dark">{rules.maxGuest}</span>
                        </li>
                        {!rules.smoking && <li className="text-gray-700 flex items-center gap-1">
                            <Forbidden size={isMobile ? 14 : 16} color='#616161' className=" shrink-0" variant="Linear" />
                            No smoking indoors
                        </li>}
                        <li className="text-gray-700 flex items-center gap-1">
                            <CloseCircle size={isMobile ? 14 : 16} color='#616161' className=" shrink-0" variant="Linear" />
                             Cancellation: Free before    
                            <span className="leading-[150%] text-Text-Dark">{rules.cancelation}</span>
                            of Check-in
                        </li>
                    </ul>
                </div>

                <div className='py-6 space-y-5 border-b border-b-grey-200 px-4'>
                    <h4 className='font-semibold text-lg md:text-2xl tracking-[-3%] leading-[120%] font-inter text-Text-dark'>
                        Safety Information
                    </h4>
                    <ul className="grid grid-cols-2 gap-4 text-sm md:text-base">
                        {safetyInformation.map(item => (
                            <li key={item.id} className='p-2 max-md:bg-text-Grey-Muted text-Body-Text rounded-md flex gap-2 md:items-center'>
                                <item.icon color='#616161' className='shrink-0 mt-1' size={isMobile ? 14 : 16} />
                                <span>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='py-6 space-y-5 border-b border-b-grey-200 px-4'>
                    <h4 className='font-semibold text-lg md:text-2xl tracking-[-3%] leading-[120%] font-inter text-Text-dark'>
                        Cancellation Policy
                    </h4>
                    <div className='p-4 bg-text-Grey-Muted text-Body-Text rounded-md flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <Badge className='bg-primary-containers text-primary'>Flexible</Badge>
                            <h4 className='font-medium text-xl'>Full refund available</h4>
                        </div>
                        <p className='text-Body-Text'>Cancel at least 24 hours before your check-in time and receive a full rent refund. Cancellations made less than 24 hours before check-in are not eligible for a refund. The caution fee and processing fee are handled separately and follow their own timelines.</p>
                        <DrawerDialog 
                            triggerBtn={<Button variant={"ghost"} className='underline text-primary text-left items-start p-0 lg:text-lg '>
                                Learn more about cancellation policies
                            </Button>}
                            title='Cancellation policies'
                            subtitle=""
                        >
                            <article className='text-Body-Text'>
                                <p className='text-sm sm:text-base pb-5 border-b border-b-text-Grey-Muted'>SpaceFinda uses <span className='text-Text-dark'>three preset cancellation tiers</span>. Each owner selects one policy per listing. You will always see the policy clearly before booking. The caution fee follows its own separate timeline in all cases.</p>
                                <ul className='space-y-4'>
                                    {refundOPtion.map((item, index) => {
                                        return(
                                            <li className='rounded-md p-3 border border-light-Grey' key={item.label}>
                                                <h5 className='flex items-center gap-2 mb-4'>
                                                    <Badge className={item.className}>{item.label}</Badge>
                                                    <span className='text-Text-dark font-medium'>{item.title}</span>
                                                </h5>
                                                <p>{item.note}</p>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <p className='text-[11px]'>SpaceFinda handles all refunds automatically. You never need to chase the host for your money back.</p>
                            </article>
                        </DrawerDialog>
                    </div>
                </div>

                <div className='py-6 space-y-5 border-b border-b-grey-200 px-4'>
                    <h4 className='font-semibold text-lg md:text-2xl tracking-[-3%] leading-[120%] font-inter text-Text-dark'>
                        Where you will be staying
                    </h4>
                    <div className=' text-Body-Text rounded-md flex flex-col gap-2 border-x border-b border-[#E9E9E9]'>
                        <Image 
                            src={BaseImage}
                            alt='map image'
                        />
                        <div className='px-3'>
                            <div className='flex items-center gap-1'>
                                <Location size={14} color='#111' />
                                <h5 className='font-medium text-sm text-[#454545] leading-[150%]'>Bodija, Ibadan, Oyo State</h5>
                            </div>
                            <p className='text-sm text-Body-Text'>Bodija is one of Ibadan's well-established residential neighbourhoods, offering easy access to the University of Ibadan, Bodija Market, and major roads. The area is calm, accessible and well-serviced.</p>
                            <p className='text-Body-Text flex items-center gap-1 py-2.5 mt-2.5 border-t border-t-[#E9E9E9] text-[11px]'>
                                <Lock size={11} color='#616161' />
                                Exact address is shared after your booking is confirmed.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='py-6 space-y-5 border-b border-b-grey-200 px-4 text-Body-Text'>
                    <h4 className='flex items-center gap-2.5'>
                        <span className='text-2xl text-Text-dark font-semibold tracking-[-3%] font-inter'>4.9</span>
                        <div>
                            <Rating rating={5} size={14} totalReviews={1250} formatCompact showNumber={false} showReviews={false}/>
                            <span className=''>24 reviews</span>
                        </div>
                    </h4>

                    <ul className='space-y-2 lg:grid lg:grid-cols-2 lg:gap-4'>
                        {reviews.map((review, index) => {
                            return <ReviewCard className='bg-text-Grey-Muted' {...review} key={index} />
                        })}
                    </ul>

                    <DrawerDialog 
                        triggerBtn={
                            <Button className='w-full border-light-Grey text-Body-Text h-12 font-medium' variant={"outline"}>
                                Show all 24 reviews 
                            </Button>
                        }
                        title='Guest reviews'
                        subtitle={
                            <div className='flex gap-2'>
                                <Rating rating={4.9} showReviews={false} showNumber={false} formatCompact size={12} />
                                <span className='text-Text-Body'>4.9 out of 5 · 24 reviews</span>
                            </div>
                        }
                    >
                        <ul className='space-y-2'>
                            {[...reviews, ...reviews, ...reviews].map((review, index) => {
                                return <ReviewCard {...review} key={index} />
                            })}
                        </ul>
                    </DrawerDialog>
                
                </div>

                <div className='py-6 space-y-5 border-b border-b-grey-200 px-4'>
                    <div className='bg-primary-containers p-4 rounded-md'>
                        <ul className='space-y-2 mb-4'>
                            {bookWithConfidence.map((item, index) => {
                                return(
                                    <li key={index} className='flex items-start gap-2 first:font-medium first:text-lg first:mb-4 mb-2 last:mb-0 text-[#0E173B] text-sm leading-[150%] -mt-1'>
                                        {index === 0 ? <ShieldTick size={18} color='#205BF3' />: <TickCircle size={16} color='#205BF3' className='shrink-0' />}
                                        <span className='-mt-1'>{item}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <DrawerDialog 
                            triggerBtn={<Button variant={"ghost"} className='underline text-primary text-left items-start lg:text-base p-0'>
                                Learn how SpaceFinda protect you
                            </Button>}
                            title='Cancellation policies'
                            subtitle="How SpaceFinda protects you"
                        >
                            <ul className='space-y-3'>
                                {protection.map((item, index) => (
                                    <li key={index} className='flex items-start gap-3'>
                                        <span className="grid place-content-center shrink-0 bg-primary-containers text-primary h-12 w-12 rounded-md">
                                            <item.Icon />
                                        </span>
                                        <article>
                                            <h5 className="text-Text-dark font-medium leading-[150%]">{item.title}</h5>
                                            <p className='text-Body-Text text-sm leading-[150%]'>{item.note}</p>
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        </DrawerDialog>
                    </div>
                </div>
        </section>
    )
}

export default Details