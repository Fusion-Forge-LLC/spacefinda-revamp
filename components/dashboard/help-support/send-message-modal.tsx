"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Check } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = [
  "Booking issue",
  "Payment or refund",
  "Caution fee",
  "Problem with a space",
  "Account and login",
  "Something else",
];

const messageSchema = z.object({
  category: z.string().min(1, "Select a category"),
  bookingRef: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a bit more so we can help"),
});

type MessageForm = z.infer<typeof messageSchema>;

export default function SendMessageModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [sent, setSent] = useState(false);
  const form = useForm<MessageForm>({
    resolver: zodResolver(messageSchema),
    defaultValues: { category: "", bookingRef: "", message: "" },
  });

  // Reset once the close animation finishes, so the success view doesn't flash back to the form
  const reset = () => {
    form.reset();
    setSent(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {sent ? (
        <DialogContent showCloseButton={false} onCloseAutoFocus={reset} className="sm:max-w-md gap-0 p-5 text-center">
          <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-green-50 text-green-600">
            <Check className="size-4" />
          </div>
          <DialogTitle className="mt-3 text-base md:text-lg font-medium text-Text-dark">Message sent!</DialogTitle>
          <DialogDescription className="mt-2 text-xs md:text-sm text-Text-body-text">
            Our support team will get back to you within 24 hours. You&apos;ll receive updates by email.
          </DialogDescription>
          <DialogClose asChild>
            <Button variant="ghost" className="mx-auto mt-4 h-9 px-7 bg-text-Grey-Muted">Close</Button>
          </DialogClose>
        </DialogContent>
      ) : (
        <DialogContent showCloseButton={false} onCloseAutoFocus={reset} className="sm:max-w-lg gap-0 p-4 md:p-5">
          <DialogTitle className="sr-only">Send a message</DialogTitle>
          <DialogDescription className="sr-only">Describe your issue and our team will respond within a few hours.</DialogDescription>

          <form onSubmit={form.handleSubmit(() => setSent(true))} noValidate>
            <FieldGroup className="gap-4">
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Issue category</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger aria-invalid={fieldState.invalid} className="h-10! w-full border-light-Grey">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="bookingRef"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="booking-ref">
                      Booking reference <span className="font-normal text-Text-body-text">(optional)</span>
                    </FieldLabel>
                    <Input {...field} id="booking-ref" placeholder="SFB-2026-XXXX" className="h-10 border-light-Grey" />
                  </Field>
                )}
              />

              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="issue">Describe your issue</FieldLabel>
                    <Textarea
                      {...field}
                      id="issue"
                      rows={4}
                      maxLength={1000}
                      placeholder="Please describe what happened and what help you need."
                      aria-invalid={fieldState.invalid}
                      className="border-light-Grey"
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit" className="mt-4 h-10 px-4">Send message</Button>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
