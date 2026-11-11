"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Info } from "lucide-react";
import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import type { Bank } from "@/lib/api/types";
import { addPayoutMethod, verifyBankAccount } from "@/lib/payout/actions";
import SectionCard from "../section-card";
import BankFields, { AccountLookup, BankForm, bankDefaults, bankSchema } from "./bank-fields";

export default function AddBankForm({ banks }: { banks: Bank[] }) {
  const router = useRouter();
  const form = useForm<BankForm>({ resolver: zodResolver(bankSchema), defaultValues: bankDefaults });
  const [bankCode, accountNumber] = useWatch({ control: form.control, name: ["bank", "accountNumber"] });
  // The latest lookup result, tagged with the bank + number it was for
  const [result, setResult] = useState<{ key: string; status: AccountLookup }>({ key: "", status: "idle" });
  const complete = !!bankCode && /^\d{10}$/.test(accountNumber);
  const key = `${bankCode}:${accountNumber}`;
  const lookup: AccountLookup = !complete ? "idle" : result.key === key ? result.status : "resolving";

  // Look the account holder's name up as soon as the bank and all 10 digits are in
  useEffect(() => {
    form.setValue("accountName", "");
    if (!complete) return;
    let cancelled = false;
    verifyBankAccount(accountNumber, bankCode).then((res) => {
      if (cancelled) return;
      const name = res.ok ? res.data.account_name : "";
      if (name) form.setValue("accountName", name, { shouldValidate: true });
      setResult({ key, status: name ? "resolved" : "failed" });
    });
    return () => {
      cancelled = true;
    };
  }, [bankCode, accountNumber, complete, key, form]);

  const onSubmit = async ({ bank, accountNumber, accountName }: BankForm) => {
    const res = await addPayoutMethod({
      account_number: accountNumber,
      bank_code: bank,
      bank_name: banks.find((b) => b.code === bank)?.name ?? bank,
      account_name: accountName,
    });
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast("Bank account saved");
    router.refresh();
  };

  const submitting = form.formState.isSubmitting;

  return (
    <SectionCard>
      <h2 className="text-base md:text-lg font-medium text-Text-dark">Add your payout bank account</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="mt-4 gap-4">
          <BankFields control={form.control} banks={banks} lookup={lookup} />
        </FieldGroup>
        <p className="mt-4 flex gap-2 rounded-lg bg-primary-containers px-3 py-2.5 text-xs md:text-sm text-primary">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          Add your bank account now so SpaceFinda can release your payout automatically on the day your guest checks in. No action is needed from
          you after that.
        </p>
        <Button type="submit" disabled={submitting || lookup !== "resolved"} className="mt-5 h-10 rounded-lg px-5">
          {submitting ? "Saving..." : "Save your bank"}
        </Button>
      </form>
    </SectionCard>
  );
}
