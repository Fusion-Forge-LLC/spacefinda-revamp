"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import BankFields, { BankForm, bankDefaults, bankSchema } from "../payout/bank-fields";
import SettingsDialog, { SettingsDialogFooter } from "./settings-dialog";

const COPY = {
  add: {
    title: "Add bank account",
    description: "Enter your Nigerian bank details for payouts. Account must be in your name.",
    submit: "Add bank account",
  },
  edit: {
    title: "Edit bank account",
    description: "Update your payout bank details. Changes take effect on the next payout.",
    submit: "Save changes",
  },
};

// Add a payout account, or edit `account` when one is passed
export default function BankAccountModal({
  open,
  onOpenChange,
  account,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account?: BankForm;
  onSave: (values: BankForm) => void;
}) {
  const copy = COPY[account ? "edit" : "add"];
  const form = useForm<BankForm>({ resolver: zodResolver(bankSchema), defaultValues: bankDefaults });

  useEffect(() => {
    if (open) form.reset(account ?? bankDefaults);
  }, [open, account, form]);

  const onSubmit = (values: BankForm) => {
    onOpenChange(false);
    onSave(values);
  };

  return (
    <SettingsDialog open={open} onOpenChange={onOpenChange} title={copy.title} description={copy.description}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-4 px-4 py-5 md:px-5">
          <BankFields control={form.control} />
        </FieldGroup>
        <SettingsDialogFooter>
          <Button type="submit" className="h-10 px-4">
            {copy.submit}
          </Button>
        </SettingsDialogFooter>
      </form>
    </SettingsDialog>
  );
}
