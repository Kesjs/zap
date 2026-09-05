"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Squares2X2Icon,
  PlusCircleIcon,
  TagIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export type DashboardView = "registry" | "new" | "catalog" | "settings";

interface SidebarProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  quotaUsed?: number;
  quotaMax?: number;
  plan?: "gratuit" | "pro-mensuel" | "pro-annuel";
  onLogout?: () => void;
}

export default function DashboardSidebar({
  currentView,
  onViewChange,
  quotaUsed = 3,
  quotaMax = 8,
  plan = "gratuit",
  onLogout,
}: SidebarProps) {
  const navItems = [
    { id: "registry" as DashboardView, label: "Tableau de bord", icon: Squares2X2Icon },
    { id: "new" as DashboardView, label: "Nouveau", icon: PlusCircleIcon },
    { id: "catalog" as DashboardView, label: "Catalogue", icon: TagIcon },
    { id: "settings" as DashboardView, label: "Paramètres", icon: Cog6ToothIcon },
  ];

  const quotaRatio = Math.min(quotaUsed / quotaMax, 1);
  const isQuotaExhausted = quotaUsed >= quotaMax;

  return (
    <aside
      className="hidden md:flex flex-col justify-between w-64 flex-shrink-0"
      style={{
        background: "#171717",
        borderRight: "1px solid #262626",
        minHeight: "100dvh",
        padding: "24px 16px",
      }}
    >
      {/* Top: Brand Logo & Navigation */}
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              position: "relative",
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <Image
              src="/logo.png"
              alt="ZAP Logo"
              width={28}
              height={28}
              style={{ objectFit: "contain" }}
            />
          </div>
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "22px",
              color: "#D4AF37",
              letterSpacing: "-0.02em",
            }}
          >
            ZAP
          </span>
        </Link>

        {/* Navigation Items with Animated Gold Indicator */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id)}
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: isActive ? "#262626" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Animated Gold Indicator on active item */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    transition={{
                      duration: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "6px",
                      bottom: "6px",
                      width: "3px",
                      borderRadius: "0 4px 4px 0",
                      background: "linear-gradient(180deg, #D4AF37 0%, #E2B170 100%)",
                    }}
                  />
                )}

                <Icon
                  style={{
                    width: 20,
                    height: 20,
                    color: isActive ? "#D4AF37" : "#A1A1AA",
                    flexShrink: 0,
                    transition: "color 0.2s ease",
                  }}
                />

                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? "#F4F4F5" : "#A1A1AA",
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Quota Upgrade Card & Logout */}
      <div className="flex flex-col gap-4">
        {/* Quota Card */}
        <div
          style={{
            background: "#0C0C0C",
            border: isQuotaExhausted
              ? "1px solid rgba(224, 133, 133, 0.4)"
              : "1px solid #262626",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "#A1A1AA",
                fontWeight: 500,
              }}
            >
              Quota documents
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: isQuotaExhausted ? "#E08585" : "#F4F4F5",
                fontVariantNumeric: "tabular-nums",
                fontWeight: 500,
              }}
            >
              {quotaUsed} / {quotaMax}
            </span>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "#262626",
              borderRadius: "100px",
              overflow: "hidden",
              marginBottom: "12px",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${quotaRatio * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: "100%",
                background: isQuotaExhausted
                  ? "linear-gradient(90deg, #E08585, #ef4444)"
                  : "linear-gradient(90deg, #D4AF37, #E2B170)",
              }}
            />
          </div>

          {/* Upgrade CTA */}
          {plan === "gratuit" && (
            <button
              type="button"
              onClick={() => onViewChange("settings")}
              style={{
                width: "100%",
                background: isQuotaExhausted
                  ? "rgba(224, 133, 133, 0.15)"
                  : "rgba(212, 175, 55, 0.12)",
                border: isQuotaExhausted
                  ? "1px solid rgba(224, 133, 133, 0.3)"
                  : "1px solid rgba(212, 175, 55, 0.25)",
                borderRadius: "10px",
                padding: "8px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                cursor: "pointer",
              }}
            >
              <SparklesIcon
                style={{
                  width: 14,
                  height: 14,
                  color: isQuotaExhausted ? "#E08585" : "#D4AF37",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: isQuotaExhausted ? "#E08585" : "#D4AF37",
                }}
              >
                Activer le Pass Pro (5 000 F)
              </span>
            </button>
          )}

          {plan === "pro-mensuel" && (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                color: "#A1A1AA",
                textAlign: "center",
                margin: 0,
              }}
            >
              Renouvellement le 1er du mois
            </p>
          )}
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={onLogout}
          className="group flex items-center gap-3 px-3 py-2 text-[#A1A1AA] hover:text-[#E08585] transition-colors rounded-xl"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <ArrowLeftOnRectangleIcon style={{ width: 18, height: 18 }} />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13.5px",
            }}
          >
            Déconnexion
          </span>
        </button>
      </div>
    </aside>
  );
}
