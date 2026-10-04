import React from "react";

export default function PageHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-Text-dark">{title}</h1>
      <p className="mt-2 text-sm md:text-base text-Text-body-text">{description}</p>
    </div>
  );
}
