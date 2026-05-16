import { getCurrentSession } from "@/lib/auth/session";
import { Navbar } from "@/components/navbar";

export async function NavbarWrapper() {
  const session = await getCurrentSession();
  const user = session
    ? { role: (session.role ?? "seeker") as "seeker" | "employer" }
    : null;
  return <Navbar user={user} />;
}
