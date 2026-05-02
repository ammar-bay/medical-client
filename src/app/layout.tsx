import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Irfan Ahmad — Consultant Nephrologist, Lahore",
  description:
    "Book an appointment with Dr. Irfan Ahmad, Consultant Physician, Nephrologist & Transplant Specialist at Lahore Doctors Hospital and Farooq Hospital.",
  keywords: ["nephrologist lahore", "kidney specialist lahore", "Dr Irfan Ahmad", "transplant specialist"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[newsreader.variable, inter.variable, jetbrainsMono.variable, notoNaskhArabic.variable].join(" ")}
      style={{ fontFamily: "var(--font-inter, system-ui, sans-serif)" }}
    >
      <body style={{ margin: 0, fontFamily: "var(--font-inter, system-ui, sans-serif)" }}>
        {children}
      </body>
    </html>
  );
}
