import React from "react";
import Link from "next/link";
import { BadgeCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionCard from "../section-card";

export default function IdentityVerification({ isVerified }: { isVerified: boolean }) {
  return (
    <SectionCard>
      <h2 className="text-base md:text-lg font-medium text-Text-dark">Identity verification</h2>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-containers text-primary">
          {isVerified ? <BadgeCheck className="size-5" /> : <FileText className="size-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm md:text-base font-medium text-Text-dark">{isVerified ? "Verified" : "Not yet verified"}</p>
          <p className="mt-1 text-xs md:text-sm text-Text-body-text">
            {isVerified
              ? "Your identity is confirmed. Your listings show the SpaceFinda Verified badge."
              : "Required to publish listings and receive payouts as an owner"}
          </p>
        </div>
        {!isVerified && (
          <Button asChild className="h-10 px-4 max-md:w-full">
            <Link href="/host/verification">Verify now</Link>
          </Button>
        )}
      </div>
    </SectionCard>
  );
}
