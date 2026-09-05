import Hero from "@/components/hero";
import CraftsMarquee from "@/components/crafts-marquee";
import DocumentsSimple from "@/components/documents-simple";
import SignatureSeal from "@/components/signature-seal";
import PdfReady from "@/components/pdf-ready";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";
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

      {/* 4. Tous vos documents, simplement. */}
      <DocumentsSimple />

      {/* 5. Votre signature. Votre cachet. */}
      <SignatureSeal />

      {/* 6. Prêt à être envoyé. (PDF) */}
      <PdfReady />

      {/* 7. Comment ça marche */}
      <HowItWorks />

      {/* 8. Témoignages (avant Pricing) */}
      <Testimonials />

      {/* 9. Pricing */}
      <Pricing />

      {/* 10. FAQ */}
      <Faq />

      {/* 11. Bandeau CTA final */}
      <FinalCta />

      {/* 12. Footer */}
      <Footer />
    </main>
  );
}
