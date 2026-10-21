import { cookies } from "next/headers";
import { DUMMY_HOST, getHostStageFlags, HOST_STAGE_COOKIE, HOST_STAGES, HostStage } from "@/lib/dummy";

// The overview's stage for this request: the preview switcher's cookie if set, otherwise the dummy default
export async function getHostStage() {
  const value = (await cookies()).get(HOST_STAGE_COOKIE)?.value;
  const stage = HOST_STAGES.includes(value as HostStage) ? (value as HostStage) : DUMMY_HOST.stage;
  return { stage, ...getHostStageFlags(stage) };
}
