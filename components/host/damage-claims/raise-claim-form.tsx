"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { Info, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BackButton from "@/components/dashboard/back-button";
import CharCount from "@/components/create-listing/char-count";
import { cn } from "@/lib/utils";
import { DUMMY_CLAIMABLE_BOOKINGS } from "@/lib/dummy";

const DESCRIPTION_MAX = 500;
const MAX_PHOTOS = 10;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

const claimSchema = z.object({
  booking: z.string().min(1, "Select the booking you're claiming against"),
  description: z.string().trim().min(10, "Describe the damage in a bit more detail").max(DESCRIPTION_MAX),
  amount: z.number({ message: "Enter the estimated damage amount" }).positive("Enter the estimated damage amount"),
  photos: z
    .array(z.object({ file: z.instanceof(File), url: z.string() }))
    .min(1, "Add at least one photo of the damage")
    .max(MAX_PHOTOS, `You can add up to ${MAX_PHOTOS} photos`),
});

type ClaimForm = z.infer<typeof claimSchema>;

export default function RaiseClaimForm() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const form = useForm<ClaimForm>({
    resolver: zodResolver(claimSchema),
    defaultValues: { booking: "", description: "", amount: undefined, photos: [] },
  });
  const description = useWatch({ control: form.control, name: "description" });

  // Free the preview urls when leaving the page
  useEffect(() => () => form.getValues("photos").forEach((p) => URL.revokeObjectURL(p.url)), [form]);

  // No API yet, so the new claim isn't added to the list
  const onSubmit = () => {
    toast("Claim submitted. Our team will review within 24 hours");
    router.push("/host/damage-claims?tab=active");
  };

  return (
    <div className="mx-auto max-w-230">
      <BackButton href="/host/damage-claims?tab=active" label="Back to active damage" className="text-sm" />

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-6">
        <FieldGroup className="gap-6">
          <Controller
            name="booking"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Booking to claim against</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger aria-invalid={fieldState.invalid} className="h-11! w-full rounded-lg">
                    <SelectValue placeholder="Select a recent completed booking" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {DUMMY_CLAIMABLE_BOOKINGS.map((b) => (
                      <SelectItem key={b.ref} value={b.ref}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription className="text-xs">Only bookings within 48 hours of checkout are eligible.</FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Describe the damage</FieldLabel>
                <Textarea
                  {...field}
                  maxLength={DESCRIPTION_MAX}
                  aria-invalid={fieldState.invalid}
                  placeholder="Describe exactly what was damaged, where it is in the property, and an estimation of the repair or replacement cost..."
                  className="min-h-30 shadow-none placeholder:text-Grey-Pure-White"
                />
                <div className="flex justify-between gap-3">
                  {fieldState.error ? <FieldError errors={[fieldState.error]} /> : <span />}
                  <CharCount value={description} max={DESCRIPTION_MAX} />
                </div>
              </Field>
            )}
          />

          <Controller
            name="amount"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Estimated damage amount</FieldLabel>
                <div className="flex h-11 items-center rounded-lg border border-input px-3 focus-within:border-ring">
                  <span className="text-sm text-Text-body-text">₦</span>
                  <Input
                    inputMode="numeric"
                    placeholder="0"
                    aria-invalid={fieldState.invalid}
                    value={field.value ? field.value.toLocaleString("en-NG") : ""}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      field.onChange(digits ? Number(digits) : undefined);
                    }}
                    onBlur={field.onBlur}
                    className="h-full border-0 shadow-none focus-visible:ring-0"
                  />
                </div>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="photos"
            control={form.control}
            render={({ field, fieldState }) => {
              const addFiles = (files: FileList | null) => {
                const valid: { file: File; url: string }[] = [];
                for (const file of Array.from(files ?? [])) {
                  if (!ACCEPTED_TYPES.includes(file.type)) toast.error(`${file.name} is not a JPG or PNG image`);
                  else if (file.size > MAX_PHOTO_SIZE) toast.error(`${file.name} is larger than 5MB`);
                  else valid.push({ file, url: URL.createObjectURL(file) });
                }
                const next = [...field.value, ...valid];
                if (next.length > MAX_PHOTOS) {
                  toast.error(`You can add up to ${MAX_PHOTOS} photos`);
                  next.slice(MAX_PHOTOS).forEach((p) => URL.revokeObjectURL(p.url));
                }
                field.onChange(next.slice(0, MAX_PHOTOS));
              };

              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Photo evidence<span className="text-red-600">*</span>
                  </FieldLabel>
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    accept={ACCEPTED_TYPES.join(",")}
                    className="hidden"
                    onChange={(e) => {
                      addFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />

                  {field.value.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
                      {field.value.map((photo) => (
                        <div key={photo.url} className="relative aspect-square overflow-hidden rounded-lg bg-text-Grey-Muted">
                          <Image src={photo.url} alt={photo.file.name} fill unoptimized className="object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              URL.revokeObjectURL(photo.url);
                              field.onChange(field.value.filter((p) => p.url !== photo.url));
                            }}
                            aria-label={`Remove ${photo.file.name}`}
                            className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-white/90 text-Text-dark"
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {field.value.length < MAX_PHOTOS && (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        addFiles(e.dataTransfer.files);
                      }}
                      className={cn(
                        "flex flex-col items-center rounded-xl border border-dashed px-4 text-center",
                        field.value.length ? "py-6" : "py-16 md:py-20",
                        fieldState.invalid ? "border-destructive" : "border-gray-400"
                      )}
                    >
                      <Upload className="size-5 text-Text-body-text" strokeWidth={1.5} />
                      <span className="mt-3 text-sm md:text-base text-Text-dark">{field.value.length ? "Add more photos" : "Upload damage photos"}</span>
                      <span className="mt-1 text-xs text-Text-body-text">1 to 10 photos · JPG or PNG · Max 5MB each · Must be taken after checkout</span>
                    </button>
                  )}
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              );
            }}
          />
        </FieldGroup>

        <p className="mt-6 flex gap-2 rounded-lg border border-blue-100 bg-primary-containers px-3 py-2.5 text-xs md:text-sm leading-5 text-primary">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          SpaceFinda will review your claim within 24 hours. The caution fee for this booking remains held until the claim is resolved. The renter
          will be given an opportunity to respond. SpaceFinda&apos;s decision is final.
        </p>

        <div className="mt-6 flex justify-end">
          <Button type="submit" className="h-10 md:h-11 rounded-lg px-5">
            Submit damage claim
          </Button>
        </div>
      </form>
    </div>
  );
}
