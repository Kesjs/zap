"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Beams component (Three.js canvas) loaded client-side only
const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });

// ─── Détection perf : Beams (WebGL) réservé au desktop ──────────────────────
// Sur mobile/tablette (le device réel de la cible artisan/entrepreneur) ou si
// l'utilisateur a activé "réduire les animations", on affiche un fallback CSS
// léger à la place du canvas Three.js.
function useHeavyAnimationAllowed() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      const isDesktopWidth = window.innerWidth >= 1024;
      setAllowed(isDesktopWidth && !mq.matches);
    };

    evaluate();
    window.addEventListener("resize", evaluate);
    mq.addEventListener?.("change", evaluate);

    return () => {
      window.removeEventListener("resize", evaluate);
      mq.removeEventListener?.("change", evaluate);
    };
  }, []);

  return allowed;
}

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

// ─── Hero Visual: Papier blanc, remplissage auto, stylo + cachet ──────────
function HeroVisualDocument() {
  const lineItems = [
    { label: "Vidange moteur + filtre", amount: "8 500 FCFA" },
    { label: "Remplacement plaquettes de frein", amount: "12 000 FCFA" },
    { label: "Main-d'œuvre diagnostics", amount: "7 500 FCFA" },
  ];

  // Points approximant la courbe de signature (viewBox 160x48 → % du conteneur)
  // pour faire suivre la pointe du stylo au tracé du path SVG.
  const penPath = [
    { left: "6%", top: "67%" },
    { left: "19%", top: "29%" },
    { left: "34%", top: "50%" },
    { left: "47%", top: "71%" },
    { left: "59%", top: "38%" },
    { left: "69%", top: "75%" },
    { left: "91%", top: "42%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-[620px] mx-auto mt-14"
      style={{
        background: "#FAFAF8",
        border: "1px solid #E5E1D8",
        borderTop: "3px solid #D4AF37",
        borderRadius: "16px",
        padding: "28px 24px",
        textAlign: "left",
        boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
      }}
    >
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex items-start justify-between pb-5 border-b"
        style={{ borderColor: "#E5E1D8" }}
      >
        <div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: "#1A1A1A" }}>
            Atelier Koffi &amp; Fils
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(26,26,26,0.5)", marginTop: "3px" }}>
            Reçu · RF-2024-0087
          </p>
        </div>
        <span
          style={{
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            color: "#16a34a",
            fontSize: "11px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            padding: "3px 10px",
            borderRadius: "100px",
          }}
        >
          Réglé
        </span>
      </motion.div>

      {/* Lignes qui se "remplissent" toutes seules, effet machine à écrire */}
      <div className="flex flex-col gap-3 py-5 border-b" style={{ borderColor: "#E5E1D8" }}>
        {lineItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.7 + index * 0.35, ease: "easeInOut" }}
            className="flex justify-between items-center text-[13.5px]"
          >
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(26,26,26,0.75)" }}>
              {item.label}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A", fontWeight: 500 }}>
              {item.amount}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Total */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.9 }}
        className="flex justify-between items-center py-4 border-b"
        style={{ borderColor: "#E5E1D8" }}
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(26,26,26,0.6)" }}>
          Total encaissé
        </span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#B8860B" }}>
          28 000 FCFA
        </span>
      </motion.div>

      {/* Signature (le stylo suit le tracé) + Cachet qui se pose */}
      <div className="grid grid-cols-2 gap-4 pt-5 items-center">
        {/* Signature */}
        <div
          style={{
            position: "relative",
            background: "rgba(0,0,0,0.02)",
            border: "1px dashed #D8D2C4",
            borderRadius: "10px",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "84px",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "36px" }}>
            <svg
              viewBox="0 0 160 48"
              className="w-full h-9"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M10,32 Q35,8 55,24 T95,18 Q120,40 145,20"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 2.3, ease: "easeInOut" }}
              />
            </svg>

            {/* Pointe du stylo qui trace la signature */}
            <motion.div
              initial={{ opacity: 0, left: penPath[0].left, top: penPath[0].top }}
              whileInView={{
                opacity: [0, 1, 1, 1, 1, 1, 0],
                left: penPath.map((p) => p.left),
                top: penPath.map((p) => p.top),
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.95, delay: 2.3, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "10px",
                height: "10px",
                marginLeft: "-2px",
                marginTop: "-8px",
                pointerEvents: "none",
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" style={{ transform: "rotate(-45deg)" }}>
                <path d="M2 22l3-8 12-12 5 5-12 12-8 3z" fill="#1A1A1A" />
                <path d="M14 5l5 5" stroke="#D4AF37" strokeWidth="1.5" />
              </svg>
            </motion.div>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10.5px", color: "rgba(26,26,26,0.4)", marginTop: "4px" }}>
            Signature client
          </span>
        </div>

        {/* Cachet qui tombe et se pose */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Halo d'encre au moment de l'impact */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1.3, opacity: [0, 0.35, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 3.35, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Cachet : chute + rebond léger à l'atterrissage */}
          <motion.div
            initial={{ y: -60, scale: 1.15, opacity: 0, rotate: -18 }}
            whileInView={{ y: 0, scale: 1, opacity: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 3.3, type: "spring", stiffness: 260, damping: 14 }}
            style={{
              width: "74px",
              height: "74px",
              border: "2px solid #D4AF37",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(212, 175, 55, 0.1)",
            }}
          >
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "8.5px", color: "#B8860B", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Atelier Koffi
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "7px", color: "rgba(184,134,11,0.8)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "1px" }}>
              ★ Certifié ★
            </span>
          </motion.div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10.5px", color: "rgba(26,26,26,0.4)", marginTop: "6px" }}>
            Cachet officiel
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Hero Section ───────────────────────────────────────────────────────
export default function Hero() {
  const [beamsReady, setBeamsReady] = useState(false);
  const heavyAnimationAllowed = useHeavyAnimationAllowed();

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

      {/* Beams background (desktop only) OU fallback CSS léger (mobile / reduced-motion) */}
      {heavyAnimationAllowed ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            opacity: beamsReady ? 0.35 : 0,
            pointerEvents: "none",
            transition: "opacity 1s ease-in",
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
            onReady={() => setBeamsReady(true)}
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            opacity: 0.35,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 70% 50% at 30% 30%, rgba(212,175,55,0.10) 0%, transparent 70%), radial-gradient(ellipse 60% 45% at 75% 65%, rgba(212,175,55,0.07) 0%, transparent 70%)",
            animation: "hero-fallback-drift 14s ease-in-out infinite alternate",
          }}
        />
      )}
      <style>{`
        @keyframes hero-fallback-drift {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(2%, -2%); }
        }
      `}</style>

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
              href="/login?tab=register"
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
