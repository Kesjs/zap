"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar, { DashboardView } from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";
import SalesRegistry, { DocumentItem } from "@/components/dashboard/sales-registry";
import DocumentEditor from "@/components/dashboard/document-editor";
import SettingsStamp from "@/components/dashboard/settings-stamp";
import CatalogView from "@/components/dashboard/catalog-view";

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<DashboardView>("registry");
  const [quotaUsed, setQuotaUsed] = useState(3);
  const [quotaMax] = useState(8);
  const [plan] = useState<"gratuit" | "pro-mensuel" | "pro-annuel">("gratuit");

  const [prefilledClient, setPrefilledClient] = useState("");
  const [prefilledType, setPrefilledType] = useState<"devis" | "facture" | "recu">("facture");

  const viewTitles: Record<DashboardView, string> = {
    registry: "Tableau de bord — Registre des ventes",
    new: "Éditeur 1-clic — Nouveau document",
    catalog: "Catalogue & Modèles de prix",
    settings: "Paramètres & Empreinte d'atelier",
  };

  const handleDuplicate = (doc: DocumentItem) => {
    setPrefilledClient(doc.client);
    setPrefilledType(doc.type);
    setCurrentView("new");
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100dvh",
        background: "#0C0C0C",
        color: "#F4F4F5",
      }}
    >
      {/* Desktop Animated Sidebar */}
      <DashboardSidebar
        currentView={currentView}
        onViewChange={(v) => setCurrentView(v)}
        quotaUsed={quotaUsed}
        quotaMax={quotaMax}
        plan={plan}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col min-w-0"
        style={{ background: "#0C0C0C" }}
      >
        {/* Header (Topbar mobile + view header desktop) */}
        <DashboardHeader
          title={viewTitles[currentView]}
          currentView={currentView}
          onViewChange={(v) => setCurrentView(v)}
          onLogout={handleLogout}
        />

        {/* Dynamic View Content */}
        <main className="flex-1 px-4 sm:px-8 py-4 sm:py-6 max-w-6xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentView === "registry" && (
                <SalesRegistry
                  onCreateDocument={() => setCurrentView("new")}
                  onDuplicateDocument={handleDuplicate}
                  onNavigateSettings={() => setCurrentView("settings")}
                />
              )}

              {currentView === "new" && (
                <DocumentEditor
                  initialType={prefilledType}
                  initialClient={prefilledClient}
                  onSuccess={() => {
                    setQuotaUsed((prev) => Math.min(prev + 1, quotaMax));
                    setCurrentView("registry");
                  }}
                />
              )}

              {currentView === "catalog" && <CatalogView />}

              {currentView === "settings" && <SettingsStamp />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
