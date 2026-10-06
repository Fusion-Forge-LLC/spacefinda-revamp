import React from "react";
import { CreditCard, House, Info, ShieldCheck } from "lucide-react";
import StepHeader from "../step-header";
import StepActions from "../step-actions";

const BENEFITS = [
  { icon: House, title: "Publish your listings", description: "Verified listings appear in search results and earn the SpaceFinda Verified badge." },
  { icon: CreditCard, title: "Receive payouts", description: "SpaceFinda releases your guaranteed payout automatically on check-in day." },
  { icon: ShieldCheck, title: "Build renter trust", description: "Renters are 3x more likely to book a verified owner. Your badge appears on every listing." },
];

export default function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <>
      <StepHeader title="Let us confirm who you are">
        SpaceFinda requires identity verification to build trust between renters and property owners. This is a one-time
        process and takes about 3 minutes.
      </StepHeader>

      <div className="space-y-4">
        {BENEFITS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3 rounded-xl border border-light-Grey bg-white p-3 md:p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-containers text-primary">
              <Icon className="size-5" />
            </div>
            <div>
              <p className="text-base md:text-lg text-Text-dark">{title}</p>
              <p className="mt-1 text-sm md:text-base text-Text-body-text">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-start gap-2 rounded-xl border border-primary/10 bg-primary-containers p-3 md:p-4 text-sm md:text-base text-primary">
        <Info className="size-4 mt-1 shrink-0" />
        <p>
          SpaceFinda processes your identity documents in accordance with the{" "}
          <span className="font-medium">Nigeria Data Protection Act (NDPA) 2023</span>. You have the right to request
          deletion of your data at any time. See our Privacy Policy for full details.
        </p>
      </div>

      <StepActions primaryLabel="Get started" onPrimary={onNext} />
    </>
  );
}
