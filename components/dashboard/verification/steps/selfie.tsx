import React from "react";
import StepHeader from "../step-header";
import StepActions from "../step-actions";
import TipsBox from "../tips-box";
import SelfieCamera from "../selfie-camera";

const TIPS = [
  "You must be in a well-lit space or good lighting",
  "You must make sure your entire face is visible",
  "You must make sure you are not wearing hats or sunglasses",
];

interface SelfieStepProps {
  file: File | null;
  onChange: (file: File | null) => void;
  onNext: () => void;
}

export default function SelfieStep({ file, onChange, onNext }: SelfieStepProps) {
  return (
    <>
      <StepHeader title="Take a selfie">
        We will compare your selfie with the photo on your ID to confirm they match. This happens automatically and helps
        prevent fraud.
      </StepHeader>

      <TipsBox title="Tips for a successful capture" tips={TIPS} />

      <div className="mt-8">
        <SelfieCamera file={file} onChange={onChange} />
      </div>

      <StepActions primaryLabel="Submit photo" onPrimary={onNext} disabled={!file} />
    </>
  );
}
