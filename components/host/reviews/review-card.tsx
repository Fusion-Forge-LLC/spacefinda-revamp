"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Rating from "@/components/property-detail/rating";
import CharCount from "@/components/create-listing/char-count";
import type { ListingReview } from "@/lib/dummy";

const REPLY_MAX = 500;

export default function ReviewCard({ review }: { review: ListingReview }) {
  const [reply, setReply] = useState(review.reply);
  const [isReplying, setIsReplying] = useState(false);
  const [draft, setDraft] = useState("");

  // No API yet, so the reply only lives in local state
  const postReply = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setReply(text);
    setIsReplying(false);
    setDraft("");
    toast("Reply posted. It's now visible on your listing");
  };

  return (
    <article className="py-5 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={review.renter.avatar} alt={review.renter.name} />
            <AvatarFallback>{review.renter.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm md:text-base font-medium text-Text-dark">{review.renter.name}</p>
            <p className="text-xs text-Text-body-text">{review.date}</p>
          </div>
        </div>
        <Rating rating={review.rating} size={20} showNumber={false} showReviews={false} />
      </div>

      <span className="mt-3 inline-block rounded bg-text-Grey-Muted px-2 py-0.5 text-xs text-Text-body-text">{review.listingTitle}</span>

      <div className="mt-3 rounded-xl border border-gray-100 p-3 md:p-4">
        <p className="text-sm leading-6 text-Text-body-text">{review.comment}</p>

        {reply ? (
          <div className="mt-3 rounded-lg border-l-2 border-primary bg-primary-containers px-3 py-2.5">
            <p className="text-xs text-primary">Your reply</p>
            <p className="mt-1 text-sm leading-6 text-Text-body-text">{reply}</p>
          </div>
        ) : isReplying ? (
          <form onSubmit={postReply} className="mt-3">
            <Textarea
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={REPLY_MAX}
              aria-label={`Reply to ${review.renter.name}`}
              placeholder="Write a public reply. Thank the renter or respond to their feedback..."
              className="min-h-24 shadow-none placeholder:text-Grey-Pure-White"
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <CharCount value={draft} max={REPLY_MAX} />
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={() => setIsReplying(false)} className="h-9 bg-text-Grey-Muted px-4">
                  Cancel
                </Button>
                <Button type="submit" disabled={!draft.trim()} className="h-9 px-4">
                  Post reply
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <button type="button" onClick={() => setIsReplying(true)} className="mt-3 text-sm font-medium text-primary underline underline-offset-2">
            Reply to this review
          </button>
        )}
      </div>
    </article>
  );
}
