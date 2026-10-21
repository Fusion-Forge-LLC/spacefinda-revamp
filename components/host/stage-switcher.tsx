import React from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOST_STAGES, HostStage } from "@/lib/dummy";
import { setHostStage } from "@/lib/host-stage-actions";

const LABELS: Record<HostStage, string> = {
  new: "New",
  setup: "In progress",
  live: "Live",
  "live-alerts": "Alerts",
};

// Dev-only floating toolbar on the overview for previewing each stage until real host data decides it
export default function StageSwitcher({ active }: { active: HostStage }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <form
      action={setHostStage}
      aria-label="Preview host stage"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-1 rounded-full border border-gray-100 bg-white p-1 text-xs shadow-[0_4px_16px_rgba(17,17,17,0.08)]"
    >
      <span className="flex items-center gap-1.5 pr-1 pl-2.5 text-Text-body-text">
        <Eye className="size-3.5" />
        Preview
      </span>
      {HOST_STAGES.map((stage) => (
        <button
          key={stage}
          type="submit"
          name="stage"
          value={stage}
          aria-pressed={stage === active}
          className={cn(
            "rounded-full px-3 py-1.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30",
            stage === active ? "bg-primary font-medium text-white" : "text-Text-dark hover:bg-primary-containers hover:text-primary"
          )}
        >
          {LABELS[stage]}
        </button>
      ))}
    </form>
  );
}
