import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import StoreGallery from "@/components/StoreGallery";
import PVSection from "@/components/PVSection";
import FAQ from "@/components/FAQ";
import ApplySection from "@/components/ApplySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyUs />
      <StoreGallery />
      <PVSection />
      <FAQ />
      <ApplySection />
      <Footer />
    </main>
  );
}
