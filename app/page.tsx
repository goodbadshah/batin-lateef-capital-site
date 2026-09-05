import { About } from "@/components/site/About";
import { Commit } from "@/components/site/Commit";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Metrics } from "@/components/site/Metrics";
import { ManifestoQuote } from "@/components/site/ManifestoQuote";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { ClosingSection } from "@/components/site/ClosingSection";
import { PortfolioCarousel } from "@/components/site/PortfolioCarousel";
import { SiteHeader } from "@/components/site/SiteHeader";
import { mediaStrips } from "@/lib/images";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className="min-h-[100dvh] bg-bone pt-14">
        <main>
          <Hero />
          <ParallaxMedia strip={mediaStrips[0]} />
          <About />
          <ParallaxMedia strip={mediaStrips[1]} />
          <ManifestoQuote />
          <ParallaxMedia strip={mediaStrips[2]} />
          <Commit />
          <HowItWorks />
          <Metrics />
          <ParallaxMedia strip={mediaStrips[3]} />
          <PortfolioCarousel />
          <ClosingSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
