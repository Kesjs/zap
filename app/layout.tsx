import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "ZAP — Devis, Factures & Reçus Officiels pour Entrepreneurs Africains",
  description:
    "Créez vos devis, factures et reçus en moins de 60 secondes avec votre cachet d'atelier apposé automatiquement. L'outil officiel pour artisans et indépendants d'Afrique de l'Ouest.",
  keywords: [
    "facture",
    "devis",
    "reçu",
    "artisan",
    "Afrique de l'Ouest",
    "Wave",
    "Orange Money",
    "FCFA",
    "document officiel",
  ],
  openGraph: {
    title: "ZAP — Documents officiels en 60 secondes",
    description:
      "Votre cachet, votre signature et vos informations réunis pour offrir une image professionnelle à chaque client.",
    type: "website",
    locale: "fr_FR",
  },
};

import TopLoader from "@/components/ui/top-loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap"
        />
      </head>
      <body className="antialiased" style={{ background: "#0C0C0C" }}>
        <TopLoader />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
