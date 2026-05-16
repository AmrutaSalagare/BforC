import { AnimatedBackground } from "@/components/animated-background";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollProgressBar } from "@/components/motion";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import { Footer } from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <AnimatedBackground />
      <ScrollProgressBar />
      <NavbarWrapper />
      {children}
      <Footer />
    </LenisProvider>
  );
}
