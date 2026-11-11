"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import AuthFlow from "@/components/authentication/auth-flow";
import { useAuth } from "@/components/authentication/auth-provider";
import { acceptHostTerms } from "@/lib/auth/actions";
import { createListingDraft, saveListingStep, submitListing } from "@/lib/host/actions";
import { STEP_NAMES, stepBody, stepFromNumber, stepNumber } from "@/lib/host/mappers";
import { toast } from "sonner";
import { DESCRIPTION_MIN, TITLE_MIN } from "./steps/details";
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
      return draft.title.trim().length >= TITLE_MIN && draft.description.trim().length >= DESCRIPTION_MIN;
    case "photos":
      // Every photo must have finished uploading
      return draft.photos.length >= MIN_PHOTOS && draft.photos.every((p) => p.publicId);
    case "amenities":
      return draft.amenities.length > 0;
    case "availability":
      return draft.availability === "from-date" ? !!draft.availableFrom : draft.availability !== null;
    case "pricing":
      return !!draft.price;
    default:
      return true;
  }
};

// The backend only generates a reference number after the first booking, so show one from the listing id
const createReference = (id: string) => `SFL-${new Date().getFullYear()}-${id.slice(-6).toUpperCase()}`;

interface CreateListingFlowProps {
  // Set when resuming a saved draft (/host/create-listing?draft=<id>)
  listingId?: string;
  initialDraft?: ListingDraft;
  initialStep?: ListingStep;
}

export default function CreateListingFlow({ listingId: savedListingId, initialDraft, initialStep }: CreateListingFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<ListingStep>(initialStep ?? "terms");
  const [draft, setDraft] = useState<ListingDraft>(initialDraft ?? INITIAL_DRAFT);
  const [listingId, setListingId] = useState(savedListingId ?? null);
  const [saving, setSaving] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [reference, setReference] = useState("");
  // Set when the host jumps to a step from the review page, so continuing takes them straight back
  const [editingFromReview, setEditingFromReview] = useState(false);

  const [acceptingTerms, setAcceptingTerms] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { setUser } = useAuth();

  const update = useCallback((patch: Partial<ListingDraft>) => setDraft((prev) => ({ ...prev, ...patch })), []);

  // The scroll area is keyed by step, so changing step remounts it scrolled to the top
  const goTo = (next: ListingStep) => setStep(next);

  const progressIndex = PROGRESS_STEPS.indexOf(step as ProgressStep);
  const inProgress = progressIndex !== -1;

  // Starts a new draft on the backend; every step is saved against its id
  const startDraft = async () => {
    const res = await createListingDraft();
    if (!res.ok) {
      toast.error(res.message);
      return null;
    }
    setListingId(res.data);
    return res.data;
  };

  const submit = async (id: string) => {
    const res = await submitListing(id);
    if (res.ok) {
      setReference(createReference(id));
      goTo("submitted");
      return;
    }
    // 422: send the host back to the first incomplete step
    const first = res.brokenSteps?.[0];
    if (first) {
      toast.error(`Please complete "${STEP_NAMES[first - 1]}" before submitting`);
      setEditingFromReview(true);
      goTo(stepFromNumber(first));
    } else {
      toast.error(res.message);
    }
  };

  const goNext = async () => {
    const id = listingId ?? (await startDraft());
    if (!id) return;

    setSaving(true);
    try {
      if (step === "review") return await submit(id);

      const res = await saveListingStep(id, stepNumber(step as ProgressStep), stepBody(step as ProgressStep, draft));
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      if (editingFromReview) {
        setEditingFromReview(false);
        goTo("review");
      } else {
        goTo(PROGRESS_STEPS[progressIndex + 1]);
      }
    } finally {
      setSaving(false);
    }
  };

  // Saves whatever is valid on this step and leaves; the draft reopens here from My listings
  const saveAndExit = async () => {
    if (listingId && step !== "review") {
      setExiting(true);
      const res = await saveListingStep(listingId, stepNumber(step as ProgressStep), stepBody(step as ProgressStep, draft), true);
      if (!res.ok) {
        setExiting(false);
        toast.error(`Couldn't save this step. ${res.message}`);
        return;
      }
    }
    router.push("/host/listings");
  };

  const goBack = () => {
    setEditingFromReview(false);
    goTo(progressIndex === 0 ? "terms" : PROGRESS_STEPS[progressIndex - 1]);
  };

  // "I understand" makes the user a host on the backend before they start the listing
  const agreeToTerms = async () => {
    setAcceptingTerms(true);
    const res = await acceptHostTerms();
    setAcceptingTerms(false);
    if (!res.ok) {
      // The API answers a missing/expired token with 401 or 403 ("No token provided")
      if (res.status === 401 || (res.status === 403 && /token/i.test(res.message))) {
        toast("Sign in to list your space");
        setShowAuth(true);
      } else {
        toast.error(res.message);
      }
      return;
    }
    if (res.data) setUser(res.data);
    if (listingId || (await startDraft())) goTo("space-type");
  };

  const editFromReview = (target: ProgressStep) => {
    setEditingFromReview(true);
    goTo(target);
  };

  const startAnother = async () => {
    setDraft(INITIAL_DRAFT);
    setListingId(null);
    if (await startDraft()) goTo("space-type");
  };

  const stepProps = { draft, update };

  return (
    // Fixed-height shell: header and footer stay put and only the content between them scrolls
    <div className="flex h-dvh flex-col overflow-hidden bg-[#FEFEFE]">
      <AuthFlow showModal={showAuth} setShowModal={setShowAuth} />
      <header className="shrink-0 bg-[#FEFEFE]">
        <div className="border-b border-gray-100 py-4 md:py-6">
          <Wrapper className="flex items-center justify-between gap-4 max-md:px-4">
            <Link href="/" aria-label="SpaceFinda home">
              <Image src={Logo} alt="SpaceFinda" className="w-10 md:w-12 h-auto" />
            </Link>
            {inProgress && (
              <button
                type="button"
                onClick={saveAndExit}
                disabled={exiting || saving}
                className="text-sm md:text-base text-Text-body-text underline underline-offset-2 hover:text-Text-dark disabled:opacity-60"
              >
                {exiting ? "Saving..." : "Save and Exit"}
              </button>
            )}
          </Wrapper>
        </div>
        {inProgress && <ProgressBar current={progressIndex} />}
      </header>

      {step === "terms" ? (
        <TermsStep key={step} onAgree={agreeToTerms} pending={acceptingTerms} />
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
            nextLabel={saving ? (step === "review" ? "Submitting..." : "Saving...") : step === "review" ? "Submit for review" : "Save and continue"}
            disabled={saving || exiting || !canContinue(step as ProgressStep, draft)}
          />
        </>
      )}
    </div>
  );
}
