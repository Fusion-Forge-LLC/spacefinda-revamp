import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Rating from "@/components/property-detail/rating";

interface HostReviewCardProps {
  host: string;
  avatar: string;
  property: string;
  date: string;
  rating: number;
  comment: string;
}

export default function HostReviewCard({ host, avatar, property, date, rating, comment }: HostReviewCardProps) {
  return (
    <div className="rounded-xl bg-text-Grey-Muted p-3 md:p-4">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarImage src={avatar} alt={host} />
          <AvatarFallback>{host.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm md:text-base font-medium text-Text-dark">{host}</p>
          <p className="text-xs text-Text-body-text">{property} · {date}</p>
        </div>
      </div>
      <Rating rating={rating} size={20} showNumber={false} showReviews={false} className="mt-4" />
      <p className="mt-4 text-sm md:text-base text-Text-body-text leading-relaxed">{comment}</p>
    </div>
  );
}
