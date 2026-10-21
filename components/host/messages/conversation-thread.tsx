"use client";

import React, { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronRight, SendHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { DUMMY_HOST, type ConversationMessage, type HostConversation } from "@/lib/dummy";
import { BOOKING_STATUS } from "../bookings/booking-status";
import BookingDetailsModal from "./booking-details-modal";

function DaySeparator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-2 text-xs text-Text-body-text">
      <span className="h-px flex-1 bg-gray-100" />
      {label}
      <span className="h-px flex-1 bg-gray-100" />
    </div>
  );
}

function MessageBubble({ message, renter }: { message: ConversationMessage; renter: HostConversation["renter"] }) {
  const isHost = message.from === "host";
  const author = isHost ? { name: DUMMY_HOST.name, avatar: DUMMY_HOST.avatar } : renter;

  return (
    <div className={cn("flex gap-2", isHost ? "flex-row-reverse items-start" : "items-end")}>
      <Avatar className="size-8">
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback>{author.name[0]}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2.5 text-sm leading-6 md:max-w-[65%] md:px-4 md:py-3",
          isHost ? "bg-primary text-white" : "bg-text-Grey-Muted text-Text-dark"
        )}
      >
        <p className="whitespace-pre-wrap wrap-break-word">{message.text}</p>
        <p className={cn("mt-1 text-xs", isHost ? "text-right text-white/80" : "text-Text-body-text")}>{message.time}</p>
      </div>
    </div>
  );
}

// Right pane of the messages page; the list and "Report a problem" live in MessagesShell
export default function ConversationThread({ conversation }: { conversation: HostConversation }) {
  const { renter, booking } = conversation;
  const [messages, setMessages] = useState(conversation.messages);
  const [draft, setDraft] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const status = BOOKING_STATUS[booking.status];

  // Keep the newest message in view on open and after sending
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  // No API yet, so sent messages only live in local state
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const lastDay = messages[messages.length - 1]?.day;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        from: "host",
        text,
        day: lastDay?.startsWith("Today") ? lastDay : "Today",
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      },
    ]);
    setDraft("");
  };

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
        <Avatar className="size-9">
          <AvatarImage src={renter.avatar} alt={renter.name} />
          <AvatarFallback>{renter.name[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-Text-dark">{renter.name}</p>
          <p className="flex items-center gap-1.5 text-xs text-Text-body-text">
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-1.5 py-0.5 text-[10px] text-green-600">
              <span className="size-1.5 rounded-full bg-current" />
              {renter.respondsIn}
            </span>
            · Renter
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-primary-containers px-4 py-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary">
          <CalendarDays className="size-4.5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-primary">{booking.listingTitle}</p>
          <p className="truncate text-xs text-primary/80">
            {booking.dates} · {booking.ref} · <span className={cn(booking.status === "cancelled" && "text-red-600")}>{status.label}</span>
          </p>
        </div>
        <button type="button" onClick={() => setIsBookingOpen(true)} className="flex shrink-0 items-center gap-1 text-xs md:text-sm text-primary">
          View booking
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
        {messages.map((message, i) => (
          <React.Fragment key={message.id}>
            {message.day !== messages[i - 1]?.day && <DaySeparator label={message.day} />}
            <MessageBubble message={message} renter={renter} />
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={send} className="px-4 pt-2 pb-3">
        <div className="flex items-center gap-2 rounded-full border border-gray-100 py-1.5 pr-1.5 pl-4 focus-within:border-primary">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message..."
            aria-label="Message"
            className="h-8 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-Grey-Pure-White"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label="Send message"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors disabled:bg-primary-containers disabled:text-primary/40"
          >
            <SendHorizontal className="size-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-Text-body-text">
          Messages are only visible to you and your renter. SpaceFinda does not read your conversations.
        </p>
      </form>

      <BookingDetailsModal open={isBookingOpen} onOpenChange={setIsBookingOpen} conversation={conversation} />
    </section>
  );
}
