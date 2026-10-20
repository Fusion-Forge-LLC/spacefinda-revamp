"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, CircleCheck, CircleX, CreditCard, ReceiptText, ShieldCheck, ShieldHalf, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/wrapper";
import { formatNaira } from "@/lib/utils";

const GUARANTEES = [
  "We bring verified renters to your property",
  "We handle all payments securely",
  "We guarantee your payout on check-in day",
  "We protect you with a structured caution fee system",
  "We give you a verified listing badge that builds guest confidence",
  "We provide support mediation if any dispute arises",
];

function Section({ icon: Icon, title, children }: { icon: typeof Check; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-base md:text-lg font-medium text-Text-dark">
        <Icon className="size-4.5 shrink-0 text-Text-body-text" strokeWidth={1.5} />
        {title}
      </h2>
      <div className="mt-2 space-y-3 pl-6.5 text-sm md:text-base text-Text-body-text leading-relaxed">{children}</div>
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-light-Grey px-3 py-2.5 text-sm md:text-base text-Text-body-text">{children}</div>;
}

const Strong = ({ children }: { children: React.ReactNode }) => <span className="font-medium text-Text-dark">{children}</span>;

export default function TermsStep({ onAgree }: { onAgree: () => void }) {
  const endRef = useRef<HTMLDivElement>(null);
  const [hasReadAll, setHasReadAll] = useState(false);

  // The agree button unlocks once the end of the terms has scrolled into view
  useEffect(() => {
    const el = endRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setHasReadAll(true));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="flex-1 overflow-y-auto overscroll-contain">
      <div className="mx-auto w-full max-w-175 px-4 py-10 md:py-12">
        <p className="text-sm md:text-base uppercase tracking-wide text-[#9A7B3F]">Before you list your space</p>
        <h1 className="mt-2 text-xl md:text-[28px] font-semibold text-Text-dark">How SpaceFinda Protects You and Your Guests</h1>
        <p className="mt-2 text-sm md:text-base text-Text-body-text leading-relaxed">
          Before you list your property on SpaceFinda, we want to be completely transparent about how payments work. No
          surprises. No fine print.
        </p>

        <div className="mt-6 space-y-6 border-t border-light-Grey pt-6">
          <Section icon={CreditCard} title="When do you get paid?">
            <p>
              Your payout is <Strong>guaranteed and released automatically on the day your guest checks in.</Strong> You
              will know exactly when to expect your money — every single time.
            </p>
          </Section>

          <Section icon={CircleX} title="What happens if a guest cancels?">
            <p>
              You choose your cancellation policy when listing your property — <Strong>Flexible, Moderate, or Strict.</Strong>{" "}
              If a guest cancels, the policy you chose determines what you earn. SpaceFinda handles the refund
              automatically. You never have to return money yourself because the payment has not yet reached your account.
            </p>
            <Note>
              <Strong>Flexible</Strong> — guest cancels 24hrs+ before check-in, they receive a full refund.{" "}
              <Strong>Moderate</Strong> — 50% refund if cancelled 72hrs+ before check-in. <Strong>Strict</Strong> — no
              refund after booking is confirmed.
            </Note>
          </Section>

          <Section icon={ReceiptText} title="What is the platform commission?">
            <p>
              SpaceFinda charges a <Strong>10% commission on every successful booking.</Strong> This is deducted
              automatically — you never need to send a separate payment. The price you set on your listing is the price
              your guests pay. <Strong>Your payout is 90% of that amount.</Strong>
            </p>
            <Note>
              <Strong>Example:</Strong> You set your listing at {formatNaira(50000)} per night. Guest books for 2 nights —
              total {formatNaira(100000)}. SpaceFinda keeps {formatNaira(10000)}. You receive {formatNaira(90000)}{" "}
              automatically on check-in day.
            </Note>
          </Section>

          <Section icon={ShieldHalf} title="What about the caution fee?">
            <p>
              SpaceFinda collects a caution fee from every guest on your behalf. After your guest checks out,{" "}
              <Strong>you have 48 hours to report any damage with photo evidence.</Strong> If there is no damage or you take
              no action within 48 hours, the caution fee is returned to your guest automatically. If you report valid
              damage, the caution fee or part of it is released to you.
            </p>
          </Section>

          <Section icon={TriangleAlert} title="What if damage exceeds the caution fee">
            <p>
              The caution fee is a security deposit that covers partial or minor damages. If damage to your property
              exceeds the caution fee amount, SpaceFinda Support will help you document the incident thoroughly and
              facilitate a resolution conversation with the guest. For amounts beyond the caution fee, the platform
              provides an official damage report as evidence — but financial recovery beyond the deposit is between you
              and the guest.
            </p>
            <Note>
              We strongly recommend taking clear, timestamped photos of your property before every check-in. This is your
              most important protection.
            </Note>
          </Section>

          <Section icon={ShieldCheck} title="What does SpaceFinda do for you?">
            <ul className="space-y-3">
              {GUARANTEES.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="mt-6 border-t border-light-Grey pt-6">
          <Note>
            By tapping I Understand, Let&apos;s Go below, you agree to these terms and commit to maintaining accurate
            listings, responding to guest messages, and respecting the cancellation policy you select per property. This
            agreement is recorded against your verified identity.
          </Note>
        </div>
        <div ref={endRef} aria-hidden />
      </div>
      </div>

      <footer className="shrink-0 border-t border-gray-100 bg-[#FEFEFE] py-4 md:py-6">
        <Wrapper className="flex items-center justify-between gap-4 max-md:px-4">
          <p className="flex items-center gap-1.5 text-sm md:text-base text-Text-body-text">
            {hasReadAll ? (
              <>
                <CircleCheck className="size-4 text-green-600" /> Thanks for reading
              </>
            ) : (
              "Scroll to read all terms before agreeing"
            )}
          </p>
          <Button
            onClick={onAgree}
            disabled={!hasReadAll}
            className="h-11 px-4 md:px-6 text-base disabled:opacity-100 disabled:bg-[#A6BDF9] disabled:text-white"
          >
            I understand, let&apos;s go
          </Button>
        </Wrapper>
      </footer>
    </>
  );
}
