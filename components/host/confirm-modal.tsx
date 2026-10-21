"use client";

import React from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Centred icon + title + description with a confirm and a cancel button, same layout as SignOutModal
export default function ConfirmModal({
  open,
  onOpenChange,
  icon: Icon,
  tone = "primary",
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon: React.ElementType;
  tone?: "primary" | "danger";
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
}) {
  const isDanger = tone === "danger";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm gap-0 p-5 text-center">
        <div
          className={cn(
            "mx-auto flex size-10 items-center justify-center rounded-lg",
            isDanger ? "bg-red-50 text-red-600" : "bg-primary-containers text-primary"
          )}
        >
          <Icon className="size-5" />
        </div>
        <DialogTitle className="mt-4 text-base md:text-lg font-medium text-Text-dark">{title}</DialogTitle>
        <DialogDescription className="mt-2 text-xs md:text-sm leading-5 text-Text-body-text">{description}</DialogDescription>

        <Button
          onClick={() => {
            onOpenChange(false);
            onConfirm();
          }}
          className={cn("mt-4 h-10 w-full", isDanger && "bg-[#CD3A2F] hover:bg-[#CD3A2F]/90")}
        >
          {confirmLabel}
        </Button>
        <DialogClose asChild>
          <Button variant="ghost" className="mt-2 h-10 w-full bg-text-Grey-Muted">
            {cancelLabel}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
