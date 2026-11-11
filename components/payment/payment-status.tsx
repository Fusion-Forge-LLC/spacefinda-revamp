"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CircleCheck, CircleX, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyPayment } from "@/lib/booking/actions";

type State = "checking" | "success" | "pending" | "failed";

const RETRY_DELAY = 4000;
const MAX_ATTEMPTS = 6;

const COPY: Record<Exclude<State, "checking">, { title: string; body: string }> = {
  success: { title: "Payment confirmed", body: "Your booking is confirmed. We've saved the receipt to your payments." },
  pending: {
    title: "Still waiting for your bank",
    body: "Bank transfers and USSD payments can take a few minutes. Check your payments shortly; your booking updates as soon as the payment lands.",
  },
  failed: { title: "Payment didn't go through", body: "You haven't been charged for this booking. Please go back to the listing and try again." },
};

// Asks the backend to confirm the payment with the provider; a pending result is retried a few times
export default function PaymentStatus({ reference }: { reference: string }) {
  const [state, setState] = useState<State>(reference ? "checking" : "failed");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!reference) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const check = async (attempt: number) => {
      const res = await verifyPayment(reference);
      if (cancelled) return;
      if (!res.ok) {
        setMessage(res.message);
        setState("failed");
        return;
      }
      const status = res.data.payment?.status;
      if (status === "success") setState("success");
      else if (status === "pending" && attempt < MAX_ATTEMPTS) timer = setTimeout(() => check(attempt + 1), RETRY_DELAY);
      else setState(status === "pending" ? "pending" : "failed");
    };

    check(1);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reference]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#FEFEFE] px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 text-center md:p-8" aria-live="polite">
        {state === "checking" ? (
          <>
            <Loader className="mx-auto size-10 animate-spin text-primary" />
            <h1 className="mt-6 text-xl font-semibold text-Text-dark">Confirming your payment</h1>
            <p className="mt-2 text-sm text-Text-body-text">This only takes a moment. Please don&apos;t close this page.</p>
          </>
        ) : (
          <>
            {state === "success" ? (
              <CircleCheck className="mx-auto size-12 text-green-600" />
            ) : state === "pending" ? (
              <Loader className="mx-auto size-12 text-amber-600" />
            ) : (
              <CircleX className="mx-auto size-12 text-red-600" />
            )}
            <h1 className="mt-6 text-xl font-semibold text-Text-dark">{COPY[state].title}</h1>
            <p className="mt-2 text-sm text-Text-body-text">{COPY[state].body}</p>
            {state === "failed" && message && <p className="mt-2 text-xs text-Text-body-text">{message}</p>}
            {reference && <p className="mt-4 text-xs text-Text-body-text">Reference: {reference}</p>}
            <div className="mt-6 flex flex-col gap-2">
              <Button asChild className="h-11 rounded-lg">
                <Link href="/dashboard/payments">View your payments</Link>
              </Button>
              <Button asChild variant="ghost" className="h-11 rounded-lg">
                <Link href="/listings">Browse more spaces</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
