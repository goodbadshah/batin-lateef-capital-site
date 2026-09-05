import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/SiteHeader";
import { wordmark } from "@/lib/copy";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <div className="min-h-[100dvh] bg-beige pt-14">
        <main className="mx-auto max-w-[760px] px-6 py-16 sm:px-10 lg:py-24">
          <p className="mb-6 text-sm text-muted">
            <Link href="/" className="hover:text-ruby">
              {wordmark}
            </Link>
          </p>
          <h1 className="font-serif text-4xl text-ink">{title}</h1>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
