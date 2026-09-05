"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Login", href: "/login" },
  ];

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Floating pill navbar */}
      <nav
        className="w-full max-w-5xl"
        style={{
          background: "rgba(12, 12, 12, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid #262626",
          borderRadius: "14px",
          height: "52px",
        }}
      >
        <div className="flex items-center justify-between h-full px-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "22px",
              fontWeight: 400,
              color: "#D4AF37",
              letterSpacing: "-0.02em",
              textDecoration: "none",
            }}
          >
            ZAP
          </Link>

          {/* Center nav links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 400,
                  color: "rgba(244, 244, 245, 0.70)",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  (e.target as HTMLElement).style.color = "#D4AF37";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  (e.target as HTMLElement).style.color =
                    "rgba(244, 244, 245, 0.70)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* CTA — desktop */}
            <motion.a
              href="#pricing"
              className="hidden md:flex items-center"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "#0C0C0C",
                background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
                padding: "8px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.15 }}
            >
              Commencer gratuitement
            </motion.a>

            {/* Mobile hamburger with 44px touch target */}
            <button
              className="md:hidden flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                color: "rgba(244, 244, 245, 0.85)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                width: "44px",
                height: "44px",
                padding: "10px",
                borderRadius: "8px",
              }}
              aria-label={isMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
              id="navbar-menu-toggle"
            >
              {isMenuOpen ? (
                <XMarkIcon style={{ width: 24, height: 24 }} />
              ) : (
                <Bars3Icon style={{ width: 24, height: 24 }} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-16 left-4 right-4 md:hidden"
            style={{
              background: "rgba(12, 12, 12, 0.95)",
              backdropFilter: "blur(16px)",
              border: "1px solid #262626",
              borderRadius: "12px",
              padding: "12px 8px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: "block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "rgba(244, 244, 245, 0.80)",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div style={{ padding: "8px 6px 2px" }}>
              <a
                href="#pricing"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0C0C0C",
                  background:
                    "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Commencer gratuitement
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
