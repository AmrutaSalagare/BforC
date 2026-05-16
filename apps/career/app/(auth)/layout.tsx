import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCurrentSession } from "@/lib/auth/session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  if (session) redirect("/");

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo_bforc.png"
            alt="BforC Careers"
            width={140}
            height={40}
            className="h-9 w-auto mix-blend-multiply contrast-125"
            priority
          />
        </Link>
        <Link
          href="/"
          className="text-sm text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors duration-200"
        >
          ← Back to home
        </Link>
      </header>
      {children}
    </>
  );
}
