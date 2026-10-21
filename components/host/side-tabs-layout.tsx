import React from "react";
import Link from "next/link";
import PageHeading from "@/components/dashboard/page-heading";
import { cn } from "@/lib/utils";

export type SideTab = { value: string; label: string; icon: React.ElementType };

// Page heading, a card of tabs and the active tab's panel, used by account settings and help & support.
// Each tab links to `?tab=<value>` like LinkTabs. On desktop the page fills the space under the topbar (65px)
// and main's padding (2 × 2rem), so the heading and tabs stay put and only the panel scrolls (vertically).
// On mobile the tabs are a 2 × 2 grid so nothing scrolls sideways
export default function SideTabsLayout({
  title,
  description,
  basePath,
  tabs,
  active,
  children,
}: {
  title: string;
  description: string;
  basePath: string;
  tabs: readonly SideTab[];
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-5xl flex-col md:h-[calc(100dvh-65px-4rem)]">
      <PageHeading title={title} description={description} />

      <div className="flex flex-col gap-6 md:min-h-0 md:flex-1 md:flex-row md:gap-4">
        <nav className="grid grid-cols-2 gap-1 self-start rounded-2xl border border-gray-100 bg-white p-2 max-md:w-full md:flex md:w-56 md:shrink-0 md:flex-col">
          {tabs.map(({ value, label, icon: Icon }) => {
            const isActive = value === active;
            return (
              <Link
                key={value}
                href={`${basePath}?tab=${value}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-w-0 items-center gap-2.5 truncate rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30",
                  isActive ? "bg-primary-containers text-primary" : "text-Text-body-text hover:bg-text-Grey-Muted"
                )}
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.5} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="min-w-0 flex-1 md:overflow-x-hidden md:overflow-y-auto md:pr-2">{children}</div>
      </div>
    </div>
  );
}
