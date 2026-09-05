"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Mes clients me font davantage confiance depuis que mes factures ont l'air aussi sérieuses que celles d'un grand atelier.",
    author: "Kofi A.",
    role: "Mécanicien",
    city: "Cotonou",
    initials: "KA",
  },
  {
    quote:
      "Je n'ai plus besoin de courir après mon carnet à souche. Tout est sur mon téléphone.",
    author: "Aminata S.",
    role: "Couturière",
    city: "Lomé",
    initials: "AS",
  },
  {
    quote:
      "Le cachet numérique, c'est exactement mon vrai cachet — mes clients ne voient pas la différence.",
    author: "Jean-Baptiste K.",
    role: "Menuisier",
    city: "Abidjan",
    initials: "JK",
  },
  {
    quote:
      "En quelques secondes j'envoie le reçu sur WhatsApp. Mes clients adorent, et moi aussi.",
    author: "Fatou D.",
    role: "Vendeuse en gros",
    city: "Dakar",
    initials: "FD",
  },
  {
    quote:
      "Avant ZAP, je perdais des heures à réécrire les mêmes informations. Maintenant c'est automatique.",
    author: "Emmanuel N.",
    role: "Électricien",
    city: "Ouagadougou",
    initials: "EN",
  },
];

// Double for seamless loop
const items = [...testimonials, ...testimonials];

function TestimonialCard({
  quote,
  author,
  role,
  city,
  initials,
}: (typeof testimonials)[0]) {
  return (
    <div
      style={{
        background: "#171717",
        border: "1px solid #262626",
        borderRadius: "16px",
        padding: "24px",
        width: "300px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Quote */}
      <p
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: "italic",
          fontSize: "15px",
          color: "#F4F4F5",
          lineHeight: 1.65,
          flex: 1,
        }}
      >
        &laquo;&nbsp;{quote}&nbsp;&raquo;
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Avatar */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.25) 0%, rgba(226,177,112,0.15) 100%)",
            border: "1px solid rgba(212,175,55,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Serif Display', serif",
            fontSize: "12px",
            color: "#D4AF37",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "#F4F4F5",
            }}
          >
            {author}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11.5px",
              color: "rgba(244,244,245,0.45)",
            }}
          >
            {role}, {city}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ background: "#0A0A0A", overflow: "hidden" }}
    >
      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="label-tracked"
        style={{ textAlign: "center", marginBottom: "16px" }}
      >
        Témoignages
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(26px, 4vw, 36px)",
          color: "#F4F4F5",
          textAlign: "center",
          marginBottom: "56px",
        }}
      >
        Ce qu&apos;en disent{" "}
        <span
          style={{
            fontStyle: "italic",
            background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          nos utilisateurs
        </span>
      </motion.h2>

      {/* Marquee row */}
      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          overflow: "hidden",
        }}
      >
        <div
          className="animate-marquee"
          style={{
            display: "flex",
            gap: "16px",
            width: "max-content",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState =
              "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState =
              "running";
          }}
        >
          {items.map((t, i) => (
            <TestimonialCard key={`${t.author}-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
