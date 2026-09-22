import React from 'react';
import { Star1 } from 'iconsax-reactjs';
import { formatCount } from '@/lib/utils';

export interface RatingProps {
  rating: number;
  maxRating?: number;
  totalReviews?: number; 
  size?: number; 
  showNumber?: boolean; 
  showReviews?: boolean; 
  formatCompact?: boolean; 
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  totalReviews,
  size = 18,
  showNumber = true,
  showReviews = true,
  formatCompact = false,
  className = '',
}) => {
  
    const clampedRating = Math.max(0, Math.min(rating, maxRating));

  return (
    <div className={`flex items-center gap-2 font-['Geist'] text-sm ${className}`}>
        <div className="flex items-center gap-0.5" aria-label={`Rating: ${clampedRating} out of ${maxRating}`}>
            {Array.from({ length: maxRating }).map((_, index) => {
          
                const fillAmount = Math.max(0, Math.min(1, clampedRating - index));
                const fillPercentage = fillAmount * 100;

                return (
                    <div key={index} className="relative inline-flex items-center justify-center">
                    
                        <Star1 size={size} className="text-gray-300" variant="TwoTone" />

                    
                        {fillPercentage > 0 && (
                            <div
                                className="absolute top-0 left-0 overflow-hidden h-full text-[#FACC15]"
                                style={{ width: `${fillPercentage}%` }}
                            >
                                <Star1 size={size} variant="TwoTone" className="fill-current" />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

        {showNumber && (
            <span className="text-[#454545] leading-none text-sm">
                {clampedRating.toFixed(1)}
            </span>
        )}

      
        {showReviews && totalReviews !== undefined && (
            <span className="text-Body-Text text-xs sm:text-sm underline">
                {formatCount(totalReviews, formatCompact)}{' '}
                {totalReviews === 1 ? 'review' : 'reviews'}
            </span>
        )}
    </div>
  );
};

export default Rating;