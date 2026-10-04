"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Button } from "@/components/ui/button";

// There is no auth yet, so confirming just returns to the home page
export default function SignOutModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();

  const signOut = () => {
    onOpenChange(false);
    router.push("/");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md gap-0 p-5 text-center">
        <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
          <LogOut className="size-5" />
        </div>
        <DialogTitle className="mt-4 text-base md:text-lg font-medium text-Text-dark">Sign out?</DialogTitle>
        <DialogDescription className="mt-2 text-xs md:text-sm text-Text-body-text">
          Are you sure you want to sign out of your SpaceFinda account? You will need to sign in again to manage your
          bookings.
        </DialogDescription>

        <Button onClick={signOut} className="mt-4 h-10 w-full bg-[#CD3A2F] hover:bg-[#CD3A2F]/90">Yes, sign out</Button>
        <DialogClose asChild>
          <Button variant="ghost" className="mt-2 h-10 w-full bg-text-Grey-Muted">Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
