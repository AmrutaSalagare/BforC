import { SmokeyBackground, LoginForm } from "@/components/ui/login-form";

export const metadata = {
  title: "Sign In - BforC Careers",
  description: "Sign in to BforC Careers to continue.",
};

export default function LoginPage() {
  return (
    <main className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[var(--background)] flex items-center justify-center">
      <SmokeyBackground
        className="absolute inset-0 pointer-events-auto"
        color="#a84370"
        backdropBlurAmount="2xl"
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <LoginForm />
      </div>
    </main>
  );
}
