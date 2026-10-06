import React from "react";
import { Check } from "lucide-react";

export default function TipsBox({ title, tips }: { title: string; tips: string[] }) {
  return (
    <div className="rounded-xl border border-primary/10 bg-primary-containers p-4">
      <p className="text-base md:text-lg text-Text-dark">{title}</p>
      <ul className="mt-3 space-y-3">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2 text-sm md:text-base text-Text-body-text">
            <Check className="size-4 mt-0.5 shrink-0 text-primary" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
