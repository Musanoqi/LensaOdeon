"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Menggunakan toggleLanguage sesuai penamaan di Context kamu
  const { language, toggleLanguage } = useLanguage();

  // Cek apakah user berada di homepage
  const isHomePage = pathname === "/";

  // Efek Deteksi Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Penentuan styling background: Putih jika di sub-page atau saat di-scroll
  const showWhiteBg = !isHomePage || isScrolled;

  const navbarBg = showWhiteBg
    ? "bg-white/95 backdrop-blur-md text-stone-800 shadow-md border-b border-stone-200/80"
    : "bg-transparent text-amber-50 border-b border-transparent";

  const logoTitleColor = showWhiteBg ? "text-[#580A14]" : "text-amber-100 drop-shadow";
  const logoSubColor = showWhiteBg ? "text-amber-900/80" : "text-amber-300/90 drop-shadow";
  const navTextColor = showWhiteBg ? "text-stone-700" : "text-amber-100/90";

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-in-out ${navbarBg}`}>
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-500 ease-in-out ${
          showWhiteBg ? "h-16 md:h-20" : "h-20 md:h-24"
        }`}
      >
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo-odeon.png"
            alt="Logo Odeon Kampoeng Naga"
            width={44}
            height={44}
            className="w-10 h-10 md:w-11 md:h-11 object-contain drop-shadow-md transition-transform duration-500 ease-in-out group-hover:scale-105"
            priority
          />
          <div className="flex flex-col">
            <span className={`font-serif font-bold text-lg md:text-xl leading-tight transition-colors duration-500 ease-in-out ${logoTitleColor}`}>
              Odeon
            </span>
            <span className={`text-[10px] tracking-widest uppercase font-semibold transition-colors duration-500 ease-in-out ${logoSubColor}`}>
              Kampoeng Naga
            </span>
          </div>
        </Link>

        {/* Navigation Links Desktop + Highlight Active */}
        <nav className={`hidden md:flex items-center gap-8 font-medium text-sm transition-colors duration-500 ease-in-out ${navTextColor}`}>
          
          {/* Link Beranda */}
          <Link
            href="/"
            className={`relative py-1 transition-colors duration-300 ${
              pathname === "/"
                ? showWhiteBg
                  ? "text-[#580A14] font-bold"
                  : "text-amber-100 font-bold drop-shadow"
                : showWhiteBg
                ? "hover:text-[#580A14]"
                : "hover:text-amber-300 drop-shadow"
            }`}
          >
            {language === "ID" ? "Beranda" : "Home"}
            {pathname === "/" && (
              <span
                className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                  showWhiteBg ? "bg-[#580A14]" : "bg-amber-300"
                }`}
              />
            )}
          </Link>

          {/* Link Atraksi */}
          <Link
            href="/atraksi"
            className={`relative py-1 transition-colors duration-300 ${
              pathname.startsWith("/atraksi")
                ? showWhiteBg
                  ? "text-[#580A14] font-bold"
                  : "text-amber-100 font-bold drop-shadow"
                : showWhiteBg
                ? "hover:text-[#580A14]"
                : "hover:text-amber-300 drop-shadow"
            }`}
          >
            {language === "ID" ? "Atraksi" : "Attractions"}
            {pathname.startsWith("/atraksi") && (
              <span
                className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                  showWhiteBg ? "bg-[#580A14]" : "bg-amber-300"
                }`}
              />
            )}
          </Link>
        </nav>

        {/* Switcher Bahasa Desktop (ID / EN) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all duration-500 ease-in-out ${
              showWhiteBg
                ? "border-stone-300 bg-stone-100/80 text-[#580A14] hover:bg-stone-200"
                : "border-amber-500/30 bg-black/20 backdrop-blur-sm text-amber-200 hover:bg-black/40"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors duration-500 ease-in-out ${
            showWhiteBg ? "text-stone-800 hover:text-[#580A14]" : "text-amber-100 hover:text-amber-300"
          }`}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden px-4 pt-2 pb-6 space-y-3 transition-all duration-500 ease-in-out ${
            showWhiteBg
              ? "bg-white/95 backdrop-blur-md border-b border-stone-200 text-stone-800"
              : "bg-[#3D060D]/95 backdrop-blur-md border-b border-amber-950 text-amber-100"
          }`}
        >
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block py-2 font-medium transition-colors ${
              pathname === "/"
                ? showWhiteBg
                  ? "text-[#580A14] font-bold"
                  : "text-amber-300 font-bold"
                : "hover:opacity-80"
            }`}
          >
            {language === "ID" ? "Beranda" : "Home"}
          </Link>
          <Link
            href="/atraksi"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block py-2 font-medium transition-colors ${
              pathname.startsWith("/atraksi")
                ? showWhiteBg
                  ? "text-[#580A14] font-bold"
                  : "text-amber-300 font-bold"
                : "hover:opacity-80"
            }`}
          >
            {language === "ID" ? "Atraksi" : "Attractions"}
          </Link>
          <div className="pt-2 border-t border-stone-300/30 flex items-center justify-between">
            <span className="text-xs opacity-75">
              {language === "ID" ? "Bahasa" : "Language"}
            </span>
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border transition-colors duration-300 ${
                showWhiteBg
                  ? "border-stone-300 bg-stone-100 text-[#580A14]"
                  : "border-amber-800 text-amber-200"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}