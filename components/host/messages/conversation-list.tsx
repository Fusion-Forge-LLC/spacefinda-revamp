"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { HostConversation } from "@/lib/dummy";

function matches(conversation: HostConversation, query: string) {
  const { renter, booking } = conversation;
  return [renter.name, booking.listingTitle, booking.ref].some((value) => value.toLowerCase().includes(query));
}

function ConversationItem({ conversation, variant, isActive }: { conversation: HostConversation; variant: "cards" | "rows"; isActive: boolean }) {
  const { renter, booking, messages, unread } = conversation;
  const last = messages[messages.length - 1];

  return (
    <Link
      href={`/host/messages/${conversation.id}`}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex gap-3 transition-colors",
        variant === "cards" ? "rounded-xl border border-gray-100 p-3 md:p-4" : "px-3 py-3",
        isActive || (variant === "cards" && unread) ? "bg-primary-containers" : "bg-white hover:bg-gray-50"
      )}
    >
      <div className="relative shrink-0">
        <Avatar className={variant === "cards" ? "size-11" : "size-10"}>
          <AvatarImage src={renter.avatar} alt={renter.name} />
          <AvatarFallback>{renter.name[0]}</AvatarFallback>
        </Avatar>
        {renter.online && <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-white bg-primary" />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-Text-dark">{renter.name}</p>
          <span className="shrink-0 text-xs text-Text-body-text">{conversation.lastMessageAt}</span>
        </div>
        <p className="mt-0.5 truncate text-xs text-primary">
          {booking.listingTitle} · {booking.ref}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <p className={cn("flex-1 truncate text-xs", unread ? "text-Text-dark" : "text-Text-body-text")}>
            {last?.from === "host" && "You: "}
            {last?.text}
          </p>
          {!!unread && (
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-white">{unread}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

// Searchable list of conversations: separate cards on the inbox page, divided rows beside an open thread
export default function ConversationList({
  conversations,
  variant = "cards",
  activeId,
  className,
}: {
  conversations: HostConversation[];
  variant?: "cards" | "rows";
  activeId?: string;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = q ? conversations.filter((c) => matches(c, q)) : conversations;

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <label
        className={cn(
          "flex h-10 shrink-0 items-center gap-2 rounded-lg border border-gray-100 px-3 text-sm focus-within:border-primary",
          variant === "rows" && "m-3"
        )}
      >
        <Search className="size-4 shrink-0 text-Text-body-text" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for conversations..."
          className="w-full bg-transparent outline-none placeholder:text-Grey-Pure-White"
        />
      </label>

      {visible.length === 0 ? (
        <p className="px-3 py-8 text-center text-sm text-Text-body-text">No conversations match &ldquo;{query.trim()}&rdquo;</p>
      ) : (
        <div className={cn(variant === "cards" ? "mt-4 flex flex-col gap-3" : "min-h-0 flex-1 divide-y divide-gray-100 overflow-y-auto border-t border-gray-100")}>
          {visible.map((conversation) => (
            <ConversationItem key={conversation.id} conversation={conversation} variant={variant} isActive={conversation.id === activeId} />
          ))}
        </div>
      )}
    </div>
  );
}
