"use client";

import React, { useState } from "react";
import { Camera, Check, IdCard, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import StepHeader from "../step-header";
import { VerificationStep } from "../types";

interface ReviewStepProps {
  idLabel: string;
  onChange: (step: VerificationStep) => void;
  onSubmit: () => void;
}

export default function ReviewStep({ idLabel, onChange, onSubmit }: ReviewStepProps) {
  const [confirmed, setConfirmed] = useState(false);

  const rows = [
    { icon: IdCard, label: "ID type", value: idLabel, uploaded: false, step: "id-type" as const },
    { icon: Upload, label: "ID document", value: "Uploaded", uploaded: true, step: "upload" as const },
    { icon: Camera, label: "Selfie", value: "Uploaded", uploaded: true, step: "selfie" as const },
  ];

  return (
    <>
      <StepHeader title="Review your submission">
        Check everything below before submitting. Once submitted, your documents will be reviewed by our team within 24
        hours.
      </StepHeader>

      <div className="rounded-xl border border-light-Grey bg-white p-3 md:p-4 space-y-4">
        {rows.map(({ icon: Icon, label, value, uploaded, step }) => (
          <div key={label} className="flex items-center gap-2 md:gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-containers text-primary">
              <Icon className="size-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base text-Text-body-text">{label}</p>
              <p className="mt-1 flex items-center gap-2 text-sm md:text-base font-medium text-Text-dark">
                {value}
                {uploaded && <Check className="size-4 text-green-600" />}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange(step)}
              className="text-sm md:text-base text-primary underline underline-offset-2"
            >
              Change
            </button>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm md:text-base text-Text-body-text leading-relaxed">
        By submitting, you confirm that the documents you are providing belong to you and are genuine. You understand that
        submitting fraudulent documents is a violation of SpaceFinda&apos;s Terms of Service and may result in immediate
        account suspension and reporting to the relevant Nigerian authorities.
      </p>

      <label className="mt-6 flex items-start gap-3 cursor-pointer text-sm md:text-base text-Text-dark leading-relaxed">
        <Checkbox checked={confirmed} onCheckedChange={(v) => setConfirmed(v === true)} className="mt-1 size-4.5" />
        I confirm that all submitted documents are mine and are genuine. I consent to SpaceFinda processing this
        information for identity verification purposes in accordance with the Nigeria Data Protection Act 2023 and
        SpaceFinda&apos;s Privacy Policy.
      </label>

      <Button
        onClick={onSubmit}
        disabled={!confirmed}
        className="mt-8 h-11 w-full text-base disabled:opacity-100 disabled:bg-primary-containers"
      >
        Submit for verification
      </Button>
    </>
  );
}
