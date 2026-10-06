import React from "react";
import Image from "next/image";
import Wrapper from "@/components/wrapper/wrapper";
import BackButton from "../back-button";
import DownloadReceiptButton from "./download-receipt-button";
import { DUMMY_USER, Payment } from "@/lib/dummy";
import { cn, formatNaira } from "@/lib/utils";
import LogoWhite from "@/public/icons/logo-footer.svg";

function Section({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("px-4 py-4 border-b border-light-Grey last:border-b-0", className)}>
      <p className="mb-3 text-xs uppercase tracking-wide text-Text-body-text">{title}</p>
      {children}
    </section>
  );
}

function Row({ label, value, strong }: { label: string; value: React.ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <span className={cn("text-sm", strong ? "text-Text-dark text-base" : "text-Text-body-text")}>{label}</span>
      <span className={cn("text-sm text-right text-Text-dark break-all", strong && "text-base font-semibold")}>{value}</span>
    </div>
  );
}

export default function Receipt({ payment }: { payment: Payment }) {
  const subtotal = payment.pricePerNight * payment.nights;
  const total = subtotal + payment.cautionFee;

  return (
    <Wrapper className="py-6 md:py-8 max-md:px-4">
      <div className="flex items-center justify-between gap-4 print:hidden">
        <BackButton href="/dashboard/payments" label="Back to payment" />
        <DownloadReceiptButton />
      </div>

      <article className="mx-auto mt-8 max-w-195 overflow-hidden rounded-xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] print:shadow-none print:mt-0">
        <header className="flex items-start justify-between gap-4 bg-navy px-4 py-4 text-white print:[print-color-adjust:exact]">
          <div>
            <Image src={LogoWhite} alt="SpaceFinda" className="h-5 w-auto" />
            <p className="mt-2 text-xs md:text-sm text-white/80">Nigeria&apos;s trusted short-let platform</p>
          </div>
          <div className="text-right">
            <p className="text-xs md:text-sm text-white/80">Payment receipt</p>
            <p className="mt-1 text-sm md:text-base font-medium tracking-wide">{payment.id}</p>
            <p className="mt-1 text-xs md:text-sm text-white/80">Issued {payment.issuedAt}</p>
          </div>
        </header>

        <Section title="Issued to">
          <p className="text-sm text-Text-dark">{DUMMY_USER.name}</p>
          <p className="mt-1.5 text-sm text-Text-body-text">{DUMMY_USER.email}</p>
        </Section>

        <Section title="Space booked">
          <p className="text-sm text-Text-dark">{payment.propertyFullName}</p>
          <p className="mt-1.5 text-sm text-Text-body-text">{payment.address}</p>
        </Section>

        <section className="grid grid-cols-2 gap-y-4 px-4 py-4 border-b border-light-Grey">
          {[
            { label: "Check - in", value: payment.checkIn },
            { label: "Guests", value: `${payment.guests} guests`, right: true },
            { label: "Duration", value: `${payment.nights} nights` },
            { label: "Check - out", value: payment.checkOut, right: true },
          ].map((item) => (
            <div key={item.label} className={cn(item.right && "text-right")}>
              <p className="text-xs uppercase tracking-wide text-Text-body-text">{item.label}</p>
              <p className="mt-1.5 text-sm text-Text-dark">{item.value}</p>
            </div>
          ))}
        </section>

        <Section title="Cost breakdown">
          <Row label={`${formatNaira(payment.pricePerNight)} x ${payment.nights} nights`} value={formatNaira(subtotal)} />
          <Row label="Caution fee (refundable)" value={formatNaira(payment.cautionFee)} />
          <div className="mt-2 border-t border-light-Grey pt-2">
            <Row label="Total charged" value={formatNaira(total)} strong />
          </div>
        </Section>

        <Section title="Payment details">
          <Row label="Payment method" value={payment.paymentMethod} />
          <Row label="Payment date" value={payment.paymentDate} />
          <Row label="Processed by" value={payment.processor} />
          <Row label="Paystack transaction ref" value={payment.transactionRef} />
        </Section>

        <Section title="References">
          <Row label="Receipt number" value={payment.receiptNumber} />
          <Row label="Booking reference" value={payment.bookingReference} />
        </Section>

        <Section title="Host">
          <Row label="Name" value={payment.host} />
          <p className="mt-4 rounded-lg bg-primary-containers p-3 text-xs md:text-sm leading-relaxed text-primary print:[print-color-adjust:exact]">
            This receipt confirms your payment to SpaceFinda. For any queries relating to this transaction, contact us{" "}
            <a href="mailto:support@spacefinda.com" className="underline">support@spacefinda.com</a> with your booking
            reference. SpaceFinda does not store your card details. All payments are processed securely by Paystack.
          </p>
        </Section>
      </article>
    </Wrapper>
  );
}
