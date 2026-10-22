import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center py-10 text-center", className)}>
      <div className="flex size-12 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm">
        <Icon className="size-5 text-Text-body-text" strokeWidth={1.5} />
      </div>
      <p className="mt-3 text-sm md:text-base font-medium text-Text-dark">{title}</p>
      <p className="mt-1 max-w-80 text-xs md:text-sm leading-5 text-Text-body-text">{description}</p>
      {action && (
        <Button asChild className="mt-4 h-10 rounded-lg px-5">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
