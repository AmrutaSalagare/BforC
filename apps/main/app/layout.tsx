import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, DM_Sans } from "next/font/google";
import { AnimatedBackground } from "@/components/animated-background";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollProgressBar } from "@/components/motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BforC — Where Compassion Meets Career",
  description:
    "A women-led social impact organisation bridging global insight with local change.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} min-h-screen`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <LenisProvider>
          <AnimatedBackground />
          <ScrollProgressBar />
          <Header />
          <main className="flex-1 flex flex-col pt-16">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}

