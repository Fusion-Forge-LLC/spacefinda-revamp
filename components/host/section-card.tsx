import React from "react";
import { cn } from "@/lib/utils";

// Bordered card with a title row and divider, used across the host dashboard
export default function SectionCard({
  title,
  action,
  className,
  children,
}: {
  title?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-2xl border border-gray-100 bg-white p-4 md:p-5", className)}>
      {title && (
        <div className="mb-1 flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <h2 className="text-base md:text-lg font-medium text-Text-dark">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
