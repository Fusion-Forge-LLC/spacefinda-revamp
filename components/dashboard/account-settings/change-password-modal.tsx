"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/modal/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/authentication/password-input";
import { passwordSchema } from "@/lib/utils";

const changePasswordSchema = z
  .object({
    current: z.string().min(1, "Enter your current password"),
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] })
  .refine((d) => d.password !== d.current, { message: "Use a different password from your current one", path: ["password"] });

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const FIELDS: { name: keyof ChangePasswordForm; label: string; placeholder: string }[] = [
  { name: "current", label: "Current password", placeholder: "Enter your current password" },
  { name: "password", label: "New password", placeholder: "Enter a new password" },
  { name: "confirm", label: "Confirm new password", placeholder: "Re-enter the new password" },
];

// No design for this yet; kept in the same style as the add-card modal
export default function ChangePasswordModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { current: "", password: "", confirm: "" },
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const onSubmit = () => {
    onOpenChange(false);
    toast("Password updated");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-104 gap-0 py-0">
        <div className="flex items-center justify-between px-4 md:px-5 pt-5">
          <DialogTitle className="text-lg md:text-xl font-semibold text-Text-dark">Change password</DialogTitle>
          <DialogClose className="flex size-7 items-center justify-center rounded-full bg-text-Grey-Muted text-Text-body-text">
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
        <DialogDescription className="px-4 md:px-5 mt-1 text-sm text-Text-body-text">
          You will need your current password to make changes.
        </DialogDescription>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="gap-4 px-4 md:px-5 py-5">
            {FIELDS.map(({ name, label, placeholder }) => (
              <Controller
                key={name}
                name={name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>{label}</FieldLabel>
                    <PasswordInput field={field} placeholder={placeholder} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            ))}
          </FieldGroup>

          <div className="flex items-center justify-between border-t border-light-Grey px-4 md:px-5 py-4">
            <DialogClose className="text-sm text-Text-dark underline underline-offset-2">Cancel</DialogClose>
            <Button type="submit" className="h-10 px-7">Update password</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
