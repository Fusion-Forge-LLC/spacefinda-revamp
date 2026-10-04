import { FC } from "react";
import { LucideProps } from "lucide-react";
import { FileText, IdCard } from "lucide-react";

export type VerificationStep = "intro" | "id-type" | "upload" | "selfie" | "review" | "submitted";

export const STEPPER_STEPS: { key: Exclude<VerificationStep, "submitted">; label: string }[] = [
  { key: "intro", label: "Introduction" },
  { key: "id-type", label: "Select ID type" },
  { key: "upload", label: "Upload ID" },
  { key: "selfie", label: "Selfie" },
  { key: "review", label: "Review" },
];

export type IdType = "nin" | "national-id" | "drivers-licence" | "passport";

export const ID_TYPES: { value: IdType; title: string; shortTitle: string; description: string; icon: FC<LucideProps> }[] = [
  { value: "nin", title: "NIN Slip", shortTitle: "NIN slip", description: "National Identification Number document", icon: IdCard },
  { value: "national-id", title: "National ID card", shortTitle: "National ID card", description: "NIMC-issued Identity Card", icon: IdCard },
  { value: "drivers-licence", title: "Driver’s Licence", shortTitle: "Driver’s licence", description: "Current FRSC-issued licence", icon: FileText },
  { value: "passport", title: "International Passport", shortTitle: "International passport", description: "Valid and unexpired Nigerian Passport", icon: IdCard },
];

export const getIdType = (value: IdType | null) => ID_TYPES.find((id) => id.value === value);
