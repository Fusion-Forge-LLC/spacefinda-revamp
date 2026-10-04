"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, MessageCircleQuestion, MessageSquareText } from "lucide-react";
import PageHeading from "../page-heading";
import SendMessageModal from "./send-message-modal";

const rowClass = "flex w-full items-center gap-3 py-4 border-b border-light-Grey last:border-b-0 text-left group";

function RowContent({ icon: Icon, title, description }: { icon: typeof ChevronRight; title: string; description: string }) {
  return (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-containers text-primary">
        <Icon className="size-4.5" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm md:text-base font-medium text-Text-dark">{title}</span>
        <span className="mt-1 block text-xs md:text-sm text-Text-body-text">{description}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-Text-body-text transition-transform group-hover:translate-x-0.5" />
    </>
  );
}

export default function HelpSupport() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <div className="max-w-200">
      <PageHeading
        title="Help and support"
        description="Get help with a booking, report an issue, or browse common questions."
      />

      <div>
        <Link href="/dashboard/help-support/faqs" className={rowClass}>
          <RowContent
            icon={MessageCircleQuestion}
            title="Browse FAQs"
            description="Answers to the most common questions about bookings, payments, and refunds."
          />
        </Link>
        <button type="button" onClick={() => setIsMessageOpen(true)} className={rowClass}>
          <RowContent
            icon={MessageSquareText}
            title="Send a message"
            description="Describe your issue and our team will respond within a few hours."
          />
        </button>
      </div>

      <SendMessageModal open={isMessageOpen} onOpenChange={setIsMessageOpen} />
    </div>
  );
}
