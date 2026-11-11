"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/authentication/auth-provider";
import { updateProfile } from "@/lib/auth/actions";

interface InfoRowProps {
  label: string;
  placeholder: string;
  defaultValue?: string;
  type?: React.HTMLInputTypeAttribute;
  // Saved to the account through PATCH /user/profile; rows without it only change on this page
  field?: "fullname" | "phone";
  // No Edit button (e.g. email, which has no change endpoint yet)
  readOnly?: boolean;
  note?: string;
}

// Letters (any language), spaces, hyphens, apostrophes and full stops, at least two characters
const NAME_PATTERN = /^\p{L}[\p{L}\s'.-]*\p{L}$/u;
const PHONE_PATTERN = /^\+?[\d\s-]{7,16}$/;

function validate(field: InfoRowProps["field"], value: string) {
  if (field === "fullname" && !NAME_PATTERN.test(value)) return "Use letters only, e.g. Ada Obi";
  if (field === "phone" && !PHONE_PATTERN.test(value)) return "Enter a valid phone number, e.g. +234 801 234 5678";
  return null;
}

export default function InfoRow({ label, placeholder, defaultValue = "", type = "text", field, readOnly, note }: InfoRowProps) {
  const { setUser } = useAuth();
  const [value, setValue] = useState(defaultValue);
  const [draft, setDraft] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    const next = draft.trim();
    if (field) {
      if (!next) {
        toast.error(`Enter your ${label.toLowerCase()}`);
        return;
      }
      const problem = validate(field, next);
      if (problem) {
        toast.error(problem);
        return;
      }
      setSaving(true);
      const res = await updateProfile({ [field]: next });
      setSaving(false);
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      if (res.data) setUser(res.data);
    }
    setValue(next);
    setIsEditing(false);
    toast.success(`${label} updated`);
  };

  return (
    <div className="py-5 border-b border-light-Grey last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm md:text-base text-Text-dark">{label}</p>
          {!isEditing && (
            <p className="mt-2 text-sm md:text-base text-Text-body-text truncate">{value || placeholder}</p>
          )}
          {note && !isEditing && <p className="mt-1 text-xs text-Text-body-text">{note}</p>}
        </div>
        {!isEditing && !readOnly && (
          <button
            type="button"
            onClick={() => { setDraft(value); setIsEditing(true); }}
            className="text-sm md:text-base text-primary underline underline-offset-2 shrink-0"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing && (
        <div className="mt-3 flex flex-col md:flex-row gap-2">
          <Input
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            placeholder={placeholder}
            className="h-10 flex-1"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" className="h-10" onClick={() => setIsEditing(false)} disabled={saving}>Cancel</Button>
            <Button className="h-10" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
