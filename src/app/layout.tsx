import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import { ThemeProvider } from "../context/ThemeContext";
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
    <html lang="id" suppressHydrationWarning>
      <body className="bg-[#FAF7F2] dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 antialiased flex flex-col min-h-screen transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}