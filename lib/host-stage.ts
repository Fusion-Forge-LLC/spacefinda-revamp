import { cookies } from "next/headers";
import { getHostStageFlags, HOST_STAGE_COOKIE, HOST_STAGES, HostStage } from "@/lib/dummy";

// The overview's stage for this request: the preview switcher's cookie if set, otherwise the stage
// worked out from the host's real listings
export async function getHostStage(fallback: HostStage) {
  const value = (await cookies()).get(HOST_STAGE_COOKIE)?.value;
  const stage = HOST_STAGES.includes(value as HostStage) ? (value as HostStage) : fallback;
  return { stage, ...getHostStageFlags(stage) };
}
