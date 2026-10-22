"use client";

import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import * as z from "zod";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NIGERIAN_BANKS } from "@/lib/dummy";

export const bankSchema = z.object({
  bank: z.string().min(1, "Select your bank"),
  accountNumber: z.string().regex(/^\d{10}$/, "Enter your 10-digit account number"),
  accountName: z.string().trim().min(2, "Enter the name on your account"),
});

export type BankForm = z.infer<typeof bankSchema>;

export const bankDefaults: BankForm = { bank: "", accountNumber: "", accountName: "" };

// Bank, account number and account name fields, shared by the add-bank form and the change-request modal
export default function BankFields<T extends FieldValues & BankForm>({ control }: { control: Control<T> }) {
  return (
    <>
      <Controller
        name={"bank" as Path<T>}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Bank name</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger aria-invalid={fieldState.invalid} className="h-11! w-full rounded-lg">
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent position="popper">
                {NIGERIAN_BANKS.map((bank) => (
                  <SelectItem key={bank} value={bank}>
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          name={"accountNumber" as Path<T>}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Account number</FieldLabel>
              <Input
                {...field}
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit account number"
                aria-invalid={fieldState.invalid}
                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                className="h-11 rounded-lg"
              />
              {fieldState.error ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription className="text-xs">Will auto-fill from your account number in production.</FieldDescription>
              )}
            </Field>
          )}
        />
        <Controller
          name={"accountName" as Path<T>}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Account name</FieldLabel>
              <Input {...field} placeholder="As it appears on your account" aria-invalid={fieldState.invalid} className="h-11 rounded-lg" />
              {fieldState.error ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription className="text-xs">This must exactly match the name on your bank account.</FieldDescription>
              )}
            </Field>
          )}
        />
      </div>
    </>
  );
}
