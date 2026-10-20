import React from "react";
import Wrapper from "@/components/wrapper/wrapper";
import { Button } from "@/components/ui/button";

interface StepFooterProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  disabled?: boolean;
}

export default function StepFooter({ onBack, onNext, nextLabel = "Save and continue", disabled }: StepFooterProps) {
  return (
    <footer className="shrink-0 border-t border-gray-100 bg-[#FEFEFE] py-4 md:py-6">
      <Wrapper className="flex items-center justify-between gap-4 max-md:px-4">
        <button type="button" onClick={onBack} className="text-sm md:text-base text-Text-body-text underline underline-offset-2 hover:text-Text-dark">
          Back
        </button>
        <Button
          onClick={onNext}
          disabled={disabled}
          className="h-11 px-6 md:px-7 text-base disabled:opacity-100 disabled:bg-[#A6BDF9] disabled:text-white"
        >
          {nextLabel}
        </Button>
      </Wrapper>
    </footer>
  );
}
