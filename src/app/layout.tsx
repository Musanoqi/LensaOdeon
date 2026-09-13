import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lensa Odeon - Wisata Digital Kampoeng Naga",
  description: "Eksplorasi cagar budaya dan atraksi wisata secara interaktif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-[#FAF7F2] text-stone-900 antialiased flex flex-col min-h-screen">
        <LanguageProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}