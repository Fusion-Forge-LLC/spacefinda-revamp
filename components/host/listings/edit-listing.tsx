"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/dashboard/back-button";
import { canContinue } from "@/components/create-listing/create-listing-flow";
import SpaceTypeStep from "@/components/create-listing/steps/space-type";
import DetailsStep from "@/components/create-listing/steps/details";
import LocationStep from "@/components/create-listing/steps/location";
import BasicsStep from "@/components/create-listing/steps/basics";
import PhotosStep from "@/components/create-listing/steps/photos";
import AmenitiesStep from "@/components/create-listing/steps/amenities";
import HouseRulesStep from "@/components/create-listing/steps/house-rules";
import AvailabilityStep from "@/components/create-listing/steps/availability";
import PricingStep from "@/components/create-listing/steps/pricing";
import { ListingDraft, ProgressStep, StepProps } from "@/components/create-listing/types";

// Same order as the create-listing flow, minus review
const SECTIONS: { step: ProgressStep; component: React.ComponentType<StepProps> }[] = [
  { step: "space-type", component: SpaceTypeStep },
  { step: "details", component: DetailsStep },
  { step: "location", component: LocationStep },
  { step: "basics", component: BasicsStep },
  { step: "photos", component: PhotosStep },
  { step: "amenities", component: AmenitiesStep },
  { step: "rules", component: HouseRulesStep },
  { step: "availability", component: AvailabilityStep },
  { step: "pricing", component: PricingStep },
];

// Every create-listing step on one page, each saved on its own. No API yet, so saving only confirms with a toast
export default function EditListing({ listing }: { listing: ListingDraft }) {
  const [draft, setDraft] = useState(listing);
  const update = (patch: Partial<ListingDraft>) => setDraft((prev) => ({ ...prev, ...patch }));

  const save = (step: ProgressStep) => {
    if (!canContinue(step, draft)) {
      toast.error("Fill in this section before saving");
      return;
    }
    toast("Changes saved");
  };

  return (
    <div className="mx-auto max-w-230">
      <BackButton href="/host/listings" label="Back to listing" className="text-sm" />
      <div className="mt-6 mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-Text-dark">Edit listing</h1>
        <p className="mt-2 text-sm md:text-base text-Text-body-text">
          All your listing sections are shown below. Jump to any section and save changes directly. No need to go through all steps again.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {SECTIONS.map(({ step, component: Step }) => (
          <section key={step} id={step} className="scroll-mt-24">
            <Step draft={draft} update={update} />
            <div className="mt-6 flex justify-end">
              <Button onClick={() => save(step)} className="h-10 md:h-11 rounded-lg px-5">
                Save changes
              </Button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
