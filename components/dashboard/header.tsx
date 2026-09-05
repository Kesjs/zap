"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { DashboardView } from "./sidebar";

interface HeaderProps {
  title: string;
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onLogout?: () => void;
}

export default function DashboardHeader({
  title,
  currentView,
  onViewChange,
  onLogout,
}: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { id: "registry" as DashboardView, label: "Tableau de bord" },
    { id: "new" as DashboardView, label: "Nouveau document" },
    { id: "catalog" as DashboardView, label: "Catalogue" },
    { id: "settings" as DashboardView, label: "Paramètres & Empreinte" },
  ];

  return (
    <>
      {/* Mobile Topbar (Sticky Top) */}
      <header
        className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#262626]"
        style={{ background: "#171717", minHeight: "56px" }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "#F4F4F5",
              cursor: "pointer",
              padding: "4px",
            }}
            aria-label="Ouvrir le menu"
          >
            <Bars3Icon style={{ width: 24, height: 24 }} />
          </button>

          <Link href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
            <div
              style={{
                position: "relative",
                width: "24px",
                height: "24px",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <Image src="/logo.png" alt="ZAP" width={24} height={24} style={{ objectFit: "contain" }} />
            </div>
            <span
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "19px",
                color: "#D4AF37",
              }}
            >
              ZAP
            </span>
          </Link>
        </div>

        {/* User Avatar Dropdown trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(212, 175, 55, 0.2)",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#D4AF37",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              ZK
            </div>
          </button>
        </div>
      </header>

      {/* Desktop Top Header inside Content Area */}
      <div className="hidden md:flex items-center justify-between pb-6 border-b border-[#262626] mb-8">
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "28px",
            color: "#F4F4F5",
            margin: 0,
          }}
        >
          {title}
        </h2>

        {/* Account Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#171717",
              border: "1px solid #262626",
              borderRadius: "100px",
              padding: "4px 12px 4px 4px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #D4AF37, #E2B170)",
                color: "#0C0C0C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              ZK
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                color: "#F4F4F5",
              }}
            >
              Atelier Koffi
            </span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                marginTop: "8px",
                width: "190px",
                background: "#171717",
                border: "1px solid #262626",
                borderRadius: "14px",
                padding: "6px",
                zIndex: 50,
                boxShadow: "0 16px 32px rgba(0,0,0,0.5)",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  onViewChange("settings");
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#F4F4F5] hover:bg-[#262626] rounded-lg transition-colors text-left"
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
              >
                <Cog6ToothIcon style={{ width: 16, height: 16, color: "#D4AF37" }} />
                <span>Paramètres & Profil</span>
              </button>

              <div style={{ height: "1px", background: "#262626", margin: "4px 0" }} />

              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onLogout?.();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#E08585] hover:bg-[#262626] rounded-lg transition-colors text-left"
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
              >
                <ArrowLeftOnRectangleIcon style={{ width: 16, height: 16 }} />
                <span>Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(4px)",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "280px",
              background: "#171717",
              borderRight: "1px solid #262626",
              height: "100%",
              padding: "24px 16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-8 px-2">
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "22px",
                    color: "#D4AF37",
                  }}
                >
                  ZAP
                </span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  style={{ background: "none", border: "none", color: "#A1A1AA", cursor: "pointer" }}
                >
                  <XMarkIcon style={{ width: 24, height: 24 }} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onViewChange(item.id);
                      setIsDrawerOpen(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: currentView === item.id ? "#262626" : "transparent",
                      color: currentView === item.id ? "#D4AF37" : "#F4F4F5",
                      border: "none",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsDrawerOpen(false);
                onLogout?.();
              }}
              style={{
                background: "none",
                border: "none",
                color: "#E08585",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px",
                cursor: "pointer",
              }}
            >
              <ArrowLeftOnRectangleIcon style={{ width: 18, height: 18 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px" }}>
                Déconnexion
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
