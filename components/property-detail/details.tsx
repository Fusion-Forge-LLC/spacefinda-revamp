"use client"

import React, { useState } from 'react'
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
import { protection, refundOPtion } from '@/content/site';
import type { ApiApartment } from '@/lib/api/types';
import { AMENITIES, formatTime } from '@/components/create-listing/types';
import { amenityLabel, cancellationPolicy, placeName } from '@/lib/apartments/mappers';
import { useIsMobile } from '@/hooks/use-media-query';


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

const DESCRIPTION_PREVIEW = 320;

function Details({ apartment }: { apartment: ApiApartment }) {
    const isMobile = useIsMobile();
    const [showFullDescription, setShowFullDescription] = useState(false);

    const propertyDetails = {
        guests: apartment.maxGuests,
        bedroom: apartment.bedrooms,
        bed: apartment.beds,
        bathtub: apartment.bathrooms,
    };
    const rules = apartment.houseRules ?? {};
    const policy = cancellationPolicy(apartment.cancellationPolicy);
    const place = placeName(apartment);
    const description = apartment.description ?? '';
    const longDescription = description.length > DESCRIPTION_PREVIEW;
    const reviewCount = apartment.ratingCount ?? 0;
    const rating = apartment.ratingAverage ?? 0;

    const vendor = typeof apartment.vendor === 'object' ? apartment.vendor : undefined;
    const hostName = [vendor?.user?.firstName, vendor?.user?.lastName].filter(Boolean).join(' ') || vendor?.user?.fullname || vendor?.businessName || 'your host';
    const hostVerified = vendor?.verificationStatus === 'verified' || vendor?.verificationStatus === 'approved';

    // The host's amenities, with an icon where we have one
    const listedAmenities = (apartment.amenities ?? []).map((key) => ({
        id: key,
        label: amenityLabel(key),
        icon: AMENITIES.find((a) => a.value === key)?.icon,
    }));

    const entries = Object.entries(propertyDetails).filter(
        ([, value]) => value !== undefined && value !== null
    ) as [string, number][];

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
                            {place || 'Nigeria'}
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

                
                    {reviewCount > 0 && <Rating rating={rating} totalReviews={reviewCount} formatCompact />}
                </div>

                <div className='flex flex-col-reverse md:flex-col'>
                    <article className='space-y-2 py-6 border-b max-md:px-4 border-b-[#E9E9E9]'>
                        <h3 className='font-semibold text-2xl tracking-[-3%] leading-[120%] font-inter text-Text-dark'>About this space</h3>
                        <p className='text-Body-Text text-sm sm:text-base font-["Geist"] whitespace-pre-line'>
                            {longDescription && !showFullDescription ? `${description.slice(0, DESCRIPTION_PREVIEW).trimEnd()}...` : description}
                        </p>

                        {longDescription && (
                            <button
                                type='button'
                                onClick={() => setShowFullDescription((v) => !v)}
                                className='font-["Geist"] text-Text-dark text-sm sm:text-base underline font-medium'
                            >
                                {showFullDescription ? 'Show less' : 'Show more'}
                            </button>
                        )}
                    </article>

                    <div className='flex flex-col md:flex-row max-md:px-4 max-md:gap-4 justify-between items-center py-6 border-b border-b-[#E9E9E9]'>
                        <div className='flex items-start md:items-center gap-4'>
                            <Avatar className="md:size-24 size-12 shrink-0">
                                {vendor?.user?.avatarUrl && <AvatarImage src={vendor.user.avatarUrl} alt={hostName} className="object-cover object-top" />}
                                <AvatarFallback className="md:text-2xl">{hostName.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className='space-y-2'>
                                <h5 className='font-medium text-xl leading-[120%] font-inter text-Text-dark'>
                                    Hosted by {hostName} {" "}
                                    {hostVerified && (
                                        <Badge className='bg-[#F7F7EF] text-[#9E8549]'>
                                            <Verify color='#9E8549' size={14} />
                                            Verified Host
                                        </Badge>
                                    )}
                                </h5>
                                {vendor?.bio && (
                                    <p className='text-Body-Text text-sm sm:text-base font-["Geist"]'>{vendor.bio}</p>
                                )}
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
                    {listedAmenities.length === 0 && <p className="text-Body-Text">The host hasn&apos;t listed any amenities yet.</p>}
                    <ul className="grid grid-cols-2 gap-4 max-w-md font-['Geist'] text-Body-Text">
                        {listedAmenities.slice(0, 8).map(({ id, label, icon: IconComponent }) => (
                            <li key={id} className="flex items-center gap-2.5 text-gray-700">
                                {IconComponent ? <IconComponent size={22} color='#616161' className="shrink-0" strokeWidth={1.5} /> : <TickCircle size={22} color='#616161' className="shrink-0" />}
                                <span className="leading-[150%]">{label}</span>
                            </li>
                        ))}
                    </ul>
                    {listedAmenities.length > 8 && <DrawerDialog 
                        triggerBtn={<button className='flex items-center justify-center max-md:h-12 max-md:w-full gap-2 bg-text-Grey-Muted hover:bg-[#D6E3FF] text-Body-Text text-sm sm:text-base font-["Geist"] font-medium px-4 py-2 rounded-lg'>
                            Show all amenities
                        </button>}
                        title='Amenities'
                        subtitle=""
                    >
                        <ul className="grid grid-cols-2 gap-3 text-Body-Text text-sm sm:text-base">
                            {listedAmenities.map(({ id, label, icon: IconComponent }) => (
                                <li key={id} className="flex items-center gap-2 sm:gap-3">
                                    {IconComponent ? <IconComponent className="h-5 w-5 shrink-0" color='#888888' strokeWidth={1.5} /> : <TickCircle size={20} color='#888888' className="shrink-0" />}
                                    <span>{label}</span>
                                </li>
                            ))}
                        </ul>
                    </DrawerDialog>}
                </div>

                <div className='py-6 space-y-5 border-y border-y-grey-200 px-4'>
                    <h4 className='font-semibold text-lg md:text-2xl tracking-[-3%] leading-[120%] font-inter text-Text-dark'>
                        House Rules & Policies
                    </h4>
                    <ul className="font-['Geist'] text-Body-Text text-sm md:text-base space-y-2">
                        <li className="text-gray-700 flex items-center gap-1">
                            <Clock size={isMobile ? 14 : 16} color='#616161' className=" shrink-0" variant="Linear" />
                            Check in:
                            <span className="leading-[150%] text-Text-Dark">{rules.checkInTime ? formatTime(rules.checkInTime) : 'Ask the host'}</span>
                        </li>
                        <li className="text-gray-700 flex items-center gap-1">
                            <Clock size={isMobile ? 14 : 16} color='#616161' className=" shrink-0" variant="Linear" />
                                Check Out:
                            <span className="leading-[150%] text-Text-Dark">{rules.checkOutTime ? formatTime(rules.checkOutTime) : 'Ask the host'}</span>
                        </li>
                        <li className="text-gray-700 flex items-center gap-1">
                            <Profile2User size={isMobile ? 14 : 16} color='#616161' className=" shrink-0" variant="Linear" />
                                Max guests:
                            <span className="leading-[150%] text-Text-Dark">{apartment.maxGuests ?? '—'}</span>
                        </li>
                        {!rules.smokingAllowed && <li className="text-gray-700 flex items-center gap-1">
                            <Forbidden size={isMobile ? 14 : 16} color='#616161' className=" shrink-0" variant="Linear" />
                            No smoking indoors
                        </li>}
                        <li className="text-gray-700 flex items-center gap-1">
                            <CloseCircle size={isMobile ? 14 : 16} color='#616161' className=" shrink-0" variant="Linear" />
                            Cancellation: <span className="leading-[150%] text-Text-Dark">{policy.title}</span>
                        </li>
                        {rules.additionalRules && (
                            <li className="text-gray-700 flex items-start gap-1 whitespace-pre-line">
                                <InfoCircle size={isMobile ? 14 : 16} color='#616161' className="shrink-0 mt-1" variant="Linear" />
                                {rules.additionalRules}
                            </li>
                        )}
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
                            <Badge className={policy.badgeClassName}>{policy.title}</Badge>
                            <h4 className='font-medium text-xl'>{policy.badge}</h4>
                        </div>
                        <p className='text-Body-Text'>{policy.description}</p>
                        <p className='text-Text-dark text-sm'>{policy.rule}</p>
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
                                <h5 className='font-medium text-sm text-[#454545] leading-[150%]'>{place || 'Location shared after booking'}</h5>
                            </div>
                            <p className='text-Body-Text flex items-center gap-1 py-2.5 mt-2.5 border-t border-t-[#E9E9E9] text-[11px]'>
                                <Lock size={11} color='#616161' />
                                Exact address is shared after your booking is confirmed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Individual reviews need a reviews endpoint; until then show the summary */}
                <div className='py-6 space-y-5 border-b border-b-grey-200 px-4 text-Body-Text'>
                    {reviewCount > 0 ? (
                        <h4 className='flex items-center gap-2.5'>
                            <span className='text-2xl text-Text-dark font-semibold tracking-[-3%] font-inter'>{rating.toFixed(1)}</span>
                            <div>
                                <Rating rating={rating} size={14} totalReviews={reviewCount} formatCompact showNumber={false} showReviews={false}/>
                                <span>{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
                            </div>
                        </h4>
                    ) : (
                        <p>No reviews yet. Be one of the first guests to stay here.</p>
                    )}
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