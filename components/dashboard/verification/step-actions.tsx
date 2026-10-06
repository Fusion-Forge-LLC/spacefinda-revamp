import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface StepActionsProps {
  primaryLabel: string;
  onPrimary: () => void;
  disabled?: boolean;
}

// "Do this later" leaves the flow and goes back to the personal details page
export default function StepActions({ primaryLabel, onPrimary, disabled }: StepActionsProps) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      <Button asChild variant="ghost" className="h-11 px-7 text-base bg-text-Grey-Muted text-Text-body-text">
        <Link href="/dashboard/personal-details">Do this later</Link>
      </Button>
      <Button
        onClick={onPrimary}
        disabled={disabled}
        className="h-11 px-8 text-base disabled:opacity-100 disabled:bg-primary-containers"
      >
        {primaryLabel}
      </Button>
    </div>
  );
}
