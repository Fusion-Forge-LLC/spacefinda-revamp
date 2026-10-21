"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Info } from "lucide-react";
import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import SectionCard from "../section-card";
import BankFields, { BankForm, bankDefaults, bankSchema } from "./bank-fields";

export default function AddBankForm() {
  const form = useForm<BankForm>({ resolver: zodResolver(bankSchema), defaultValues: bankDefaults });

  // No payouts API yet
  const onSubmit = () => toast("Bank account saved");

  return (
    <SectionCard>
      <h2 className="text-base md:text-lg font-medium text-Text-dark">Add your payout bank account</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="mt-4 gap-4">
          <BankFields control={form.control} />
        </FieldGroup>
        <p className="mt-4 flex gap-2 rounded-lg bg-primary-containers px-3 py-2.5 text-xs md:text-sm text-primary">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          Add your bank account now so SpaceFinda can release your payout automatically on the day your guest checks in. No action is needed from
          you after that.
        </p>
        <Button type="submit" className="mt-5 h-10 rounded-lg px-5">
          Save your bank
        </Button>
      </form>
    </SectionCard>
  );
}
