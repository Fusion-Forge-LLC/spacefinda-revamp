// Inline text: a plain string, or a bold lead-in followed by normal text ("Account information: First name...")
export type Inline = string | { bold: string; text: string };

export type LegalBlock =
  | { type: "p"; text: Inline }
  | { type: "h3"; text: string }
  | { type: "list"; items: Inline[] }
  | { type: "table"; columns: string[]; rows: string[][]; alignLastRight?: boolean }
  | { type: "quote"; text: Inline }
  | { type: "rights"; items: { title: string; text: string }[] }
  | {
      type: "tiers";
      tiers: { label: string; tone: "blue" | "amber" | "red"; title: string; items: string[] }[];
    }
  | { type: "contact"; title: string; lines: { text: string; heading?: boolean }[] };

export interface LegalSection {
  id: string;
  nav: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
  closing?: string;
}
