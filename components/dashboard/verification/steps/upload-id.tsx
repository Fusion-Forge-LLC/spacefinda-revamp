import React from "react";
import { IdCard } from "lucide-react";
import StepHeader from "../step-header";
import StepActions from "../step-actions";
import TipsBox from "../tips-box";
import FileDropzone from "../file-dropzone";

const TIPS = [
  "Place the ID on a flat, dark surface",
  "Ensure all text is clearly readable",
  "All four corners of the document must be visible",
  "Avoid glare, shadows, and blur",
  "Do not cover any part of the document",
];

interface UploadIdStepProps {
  idLabel: string;
  shortLabel: string;
  file: File | null;
  onChange: (file: File | null) => void;
  onNext: () => void;
}

export default function UploadIdStep({ idLabel, shortLabel, file, onChange, onNext }: UploadIdStepProps) {
  return (
    <>
      <StepHeader title="Upload your ID">
        Take a clear photo of your <span className="font-medium text-Text-dark">{idLabel}</span> or upload an existing
        image. Make sure all four corners are visible and the text is readable.
      </StepHeader>

      <TipsBox title="Tips for a successful upload" tips={TIPS} />

      <div className="mt-8">
        <FileDropzone
          file={file}
          onChange={onChange}
          icon={IdCard}
          title={`Upload ${shortLabel}`}
          hint="JPG or PNG • maximum 10MB"
          actionLabel="Tap to upload"
          capture="environment"
        />
      </div>

      <StepActions primaryLabel="Continue" onPrimary={onNext} disabled={!file} />
    </>
  );
}
