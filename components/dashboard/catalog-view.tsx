"use client";

import React, { useState } from "react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  TagIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export interface CatalogItem {
  id: string;
  label: string;
  description?: string;
  price: number;
}

const initialCatalog: CatalogItem[] = [
  { id: "1", label: "Vidange moteur + filtre", description: "Huile synthétique 5W40 + filtre à huile neuf", price: 8500 },
  { id: "2", label: "Remplacement plaquettes de frein", description: "Plaquettes céramique avant + purge liquide", price: 12000 },
  { id: "3", label: "Diagnostic électronique", description: "Scan valise OBD-II complet et rapport d'erreurs", price: 7500 },
  { id: "4", label: "Montage & équilibrage pneu", description: "Par pneumatique avec plomb neuf", price: 4000 },
  { id: "5", label: "Réparation climatisation", description: "Recharge gaz R134a et détection de fuite traceur", price: 25000 },
];

export default function CatalogView() {
  const [items, setItems] = useState<CatalogItem[]>(initialCatalog);

  // Dialogs state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<CatalogItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<CatalogItem | null>(null);

  // Form states
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(5000);

  const handleOpenAdd = () => {
    setLabel("");
    setDescription("");
    setPrice(5000);
    setIsAddOpen(true);
  };

  const handleOpenEdit = (item: CatalogItem) => {
    setEditItem(item);
    setLabel(item.label);
    setDescription(item.description || "");
    setPrice(item.price);
  };

  const handleSaveItem = () => {
    if (!label.trim()) return;

    if (editItem) {
      // Edit existing
      setItems((prev) =>
        prev.map((it) => (it.id === editItem.id ? { ...it, label, description, price } : it))
      );
      setEditItem(null);
    } else {
      // Add new
      const newItem: CatalogItem = {
        id: Date.now().toString(),
        label: label.trim(),
        description: description.trim(),
        price,
      };
      setItems((prev) => [...prev, newItem]);
      setIsAddOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteItem) return;
    setItems((prev) => prev.filter((it) => it.id !== deleteItem.id));
    setDeleteItem(null);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-24">
      {/* Header & CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#F4F4F5", margin: 0 }}>
            Modèles de prix &amp; Catalogue
          </h3>
          <p style={{ fontSize: "13px", color: "#A1A1AA", margin: "4px 0 0" }}>
            Vos prestations réutilisables en 1 clic dans l&apos;éditeur de factures.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          style={{
            background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
            border: "none",
            borderRadius: "12px",
            padding: "10px 18px",
            color: "#0C0C0C",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13.5px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <PlusIcon style={{ width: 16, height: 16 }} />
          <span>+ Ajouter un article</span>
        </button>
      </div>

      {/* Catalog Table */}
      <div
        style={{
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {items.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <TagIcon style={{ width: 36, height: 36, color: "#A1A1AA", margin: "0 auto 12px" }} />
            <p style={{ fontSize: "15px", color: "#F4F4F5", fontWeight: 500, margin: 0 }}>
              Aucun article pour l&apos;instant
            </p>
            <p style={{ fontSize: "13px", color: "#A1A1AA", margin: "4px 0 16px" }}>
              Créez vos modèles de prestations pour facturer encore plus rapidement.
            </p>
            <button
              type="button"
              onClick={handleOpenAdd}
              style={{
                background: "#D4AF37",
                color: "#0C0C0C",
                border: "none",
                borderRadius: "10px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Ajouter mon premier article
            </button>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #262626" }}>
                <th style={{ padding: "16px 20px", fontSize: "12px", color: "#A1A1AA", fontWeight: 500 }}>
                  ARTICLE / PRESTATION
                </th>
                <th style={{ padding: "16px 20px", fontSize: "12px", color: "#A1A1AA", fontWeight: 500, textAlign: "right" }}>
                  PRIX UNITAIRE
                </th>
                <th style={{ padding: "16px 20px", fontSize: "12px", color: "#A1A1AA", fontWeight: 500, textAlign: "right" }}>
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#F4F4F5", margin: 0, fontWeight: 500 }}>
                      {item.label}
                    </p>
                    {item.description && (
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#A1A1AA", margin: "2px 0 0" }}>
                        {item.description}
                      </p>
                    )}
                  </td>

                  <td
                    style={{
                      padding: "16px 20px",
                      textAlign: "right",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#D4AF37",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {item.price.toLocaleString("fr-FR")} FCFA
                  </td>

                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        style={{
                          background: "transparent",
                          border: "1px solid #262626",
                          borderRadius: "8px",
                          padding: "6px 8px",
                          color: "#A1A1AA",
                          cursor: "pointer",
                        }}
                        title="Modifier l'article"
                      >
                        <PencilSquareIcon style={{ width: 16, height: 16 }} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteItem(item)}
                        style={{
                          background: "transparent",
                          border: "1px solid #262626",
                          borderRadius: "8px",
                          padding: "6px 8px",
                          color: "#E08585",
                          cursor: "pointer",
                        }}
                        title="Supprimer l'article"
                      >
                        <TrashIcon style={{ width: 16, height: 16 }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Dialog */}
      {(isAddOpen || editItem) && (
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
              maxWidth: "440px",
              background: "#171717",
              border: "1px solid #262626",
              borderRadius: "18px",
              padding: "24px",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", color: "#F4F4F5", margin: 0 }}>
                {editItem ? "Modifier l'article" : "Ajouter un modèle de prix"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddOpen(false);
                  setEditItem(null);
                }}
                style={{ background: "none", border: "none", color: "#A1A1AA", cursor: "pointer" }}
              >
                <XMarkIcon style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
                  Libellé de la prestation *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Révision complète 50 000 km"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
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
                  Description complémentaire (facultatif)
                </label>
                <input
                  type="text"
                  placeholder="Détails des pièces incluses..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  Prix unitaire (FCFA) *
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  style={{
                    width: "100%",
                    height: "44px",
                    background: "#0C0C0C",
                    border: "1px solid #262626",
                    borderRadius: "10px",
                    padding: "0 14px",
                    color: "#F4F4F5",
                    fontSize: "15px",
                    fontWeight: 500,
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddOpen(false);
                  setEditItem(null);
                }}
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
                onClick={handleSaveItem}
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
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteItem && (
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
              maxWidth: "400px",
              background: "#171717",
              border: "1px solid #262626",
              borderRadius: "18px",
              padding: "24px",
            }}
          >
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "19px", color: "#F4F4F5", margin: "0 0 10px" }}>
              Supprimer cet article ?
            </h3>
            <p style={{ fontSize: "13.5px", color: "#A1A1AA", margin: "0 0 20px", lineHeight: 1.5 }}>
              Êtes-vous sûr de vouloir supprimer <strong className="text-[#F4F4F5]">{deleteItem.label}</strong> ? Cette action est irréversible.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteItem(null)}
                style={{
                  flex: 1,
                  height: "42px",
                  background: "transparent",
                  border: "1px solid #262626",
                  borderRadius: "10px",
                  color: "#F4F4F5",
                  fontSize: "13.5px",
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                style={{
                  flex: 1,
                  height: "42px",
                  background: "#E08585",
                  border: "none",
                  borderRadius: "10px",
                  color: "#0C0C0C",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
