"use server";

import { revalidatePath } from "next/cache";
import { getVerifiedAdminSession } from "@/lib/auth/admin";
import { getSupabaseConfig } from "@/lib/data/supabase";
import { isUuid, parseJobStatus } from "@/lib/validation";

export async function changeJobStatusAction(formData: FormData): Promise<void> {
  const session = await getVerifiedAdminSession();
  if (!session) return;

  const jobId = formData.get("job_id") as string;
  const newStatus = parseJobStatus(formData.get("status") as string);
  if (!jobId || !isUuid(jobId) || !newStatus) return;

  const config = getSupabaseConfig();
  if (!config.ok) return;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return;

  const res = await fetch(`${config.url}/rest/v1/jobs?id=eq.${jobId}`, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!res.ok) {
    return;
  }

  revalidatePath("/admin/jobs");
}
