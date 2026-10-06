"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DUMMY_USER } from "@/lib/dummy";

const LOSSES = [
  "Your profile and personal details",
  "Booking history and stay records",
  "Payment receipts and transactions",
  "Reviews you've shared",
  "Saved spaces and preferences",
  "Messages with hosts",
];

const REASONS = [
  "I no longer need SpaceFinda",
  "I found a better alternative",
  "I'm concerned about my privacy",
  "I get too many emails or notifications",
  "I had a bad experience",
  "Other",
];

type Step = "reason" | "confirm" | "done";

const backButtonClass = "h-10 px-4 border border-light-Grey bg-white text-Text-dark hover:bg-text-Grey-Muted";

export default function DeleteAccountFlow() {
  const [step, setStep] = useState<Step>("reason");
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const goToConfirm = () => {
    if (!reason) {
      setReasonError(true);
      return;
    }
    setStep("confirm");
  };

  const confirmDelete = () => {
    if (email.trim().toLowerCase() !== DUMMY_USER.email.toLowerCase()) {
      setEmailError("This email doesn't match the one registered to your account");
      return;
    }
    setStep("done");
  };

  return (
    <div className="mx-auto w-full max-w-213 px-4 py-8 md:py-10">
      {step === "reason" && (
        <>
          <h1 className="text-xl md:text-2xl font-semibold text-Text-dark">Delete your account</h1>
          <p className="mt-2 text-sm md:text-base text-Text-body-text">
            This is a permanent action. Once completed, you&apos;ll lose access to:
          </p>

          <ul className="mt-5 space-y-4 rounded-xl border border-red-100 bg-red-50/70 p-4">
            {LOSSES.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-Text-body-text">
                <X className="size-3.5 shrink-0 text-red-600" />
                {item}
              </li>
            ))}
          </ul>

          <label className="mt-6 block text-sm text-Text-dark">Reason for deleting</label>
          <Select value={reason} onValueChange={(v) => { setReason(v); setReasonError(false); }}>
            <SelectTrigger aria-invalid={reasonError} className="mt-2 h-10! w-full border-light-Grey">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent position="popper">
              {REASONS.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {reasonError && <p className="mt-1.5 text-xs text-destructive">Please select a reason</p>}

          <p className="mt-5 flex items-start gap-2 rounded-xl border border-[#E9E2C9] bg-[#F7F4EC] p-3 text-xs md:text-sm leading-relaxed text-[#8A6D2F]">
            <Info className="size-3.5 mt-0.5 shrink-0" />
            <span>
              <span className="text-Text-dark">Before you delete:</span> Any active or upcoming bookings must be cancelled
              first. If you have a caution fee pending return, wait for it to be processed before deleting your account.
              Account deletion is irreversible. SpaceFinda cannot recover your data after this action is complete.
            </span>
          </p>

          <div className="mt-5 flex items-center justify-between">
            <Button asChild variant="ghost" className={backButtonClass}>
              <Link href="/dashboard/account-settings">Back</Link>
            </Button>
            <Button onClick={goToConfirm} className="h-10 px-5">Next</Button>
          </div>
        </>
      )}

      {step === "confirm" && (
        <>
          <h1 className="text-xl md:text-2xl font-semibold text-Text-dark">Final confirmation</h1>
          <p className="mt-2 text-sm md:text-base text-Text-body-text">
            To confirm that you are the account owner and that this action is intentional, enter the email address
            registered to your SpaceFinda account.
          </p>

          <label htmlFor="confirm-email" className="mt-5 block text-xs md:text-sm text-Text-dark">
            Your registered email address
          </label>
          <Input
            id="confirm-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
            placeholder="you@example.com"
            aria-invalid={!!emailError}
            className="mt-2 h-10 border-light-Grey"
          />
          {emailError && <p className="mt-1.5 text-xs text-destructive">{emailError}</p>}

          <p className="mt-4 rounded-xl border border-red-100 bg-red-50/70 p-3 text-xs md:text-sm leading-relaxed text-red-600">
            <span className="font-medium text-red-800">This action cannot be undone.</span> Once confirmed, your account
            and all associated data will be permanently deleted. SpaceFinda cannot recover your account after this point.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <Button variant="ghost" className={backButtonClass} onClick={() => setStep("reason")}>Back</Button>
            <Button onClick={confirmDelete} disabled={!email.trim()} className="h-10 px-4 bg-[#CD3A2F] hover:bg-[#CD3A2F]/90">
              Delete account
            </Button>
          </div>
        </>
      )}

      {step === "done" && (
        <div className="flex flex-col items-center text-center pt-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-text-Grey-Muted text-Text-body-text">
            <Check className="size-4" />
          </div>
          <h1 className="mt-5 text-lg md:text-xl font-semibold text-Text-dark">Request received</h1>
          <p className="mt-2 max-w-96 text-sm text-Text-body-text leading-relaxed">
            Your account deletion request has been submitted. Our team will process it within 24 hours and send a
            confirmation to <span className="text-Text-dark">{DUMMY_USER.email}</span>.
          </p>
          <p className="mt-6 max-w-96 text-xs text-Text-dark leading-relaxed">
            In accordance with the Nigeria Data Protection Act 2023, your personal data will be erased within 30 days of
            confirmation. Financial records may be retained for up to 7 years as required by Nigerian law.
          </p>
          <p className="mt-8 text-xs text-Text-dark">You will be signed out automatically once your account is deleted.</p>
        </div>
      )}
    </div>
  );
}
