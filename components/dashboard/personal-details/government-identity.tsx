import React from "react";
import Link from "next/link";
import { FileUser, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/utils";

const STATUS_LABEL = {
  "not-submitted": "Not submitted",
  pending: "Under review",
  verified: "Verified",
} as const;

export default function GovernmentIdentity({ status }: { status: keyof typeof STATUS_LABEL }) {
  return (
    <div className="rounded-2xl border border-light-Grey p-4 md:p-6">
      <h3 className="text-lg font-medium text-Text-dark">Government identity</h3>
      <p className="mt-2 text-sm md:text-base text-Text-body-text">
        For booking more than <span className="text-Text-dark">{formatNaira(2000000)}</span>, SpaceFinda will have to verify your
        identity using a government-issued ID. Your ID is reviewed by our team and never shared with hosts.
      </p>

      <div className="mt-6 flex items-start gap-2 md:gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-containers text-primary">
          <FileUser className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base font-medium text-Text-dark">National ID, NIN slip, or Driver&apos;s licence</p>
          <p className="mt-1 text-sm md:text-base text-Text-body-text">Upload a clear photo of a valid government-issued ID.</p>
        </div>
        <Badge className="h-7 px-3 text-sm bg-primary-containers text-primary shrink-0 max-md:hidden">
          {STATUS_LABEL[status]}
        </Badge>
      </div>

      {status === "not-submitted" && (
        <Button asChild className="mt-6 h-11 px-4 text-base">
          <Link href="/dashboard/verification">
            <Upload />
            Upload government ID
          </Link>
        </Button>
      )}
    </div>
  );
}
