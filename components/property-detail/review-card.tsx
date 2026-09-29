import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Rating from './rating'
import { cn } from '@/lib/utils';

interface Reviews {
    name: string;
    image: string;
    date: string;
    rating: number;
    note: string;
    className?: string;
}

function ReviewCard({image, name, date, rating, note, className}:Reviews) {
    return (
        <li className={cn(className, 'p-2.5 rounded-md space-y-3')}>
            <h5 className='flex items-center gap-2.5'>
                <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-px'>
                    <span className='text-Text-dark font-medium leading-[150%]'>{name}</span>
                    <span className=' text-[13px] leading-[120%]'>{date}</span>
                </div>
            </h5>
            <Rating rating={rating} size={20} totalReviews={1} formatCompact showNumber={false} showReviews={false}/>
            <p className='text-sm spacing-[150%]'>{note}</p>
        </li>
    )
}

export default ReviewCard