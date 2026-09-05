"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Beams component (Three.js canvas) loaded client-side only
const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });

// ─── Badge with BorderBeam ──────────────────────────────────────────────────
function HeroBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 mb-6"
      style={{ isolation: "isolate" }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "100px",
          height: "28px",
          padding: "4px 12px 4px 4px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Border beam looping animation */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "100px",
            padding: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, #D4AF37 45%, #E2B170 55%, transparent 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            backgroundSize: "200% 100%",
            animation: "badge-beam 11s linear infinite",
          }}
        />
        {/* NEW chip */}
        <span
          style={{
            background: "#D4AF37",
            color: "#0C0C0C",
            fontSize: "10px",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.08em",
            padding: "2px 6px",
            borderRadius: "100px",
          }}
        >
          NEW
        </span>
        {/* Badge text */}
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12.5px",
            fontWeight: 400,
            color: "rgba(244, 244, 245, 0.70)",
          }}
        >
          En finir avec les carnets papier
        </span>
      </div>

      <style>{`
        @keyframes badge-beam {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
}

// ─── Hero Visual: Realistic Document Mockup with Progressive Assembly ────────
// TODO: remplacer par un vrai document produit par l'app
function HeroVisualDocument() {
  const lineItems = [
    { label: "Vidange moteur + filtre", amount: "8 500 FCFA" },
    { label: "Remplacement plaquettes de frein", amount: "12 000 FCFA" },
    { label: "Main-d'œuvre diagnostics", amount: "7 500 FCFA" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-[620px] mx-auto mt-14"
      style={{
        background: "#171717",
        border: "1px solid #262626",
        borderTop: "3px solid #D4AF37",
        borderRadius: "16px",
        padding: "28px 24px",
        textAlign: "left",
      }}
    >
      {/* Document Header */}
      <div className="flex items-start justify-between pb-5 border-b border-[#262626]">
        <div>
          <p
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "18px",
              color: "#F4F4F5",
            }}
          >
            Atelier Koffi &amp; Fils
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(244, 244, 245, 0.50)",
              marginTop: "3px",
            }}
          >
            Reçu · RF-2024-0087
          </p>
        </div>
        <span
          style={{
            background: "rgba(34, 197, 94, 0.12)",
            border: "1px solid rgba(34, 197, 94, 0.28)",
            color: "#4ade80",
            fontSize: "11px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            padding: "3px 10px",
            borderRadius: "100px",
          }}
        >
          Réglé
        </span>
      </div>

      {/* Progressive Line Items with Stagger */}
      <div className="flex flex-col gap-3 py-5 border-b border-[#262626]">
        {lineItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.25 + index * 0.15,
              ease: "easeOut",
            }}
            className="flex justify-between items-center text-[13.5px]"
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(244, 244, 245, 0.75)",
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#F4F4F5",
                fontWeight: 500,
              }}
            >
              {item.amount}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Total Section */}
      <div className="flex justify-between items-center py-4 border-b border-[#262626]">
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "rgba(244, 244, 245, 0.60)",
          }}
        >
          Total encaissé
        </span>
        <span
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "22px",
            color: "#D4AF37",
          }}
        >
          28 000 FCFA
        </span>
      </div>

      {/* Signature & Seal Assembly */}
      <div className="grid grid-cols-2 gap-4 pt-5 items-center">
        {/* Signature drawing animation */}
        <div
          style={{
            background: "rgba(12, 12, 12, 0.5)",
            border: "1px dashed #262626",
            borderRadius: "10px",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "84px",
          }}
        >
          <svg
            viewBox="0 0 160 48"
            className="w-full h-9"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Animated continuous pen stroke */}
            <motion.path
              d="M10,32 Q35,8 55,24 T95,18 Q120,40 145,20"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.75, ease: "easeInOut" }}
            />
          </svg>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10.5px",
              color: "rgba(244, 244, 245, 0.40)",
              marginTop: "4px",
            }}
          >
            Signature client
          </span>
        </div>

        {/* Falling Stamp with scale impact and ink halo */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Radial Ink Flash Halo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1.3, opacity: [0, 0.35, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.25, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Stamp Seal Impact */}
          <motion.div
            initial={{ scale: 1.25, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 1.2, ease: "easeOut" }}
            style={{
              width: "74px",
              height: "74px",
              border: "2px solid #D4AF37",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(212, 175, 55, 0.08)",
              transform: "rotate(-6deg)",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "8.5px",
                color: "#D4AF37",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Atelier Koffi
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "7px",
                color: "rgba(212,175,55,0.7)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: "1px",
              }}
            >
              ★ Certifié ★
            </span>
          </motion.div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10.5px",
              color: "rgba(244, 244, 245, 0.40)",
              marginTop: "6px",
            }}
          >
            Cachet officiel
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Hero Section ───────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "100px",
        paddingBottom: "80px",
        background: "#0C0C0C",
      }}
    >
      {/* Native Ambient Gradient: instant one-shot background at frame 0 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Beams background (behind hero only) with smooth CSS fade-in */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: 0.35,
          pointerEvents: "none",
          transition: "opacity 0.8s ease-in",
        }}
      >
        <Beams
          beamWidth={2}
          beamHeight={20}
          beamNumber={10}
          lightColor="#D4AF37"
          beamColor="#3a2800"
          backgroundColor="#0C0C0C"
          speed={1.0}
          noiseIntensity={1.2}
          scale={0.18}
          rotation={0}
        />
      </div>

      {/* Radial overlay to preserve perfect text contrast */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "radial-gradient(circle at 50% 40%, transparent 15%, #0C0C0C 85%)",
          pointerEvents: "none",
        }}
      />

      {/* Centered Single Column Content (max-width ~720px) */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "720px",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <HeroBadge />

        {/* H1 Heading */}
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(34px, 6vw, 46px)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#F4F4F5",
            marginBottom: "20px",
          }}
        >
          Créez vos devis, factures et reçus
          <br />
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            en toute simplicité.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15.5px",
            fontWeight: 300,
            color: "rgba(244, 244, 245, 0.70)",
            maxWidth: "440px",
            lineHeight: 1.65,
            marginBottom: "32px",
          }}
        >
          Vos informations, votre signature et votre cachet, réunis sur chaque document.
        </p>

        {/* CTA Block (Flat & Precision, zero shadow) */}
        <div className="flex flex-col items-center gap-3">
          <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
                color: "#0C0C0C",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                padding: "13px 22px",
                borderRadius: "10px",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Créer un document
            </Link>
          </motion.div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(244, 244, 245, 0.60)",
            }}
          >
            8 documents gratuits pour commencer
          </p>
        </div>

        {/* Hero Visual Mockup */}
        <HeroVisualDocument />
      </div>
    </section>
  );
}
