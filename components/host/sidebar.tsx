"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Banknote,
  CalendarDays,
  CalendarCheck,
  ChevronUp,
  Headset,
  House,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Settings,
  Star,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/public/icons/logo.svg";
import SignOutModal from "@/components/dashboard/sign-out-modal";

const NAV_GROUPS = [
  {
    label: "Listings",
    items: [
      { label: "My listings", href: "/host/listings", icon: House },
      { label: "Availability", href: "/host/availability", icon: CalendarDays },
    ],
  },
  {
    label: "Bookings",
    items: [
      { label: "My bookings", href: "/host/bookings", icon: CalendarCheck },
      { label: "Damage claims", href: "/host/damage-claims", icon: TriangleAlert },
    ],
  },
  {
    label: "Finances",
    items: [
      { label: "Payout", href: "/host/payout", icon: Banknote },
      { label: "Insight", href: "/host/insight", icon: BarChart3 },
    ],
  },
  {
    label: "Communication",
    items: [
      { label: "Messages", href: "/host/messages", icon: MessageSquareMore },
      { label: "Reviews", href: "/host/reviews", icon: Star },
    ],
  },
  {
    label: "Account",
    items: [
      // Profile and identity verification sit under account settings in the designs
      { label: "Account settings", href: "/host/account-settings", icon: Settings, match: ["/host/profile", "/host/verification"] },
      { label: "Help & support", href: "/host/help-support", icon: Headset },
    ],
  },
];

const itemClass =
  "relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-Text-body-text transition-colors hover:bg-text-Grey-Muted";

function NavLink({
  href,
  icon: Icon,
  label,
  match = [],
  onNavigate,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  match?: string[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/host" ? pathname === href : [href, ...match].some((path) => pathname === path || pathname.startsWith(`${path}/`));

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        itemClass,
        isActive &&
          "bg-primary-containers text-primary font-medium hover:bg-primary-containers before:absolute before:-left-3 before:inset-y-1 before:w-0.75 before:rounded-full before:bg-primary"
      )}
    >
      <Icon className="size-4.5" strokeWidth={1.5} />
      {label}
    </Link>
  );
}

export default function HostSidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  return (
    <aside className={cn("flex h-full w-60 shrink-0 flex-col overflow-y-auto border-r border-gray-100 bg-[#FEFEFE]", className)}>
      <Link href="/" onClick={onNavigate} className="flex items-center gap-2 px-6 py-5">
        <Image src={Logo} alt="" className="w-8 h-auto" />
        <span className="font-semibold text-primary">SpaceFinda</span>
      </Link>

      <nav className="flex flex-col pb-6">
        <div className="border-b border-gray-100 px-3 pb-3">
          <NavLink href="/host" icon={LayoutGrid} label="Overview" onNavigate={onNavigate} />
        </div>

        {NAV_GROUPS.map((group) => {
          const isCollapsed = collapsed[group.label];
          return (
            <div key={group.label} className="border-b border-gray-100 px-3 py-3 last:border-b-0">
              <button
                type="button"
                onClick={() => setCollapsed((prev) => ({ ...prev, [group.label]: !prev[group.label] }))}
                aria-expanded={!isCollapsed}
                className="flex w-full items-center justify-between px-3 pb-2 text-xs uppercase text-Text-body-text"
              >
                {group.label}
                <ChevronUp className={cn("size-4 transition-transform", isCollapsed && "rotate-180")} strokeWidth={1.5} />
              </button>

              {!isCollapsed && (
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => (
                    <NavLink key={item.href} {...item} onNavigate={onNavigate} />
                  ))}
                  {group.label === "Account" && (
                    <button type="button" onClick={() => setIsSignOutOpen(true)} className={cn(itemClass, "text-left")}>
                      <LogOut className="size-4.5" strokeWidth={1.5} />
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <SignOutModal open={isSignOutOpen} onOpenChange={setIsSignOutOpen} />
    </aside>
  );
}
