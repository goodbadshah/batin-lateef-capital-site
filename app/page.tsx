import { About } from "@/components/site/About";
import { Commit } from "@/components/site/Commit";
import { Footer } from "@/components/site/Footer";
import { FundPartners } from "@/components/site/FundPartners";
import { Hero } from "@/components/site/Hero";
import { Metrics } from "@/components/site/Metrics";
import { ManifestoQuote } from "@/components/site/ManifestoQuote";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { PortfolioCarousel } from "@/components/site/PortfolioCarousel";
import { Sidebar } from "@/components/site/Sidebar";
import { mediaStrips } from "@/lib/images";

export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="main-shell min-h-[100dvh] bg-beige pt-14 lg:pt-0">
        <main>
          <Hero />
          <ParallaxMedia strip={mediaStrips[0]} />
          <About />
          <ParallaxMedia strip={mediaStrips[1]} />
          <ManifestoQuote />
          <ParallaxMedia strip={mediaStrips[2]} />
          <Commit />
          <Metrics />
          <ParallaxMedia strip={mediaStrips[3]} />
          <PortfolioCarousel />
          <FundPartners />
        </main>
        <Footer />
      </div>
    </>
  );
}
