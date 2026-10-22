"use client";

import React from "react";
import { X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Button } from "@/components/ui/button";

// Title, description and close button over a divider, as in the bank account modals
export default function SettingsDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-lg max-h-[90dvh] gap-0 overflow-y-auto p-0">
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-4 py-4 md:px-5">
          <div>
            <DialogTitle className="text-base md:text-lg font-semibold text-Text-dark">{title}</DialogTitle>
            <DialogDescription className="mt-1 text-xs md:text-sm text-Text-body-text">{description}</DialogDescription>
          </div>
          <DialogClose className="flex size-7 shrink-0 items-center justify-center rounded-full bg-text-Grey-Muted text-Text-body-text">
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
}

// Grey cancel button and a primary action, right-aligned under a divider
export function SettingsDialogFooter({ cancelLabel = "Cancel", children }: { cancelLabel?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-4 py-4 md:px-5">
      <DialogClose asChild>
        <Button type="button" variant="ghost" className="h-10 bg-text-Grey-Muted px-4">
          {cancelLabel}
        </Button>
      </DialogClose>
      {children}
    </div>
  );
}
