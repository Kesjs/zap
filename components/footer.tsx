"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        background: "#171717",
        border: "1px solid #262626",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(244,244,245,0.45)",
        textDecoration: "none",
        transition: "color 0.2s, border-color 0.2s",
      }}
      whileHover={{ color: "#D4AF37", borderColor: "rgba(212,175,55,0.35)" } as any}
    >
      {children}
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid #1a1a1a",
        padding: "64px 24px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
        }}
      >
        {/* 3-col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "56px",
          }}
        >
          {/* Col 1 — Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link
              href="/"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "24px",
                color: "#D4AF37",
                textDecoration: "none",
              }}
            >
              ZAP
            </Link>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(244,244,245,0.45)",
                lineHeight: 1.6,
                maxWidth: "220px",
              }}
            >
              Le carnet de reçus, devis et factures officiel et numérique pour les entrepreneurs africains.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <SocialIcon href="https://twitter.com" label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://wa.me" label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Col 2 — Produit */}
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "rgba(244,244,245,0.30)",
                marginBottom: "16px",
              }}
            >
              Produit
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none" }}>
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      color: "rgba(244,244,245,0.50)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color = "#F4F4F5";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color =
                        "rgba(244,244,245,0.50)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Support */}
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "rgba(244,244,245,0.30)",
                marginBottom: "16px",
              }}
            >
              Support
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none" }}>
              {[
                { label: "Contact", href: "mailto:hello@zapapp.co" },
                { label: "WhatsApp", href: "https://wa.me/" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      color: "rgba(244,244,245,0.50)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color = "#F4F4F5";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color =
                        "rgba(244,244,245,0.50)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(244,244,245,0.30)",
            }}
          >
            © 2025 ZAP. Tous droits réservés.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(244,244,245,0.25)",
            }}
          >
            Made in Afrique de l&apos;Ouest
          </p>
        </div>
      </div>
    </footer>
  );
}
