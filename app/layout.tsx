import type { Metadata } from "next";
import { Geist, Amiri, Scheherazade_New, Noto_Naskh_Arabic } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
});

const scheherazade = Scheherazade_New({
  variable: "--font-scheherazade",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Coran Ramadan — Plan de lecture complet",
  description:
    "Lisez le Coran en entier pendant le mois de Ramadan grâce à un plan de lecture adapté à votre rythme. Texte arabe avec traduction française pour méditer et comprendre.",
  keywords: ["Coran", "Ramadan", "lecture", "plan", "Islam", "Quran"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${amiri.variable} ${scheherazade.variable} ${notoNaskh.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
