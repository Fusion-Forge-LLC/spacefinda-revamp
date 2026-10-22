import React from "react";
import { cn } from "@/lib/utils";

export default function PageHeading({ title, description, className }: { title: string; description: string; className?: string }) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-2xl font-semibold text-Text-dark">{title}</h1>
      <p className="mt-2 text-sm md:text-base text-Text-body-text">{description}</p>
    </div>
  );
}
