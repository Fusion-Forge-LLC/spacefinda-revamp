import React from "react";
import { ChevronDown } from "lucide-react";
import Wrapper from "@/components/wrapper/wrapper";
import BackButton from "../back-button";
import LegalBlocks from "./legal-blocks";
import LegalToc from "./legal-toc";
import { LegalDocument as LegalDocumentType } from "./types";
import { LEGAL_EFFECTIVE_DATE } from "./content";

export default function LegalDocument({ doc }: { doc: LegalDocumentType }) {
  const tocFooter = `Nigeria Data Protection Act (NDPA) 2023 compliant · Last updated ${LEGAL_EFFECTIVE_DATE}`;

  return (
    <Wrapper className="py-6 md:py-10 max-md:px-4">
      <div className="flex gap-10 lg:gap-16">
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-28">
            <BackButton href="/dashboard/legal" label="Legal & privacy" className="mb-6" />
            <LegalToc sections={doc.sections} footer={tocFooter} />
          </div>
        </aside>

        <article className="flex-1 min-w-0 max-w-172">
          <BackButton href="/dashboard/legal" className="mb-4 md:hidden" />
          <h1 className="text-xl md:text-2xl font-semibold text-Text-dark">{doc.title}</h1>
          <p className="mt-2 text-sm text-Text-body-text">
            SpaceFinda Technologies Ltd · Effective date: {LEGAL_EFFECTIVE_DATE}
          </p>

          {/* On mobile the contents list collapses into a dropdown */}
          <details className="group mt-6 rounded-lg border border-light-Grey md:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2.5 text-sm text-Text-dark">
              On this page
              <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
            </summary>
            <ol className="border-t border-light-Grey px-3 py-2">
              {doc.sections.map((section, i) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="block py-1.5 text-sm text-Text-body-text">
                    {i + 1}. {section.nav}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <p className="mt-6 md:mt-10 rounded-xl bg-primary-containers p-3 md:p-4 text-sm leading-relaxed text-primary">
            {doc.intro}
          </p>

          {doc.sections.map((section, i) => (
            <section key={section.id} id={section.id} className="mt-8 scroll-mt-28">
              <h2 className="mb-4 border-b border-light-Grey pb-3 text-base md:text-lg font-medium text-Text-dark">
                {i + 1}. {section.title}
              </h2>
              <LegalBlocks blocks={section.blocks} />
            </section>
          ))}

          {doc.closing && <p className="mt-4 text-sm text-Text-body-text leading-relaxed">{doc.closing}</p>}

          <p className="mt-8 border-t border-light-Grey pt-6 text-center text-xs md:text-sm text-Text-body-text">
            Last updated: {LEGAL_EFFECTIVE_DATE} · SpaceFinda Technologies Ltd · Nigeria
          </p>
        </article>
      </div>
    </Wrapper>
  );
}
