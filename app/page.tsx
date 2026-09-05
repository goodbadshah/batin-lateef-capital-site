import { Architecture } from "@/components/site/Architecture";
import { Contact } from "@/components/site/Contact";
import { DualVoice } from "@/components/site/DualVoice";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Nav } from "@/components/site/Nav";
import { ThesisStack } from "@/components/site/ThesisStack";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DualVoice />
        <ThesisStack />
        <Architecture />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
