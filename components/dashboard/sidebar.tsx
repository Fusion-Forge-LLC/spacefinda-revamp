"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser, CreditCard, FileText, Headset, LogOut, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import SignOutModal from "./sign-out-modal";

const NAV_ITEMS = [
  { label: "My profile", href: "/dashboard/profile", icon: CircleUser },
  { label: "Personal details", href: "/dashboard/personal-details", icon: User },
  { label: "Payment info", href: "/dashboard/payment-info", icon: CreditCard },
  { label: "Account settings", href: "/dashboard/account-settings", icon: Settings },
  { label: "Help & support", href: "/dashboard/help-support", icon: Headset },
  { label: "Legal & privacy", href: "/dashboard/legal", icon: FileText },
];

const itemClass = "flex items-center gap-2.5 rounded-lg px-3 py-3 text-sm md:text-base whitespace-nowrap transition-colors";

export default function Sidebar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  // On mobile the nav is a horizontal scroller, so bring the active tab into view
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !active || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: active.offsetLeft - nav.clientWidth / 2 + active.clientWidth / 2 });
  }, [pathname]);

  return (
    <aside className="md:w-65 shrink-0 md:border-r border-gray-100 md:min-h-[calc(100vh-81px)] pt-6 md:pt-12 md:pr-6">
      <h2 className="text-xl md:text-2xl font-semibold text-Text-dark mb-4 max-md:hidden">My profile</h2>

      <nav ref={navRef} className="relative flex md:flex-col gap-1 max-md:overflow-x-auto max-md:-mx-4 max-md:px-4 max-md:border-b border-gray-100 max-md:pb-2">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                itemClass,
                isActive ? "bg-primary-containers text-primary" : "text-Text-body-text hover:bg-text-Grey-Muted"
              )}
            >
              <Icon className="size-4.5" />
              {label}
            </Link>
          );
        })}

        <button type="button" onClick={() => setIsSignOutOpen(true)} className={cn(itemClass, "text-Text-body-text hover:bg-text-Grey-Muted text-left")}>
          <LogOut className="size-4.5" />
          Sign out
        </button>
      </nav>

      <SignOutModal open={isSignOutOpen} onOpenChange={setIsSignOutOpen} />
    </aside>
  );
}
