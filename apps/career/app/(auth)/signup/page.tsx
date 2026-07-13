import { SmokeyBackground, SignupForm } from "@/components/ui/login-form";

export const metadata = {
  title: "Sign Up",
  description: "Create an account on BforC Careers to apply for jobs and make an impact.",
};

export default function SignupPage() {
  return (
    <main className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[var(--background)] flex items-center justify-center">
      <SmokeyBackground
        className="absolute inset-0 pointer-events-auto"
        color="#a84370"
        backdropBlurAmount="2xl"
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <SignupForm />
      </div>
    </main>
  );
}
