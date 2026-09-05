"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    id: "cachet",
    question: "Comment fonctionne le cachet numérique ?",
    answer:
      "Photographiez votre cachet physique avec votre téléphone. ZAP le détouré automatiquement et l'appose sur chaque document que vous créez — identique à votre vrai cachet, en un clic.",
  },
  {
    id: "signature",
    question: "Ma signature est-elle vraiment la mienne ?",
    answer:
      "Oui. Vous signez une seule fois du doigt directement sur l'écran de votre téléphone. ZAP enregistre cette signature et la réutilise à l'identique sur tous vos documents suivants.",
  },
  {
    id: "offline",
    question: "Puis-je utiliser ZAP sans connexion internet ?",
    answer:
      "La création de documents nécessite une connexion pour la synchronisation. Cependant, vos documents déjà créés restent accessibles hors ligne. Le partage WhatsApp et PDF nécessite une connexion active.",
  },
  {
    id: "paiement",
    question: "Quels moyens de paiement sont acceptés pour l'abonnement ?",
    answer:
      "ZAP accepte Wave, Orange Money, MTN MoMo et Moov Money — les solutions de paiement mobile les plus répandues en Afrique de l'Ouest. Pas besoin de carte bancaire.",
  },
  {
    id: "formule",
    question: "Puis-je changer de formule à tout moment ?",
    answer:
      "Oui, vous pouvez passer de Gratuit à Pro ou inversement à n'importe quel moment. Vous pouvez aussi recharger des documents à l'unité si vous dépassez votre quota mensuel sans vouloir changer de formule.",
  },
];

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: "1px solid #1e1e1e",
      }}
    >
      <button
        id={`faq-${item.id}`}
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "16px",
        }}
        aria-expanded={isOpen}
      >
        <span
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "17px",
            color: isOpen ? "#D4AF37" : "#F4F4F5",
            transition: "color 0.2s ease",
            lineHeight: 1.3,
          }}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDownIcon
            style={{
              width: 20,
              height: 20,
              color: isOpen ? "#D4AF37" : "rgba(244,244,245,0.45)",
              transition: "color 0.2s ease",
            }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14.5px",
                fontWeight: 300,
                color: "rgba(244,244,245,0.65)",
                lineHeight: 1.7,
                paddingBottom: "20px",
                maxWidth: "620px",
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>("cachet");

  return (
    <section id="faq" className="section-padding" style={{ background: "#0C0C0C" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="label-tracked"
          style={{ marginBottom: "16px", textAlign: "center" }}
        >
          FAQ
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
          Questions{" "}
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            fréquentes
          </span>
        </motion.h2>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ borderTop: "1px solid #1e1e1e" }}
        >
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
