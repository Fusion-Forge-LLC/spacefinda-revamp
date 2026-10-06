import React from "react";
import Link from "next/link";
import { CalendarDays, ReceiptText } from "lucide-react";
import Wrapper from "@/components/wrapper/wrapper";
import BackButton from "../back-button";
import PaymentStatusBadge from "./payment-status-badge";
import { DUMMY_PAYMENTS } from "@/lib/dummy";
import { formatNaira } from "@/lib/utils";

export default function Payments() {
  const payments = DUMMY_PAYMENTS;

  return (
    <Wrapper className="py-6 md:py-8 max-md:px-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-24">
        <BackButton href="/dashboard/payment-info" className="shrink-0 self-start" />

        <div className="flex-1 max-w-215">
          {payments.length === 0 ? (
            <>
              <h1 className="text-xl md:text-2xl font-semibold text-Text-dark">Your payments</h1>
              <p className="mt-8 text-sm md:text-base text-Text-body-text">
                Once you have a reservation, track your payments and refunds here.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-xl md:text-2xl font-semibold text-Text-dark">Payments</h1>
              <p className="mt-2 text-sm md:text-base text-Text-body-text">
                All payment records from the moment your booking is confirmed.
              </p>

              <ul className="mt-8 rounded-2xl border border-light-Grey px-3 md:px-4">
                {payments.map((payment) => (
                  <li key={payment.id} className="flex gap-3 py-4 md:py-5 border-b border-light-Grey last:border-b-0">
                    <div className="flex size-10 md:size-12 shrink-0 items-center justify-center rounded-lg bg-text-Grey-Muted text-Text-dark">
                      <ReceiptText className="size-5" />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm md:text-base font-medium text-Text-dark">{payment.property}</p>
                        <p className="mt-1.5 flex items-start gap-1.5 text-xs md:text-sm text-Text-body-text">
                          <CalendarDays className="size-3.5 mt-0.5 shrink-0" />
                          {payment.dateRange} • {payment.nights} nights • {payment.guests} guests
                        </p>
                        <div className="mt-3">
                          <PaymentStatusBadge status={payment.status} />
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0">
                        <p className="text-base md:text-lg font-semibold text-Text-dark">
                          {formatNaira(payment.pricePerNight * payment.nights)}
                        </p>
                        <Link
                          href={`/dashboard/payments/${payment.id}`}
                          className="rounded-lg bg-primary-containers px-3 py-2 text-xs md:text-sm text-primary hover:bg-primary/10"
                        >
                          View receipt
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
