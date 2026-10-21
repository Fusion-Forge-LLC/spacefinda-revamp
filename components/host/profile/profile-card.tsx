"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileCardProps {
  name: string;
  avatar: string;
  location: string;
  stats: { label: string; value: React.ReactNode }[];
}

export default function ProfileCard({ name, avatar, location, stats }: ProfileCardProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState(avatar);

  // No upload API yet, so preview the picked file locally and free the object URL when it is replaced
  useEffect(() => {
    if (!photo.startsWith("blob:")) return;
    return () => URL.revokeObjectURL(photo);
  }, [photo]);

  const changePhoto = (file: File) => {
    setPhoto(URL.createObjectURL(file));
    toast("Profile photo updated");
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
      <Avatar className="mx-auto size-14">
        <AvatarImage src={photo} alt={name} className="object-cover" />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <p className="mt-3 text-base md:text-lg font-medium text-Text-dark">{name}</p>
      <p className="mt-1 text-xs md:text-sm text-Text-body-text">Owner · {location}</p>

      <Button variant="ghost" onClick={() => fileRef.current?.click()} className="mt-4 h-9 w-full bg-text-Grey-Muted text-Text-dark">
        Change photo
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) changePhoto(file);
          e.target.value = "";
        }}
      />

      <div className="mt-4 grid grid-cols-3 border-t border-gray-100 pt-4">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <p className="text-sm md:text-base font-medium text-Text-dark">{value}</p>
            <p className="mt-1 text-xs text-Text-body-text">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
