import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ModalProvider } from "@/components/site/ModalProvider";
import { InvestorPortalModal } from "@/components/site/InvestorPortalModal";
import { ProspectusModal } from "@/components/site/ProspectusModal";
import { ScrollProvider } from "@/components/site/ScrollProvider";
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
    "Multi-jurisdictional media fund financing four-quadrant film and television with treaty-stacked production architecture.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bone font-sans text-ink">
        <ScrollProvider>
          <ModalProvider>
            {children}
            <InvestorPortalModal />
            <ProspectusModal />
          </ModalProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
