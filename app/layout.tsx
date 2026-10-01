import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ModalProvider } from "@/components/site/ModalProvider";
import { InvestorPortalModal } from "@/components/site/InvestorPortalModal";
import { ProspectusModal } from "@/components/site/ProspectusModal";
import { ScrollProvider } from "@/components/site/ScrollProvider";
import { heroImage } from "@/lib/images";
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

const description =
  "Multi-jurisdictional media fund financing a commercial genre-forward slate (thriller, horror, sci-fi, action) plus selective prestige titles with incentive-stacked production architecture.";

function metadataBase() {
  const host = process.env.VERCEL_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (!host) return new URL("http://localhost:3000");
  return new URL(host.startsWith("http") ? host : `https://${host}`);
}

export const metadata: Metadata = {
  metadataBase: metadataBase(),
  title: "Batin Lateef Capital",
  description,
  openGraph: {
    title: "Batin Lateef Capital",
    description,
    type: "website",
    images: [
      {
        url: heroImage.src,
        width: 1024,
        height: 1536,
        alt: heroImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Batin Lateef Capital",
    description,
    images: [heroImage.src],
  },
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
