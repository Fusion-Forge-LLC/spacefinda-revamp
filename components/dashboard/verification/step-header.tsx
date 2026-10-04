import React from "react";

export default function StepHeader({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h1 className="text-xl md:text-2xl font-semibold text-Text-dark">{title}</h1>
      <p className="mt-2 text-sm md:text-base text-Text-body-text leading-relaxed">{children}</p>
    </div>
  );
}
