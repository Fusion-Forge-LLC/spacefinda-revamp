"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MastercardLogo } from "@/components/dashboard/payment/card-brand-logo";
import { DUMMY_HOST_PAYOUT_ACCOUNTS, HostPayoutAccount } from "@/lib/dummy";
import type { BankForm } from "../payout/bank-fields";
import BankAccountModal from "./bank-account-modal";
import BankAddedModal from "./bank-added-modal";
import RemoveBankModal from "./remove-bank-modal";

const last4 = (accountNumber: string) => accountNumber.slice(-4);

export default function PayoutSettings() {
  // No payouts API yet, so changes only live for this visit. The first account is the one payouts go to
  const [accounts, setAccounts] = useState<HostPayoutAccount[]>(DUMMY_HOST_PAYOUT_ACCOUNTS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editing, setEditing] = useState<HostPayoutAccount | null>(null);
  const [removing, setRemoving] = useState<HostPayoutAccount | null>(null);
  const [added, setAdded] = useState<{ bank: string; last4: string } | null>(null);

  const addAccount = (values: BankForm) => {
    setAccounts((prev) => [...prev, { id: crypto.randomUUID(), ...values }]);
    setAdded({ bank: values.bank, last4: last4(values.accountNumber) });
  };

  const updateAccount = (values: BankForm) => {
    setAccounts((prev) => prev.map((a) => (a.id === editing?.id ? { ...a, ...values } : a)));
    toast("Bank account updated successfully");
  };

  const removeAccount = () => {
    setAccounts((prev) => prev.filter((a) => a.id !== removing?.id));
    toast("Bank account removed");
  };

  return (
    <div>
      <h2 className="text-lg md:text-xl font-medium text-Text-dark">Payout settings</h2>
      <p className="mt-1 text-sm text-Text-body-text">SpaceFinda pays out your 90% share within 24 hours of a completed booking.</p>

      <div className="mt-4 space-y-3 rounded-2xl border border-gray-100 bg-white p-3 md:p-4">
        {accounts.map((account, index) => (
          <div key={account.id} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3">
            <div className="flex w-10 shrink-0 flex-col items-center">
              <MastercardLogo className="h-6" />
              <span className="text-[8px] text-Text-body-text">mastercard</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 text-sm md:text-base font-medium text-Text-dark">
                {account.bank}
                {index === 0 && <span className="rounded-full bg-primary-containers px-2 py-0.5 text-xs font-normal text-primary">Active</span>}
              </p>
              <p className="mt-0.5 text-sm text-Text-body-text">**** **** {last4(account.accountNumber)}</p>
              <div className="mt-2 flex items-center gap-3">
                <Button variant="outline" onClick={() => setEditing(account)} className="h-7 rounded-md border-gray-200 px-2.5 text-xs">
                  Edit
                </Button>
                <button type="button" onClick={() => setRemoving(account)} className="text-xs text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-100 text-sm text-Text-dark hover:bg-text-Grey-Muted"
        >
          <Plus className="size-4" />
          Add a card
        </button>

        <div className="rounded-lg bg-primary-containers px-3 py-3">
          <p className="text-sm font-medium text-Text-dark">Payout schedule</p>
          <p className="mt-1 text-xs md:text-sm text-Text-body-text">
            Payouts are processed automatically within 24 hours of a completed booking. For bookings made on weekends, payouts are processed the
            following Monday.
          </p>
        </div>
      </div>

      <BankAccountModal open={isAddOpen} onOpenChange={setIsAddOpen} onSave={addAccount} />
      <BankAccountModal open={!!editing} onOpenChange={(open) => !open && setEditing(null)} account={editing ?? undefined} onSave={updateAccount} />
      <RemoveBankModal
        last4={removing ? last4(removing.accountNumber) : null}
        isPrimary={removing?.id === accounts[0]?.id}
        onOpenChange={(open) => !open && setRemoving(null)}
        onConfirm={removeAccount}
      />
      <BankAddedModal account={added} onOpenChange={(open) => !open && setAdded(null)} />
    </div>
  );
}
