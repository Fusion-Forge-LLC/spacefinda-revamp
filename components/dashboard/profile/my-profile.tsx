"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import PageHeading from "../page-heading";
import { DUMMY_USER } from "@/lib/dummy";
import { useAuth } from "@/components/authentication/auth-provider";
import { displayName, userName } from "@/lib/utils";
import { updateProfile } from "@/lib/auth/actions";

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

export interface ProfileStats {
  completedStays: number;
  nightsStayed: number;
  reviewsReceived: number;
}

export default function MyProfile({ stats }: { stats: ProfileStats }) {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const name = user ? displayName(user) : "";
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Uploads the photo through our /api/media proxy, then saves its url on the account
  const changePhoto = async (file?: File) => {
    if (!file || !user) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) return toast.error("Choose a JPG or PNG image");
    if (file.size > MAX_PHOTO_SIZE) return toast.error("Choose an image under 5MB");
    // The backend only saves to the user record when fullname or phone is sent along
    const anchor = user.fullname ? { fullname: user.fullname } : user.phone ? { phone: user.phone } : null;
    if (!anchor) {
      // Only older accounts hit this: new sign-ups save a name, and the backend needs one to store the photo
      return toast.error("Add your name first so we can save your photo", {
        action: { label: "Add name", onClick: () => router.push("/dashboard/personal-details") },
      });
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("images", file);
      const res = await fetch("/api/media", { method: "POST", body });
      const json = await res.json().catch(() => null);
      const url: string | undefined = json?.data?.uploadedImages?.[0]?.url;
      if (!res.ok || !url) throw new Error(json?.message || "Upload failed");

      const saved = await updateProfile({ ...anchor, avatarUrl: url });
      if (!saved.ok) throw new Error(saved.message);
      if (saved.data) setUser(saved.data);
      toast.success("Profile photo updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update your photo");
    } finally {
      setUploading(false);
    }
  };
  const [bio, setBio] = useState(DUMMY_USER.bio);
  const [draft, setDraft] = useState(bio);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const saveBio = () => {
    setBio(draft.trim());
    setIsEditingBio(false);
    toast.success("Bio updated");
  };

  return (
    <div className="max-w-207">
      <PageHeading
        title="My profile"
        description="This is your public profile. Hosts see this when you request a booking."
      />

      <div className="rounded-2xl border border-light-Grey p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <Avatar className="size-16">
              {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt={name} />}
              <AvatarFallback>{name.charAt(0).toUpperCase() || "?"}</AvatarFallback>
            </Avatar>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={(e) => {
                changePhoto(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-md bg-text-Grey-Muted px-2 py-0.5 text-xs text-Text-body-text disabled:opacity-60"
            >
              <Camera className="size-3" />
              {uploading ? "..." : "Edit"}
            </button>
          </div>
          <div>
            {/* Name on top, email under it; without a saved name only the email shows */}
            <p className="text-lg font-medium text-Text-dark">{user && userName(user) ? userName(user) : user?.email}</p>
            {user && userName(user) && <p className="text-sm md:text-base text-Text-body-text">{user.email}</p>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 md:gap-3">
          {[
            { label: "Completed stays", value: stats.completedStays },
            { label: "Nights stayed", value: stats.nightsStayed },
            { label: "Reviews received", value: stats.reviewsReceived },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-text-Grey-Muted px-2 py-4 text-center">
              <p className="text-lg font-medium text-Text-dark">{stat.value}</p>
              <p className="mt-1 text-xs md:text-base text-Text-body-text">{stat.label}</p>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="px-1.5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm md:text-base text-Text-dark">About me</p>
              {!isEditingBio && (
                <p className="mt-2 text-sm md:text-base text-Text-body-text">
                  {bio || "No bio added yet. A short introduction helps hosts feel confident welcoming you."}
                </p>
              )}
            </div>
            {!isEditingBio && (
              <button
                type="button"
                onClick={() => { setDraft(bio); setIsEditingBio(true); }}
                className="self-center text-sm md:text-base text-primary underline underline-offset-2"
              >
                Edit
              </button>
            )}
          </div>

          {isEditingBio && (
            <div className="mt-3 space-y-3">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Tell hosts a little about yourself"
                rows={4}
                maxLength={500}
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsEditingBio(false)}>Cancel</Button>
                <Button onClick={saveBio}>Save</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-light-Grey p-4 md:p-6">
        <h2 className="text-lg font-medium text-Text-dark mb-5">Review from hosts</h2>
        {/* No reviews endpoint yet, so there's nothing real to list */}
        <p className="text-sm md:text-base text-Text-body-text">
          No reviews from hosts yet. After each completed stay, your host can leave a review here.
        </p>
      </div>
    </div>
  );
}
