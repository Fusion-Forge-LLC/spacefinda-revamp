import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Underlined tab bar where each tab is a link to `?tab=<value>`, so the active tab survives refreshes and back navigation
export default function LinkTabs({
  basePath,
  active,
  tabs,
}: {
  basePath: string;
  active: string;
  tabs: { value: string; label: string; count?: number }[];
}) {
  return (
    <nav className="mb-6 flex gap-6 overflow-x-auto border-b border-gray-100 md:gap-10">
      {tabs.map(({ value, label, count }) => {
        const isActive = value === active;
        return (
          <Link
            key={value}
            href={`${basePath}?tab=${value}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 border-b-2 px-2 pb-3 text-sm md:text-base whitespace-nowrap outline-none focus-visible:text-primary",
              isActive ? "border-primary text-primary" : "border-transparent text-Text-body-text hover:text-Text-dark"
            )}
          >
            {label}
            {!!count && (
              <span className={cn("rounded px-1.5 text-[10px]", isActive ? "bg-primary-containers" : "bg-text-Grey-Muted")}>{count}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
