"use server";

import { cookies } from "next/headers";
import { HOST_STAGE_COOKIE, HOST_STAGES, HostStage } from "@/lib/dummy";

// Used by the overview's dev preview switcher; Next re-renders the page with the new stage
export async function setHostStage(formData: FormData) {
  const stage = formData.get("stage");
  if (!HOST_STAGES.includes(stage as HostStage)) return;
  (await cookies()).set(HOST_STAGE_COOKIE, stage as string, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
}
