"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InfoRowProps {
  label: string;
  placeholder: string;
  defaultValue?: string;
  type?: React.HTMLInputTypeAttribute;
}

export default function InfoRow({ label, placeholder, defaultValue = "", type = "text" }: InfoRowProps) {
  const [value, setValue] = useState(defaultValue);
  const [draft, setDraft] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);

  const save = () => {
    setValue(draft.trim());
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
        </div>
        {!isEditing && (
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
            placeholder={placeholder}
            className="h-10 flex-1"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" className="h-10" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button className="h-10" onClick={save}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
}
