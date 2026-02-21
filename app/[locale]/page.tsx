import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { Industries } from "@/components/sections/Industries";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Products />
        <Industries />
        <HowItWorks />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
