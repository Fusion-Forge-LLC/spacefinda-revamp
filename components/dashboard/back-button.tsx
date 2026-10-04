import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackButton({ href, label, className }: { href: string; label?: string; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-3 text-sm md:text-base text-Text-dark", className)}>
      <span className="flex size-9 items-center justify-center rounded-full bg-text-Grey-Muted text-Text-body-text">
        <ChevronLeft className="size-4" />
      </span>
      {label ?? <span className="sr-only">Go back</span>}
    </Link>
  );
}
