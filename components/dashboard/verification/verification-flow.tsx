"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Wrapper from "@/components/wrapper/wrapper";
import { cn } from "@/lib/utils";
import Stepper from "./stepper";
import IntroStep from "./steps/intro";
import SelectIdStep from "./steps/select-id";
import UploadIdStep from "./steps/upload-id";
import SelfieStep from "./steps/selfie";
import ReviewStep from "./steps/review";
import SubmittedStep from "./steps/submitted";
import { ExitHrefContext } from "./step-actions";
import { getIdType, IdType, STEPPER_STEPS, VerificationStep } from "./types";

interface VerificationFlowProps {
  // Where "Do this later" goes; defaults to the renter's personal details page
  exitHref?: string;
  introDescription?: string;
  // Replaces the default submitted screen, and the stepper with it
  submittedScreen?: React.ReactNode;
}

export default function VerificationFlow({ exitHref, introDescription, submittedScreen }: VerificationFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<VerificationStep>("intro");
  const [idType, setIdType] = useState<IdType | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);

  const isSubmitted = step === "submitted";
  const stepIndex = isSubmitted ? STEPPER_STEPS.length - 1 : STEPPER_STEPS.findIndex((s) => s.key === step);
  const selectedId = getIdType(idType);

  const goNext = () => setStep(STEPPER_STEPS[stepIndex + 1]?.key ?? "submitted");
  const goBack = () => (stepIndex === 0 ? router.back() : setStep(STEPPER_STEPS[stepIndex - 1].key));

  const flow = (
    <div className="bg-[#FEFEFE] min-h-full">
      {!(isSubmitted && submittedScreen) && (
        <div className="border-b border-gray-100 py-6 md:py-8">
          <Wrapper className="relative flex items-center justify-center max-md:px-4">
            {!isSubmitted && (
              <button
                type="button"
                onClick={goBack}
                aria-label="Go back"
                className="absolute left-4 md:left-0 text-Text-body-text hover:text-Text-dark"
              >
                <ArrowLeft className="size-5" />
              </button>
            )}
            <Stepper current={stepIndex} />
          </Wrapper>
        </div>
      )}

      <div className={cn("mx-auto w-full px-4 py-10 md:py-14", step === "intro" ? "max-w-208" : "max-w-175")}>
        {step === "intro" ? (
          <IntroStep description={introDescription} onNext={goNext} />
        ) : step === "id-type" ? (
          <SelectIdStep value={idType} onChange={setIdType} onNext={goNext} />
        ) : step === "upload" ? (
          <UploadIdStep
            idLabel={selectedId?.shortTitle ?? "ID"}
            shortLabel={selectedId?.value === "nin" ? "NIN" : selectedId?.shortTitle ?? "ID"}
            file={idFile}
            onChange={setIdFile}
            onNext={goNext}
          />
        ) : step === "selfie" ? (
          <SelfieStep file={selfie} onChange={setSelfie} onNext={goNext} />
        ) : step === "review" ? (
          <ReviewStep idLabel={selectedId?.shortTitle ?? "—"} onChange={setStep} onSubmit={goNext} />
        ) : (
          submittedScreen ?? <SubmittedStep />
        )}
      </div>
    </div>
  );

  return exitHref ? <ExitHrefContext.Provider value={exitHref}>{flow}</ExitHrefContext.Provider> : flow;
}
