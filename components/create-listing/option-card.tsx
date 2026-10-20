import React, { FC } from "react";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  icon: FC<LucideProps>;
  selected: boolean;
  onClick: () => void;
  role?: "radio" | "checkbox";
}

export default function OptionCard({ label, icon: Icon, selected, onClick, role = "radio" }: OptionCardProps) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-3 rounded-lg border bg-white p-3 md:p-4 text-left transition-colors",
        selected ? "border-primary ring-1 ring-primary bg-primary-containers/50" : "border-light-Grey hover:border-primary/40"
      )}
    >
      <Icon className={cn("size-5", selected ? "text-primary" : "text-Text-body-text")} strokeWidth={1.5} />
      <span className="text-sm md:text-base text-Text-body-text">{label}</span>
    </button>
  );
}
