"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Camera, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface SelfieCameraProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

// Opens the front camera with getUserMedia. If the camera isn't available or permission is
// denied, it falls back to the native file input (which still opens the camera on most phones)
export default function SelfieCamera({ file, onChange }: SelfieCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsStreaming(false);
  };

  // Make sure the camera light goes off when leaving the step
  useEffect(() => stopCamera, []);

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      fallbackRef.current?.click();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      setIsStreaming(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      toast.error("We couldn't access your camera. Allow camera access or upload a photo instead.");
      fallbackRef.current?.click();
    }
  };

  const capture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Un-mirror so the saved photo matches what the ID shows
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        onChange(new File([blob], `selfie-${Date.now()}.jpg`, { type: "image/jpeg" }));
        stopCamera();
      },
      "image/jpeg",
      0.9
    );
  };

  const retake = () => {
    onChange(null);
    startCamera();
  };

  return (
    <div className="flex min-h-63 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-Text-body-text px-4 py-6 text-center">
      <input
        ref={fallbackRef}
        type="file"
        accept="image/jpeg,image/png"
        capture="user"
        className="hidden"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) onChange(selected);
          e.target.value = "";
        }}
      />

      {/* Kept mounted so the ref exists before the stream is attached */}
      <video
        ref={videoRef}
        playsInline
        muted
        className={isStreaming ? "w-full max-w-md aspect-4/3 rounded-lg bg-black object-cover -scale-x-100" : "hidden"}
      />

      {isStreaming ? (
        <div className="mt-4 flex gap-2">
          <Button variant="ghost" className="h-10 bg-text-Grey-Muted" onClick={stopCamera}>Cancel</Button>
          <Button className="h-10 px-5" onClick={capture}>
            <Camera />
            Capture
          </Button>
        </div>
      ) : previewUrl ? (
        <>
          <Image src={previewUrl} alt="Your selfie" width={320} height={240} unoptimized className="max-h-56 w-auto rounded-lg object-contain" />
          <button type="button" onClick={retake} className="mt-4 flex items-center gap-1.5 text-sm md:text-base text-primary underline underline-offset-2">
            <RotateCcw className="size-4" />
            Retake selfie
          </button>
        </>
      ) : (
        <button type="button" onClick={startCamera} className="flex flex-col items-center w-full py-10 cursor-pointer">
          <Camera className="size-7 text-primary" />
          <p className="mt-3 text-base md:text-lg text-Text-dark">Tap to take a selfie</p>
          <p className="mt-1 text-xs md:text-sm text-Text-body-text">Make sure you look directly at the camera</p>
        </button>
      )}
    </div>
  );
}
