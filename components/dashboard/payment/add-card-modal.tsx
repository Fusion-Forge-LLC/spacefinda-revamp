"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { ShieldCheck, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MastercardLogo, VerveLogo, VisaLogo, detectCardBrand } from "./card-brand-logo";
import { SavedCard } from "@/lib/dummy";

const cardSchema = z.object({
  number: z.string().refine((v) => /^\d{16,19}$/.test(v.replace(/\s/g, "")), "Enter a valid card number"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY")
    .refine((v) => {
      const [mm, yy] = v.split("/").map(Number);
      return new Date(2000 + yy, mm) > new Date();
    }, "This card has expired"),
  cvv: z.string().regex(/^\d{3,4}$/, "Enter a valid CVV"),
  name: z.string().trim().min(2, "Enter the name on your card"),
});

type CardForm = z.infer<typeof cardSchema>;

const formatCardNumber = (value: string) =>
  value.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

interface AddCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (card: SavedCard) => void;
}

// UI only: nothing is sent anywhere. With the backend this will most likely be replaced by Paystack's own card popup
export default function AddCardModal({ open, onOpenChange, onSave }: AddCardModalProps) {
  const form = useForm<CardForm>({
    resolver: zodResolver(cardSchema),
    defaultValues: { number: "", expiry: "", cvv: "", name: "" },
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const onSubmit = (data: CardForm) => {
    const digits = data.number.replace(/\s/g, "");
    onSave({
      id: crypto.randomUUID(),
      brand: detectCardBrand(digits),
      last4: digits.slice(-4),
      expiry: data.expiry.replace("/", " / 20"),
      name: data.name.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-104 gap-0 py-0">
        <div className="flex items-center justify-between px-4 md:px-5 pt-5">
          <DialogTitle className="text-lg md:text-xl font-semibold text-Text-dark">Add new card</DialogTitle>
          <DialogClose className="flex size-7 items-center justify-center rounded-full bg-text-Grey-Muted text-Text-body-text">
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">Enter your card details to save a payment method</DialogDescription>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="px-4 md:px-5 pt-5 pb-5">
            <div className="flex items-center gap-3 mb-5">
              <MastercardLogo className="h-4" />
              <VisaLogo className="text-sm" />
              <VerveLogo className="text-sm" />
            </div>

            <FieldGroup className="gap-4">
              <Controller
                name="number"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="card-number">Card Number</FieldLabel>
                    <Input
                      {...field}
                      id="card-number"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      className="h-10 border-light-Grey"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <Controller
                  name="expiry"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="card-expiry">Expiring Date</FieldLabel>
                      <Input
                        {...field}
                        id="card-expiry"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        className="h-10 border-light-Grey"
                        aria-invalid={fieldState.invalid}
                        onChange={(e) => field.onChange(formatExpiry(e.target.value))}
                      />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="cvv"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="card-cvv">CVV</FieldLabel>
                      <Input
                        {...field}
                        id="card-cvv"
                        type="password"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        className="h-10 border-light-Grey"
                        aria-invalid={fieldState.invalid}
                        onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="card-name">Name of Card</FieldLabel>
                    <Input
                      {...field}
                      id="card-name"
                      autoComplete="cc-name"
                      placeholder="As it appears on your card"
                      className="h-10 border-light-Grey"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <p className="mt-5 flex items-start gap-2 rounded-lg border border-primary/10 bg-primary-containers p-3 text-xs md:text-sm text-primary">
              <ShieldCheck className="size-4 mt-0.5 shrink-0" />
              Your card details are handled securely by Paystack. SpaceFinda never stores or processes your payment
              information directly.
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-light-Grey px-4 md:px-5 py-4">
            <DialogClose className="text-sm text-Text-dark underline underline-offset-2">Cancel</DialogClose>
            <Button type="submit" className="h-10 px-7">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
