"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { MessageSquareMore } from "lucide-react";
import BackButton from "@/components/dashboard/back-button";
import PageHeading from "@/components/dashboard/page-heading";
import EmptyState from "@/components/host/empty-state";
import { cn } from "@/lib/utils";
import type { HostConversation } from "@/lib/dummy";
import ConversationList from "./conversation-list";
import ReportProblemModal from "./report-problem-modal";

// One page for the inbox: the list stays put on desktop and only the right pane swaps between conversations.
// Mobile has no room for both, so it shows the card list or the open thread.
export default function MessagesShell({ conversations, children }: { conversations: HostConversation[]; children: React.ReactNode }) {
  const { id } = useParams<{ id?: string }>();
  const active = conversations.find((c) => c.id === id);
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3 md:items-start max-md:mb-4">
        <PageHeading
          className={cn("mb-0", active && "max-md:hidden")}
          title="Messages"
          description="Conversations with your renters. Only available after a booking is confirmed."
        />
        {active && (
          <>
            <BackButton href="/host/messages" label="Back to messages" className="text-sm md:hidden" />
            <button type="button" onClick={() => setIsReportOpen(true)} className="shrink-0 text-sm md:text-base font-medium text-primary underline underline-offset-2">
              Report a problem
            </button>
          </>
        )}
      </div>

      {conversations.length === 0 ? (
        <EmptyState
          icon={MessageSquareMore}
          className="py-16"
          title="No message yet"
          description="Conversations with renters will appear here once a booking is confirmed. SpaceFinda only enables messaging after a booking is paid and confirmed to protect both you and your renters."
        />
      ) : (
        <>
          {!id && <ConversationList conversations={conversations} className="md:hidden" />}

          <div
            className={cn(
              "flex h-[calc(100dvh-10.5rem)] min-h-120 overflow-hidden rounded-2xl border border-gray-100 bg-white md:h-[calc(100dvh-14.5rem)]",
              !id && "max-md:hidden"
            )}
          >
            <ConversationList conversations={conversations} variant="rows" activeId={id} className="w-72 shrink-0 border-r border-gray-100 max-md:hidden lg:w-80" />
            {children}
          </div>
        </>
      )}

      {active && <ReportProblemModal key={active.id} open={isReportOpen} onOpenChange={setIsReportOpen} conversation={active} />}
    </div>
  );
}
