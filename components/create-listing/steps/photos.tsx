"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CircleAlert, ImageIcon, Loader, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import StepHeading from "../step-heading";
import { ListingPhoto, RECOMMENDED_PHOTOS, StepProps } from "../types";

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

// Drops invalid files with a toast and wraps the rest with a preview URL
const toPhotos = (files: FileList | null): ListingPhoto[] => {
  if (!files) return [];
  const valid: ListingPhoto[] = [];
  for (const file of Array.from(files)) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error(`${file.name} is not a JPG or PNG image`);
    } else if (file.size > MAX_SIZE) {
      toast.error(`${file.name} is larger than 5MB`);
    } else {
      valid.push({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) });
    }
  }
  return valid;
};

export default function PhotosStep({ draft, update }: StepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [queue, setQueue] = useState<ListingPhoto[]>([]);
  const [uploaded, setUploaded] = useState(0);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const { photos } = draft;

  // There's no upload API yet, so fake the progress one photo at a time before adding them to the draft
  useEffect(() => {
    if (!queue.length) return;
    const timer = setTimeout(() => {
      if (uploaded + 1 < queue.length) {
        setUploaded(uploaded + 1);
      } else {
        update({ photos: [...photos, ...queue] });
        setQueue([]);
        setUploaded(0);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [queue, uploaded, photos, update]);

  const addFiles = (files: FileList | null) => {
    const added = toPhotos(files);
    if (added.length) setQueue(added);
  };

  const removePhoto = (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (photo) URL.revokeObjectURL(photo.url);
    update({ photos: photos.filter((p) => p.id !== id) });
  };

  const movePhoto = (from: number, to: number) => {
    if (from === to) return;
    const next = [...photos];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    update({ photos: next });
  };

  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      multiple
      accept={ACCEPTED_TYPES.join(",")}
      className="hidden"
      onChange={(e) => {
        addFiles(e.target.files);
        e.target.value = "";
      }}
    />
  );

  if (queue.length) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center text-center" aria-live="polite">
        <p className="max-w-52 text-base text-Text-dark">Hold on, we&apos;re arranging your photos to show off your space</p>
        <p className="mt-2 text-sm text-Text-body-text">
          {uploaded} of {queue.length} uploaded
        </p>
        <Loader className="mt-6 size-8 animate-spin text-light-Grey" />
      </div>
    );
  }

  if (!photos.length) {
    return (
      <>
        <StepHeading title="Add photos of your space">
          Great photos are the single biggest factor in a renter&apos;s decision. Add at least {RECOMMENDED_PHOTOS} clear photos. The
          first photo becomes your listing cover.
        </StepHeading>

        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
          className="flex min-h-72 md:min-h-92 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-Text-body-text px-4 py-8 text-center"
        >
          {fileInput}
          <ImageIcon className="size-9 text-Text-body-text" strokeWidth={1.25} />
          <p className="mt-4 text-base text-Text-dark">Upload your photos here</p>
          <p className="mt-2 text-sm text-Text-body-text">JPG or PNG — maximum 5MB each.</p>
          <span className="mt-6 text-sm md:text-base text-primary underline underline-offset-2">Upload from your device</span>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-[#9A7B3F]/15 bg-[#F7F4EC] p-3 text-sm md:text-base text-[#9A7B3F]">
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          Shoot in natural daylight. Include living area, bedroom, kitchen, bathroom, and the compound. Listings with 10 or
          more photos receive significantly more bookings.
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg md:text-xl font-medium text-Text-dark">Your photos</h1>
          <p className="mt-1 text-sm text-Text-body-text">Drag to re-order. The first photo becomes your listing cover.</p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-Text-body-text px-3 py-2 text-sm text-Text-dark hover:bg-text-Grey-Muted/50"
        >
          <Plus className="size-4" strokeWidth={1.5} />
          Add photos
        </button>
        {fileInput}
      </div>

      <ul className="grid grid-cols-2 gap-2">
        {photos.map((photo, index) => (
          <li
            key={photo.id}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex !== null) movePhoto(dragIndex, index);
              setDragIndex(null);
            }}
            onDragEnd={() => setDragIndex(null)}
            className={cn(
              "group relative cursor-grab overflow-hidden bg-text-Grey-Muted active:cursor-grabbing",
              index === 0 ? "col-span-2 aspect-6/5" : "aspect-6/5",
              dragIndex === index && "opacity-50"
            )}
          >
            <Image src={photo.url} alt={`Listing photo ${index + 1}`} fill unoptimized className="object-cover pointer-events-none" />
            {index === 0 && (
              <span className="absolute left-2 top-2 rounded-md bg-primary-containers px-2 py-1 text-xs font-medium text-primary">Cover photo</span>
            )}
            <button
              type="button"
              aria-label={`Remove photo ${index + 1}`}
              onClick={() => removePhoto(photo.id)}
              className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-white/90 text-Text-dark opacity-0 shadow-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100 max-md:opacity-100"
            >
              <X className="size-4" />
            </button>
          </li>
        ))}
        <li className="aspect-6/5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex size-full flex-col items-center justify-center gap-2 border border-dashed border-Text-body-text text-sm text-Text-body-text hover:bg-text-Grey-Muted/50"
          >
            <Plus className="size-5" strokeWidth={1.5} />
            Add more
          </button>
        </li>
      </ul>
    </>
  );
}
