"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { TriangleAlert, User, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CharCount from "@/components/create-listing/char-count";
import type { HostConversation } from "@/lib/dummy";

const DESCRIPTION_MAX = 500;

const PROBLEM_TYPES = [
  "Inappropriate or abusive messages",
  "Request to pay or chat off SpaceFinda",
  "Suspected fraud or scam",
  "Safety concern",
  "Issue with the booking",
  "Something else",
];

const reportSchema = z.object({
  type: z.string().min(1, "Select a problem type"),
  description: z.string().trim().min(1, "Describe the problem").max(DESCRIPTION_MAX),
});

type ReportForm = z.infer<typeof reportSchema>;

export default function ReportProblemModal({
  open,
  onOpenChange,
  conversation,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conversation: HostConversation;
}) {
  const form = useForm<ReportForm>({
    resolver: zodResolver(reportSchema),
    defaultValues: { type: "", description: "" },
  });
  const [type, description] = useWatch({ control: form.control, name: ["type", "description"] });

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  // No API yet, so the report only confirms with a toast
  const onSubmit = () => {
    onOpenChange(false);
    toast("Report submitted. The SpaceFinda team will review it shortly");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-140 max-h-[90dvh] gap-0 overflow-y-auto p-0">
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-4 py-4 md:px-5">
          <div>
            <DialogTitle className="text-lg md:text-xl font-semibold text-Text-dark">Report a problem</DialogTitle>
            <DialogDescription className="mt-1 text-xs md:text-sm text-Text-body-text">This will be reviewed by the SpaceFinda team.</DialogDescription>
          </div>
          <DialogClose className="flex size-7 shrink-0 items-center justify-center rounded-full bg-text-Grey-Muted text-Text-body-text">
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="px-4 py-5 md:px-5">
            <p className="inline-flex items-center gap-1.5 rounded-lg bg-text-Grey-Muted px-2.5 py-1.5 text-xs text-Text-body-text">
              <User className="size-3.5" />
              Reporting about:
              <span className="text-Text-dark">
                {conversation.renter.name} · {conversation.booking.ref}
              </span>
            </p>

            <FieldGroup className="mt-4 gap-4">
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Problem type<span className="text-red-600">*</span>
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger aria-invalid={fieldState.invalid} className="h-11! w-full rounded-lg">
                        <SelectValue placeholder="Select a category..." />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {PROBLEM_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Description<span className="text-red-600">*</span>
                    </FieldLabel>
                    <Textarea
                      {...field}
                      maxLength={DESCRIPTION_MAX}
                      aria-invalid={fieldState.invalid}
                      placeholder="Please describe the problem in as much detail as possible..."
                      className="min-h-30 shadow-none placeholder:text-Grey-Pure-White"
                    />
                    <div className="flex justify-between gap-3">
                      {fieldState.error ? <FieldError errors={[fieldState.error]} /> : <span />}
                      <CharCount value={description} max={DESCRIPTION_MAX} />
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>

            <p className="mt-4 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-800">
              <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
              The SpaceFinda team may reach out to request screenshots or additional evidence to support your report.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 px-4 pb-4 md:px-5 md:pb-5">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="h-10 bg-text-Grey-Muted">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!type || !description.trim()} className="h-10 disabled:bg-primary/10 disabled:text-white disabled:opacity-100">
              Submit report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
