import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "tejob.az - İş elanları",
    template: "%s | tejob.az",
  },
  description:
    "tejob.az - Azərbaycanın iş elanları platforması. Şirkətlər və fərdi sahibkarlar üçün vakansiya elanları.",
  keywords: "iş elanları, vakansiyalar, Bakıda iş, Azərbaycan iş elanları, karyera",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    siteName: "tejob.az",
    title: "tejob.az - İş elanları",
    description:
      "Azərbaycanın iş elanları platforması. Şirkətlər və fərdi sahibkarlar üçün vakansiya elanları.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0f172a] dark:text-slate-100">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
