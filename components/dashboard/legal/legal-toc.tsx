"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LegalSection } from "./types";

// Highlights the section currently being read
export default function LegalToc({ sections, footer }: { sections: LegalSection[]; footer: string }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page">
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                activeId === section.id ? "text-primary bg-primary-containers" : "text-Text-body-text hover:text-Text-dark"
              )}
            >
              <span className="size-1 shrink-0 rounded-full bg-current" />
              {section.nav}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-light-Grey pt-4 text-xs md:text-sm text-Text-body-text leading-relaxed">{footer}</p>
    </nav>
  );
}
