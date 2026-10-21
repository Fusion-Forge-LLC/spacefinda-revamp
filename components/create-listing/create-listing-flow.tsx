"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/wrapper/wrapper";
import Logo from "@/public/icons/logo.svg";
import ProgressBar from "./progress-bar";
import StepFooter from "./step-footer";
import TermsStep from "./steps/terms";
import SpaceTypeStep from "./steps/space-type";
import LocationStep from "./steps/location";
import BasicsStep from "./steps/basics";
import DetailsStep from "./steps/details";
import PhotosStep from "./steps/photos";
import AmenitiesStep from "./steps/amenities";
import HouseRulesStep from "./steps/house-rules";
import AvailabilityStep from "./steps/availability";
import PricingStep from "./steps/pricing";
import ReviewStep from "./steps/review";
import SubmittedStep from "./steps/submitted";
import { INITIAL_DRAFT, ListingDraft, ListingStep, MIN_PHOTOS, PROGRESS_STEPS, ProgressStep } from "./types";

const filled = (...values: string[]) => values.every((v) => v.trim().length > 0);

// Whether "Save and continue" is enabled for each step
export const canContinue = (step: ProgressStep, draft: ListingDraft) => {
  switch (step) {
    case "space-type":
      return draft.spaceType !== null;
    case "location":
      return filled(draft.city, draft.neighbourhood, draft.address);
    case "details":
      return filled(draft.title, draft.description);
    case "photos":
      return draft.photos.length >= MIN_PHOTOS;
    case "availability":
      return draft.availability === "from-date" ? !!draft.availableFrom : draft.availability !== null;
    case "pricing":
      return !!draft.price;
    default:
      return true;
  }
};

const createReference = () => `SFL-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`;

export default function CreateListingFlow() {
  const [step, setStep] = useState<ListingStep>("terms");
  const [draft, setDraft] = useState<ListingDraft>(INITIAL_DRAFT);
  const [reference, setReference] = useState("");
  // Set when the host jumps to a step from the review page, so continuing takes them straight back
  const [editingFromReview, setEditingFromReview] = useState(false);

  const update = useCallback((patch: Partial<ListingDraft>) => setDraft((prev) => ({ ...prev, ...patch })), []);

  // The scroll area is keyed by step, so changing step remounts it scrolled to the top
  const goTo = (next: ListingStep) => setStep(next);

  const progressIndex = PROGRESS_STEPS.indexOf(step as ProgressStep);
  const inProgress = progressIndex !== -1;

  const goNext = () => {
    if (step === "review") {
      setReference(createReference());
      goTo("submitted");
    } else if (editingFromReview) {
      setEditingFromReview(false);
      goTo("review");
    } else {
      goTo(PROGRESS_STEPS[progressIndex + 1]);
    }
  };

  const goBack = () => {
    setEditingFromReview(false);
    goTo(progressIndex === 0 ? "terms" : PROGRESS_STEPS[progressIndex - 1]);
  };

  const editFromReview = (target: ProgressStep) => {
    setEditingFromReview(true);
    goTo(target);
  };

  const startAnother = () => {
    draft.photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    setDraft(INITIAL_DRAFT);
    goTo("space-type");
  };

  const stepProps = { draft, update };

  return (
    // Fixed-height shell: header and footer stay put and only the content between them scrolls
    <div className="flex h-dvh flex-col overflow-hidden bg-[#FEFEFE]">
      <header className="shrink-0 bg-[#FEFEFE]">
        <div className="border-b border-gray-100 py-4 md:py-6">
          <Wrapper className="flex items-center justify-between gap-4 max-md:px-4">
            <Link href="/" aria-label="SpaceFinda home">
              <Image src={Logo} alt="SpaceFinda" className="w-10 md:w-12 h-auto" />
            </Link>
            {/* TODO: persist the draft once there's a listings API; for now this only leaves the flow */}
            {inProgress && (
              <Link href="/host" className="text-sm md:text-base text-Text-body-text underline underline-offset-2 hover:text-Text-dark">
                Save and Exit
              </Link>
            )}
          </Wrapper>
        </div>
        {inProgress && <ProgressBar current={progressIndex} />}
      </header>

      {step === "terms" ? (
        <TermsStep key={step} onAgree={() => goTo("space-type")} />
      ) : step === "submitted" ? (
        <div key={step} className="flex-1 overflow-y-auto overscroll-contain">
          <main className="mx-auto w-full max-w-163 px-4 py-10 md:py-12">
            <SubmittedStep reference={reference} onCreateAnother={startAnother} />
          </main>
        </div>
      ) : (
        <>
          <div key={step} className="flex-1 overflow-y-auto overscroll-contain">
          <main className="mx-auto w-full max-w-175 px-4 py-8 md:py-12">
            {step === "space-type" ? (
              <SpaceTypeStep {...stepProps} />
            ) : step === "location" ? (
              <LocationStep {...stepProps} />
            ) : step === "basics" ? (
              <BasicsStep {...stepProps} />
            ) : step === "details" ? (
              <DetailsStep {...stepProps} />
            ) : step === "photos" ? (
              <PhotosStep {...stepProps} />
            ) : step === "amenities" ? (
              <AmenitiesStep {...stepProps} />
            ) : step === "rules" ? (
              <HouseRulesStep {...stepProps} />
            ) : step === "availability" ? (
              <AvailabilityStep {...stepProps} />
            ) : step === "pricing" ? (
              <PricingStep {...stepProps} />
            ) : (
              <ReviewStep draft={draft} onEdit={editFromReview} />
            )}
          </main>
          </div>
          <StepFooter
            onBack={goBack}
            onNext={goNext}
            nextLabel={step === "review" ? "Submit for review" : "Save and continue"}
            disabled={!canContinue(step as ProgressStep, draft)}
          />
        </>
      )}
    </div>
  );
}
