import Hero from "@/components/hero";
import TrustBanner from "@/components/trust-banner";
import Features from "@/components/stats";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        background: "#0C0C0C",
      }}
    >
      <Hero />
      <TrustBanner />
      <Features />
      <Pricing />
      <Testimonials />
      <Faq />
      <Footer />
    </main>
  );
}
