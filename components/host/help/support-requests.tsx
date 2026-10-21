import React from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { DUMMY_HOST_SUPPORT_REQUESTS, SupportRequestStatus } from "@/lib/dummy";
import EmptyState from "../empty-state";

const STATUS: Record<SupportRequestStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-primary-containers text-primary" },
  review: { label: "In review", className: "bg-amber-50 text-amber-700" },
  resolved: { label: "Resolved", className: "bg-green-50 text-green-600" },
};

export default function SupportRequests() {
  const requests = DUMMY_HOST_SUPPORT_REQUESTS;

  return (
    <div>
      <h2 className="text-lg md:text-xl font-medium text-Text-dark">My requests</h2>
      <p className="mt-1 text-sm text-Text-body-text">Track messages you&apos;ve sent us and requests like bank account changes.</p>

      {requests.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No requests yet"
          description="When you message support or request a change to your account, you can follow its progress here."
        />
      ) : (
        <ul className="mt-4 space-y-3">
          {requests.map((r) => (
            <li key={r.reference} className="rounded-2xl border border-gray-100 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs text-Text-body-text">
                    {r.topic} · {r.reference}
                  </p>
                  <p className="mt-1 text-sm md:text-base font-medium text-Text-dark">{r.subject}</p>
                </div>
                <span className={cn("shrink-0 rounded-md px-2 py-0.5 text-xs", STATUS[r.status].className)}>{STATUS[r.status].label}</span>
              </div>
              <p className="mt-3 rounded-lg bg-text-Grey-Muted px-3 py-2.5 text-xs md:text-sm text-Text-body-text">{r.update}</p>
              <p className="mt-2 text-xs text-Text-body-text">Sent {r.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
