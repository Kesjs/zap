"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";

// ─── BorderGlow (same as features) ─────────────────────────────────────────
function BorderGlowCard({
  children,
  style,
  featured = false,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  featured?: boolean;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      style={{
        position: "relative",
        background: featured ? "rgba(23,23,23,0.95)" : "#171717",
        border: featured
          ? "1px solid rgba(212,175,55,0.35)"
          : "1px solid #262626",
        borderRadius: "20px",
        overflow: "hidden",
        ...style,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Featured top accent */}
      {featured && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #D4AF37, #E2B170, transparent)",
          }}
        />
      )}

      {/* Glow spotlight */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(212,175,55,0.12) 0%, transparent 65%)`,
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

// ─── Plans data ─────────────────────────────────────────────────────────────
const plans = {
  gratuit: {
    name: "Gratuit",
    priceMonthly: "0 FCFA",
    priceAnnual: "0 FCFA",
    period: "/toujours",
    periodAnnual: "/toujours",
    description: "Pour découvrir ZAP sans engagement.",
    features: [
      "8 documents pour démarrer",
      "Cachet numérique inclus",
      "Partage WhatsApp & PDF",
      "Reçus, devis et factures",
    ],
    cta: "Commencer gratuitement",
    featured: false,
  },
  pro: {
    name: "Pro",
    priceMonthly: "5 000 FCFA",
    priceAnnual: "3 750 FCFA",
    period: "/mois",
    periodAnnual: "/mois, facturé annuellement",
    description: "Pour les professionnels actifs au quotidien.",
    features: [
      "80 documents/mois (120 en annuel)",
      "Cachet & signature réutilisables",
      "Partage WhatsApp, PDF, impression",
      "Historique complet illimité",
      "Support prioritaire",
      "Recharge à l'unité disponible",
    ],
    cta: "Passer à Pro",
    featured: true,
  },
};

// ─── Main Pricing ───────────────────────────────────────────────────────────
export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="section-padding" style={{ background: "#0C0C0C" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="label-tracked"
          style={{ marginBottom: "16px", textAlign: "center" }}
        >
          Tarifs
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px, 4vw, 38px)",
            color: "#F4F4F5",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Simple et{" "}
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            transparent
          </span>
        </motion.h2>

        {/* Toggle mensuel / annuel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            marginBottom: "48px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13.5px",
              color: !annual ? "#F4F4F5" : "rgba(244,244,245,0.45)",
              transition: "color 0.2s",
            }}
          >
            Mensuel
          </span>

          {/* Switch with 44px accessible touch target */}
          <button
            id="pricing-toggle"
            onClick={() => setAnnual(!annual)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "10px 4px",
              minHeight: "44px",
            }}
            aria-label="Basculer vers facturation annuelle"
          >
            <div
              style={{
                position: "relative",
                width: "44px",
                height: "24px",
                borderRadius: "100px",
                background: "#171717",
                border: "1px solid #262626",
              }}
            >
              <motion.div
                animate={{ x: annual ? 20 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  position: "absolute",
                  top: "2px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: annual
                    ? "linear-gradient(135deg, #D4AF37, #E2B170)"
                    : "rgba(244,244,245,0.35)",
                }}
              />
            </div>
          </button>

          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13.5px",
              color: annual ? "#F4F4F5" : "rgba(244,244,245,0.45)",
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Annuel
            {annual && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: "rgba(212,175,55,0.15)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  color: "#D4AF37",
                  fontSize: "10px",
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: "100px",
                  letterSpacing: "0.04em",
                }}
              >
                Économisez ~25%
              </motion.span>
            )}
          </span>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            alignItems: "stretch",
          }}
        >
          {Object.entries(plans).map(([key, plan]) => (
            <BorderGlowCard key={key} featured={plan.featured} style={{ padding: "32px" }}>
              {/* Plan name */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: plan.featured ? "#D4AF37" : "rgba(244,244,245,0.45)",
                  marginBottom: "16px",
                }}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div style={{ marginBottom: "8px", display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "36px",
                    color: "#F4F4F5",
                    lineHeight: 1,
                  }}
                >
                  {key === "pro" && annual ? plan.priceAnnual : plan.priceMonthly}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "rgba(244,244,245,0.45)",
                  }}
                >
                  {key === "pro" && annual ? plan.periodAnnual : plan.period}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 300,
                  color: "rgba(244,244,245,0.55)",
                  lineHeight: 1.5,
                  marginBottom: "28px",
                }}
              >
                {plan.description}
              </p>

              {/* CTA */}
              <a
                href="#"
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: plan.featured ? "#0C0C0C" : "#F4F4F5",
                  background: plan.featured
                    ? "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)"
                    : "rgba(244,244,245,0.08)",
                  border: plan.featured ? "none" : "1px solid #262626",
                  padding: "12px",
                  borderRadius: "10px",
                  marginBottom: "28px",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
              >
                {plan.cta}
              </a>

              {/* Features list */}
              <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.features.map((feat) => (
                  <li
                    key={feat}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      color: "rgba(244,244,245,0.70)",
                      lineHeight: 1.45,
                    }}
                  >
                    <CheckIcon
                      style={{
                        width: 16,
                        height: 16,
                        color: "#D4AF37",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    />
                    {feat}
                  </li>
                ))}
              </ul>
            </BorderGlowCard>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12.5px",
            color: "rgba(244,244,245,0.40)",
            marginTop: "24px",
          }}
        >
          Besoin de plus ? Rechargez à l&apos;unité à tout moment.
        </motion.p>
      </div>
    </section>
  );
}
