import React from "react";

export default function StepHeading({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 md:mb-10">
      <h1 className="text-xl md:text-[28px] font-semibold text-Text-dark">{title}</h1>
      <p className="mt-2 text-sm md:text-base text-Text-body-text leading-relaxed">{children}</p>
    </div>
  );
}
