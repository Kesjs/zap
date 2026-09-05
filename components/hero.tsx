"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckBadgeIcon,
  DocumentTextIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

// Beams is a Three.js component — load only client-side
const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });

// ─── Badge with animated border beam ───────────────────────────────────────
function HeroBadge() {
  return (
    <div className="relative inline-flex items-center gap-2 mb-8" style={{ isolation: "isolate" }}>
      {/* Badge pill */}
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
        {/* Animated border-beam glow */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "100px",
            padding: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, #D4AF37 40%, #E2B170 60%, transparent 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            backgroundSize: "200% 100%",
            animation: "badge-beam 10s linear infinite",
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

// ─── Document card preview ──────────────────────────────────────────────────
function DocumentCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col md:flex-row gap-4 w-full mt-14"
    >
      {/* Main receipt card */}
      <div
        style={{
          flex: "1 1 auto",
          background: "#171717",
          border: "1px solid #262626",
          borderTop: "3px solid #D4AF37",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "17px",
                color: "#F4F4F5",
              }}
            >
              Atelier Koffi &amp; Fils
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(244,244,245,0.55)",
                marginTop: "2px",
              }}
            >
              Reçu · RF-2024-0087
            </p>
          </div>
          <span
            style={{
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.25)",
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

        {/* Line items */}
        <div
          style={{
            borderTop: "1px solid #262626",
            paddingTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {[
            { label: "Vidange moteur + filtre", amount: "8 500 FCFA" },
            { label: "Remplacement plaquettes de frein", amount: "12 000 FCFA" },
            { label: "Main-d'œuvre diagnostics", amount: "7 500 FCFA" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "rgba(244,244,245,0.70)",
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "#F4F4F5",
                  fontWeight: 500,
                }}
              >
                {item.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div
          style={{
            borderTop: "1px solid #262626",
            marginTop: "16px",
            paddingTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "rgba(244,244,245,0.60)",
            }}
          >
            Total encaissé
          </span>
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "20px",
              color: "#D4AF37",
            }}
          >
            28 000 FCFA
          </span>
        </div>

        {/* Stamp area */}
        <div
          style={{
            marginTop: "20px",
            padding: "12px 16px",
            background: "rgba(212,175,55,0.06)",
            border: "1px solid rgba(212,175,55,0.15)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CheckBadgeIcon
            style={{ width: 20, height: 20, color: "#D4AF37", flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(244,244,245,0.60)",
            }}
          >
            Cachet &amp; signature apposés automatiquement
          </span>
        </div>
      </div>

      {/* Stat cards — vertical stack */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "160px" }}>
        {[
          { value: "8", label: "Documents gratuits pour démarrer", icon: DocumentTextIcon },
          { value: "< 60s", label: "Pour produire un document officiel", icon: ClockIcon },
          { value: "0 F", label: "Pour commencer sans carte", icon: CurrencyDollarIcon },
        ].map((stat) => (
          <div
            key={stat.value}
            style={{
              flex: 1,
              background: "#171717",
              border: "1px solid #262626",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "22px",
                color: "#D4AF37",
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11.5px",
                color: "rgba(244,244,245,0.55)",
                lineHeight: 1.4,
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Hero ──────────────────────────────────────────────────────────────
const headingWords = [
  { text: "Créez vos devis,", italic: false },
  { text: "factures et reçus", italic: false },
  { text: "en toute simplicité.", italic: true, gold: true },
];

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Beams background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.55,
        }}
      >
        <Beams
          beamWidth={2}
          beamHeight={20}
          beamNumber={10}
          lightColor="#D4AF37"
          beamColor="#3a2800"
          backgroundColor="#0C0C0C"
          speed={1.2}
          noiseIntensity={1.5}
          scale={0.18}
          rotation={0}
        />
      </div>

      {/* Radial gradient overlay — keep content readable */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, transparent 0%, #0C0C0C 75%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1152px",
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "680px" }}>
          <HeroBadge />

          {/* H1 staggered word reveal */}
          <h1
            style={{
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {headingWords.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: "easeOut" }}
                style={{
                  display: "block",
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: line.italic ? "italic" : "normal",
                  color: line.gold ? undefined : "#F4F4F5",
                  ...(line.gold
                    ? {
                        background:
                          "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : {}),
                }}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15.5px",
              fontWeight: 300,
              color: "rgba(244,244,245,0.70)",
              maxWidth: "440px",
              lineHeight: 1.65,
              marginBottom: "36px",
            }}
          >
            Votre cachet, votre signature et vos informations sont réunis pour
            offrir une image professionnelle à chaque client.
          </motion.p>

          {/* CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <motion.a
              href="#pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                background:
                  "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
                color: "#0C0C0C",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                padding: "13px 22px",
                borderRadius: "10px",
                width: "fit-content",
                cursor: "pointer",
              }}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.15 }}
            >
              Créer mon premier document →
            </motion.a>

            {/* Caption */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(244,244,245,0.55)",
              }}
            >
              Sans carte bancaire · Prêt en 45 secondes · Wave &amp; Orange
              Money
            </p>
          </motion.div>
        </div>

        {/* Document card preview */}
        <DocumentCard />
      </div>
    </section>
  );
}
