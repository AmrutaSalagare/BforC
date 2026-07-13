import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { EmployerDashboardShell } from "@/components/employer-dashboard-shell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }
  if (session.role !== "employer") {
    redirect("/dashboard");
  }

  return <EmployerDashboardShell>{children}</EmployerDashboardShell>;
}
