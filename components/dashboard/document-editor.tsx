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
  BanknotesIcon,
  PhoneIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export interface LineItem {
  id: string;
  label: string;
  qty: number;
  price: number;
}

// African Crafts Quick Templates for the 1-click catalog adder
const quickCatalogItems = [
  { label: "Table de réunion teck massif", craft: "Menuiserie", price: 350000 },
  { label: "Porte isoplane sur mesure", craft: "Menuiserie", price: 45000 },
  { label: "Confection tenue Bazin brodé", craft: "Couture", price: 65000 },
  { label: "Robe de soirée sur mesure", craft: "Couture", price: 40000 },
  { label: "Vidange moteur complète + filtre", craft: "Mécanique", price: 15000 },
  { label: "Diagnostic électronique valise", craft: "Mécanique", price: 10000 },
  { label: "Installation tableau électrique", craft: "BTP", price: 50000 },
  { label: "Plomberie & pose sanitaires", craft: "BTP", price: 35000 },
];

interface DocumentEditorProps {
  initialType?: "devis" | "facture" | "recu";
  initialClient?: string;
  initialItems?: LineItem[];
  onSuccess?: () => void;
}

export default function DocumentEditor({
  initialType = "facture",
  initialClient = "",
  initialItems,
  onSuccess,
}: DocumentEditorProps) {
  const [docType, setDocType] = useState<"devis" | "facture" | "recu">(initialType);
  const [clientName, setClientName] = useState(initialClient);
  const [clientPhone, setClientPhone] = useState("+229 ");

  // Line items
  const [items, setItems] = useState<LineItem[]>(
    initialItems && initialItems.length > 0
      ? initialItems
      : [
          { id: "1", label: "Table de réunion teck massif (12 places)", qty: 1, price: 350000 },
          { id: "2", label: "Livraison & assemblage sur site", qty: 1, price: 35000 },
        ]
  );

  // Dialog for adding manual line item
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [manualLabel, setManualLabel] = useState("");
  const [manualQty, setManualQty] = useState(1);
  const [manualPrice, setManualPrice] = useState(25000);

  // OPTIONAL DEPOSIT & PAYMENT SETTINGS (Terrain Afrique de l'Ouest)
  const [hasDeposit, setHasDeposit] = useState(false);
  const [depositAmount, setDepositAmount] = useState(150000);

  // Mobile Money details
  const [paymentProvider, setPaymentProvider] = useState<"Wave" | "MTN MoMo" | "Orange Money" | "Moov Money" | "Espèces">("Wave");
  const [paymentPhone, setPaymentPhone] = useState("+229 97 00 11 22");

  // Validity / Terms
  const [validity, setValidity] = useState("Valable 15 jours");

  // Stamp and signature toggles
  const [includeStamp, setIncludeStamp] = useState(true);
  const [includeSignature, setIncludeSignature] = useState(true);

  // Sharing state
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const total = subtotal;
  const effectiveDeposit = hasDeposit ? Math.min(depositAmount, total) : 0;
  const remainingBalance = Math.max(0, total - effectiveDeposit);

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
    setManualPrice(25000);
    setIsAddDialogOpen(false);
  };

  const handleAddFromCatalog = (catItem: (typeof quickCatalogItems)[0]) => {
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

  const handleSetDepositPercent = (percent: number) => {
    setDepositAmount(Math.round((total * percent) / 100));
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
      const typeLabel = docType === "recu" ? "Reçu officiel" : docType === "facture" ? "Facture" : "Devis";
      const docNumber = docType === "recu" ? "REC-2025-0043" : docType === "facture" ? "FAC-2025-0105" : "DEV-2025-0090";

      let paymentText = `Règlement accepté via ${paymentProvider} (${paymentPhone}).`;
      if (hasDeposit && effectiveDeposit > 0) {
        paymentText += `\n- Acompte perçu : ${effectiveDeposit.toLocaleString("fr-FR")} FCFA\n- Reste dû à la livraison : ${remainingBalance.toLocaleString("fr-FR")} FCFA`;
      }

      const message = encodeURIComponent(
        `Bonjour ${clientName},\nVoici votre ${typeLabel} ZAP N° ${docNumber} d'un montant total de ${total.toLocaleString("fr-FR")} FCFA.\n${paymentText}\n\nConsultez et téléchargez votre PDF certifié avec cachet & signature ici : https://zap.africa/d/${docNumber}`
      );
      const cleanPhone = clientPhone.replace(/\D/g, "");
      const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${message}` : `https://wa.me/?text=${message}`;

      window.open(waUrl, "_blank");
      onSuccess?.();
    }, 700);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-32">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 bg-[#171717] border border-[#D4AF37] rounded-xl p-4 text-sm text-[#F4F4F5] z-50 flex items-center gap-2.5 shadow-none">
          <CheckBadgeIcon className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3 Tabs Document Type Switcher */}
      <div className="flex bg-[#171717] border border-[#262626] rounded-xl p-1 select-none">
        {[
          { id: "facture" as const, label: "Facture officielle", badge: "Comptabilité" },
          { id: "devis" as const, label: "Devis proforma", badge: "Avant travaux" },
          { id: "recu" as const, label: "Reçu d'encaissement", badge: "Preuve Wave/MoMo" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setDocType(tab.id)}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              docType === tab.id
                ? "bg-[#262626] text-[#D4AF37] font-semibold border-b-2 border-[#D4AF37]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>{tab.label}</span>
            <span className="hidden sm:inline text-[10px] font-mono text-neutral-500">
              ({tab.badge})
            </span>
          </button>
        ))}
      </div>

      {/* 1. Client & Dates Info Card */}
      <div className="bg-[#171717] border border-[#262626] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg text-white">
            1. Informations du client
          </h2>
          <span className="text-[11px] font-mono text-[#D4AF37]">
            {docType === "recu" ? "REC-2025-0043" : docType === "facture" ? "FAC-2025-0105" : "DEV-2025-0090"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Nom du client / Entreprise *
            </label>
            <input
              type="text"
              placeholder="Ex: Mme Tossou / Société Générale Bénin"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Numéro WhatsApp client (pour envoi direct)
            </label>
            <input
              type="tel"
              placeholder="+229 97 00 00 00 / +225 07..."
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Échéance / Validité du document
            </label>
            <select
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#262626] text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            >
              <option value="Paiement à réception">Paiement à réception (Comptant)</option>
              <option value="Valable 15 jours">Valable 15 jours</option>
              <option value="Valable 30 jours">Valable 30 jours</option>
              <option value="Solde à la livraison">Solde dû à la livraison</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Compte Mobile Money de règlement
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={paymentProvider}
                onChange={(e: any) => setPaymentProvider(e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#262626] text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                <option value="Wave">Wave</option>
                <option value="MTN MoMo">MTN MoMo</option>
                <option value="Orange Money">Orange Money</option>
                <option value="Moov Money">Moov Money</option>
                <option value="Espèces">Espèces (Cash)</option>
              </select>

              <input
                type="text"
                value={paymentPhone}
                onChange={(e) => setPaymentPhone(e.target.value)}
                placeholder="+229..."
                className="w-full px-2.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#262626] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Line Items Card */}
      <div className="bg-[#171717] border border-[#262626] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg text-white">
              2. Prestations & Produits
            </h2>
            <p className="text-xs text-neutral-400">Ajoutez les lignes manuellement ou depuis vos modèles d'atelier.</p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#262626] hover:bg-[#303030] text-xs font-medium text-[#D4AF37] transition-colors cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Ligne personnalisée</span>
          </button>
        </div>

        {/* Quick Catalog Adder (Badges multi-métiers) */}
        <div>
          <span className="text-[11px] uppercase tracking-wider text-neutral-500 block mb-2 font-mono">
            Ajout rapide d&apos;atelier (1 clic) :
          </span>
          <div className="flex flex-wrap gap-2">
            {quickCatalogItems.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddFromCatalog(cat)}
                className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#0C0C0C] border border-[#262626] hover:border-[#D4AF37]/50 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>{cat.label}</span>
                <span className="font-mono text-[10px] text-[#D4AF37]">
                  {cat.price.toLocaleString("fr-FR")} F
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Added Items List */}
        <div className="space-y-2 pt-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#0C0C0C] border border-[#262626]"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{item.label}</p>
                <p className="text-xs text-neutral-400 font-mono">
                  {item.qty} × {item.price.toLocaleString("fr-FR")} FCFA
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-semibold text-[#D4AF37] font-mono tabular-nums">
                  {(item.qty * item.price).toLocaleString("fr-FR")} FCFA
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1 rounded-lg text-neutral-500 hover:text-red-400 transition-colors"
                  title="Supprimer"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. OPTIONAL DEPOSIT & BALANCE DUE MODULE (AFRICAN WORKFLOW) */}
      <div className="bg-[#171717] border border-[#262626] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BanknotesIcon className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg text-white">
                3. Acompte & Reste à payer (Optionnel)
              </h2>
              <p className="text-xs text-neutral-400">
                Idéal pour les chantiers et fabrications sur commande : évitez les litiges à la livraison.
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hasDeposit}
              onChange={(e) => setHasDeposit(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#262626] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]" />
          </label>
        </div>

        {/* Deposit details when enabled */}
        {hasDeposit && (
          <div className="pt-3 border-t border-[#262626] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Montant de l&apos;acompte versé par le client (FCFA)
                </label>
                <input
                  type="number"
                  min={0}
                  max={total}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#262626] text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Pourcentage rapide :
                </label>
                <div className="flex gap-2">
                  {[
                    { label: "30% (Matériaux)", percent: 30 },
                    { label: "50% (Standard)", percent: 50 },
                    { label: "70% (Avance forte)", percent: 70 },
                  ].map((btn) => (
                    <button
                      key={btn.percent}
                      type="button"
                      onClick={() => handleSetDepositPercent(btn.percent)}
                      className="flex-1 py-2 px-2 rounded-xl bg-[#0C0C0C] border border-[#262626] hover:border-[#D4AF37] text-xs font-medium text-neutral-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Summary Box */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0C0C0C] border border-[#262626] text-center">
              <div>
                <span className="text-[11px] text-neutral-400 block mb-0.5">Montant Total</span>
                <span className="text-sm font-semibold text-white font-mono tabular-nums">
                  {total.toLocaleString("fr-FR")} F
                </span>
              </div>
              <div className="border-x border-[#262626]">
                <span className="text-[11px] text-emerald-400 block mb-0.5">Acompte Perçu</span>
                <span className="text-sm font-semibold text-emerald-400 font-mono tabular-nums">
                  - {effectiveDeposit.toLocaleString("fr-FR")} F
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#D4AF37] block mb-0.5">Reste dû à la livraison</span>
                <span className="text-sm font-bold text-[#D4AF37] font-mono tabular-nums">
                  {remainingBalance.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Stamp & Signature Card */}
      <div className="bg-[#171717] border border-[#262626] rounded-2xl p-5 sm:p-6 space-y-3">
        <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg text-white">
          4. Empreinte certifiée sur le document
        </h2>

        <div className="flex flex-col sm:flex-row gap-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeStamp}
              onChange={(e) => setIncludeStamp(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
            />
            <span className="text-sm text-neutral-300">
              Apposer mon tampon d&apos;atelier officiel
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSignature}
              onChange={(e) => setIncludeSignature(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
            />
            <span className="text-sm text-neutral-300">
              Apposer ma signature manuscrite
            </span>
          </label>
        </div>
      </div>

      {/* Sticky Bottom Action Bar (Flat precision, no blur/shadow lag) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0C0C0C]/95 border-t border-[#262626] p-4 z-40">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-baseline gap-4">
            <div>
              <span className="text-[11px] text-neutral-400 block">Total net :</span>
              <span
                style={{ fontFamily: "'DM Serif Display', serif" }}
                className="text-xl sm:text-2xl text-white font-mono tabular-nums"
              >
                {total.toLocaleString("fr-FR")} FCFA
              </span>
            </div>

            {hasDeposit && effectiveDeposit > 0 && (
              <div className="border-l border-[#262626] pl-4">
                <span className="text-[11px] text-[#D4AF37] block">Reste à payer :</span>
                <span className="text-base sm:text-lg font-bold text-[#D4AF37] font-mono tabular-nums">
                  {remainingBalance.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleGenerateAndShare}
            disabled={isGenerating}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#e2b170] text-[#0C0C0C] text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
          >
            <ShareIcon className="w-4 h-4" />
            <span>
              {isGenerating ? "Génération du PDF..." : "Générer & Partager sur WhatsApp"}
            </span>
          </button>
        </div>
      </div>

      {/* Dialog for adding line item manually */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#171717] border border-[#262626] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <h3 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg text-white">
                Ajouter une prestation
              </h3>
              <button
                type="button"
                onClick={() => setIsAddDialogOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Désignation</label>
                <input
                  type="text"
                  placeholder="Ex: Confection porte bois rouge"
                  value={manualLabel}
                  onChange={(e) => setManualLabel(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0C0C0C] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Quantité</label>
                  <input
                    type="number"
                    min={1}
                    value={manualQty}
                    onChange={(e) => setManualQty(Number(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0C0C0C] border border-[#262626] text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Prix unitaire (FCFA)</label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={manualPrice}
                    onChange={(e) => setManualPrice(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0C0C0C] border border-[#262626] text-sm text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-[#262626]">
              <button
                type="button"
                onClick={() => setIsAddDialogOpen(false)}
                className="py-2 px-4 rounded-xl border border-[#262626] text-xs text-neutral-400 hover:text-white"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleAddManualItem}
                className="py-2 px-4 rounded-xl bg-[#D4AF37] text-[#0C0C0C] text-xs font-semibold hover:bg-[#e2b170]"
              >
                Ajouter au document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
