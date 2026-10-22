"use client";

import React, { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CircleAlert, FileUp, ShieldCheck, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import BankFields, { bankDefaults, bankSchema } from "./bank-fields";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const changeSchema = bankSchema.extend({
  phone: z.string().regex(/^\d{10}$/, "Enter your 10-digit phone number without the leading 0"),
  document: z
    .instanceof(File, { message: "Upload a bank document or government ID" })
    .refine((f) => ACCEPTED_TYPES.includes(f.type), "Upload a PDF, JPG or PNG")
    .refine((f) => f.size <= MAX_FILE_SIZE, "File must be 10MB or smaller"),
});

type ChangeForm = z.infer<typeof changeSchema>;

export default function BankChangeModal({
  open,
  onOpenChange,
  onSubmitted,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const form = useForm<ChangeForm>({
    resolver: zodResolver(changeSchema),
    defaultValues: { ...bankDefaults, phone: "" },
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const onSubmit = () => {
    onOpenChange(false);
    onSubmitted();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-160 max-h-[90dvh] gap-0 overflow-y-auto p-0">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 md:px-5">
          <DialogTitle className="text-lg md:text-xl font-semibold text-Text-dark">Bank account change</DialogTitle>
          <DialogClose className="flex size-7 items-center justify-center rounded-full bg-text-Grey-Muted text-Text-body-text">
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="px-4 py-5 md:px-5">
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
              <p className="flex items-center gap-2 text-sm text-Text-dark">
                <ShieldCheck className="size-4 text-amber-700" />
                Why we review this manually
              </p>
              <DialogDescription className="mt-1 text-xs leading-5 text-amber-800">
                Bank account changes are one of the most common ways earnings are stolen from platform owners. SpaceFinda verifies every change
                request against your BVN and identity before updating your payout account. This protects you.
              </DialogDescription>
            </div>

            <FieldGroup className="mt-5 gap-4">
              <BankFields control={form.control} />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirm your registered phone number</FieldLabel>
                    <div className="flex h-11 items-center overflow-hidden rounded-lg border border-input focus-within:border-ring">
                      <span className="flex h-full shrink-0 items-center gap-2 whitespace-nowrap border-r border-input bg-[#F7F7F7] px-3 text-sm font-medium text-Text-dark">
                        <svg viewBox="0 0 3 2" className="h-3.5 w-5 rounded-[3px] ring-1 ring-black/10" aria-hidden="true">
                          <rect width="3" height="2" fill="#008751" />
                          <rect x="1" width="1" height="2" fill="#FFFFFF" />
                        </svg>
                        +234
                      </span>
                      <Input
                        {...field}
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="000 000 0000"
                        aria-invalid={fieldState.invalid}
                        onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                        className="h-full border-0 shadow-none focus-visible:ring-0"
                      />
                    </div>
                    {fieldState.error ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription className="text-xs">This confirms you are the account holder making this request.</FieldDescription>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="document"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className={cn(
                        "flex flex-col items-center rounded-xl border border-dashed px-4 py-10 text-center",
                        fieldState.invalid ? "border-destructive" : "border-gray-300"
                      )}
                    >
                      <FileUp className="size-5 text-Text-dark" strokeWidth={1.5} />
                      <span className="mt-3 text-sm font-medium text-Text-dark">{field.value?.name ?? "Upload bank document or Government ID"}</span>
                      <span className="mt-1 text-xs text-Text-body-text">PDF, JPG or PNG · Max 10MB · Must clearly show your name</span>
                      <span className="mt-3 text-sm text-primary">{field.value ? "Replace file" : "Tap to upload"}</span>
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) field.onChange(file);
                        e.target.value = "";
                      }}
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <p className="mt-4 flex gap-2 rounded-lg bg-text-Grey-Muted px-3 py-2.5 text-xs leading-5 text-Text-body-text">
              <CircleAlert className="mt-0.5 size-3.5 shrink-0" />
              By submitting this request you confirm that the new account details belong to you personally and match your SpaceFinda identity.
              Submitting false details may result in account suspension and reporting to relevant authorities.
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-4 md:px-5">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="h-10 bg-text-Grey-Muted px-5">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="h-10 px-6">
              Submit request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
