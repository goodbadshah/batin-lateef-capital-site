import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
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
      <Nav />
      <main className="mx-auto max-w-[760px] px-4 py-16 sm:px-6 lg:py-24">
        <p className="mb-6 text-sm text-silver">
          <Link href="/" className="hover:text-gold">
            {wordmark}
          </Link>
        </p>
        <h1 className="font-serif text-4xl text-heading">{title}</h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-silver">{children}</div>
      </main>
      <Footer />
    </>
  );
}
