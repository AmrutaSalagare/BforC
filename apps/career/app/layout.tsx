import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
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
  title: "BforC Careers :: Where Compassion Meets Career",
  description:
    "Find purpose-driven jobs at NGOs, social enterprises, and impact organisations across India. Women-friendly workplaces, flexible roles, and meaningful careers.",
  keywords: [
    "social impact jobs",
    "NGO careers",
    "women friendly jobs India",
    "purpose driven work",
    "BforC careers",
  ],
  openGraph: {
    title: "BforC Careers :: Where Compassion Meets Career",
    description:
      "Curated roles in social impact, NGOs, and purpose-driven organisations across India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} min-h-screen`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
