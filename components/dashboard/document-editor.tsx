"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  CheckBadgeIcon,
  SparklesIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export interface LineItem {
  id: string;
  label: string;
  qty: number;
  price: number;
}

const catalogItems = [
  { label: "Vidange moteur + filtre", price: 8500 },
  { label: "Remplacement plaquettes de frein", price: 12000 },
  { label: "Diagnostic électronique", price: 7500 },
  { label: "Montage & équilibrage pneu", price: 4000 },
  { label: "Réparation climatisation", price: 25000 },
];

interface DocumentEditorProps {
  initialType?: "devis" | "facture" | "recu";
  initialClient?: string;
  onSuccess?: () => void;
}

export default function DocumentEditor({
  initialType = "facture",
  initialClient = "",
  onSuccess,
}: DocumentEditorProps) {
  const [docType, setDocType] = useState<"devis" | "facture" | "recu">(initialType);
  const [clientName, setClientName] = useState(initialClient);
  const [clientPhone, setClientPhone] = useState("+229 ");

  const [items, setItems] = useState<LineItem[]>([
    { id: "1", label: "Vidange moteur + filtre", qty: 1, price: 8500 },
    { id: "2", label: "Remplacement plaquettes de frein", qty: 1, price: 12000 },
  ]);

  // Dialog for adding manual line item
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [manualLabel, setManualLabel] = useState("");
  const [manualQty, setManualQty] = useState(1);
  const [manualPrice, setManualPrice] = useState(5000);

  // Stamp and signature toggles
  const [includeStamp, setIncludeStamp] = useState(true);
  const [includeSignature, setIncludeSignature] = useState(true);

  // Sharing state
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const total = subtotal;

  const handleAddManualItem = () => {
    if (!manualLabel.trim()) return;
    const newItem: LineItem = {
      id: Date.now().toString(),
      label: manualLabel.trim(),
      qty: manualQty,
      price: manualPrice,
    };
    setItems((prev) => [...prev, newItem]);
    setManualLabel("");
    setManualQty(1);
    setManualPrice(5000);
    setIsAddDialogOpen(false);
  };

  const handleAddFromCatalog = (catItem: (typeof catalogItems)[0]) => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      label: catItem.label,
      qty: 1,
      price: catItem.price,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleGenerateAndShare = () => {
    if (!clientName.trim()) {
      alert("Veuillez renseigner le nom du client.");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setToastMessage("Document généré avec succès !");

      // Generate WhatsApp link
      const typeLabel = docType === "recu" ? "Reçu officiel" : docType === "facture" ? "Facture" : "Devis proforma";
      const message = encodeURIComponent(
        `Bonjour ${clientName},\nVoici votre ${typeLabel} ZAP N° RF-2025-0089 d'un montant de ${total.toLocaleString("fr-FR")} FCFA.\nConsultez et téléchargez votre PDF certifié avec cachet ici : https://zap.africa/d/RF-2025-0089`
      );
      const cleanPhone = clientPhone.replace(/\D/g, "");
      const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${message}` : `https://wa.me/?text=${message}`;

      window.open(waUrl, "_blank");
      onSuccess?.();
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#171717",
            border: "1px solid #D4AF37",
            borderRadius: "12px",
            padding: "12px 20px",
            color: "#F4F4F5",
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
          }}
        >
          <CheckBadgeIcon style={{ width: 18, height: 18, color: "#D4AF37" }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3 Tabs Switcher */}
      <div
        style={{
          display: "flex",
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "14px",
          padding: "4px",
          position: "relative",
        }}
      >
        {[
          { id: "devis" as const, label: "Devis Proforma" },
          { id: "facture" as const, label: "Facture" },
          { id: "recu" as const, label: "Reçu de Paiement" },
        ].map((tab) => {
          const isActive = docType === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setDocType(tab.id)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "10px",
                border: "none",
                background: "transparent",
                color: isActive ? "#0C0C0C" : "rgba(244, 244, 245, 0.65)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13.5px",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                position: "relative",
                zIndex: 1,
                transition: "color 0.2s ease",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
                    zIndex: -1,
                  }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Document Meta Header (Automatic Info) */}
      <div
        style={{
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <span style={{ fontSize: "11px", color: "#A1A1AA", textTransform: "uppercase" }}>
            Numéro de pièce
          </span>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: "#D4AF37", margin: "2px 0 0" }}>
            {docType === "recu" ? "REC-2025-0043" : docType === "facture" ? "FAC-2025-0105" : "DEV-2025-0090"}
          </p>
        </div>

        <div>
          <span style={{ fontSize: "11px", color: "#A1A1AA", textTransform: "uppercase" }}>
            Date d&apos;émission
          </span>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#F4F4F5", margin: "2px 0 0" }}>
            Aujourd&apos;hui · Automatique
          </p>
        </div>

        <div>
          <span style={{ fontSize: "11px", color: "#A1A1AA", textTransform: "uppercase" }}>
            Émetteur
          </span>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#F4F4F5", margin: "2px 0 0" }}>
            Atelier Koffi &amp; Fils (Cotonou)
          </p>
        </div>
      </div>

      {/* Client Information Form */}
      <div
        style={{
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: "#F4F4F5", margin: 0 }}>
          Coordonnées du client
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
              Nom ou Entreprise cliente *
            </label>
            <input
              type="text"
              placeholder="Ex: M. Jean Mensah"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              style={{
                width: "100%",
                height: "44px",
                background: "#0C0C0C",
                border: "1px solid #262626",
                borderRadius: "10px",
                padding: "0 14px",
                color: "#F4F4F5",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
              Numéro WhatsApp client (pour partage direct)
            </label>
            <input
              type="text"
              placeholder="+229 97 00 00 00"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              style={{
                width: "100%",
                height: "44px",
                background: "#0C0C0C",
                border: "1px solid #262626",
                borderRadius: "10px",
                padding: "0 14px",
                color: "#F4F4F5",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Line Items List */}
      <div
        style={{
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div className="flex items-center justify-between">
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: "#F4F4F5", margin: 0 }}>
            Prestations &amp; Articles
          </h3>
          <button
            type="button"
            onClick={() => setIsAddDialogOpen(true)}
            style={{
              background: "rgba(212, 175, 55, 0.12)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              color: "#D4AF37",
              borderRadius: "10px",
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <PlusIcon style={{ width: 16, height: 16 }} />
            <span>+ Saisie manuelle</span>
          </button>
        </div>

        {/* Quick Add from Catalogue */}
        <div>
          <span style={{ fontSize: "11px", color: "#A1A1AA", display: "block", marginBottom: "8px" }}>
            Ajout rapide depuis votre catalogue :
          </span>
          <div className="flex flex-wrap gap-2">
            {catalogItems.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => handleAddFromCatalog(cat)}
                style={{
                  background: "#0C0C0C",
                  border: "1px solid #262626",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  fontSize: "12px",
                  color: "#F4F4F5",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{cat.label}</span>
                <span style={{ color: "#D4AF37", fontVariantNumeric: "tabular-nums" }}>
                  ({cat.price.toLocaleString("fr-FR")} F)
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards for each added item */}
        <div className="flex flex-col gap-2.5 mt-2">
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#0C0C0C",
                border: "1px solid #262626",
                borderRadius: "12px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#F4F4F5", margin: 0, fontWeight: 500 }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#A1A1AA", margin: "2px 0 0" }}>
                  {item.qty} × {item.price.toLocaleString("fr-FR")} FCFA
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#D4AF37",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {(item.qty * item.price).toLocaleString("fr-FR")} FCFA
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  style={{ background: "none", border: "none", color: "#E08585", cursor: "pointer", padding: "4px" }}
                  title="Supprimer la ligne"
                >
                  <TrashIcon style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Stamp & Signature Toggles */}
      <div
        style={{
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: "#F4F4F5", margin: 0 }}>
          Empreinte officielle sur le document
        </h3>

        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeStamp}
              onChange={(e) => setIncludeStamp(e.target.checked)}
              style={{ width: "18px", height: "18px", accentColor: "#D4AF37", cursor: "pointer" }}
            />
            <span style={{ fontSize: "13.5px", color: "#F4F4F5" }}>
              Apposer mon tampon d&apos;atelier officiel
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSignature}
              onChange={(e) => setIncludeSignature(e.target.checked)}
              style={{ width: "18px", height: "18px", accentColor: "#D4AF37", cursor: "pointer" }}
            />
            <span style={{ fontSize: "13.5px", color: "#F4F4F5" }}>
              Apposer ma signature manuscrite
            </span>
          </label>
        </div>
      </div>

      {/* Sticky Bottom Total & Share Action Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(12,12,12,0.92)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid #262626",
          padding: "16px 24px",
          zIndex: 40,
        }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span style={{ fontSize: "12px", color: "#A1A1AA" }}>Total à régler :</span>
            <p
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "24px",
                color: "#D4AF37",
                margin: 0,
                lineHeight: 1,
              }}
            >
              {total.toLocaleString("fr-FR")} FCFA
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateAndShare}
            disabled={isGenerating}
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
              border: "none",
              borderRadius: "12px",
              padding: "12px 24px",
              color: "#0C0C0C",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14.5px",
              fontWeight: 600,
              cursor: isGenerating ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ShareIcon style={{ width: 18, height: 18 }} />
            <span>{isGenerating ? "Création du PDF..." : "Générer & Partager sur WhatsApp"}</span>
          </button>
        </div>
      </div>

      {/* Modal for adding line item manually */}
      {isAddDialogOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "#171717",
              border: "1px solid #262626",
              borderRadius: "18px",
              padding: "24px",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "19px", color: "#F4F4F5", margin: 0 }}>
                Ajouter une prestation
              </h3>
              <button
                type="button"
                onClick={() => setIsAddDialogOpen(false)}
                style={{ background: "none", border: "none", color: "#A1A1AA", cursor: "pointer" }}
              >
                <XMarkIcon style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
                  Description de la prestation / article
                </label>
                <input
                  type="text"
                  placeholder="Ex: Peinture portière avant droite"
                  value={manualLabel}
                  onChange={(e) => setManualLabel(e.target.value)}
                  style={{
                    width: "100%",
                    height: "44px",
                    background: "#0C0C0C",
                    border: "1px solid #262626",
                    borderRadius: "10px",
                    padding: "0 14px",
                    color: "#F4F4F5",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
                    Quantité
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={manualQty}
                    onChange={(e) => setManualQty(Number(e.target.value))}
                    style={{
                      width: "100%",
                      height: "44px",
                      background: "#0C0C0C",
                      border: "1px solid #262626",
                      borderRadius: "10px",
                      padding: "0 14px",
                      color: "#F4F4F5",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
                    Prix unitaire (FCFA)
                  </label>
                  <input
                    type="number"
                    value={manualPrice}
                    onChange={(e) => setManualPrice(Number(e.target.value))}
                    style={{
                      width: "100%",
                      height: "44px",
                      background: "#0C0C0C",
                      border: "1px solid #262626",
                      borderRadius: "10px",
                      padding: "0 14px",
                      color: "#F4F4F5",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsAddDialogOpen(false)}
                style={{
                  flex: 1,
                  height: "44px",
                  background: "transparent",
                  border: "1px solid #262626",
                  borderRadius: "10px",
                  color: "#F4F4F5",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleAddManualItem}
                style={{
                  flex: 1,
                  height: "44px",
                  background: "#D4AF37",
                  border: "none",
                  borderRadius: "10px",
                  color: "#0C0C0C",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Ajouter la ligne
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
