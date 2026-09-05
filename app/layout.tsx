import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ModalProvider } from "@/components/site/ModalProvider";
import { InvestorPortalModal } from "@/components/site/InvestorPortalModal";
import { ProspectusModal } from "@/components/site/ProspectusModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Batin Lateef Capital",
  description:
    "Batin Lateef Capital is a multi-jurisdictional media fund managing risk, optimizing arbitrage, and financing premium commercial cinema.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-obsidian font-sans text-silver">
        <ModalProvider>
          {children}
          <InvestorPortalModal />
          <ProspectusModal />
        </ModalProvider>
        <div className="site-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
