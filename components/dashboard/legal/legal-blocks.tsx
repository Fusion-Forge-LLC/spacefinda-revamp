import React from "react";
import { cn } from "@/lib/utils";
import { Inline, LegalBlock } from "./types";

function InlineText({ value }: { value: Inline }) {
  if (typeof value === "string") return <>{value}</>;
  return (
    <>
      <span className="font-medium text-Text-dark">{value.bold}</span> {value.text}
    </>
  );
}

// Turns any email address in the text into a mailto link
function LinkedText({ text }: { text: string }) {
  const parts = text.split(/([\w.+-]+@[\w-]+\.[\w.]+)/g);
  return (
    <>
      {parts.map((part, i) =>
        /@/.test(part) ? (
          <a key={i} href={`mailto:${part}`} className="underline underline-offset-2">
            {part}
          </a>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

const TIER_TONES = {
  blue: "bg-primary-containers text-primary",
  amber: "bg-[#F7F4EC] text-[#9A7B3F]",
  red: "bg-red-50 text-red-600",
};

const textClass = "text-sm text-Text-body-text leading-relaxed";

export default function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return (
              <p key={index} className={textClass}>
                <InlineText value={block.text} />
              </p>
            );
          case "h3":
            return (
              <h3 key={index} className="pt-1 text-sm font-medium text-Text-dark">
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul key={index} className="space-y-2 list-disc pl-4 marker:text-Text-dark">
                {block.items.map((item, i) => (
                  <li key={i} className={textClass}>
                    <InlineText value={item} />
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={index} className={cn(textClass, "border-l-2 border-primary pl-3")}>
                <InlineText value={block.text} />
              </blockquote>
            );
          case "table":
            return (
              <div key={index} className="-mx-4 md:mx-0 overflow-x-auto">
                <table className="w-full min-w-120 border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      {block.columns.map((col, i) => (
                        <th
                          key={col}
                          className={cn(
                            "px-4 py-4 font-normal",
                            block.alignLastRight && i === block.columns.length - 1 && "text-right"
                          )}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-light-Grey">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className={cn(
                              "px-4 py-3.5 align-top",
                              block.alignLastRight
                                ? cn("text-Text-dark", c === row.length - 1 && "text-right")
                                : "text-Text-body-text"
                            )}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "rights":
            return (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-1">
                {block.items.map((item) => (
                  <div key={item.title}>
                    <p className="text-sm font-medium text-Text-dark">{item.title}</p>
                    <p className={cn(textClass, "mt-1")}>{item.text}</p>
                  </div>
                ))}
              </div>
            );
          case "tiers":
            return (
              <div key={index} className="space-y-3">
                {block.tiers.map((tier) => (
                  <div key={tier.label} className="rounded-lg border border-light-Grey p-3 md:p-4">
                    <p className="flex flex-wrap items-center gap-2 text-sm text-Text-dark">
                      <span className={cn("rounded px-1.5 py-0.5 text-xs", TIER_TONES[tier.tone])}>{tier.label}</span>
                      {tier.title}
                    </p>
                    <ul className="mt-3 space-y-2 list-disc pl-4 marker:text-Text-dark">
                      {tier.items.map((item) => (
                        <li key={item} className={textClass}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          case "contact":
            return (
              <div key={index} className="rounded-xl bg-navy p-4 text-white">
                <p className="text-base font-medium">{block.title}</p>
                <div className="mt-2 space-y-2">
                  {block.lines.map((line, i) =>
                    line.heading ? (
                      <p key={i} className="pt-1 text-base font-medium">{line.text}</p>
                    ) : (
                      <p key={i} className="text-sm text-white/85 leading-relaxed">
                        <LinkedText text={line.text} />
                      </p>
                    )
                  )}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
