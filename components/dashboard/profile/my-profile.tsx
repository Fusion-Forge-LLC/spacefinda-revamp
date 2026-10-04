"use client";

import React, { useState } from "react";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import PageHeading from "../page-heading";
import HostReviewCard from "./host-review-card";
import { DUMMY_HOST_REVIEWS, DUMMY_USER } from "@/lib/dummy";

export default function MyProfile() {
  const [bio, setBio] = useState(DUMMY_USER.bio);
  const [draft, setDraft] = useState(bio);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const saveBio = () => {
    setBio(draft.trim());
    setIsEditingBio(false);
    toast.success("Bio updated");
  };

  return (
    <div className="max-w-207">
      <PageHeading
        title="My profile"
        description="This is your public profile. Hosts see this when you request a booking."
      />

      <div className="rounded-2xl border border-light-Grey p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <Avatar className="size-16">
              <AvatarImage src={DUMMY_USER.avatar} alt={DUMMY_USER.name} />
              <AvatarFallback>{DUMMY_USER.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-md bg-text-Grey-Muted px-2 py-0.5 text-xs text-Text-body-text"
            >
              <Camera className="size-3" />
              Edit
            </button>
          </div>
          <div>
            <p className="text-lg font-medium text-Text-dark">{DUMMY_USER.name}</p>
            <p className="text-sm md:text-base text-Text-body-text">SpaceFinda member since {DUMMY_USER.memberSince}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 md:gap-3">
          {DUMMY_USER.stats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-text-Grey-Muted px-2 py-4 text-center">
              <p className="text-lg font-medium text-Text-dark">{stat.value}</p>
              <p className="mt-1 text-xs md:text-base text-Text-body-text">{stat.label}</p>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="px-1.5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm md:text-base text-Text-dark">About me</p>
              {!isEditingBio && (
                <p className="mt-2 text-sm md:text-base text-Text-body-text">
                  {bio || "No bio added yet. A short introduction helps hosts feel confident welcoming you."}
                </p>
              )}
            </div>
            {!isEditingBio && (
              <button
                type="button"
                onClick={() => { setDraft(bio); setIsEditingBio(true); }}
                className="self-center text-sm md:text-base text-primary underline underline-offset-2"
              >
                Edit
              </button>
            )}
          </div>

          {isEditingBio && (
            <div className="mt-3 space-y-3">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Tell hosts a little about yourself"
                rows={4}
                maxLength={500}
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsEditingBio(false)}>Cancel</Button>
                <Button onClick={saveBio}>Save</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-light-Grey p-4 md:p-6">
        <h2 className="text-lg font-medium text-Text-dark mb-5">Review from hosts</h2>
        <div className="space-y-3">
          {DUMMY_HOST_REVIEWS.map((review) => (
            <HostReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
}
