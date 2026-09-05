import { Architecture } from "@/components/site/Architecture";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Nav } from "@/components/site/Nav";
import { Thesis } from "@/components/site/Thesis";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Thesis />
        <Architecture />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
