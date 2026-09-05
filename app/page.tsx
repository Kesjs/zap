import Hero from "@/components/hero";
import CraftsMarquee from "@/components/crafts-marquee";
import SignatureSeal from "@/components/signature-seal";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";
import CatalogRegistry from "@/components/catalog-registry";
import TrustBanner from "@/components/trust-banner";
import Pricing from "@/components/pricing";
import Faq from "@/components/faq";
import FinalCta from "@/components/final-cta";
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
      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Bandeau 'Pensé pour votre métier' (Marquee) */}
      <CraftsMarquee />

      {/* 4. Votre signature. Votre cachet. (fusion : signature + cachet + types de docs + PDF/WhatsApp) */}
      <SignatureSeal />

      {/* 5. Comment ça marche */}
      <HowItWorks />

      {/* 6. Témoignages (avant Pricing) */}
      <Testimonials />

      {/* 6bis. Catalogue multi-métiers & Registre/trésorerie (explique ce que Pricing vend) */}
      <CatalogRegistry />

      {/* 6ter. Bandeau moyens de paiement acceptés (repère de confiance juste avant le prix) */}
      <TrustBanner />

      {/* 7. Pricing */}
      <Pricing />

      {/* 8. FAQ */}
      <Faq />

      {/* 9. Bandeau CTA final */}
      <FinalCta />

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
