"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { toast } from "sonner";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

interface FileDropzoneProps {
  file: File | null;
  onChange: (file: File | null) => void;
  icon: LucideIcon;
  title: string;
  hint: string;
  actionLabel?: string;
  capture?: "user" | "environment";
}

export default function FileDropzone({ file, onChange, icon: Icon, title, hint, actionLabel, capture }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = (selected?: File) => {
    if (!selected) return;
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      toast.error("Please upload a JPG or PNG image");
      return;
    }
    if (selected.size > MAX_SIZE) {
      toast.error("File is larger than 10MB");
      return;
    }
    onChange(selected);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
      className="flex min-h-63 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-Text-body-text px-4 py-8 text-center"
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        capture={capture}
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {previewUrl && file ? (
        <>
          <Image src={previewUrl} alt={title} width={240} height={160} unoptimized className="max-h-40 w-auto rounded-lg object-contain" />
          <p className="mt-3 text-sm text-Text-dark truncate max-w-full">{file.name}</p>
          <span className="mt-2 text-sm text-primary underline underline-offset-2">Replace</span>
        </>
      ) : (
        <>
          <Icon className="size-7 text-primary" />
          <p className="mt-3 text-base md:text-lg text-Text-dark">{title}</p>
          <p className="mt-1 text-xs md:text-sm text-Text-body-text">{hint}</p>
          {actionLabel && <span className="mt-4 text-sm md:text-base text-primary underline underline-offset-2">{actionLabel}</span>}
        </>
      )}
    </div>
  );
}
