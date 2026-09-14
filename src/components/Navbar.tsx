"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

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

  // Penentuan styling background: Putih/Gelap jika di sub-page atau saat di-scroll
  const showSolidBg = !isHomePage || isScrolled;

  const navbarBg = showSolidBg
    ? "bg-white/95 dark:bg-[#1C1917]/95 backdrop-blur-md text-stone-800 dark:text-stone-100 shadow-md border-b border-stone-200/80 dark:border-stone-800/80"
    : "bg-transparent text-amber-50 border-b border-transparent";

  const logoTitleColor = showSolidBg ? "text-[#580A14] dark:text-amber-500" : "text-amber-100 drop-shadow";
  const logoSubColor = showSolidBg ? "text-amber-900/80 dark:text-amber-200/80" : "text-amber-300/90 drop-shadow";
  const navTextColor = showSolidBg ? "text-stone-700 dark:text-stone-300" : "text-amber-100/90";

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-in-out ${navbarBg}`}>
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-500 ease-in-out ${
          showSolidBg ? "h-16 md:h-20" : "h-20 md:h-24"
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
                ? showSolidBg
                  ? "text-[#580A14] dark:text-amber-500 font-bold"
                  : "text-amber-100 font-bold drop-shadow"
                : showSolidBg
                ? "hover:text-[#580A14] dark:hover:text-amber-400"
                : "hover:text-amber-300 drop-shadow"
            }`}
          >
            {language === "ID" ? "Beranda" : "Home"}
            {pathname === "/" && (
              <span
                className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                  showSolidBg ? "bg-[#580A14] dark:bg-amber-500" : "bg-amber-300"
                }`}
              />
            )}
          </Link>

          {/* Link Atraksi */}
          <Link
            href="/atraksi"
            className={`relative py-1 transition-colors duration-300 ${
              pathname.startsWith("/atraksi")
                ? showSolidBg
                  ? "text-[#580A14] dark:text-amber-500 font-bold"
                  : "text-amber-100 font-bold drop-shadow"
                : showSolidBg
                ? "hover:text-[#580A14] dark:hover:text-amber-400"
                : "hover:text-amber-300 drop-shadow"
            }`}
          >
            {language === "ID" ? "Atraksi" : "Attractions"}
            {pathname.startsWith("/atraksi") && (
              <span
                className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                  showSolidBg ? "bg-[#580A14] dark:bg-amber-500" : "bg-amber-300"
                }`}
              />
            )}
          </Link>

          {/* Link Web Utama Odeon */}
          <Link
            href="https://www.odeonsukabumi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative py-1 transition-colors duration-300 ${
              showSolidBg
                ? "hover:text-[#580A14] dark:hover:text-amber-400"
                : "hover:text-amber-300 drop-shadow"
            }`}
          >
            {language === "ID" ? "Web Utama Odeon" : "Odeon Main Web"}
          </Link>
        </nav>

        {/* Action Buttons Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Switcher Bahasa */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all duration-500 ease-in-out ${
              showSolidBg
                ? "border-stone-300 dark:border-stone-700 bg-stone-100/80 dark:bg-stone-800/80 text-[#580A14] dark:text-amber-500 hover:bg-stone-200 dark:hover:bg-stone-700"
                : "border-amber-500/30 bg-black/20 backdrop-blur-sm text-amber-200 hover:bg-black/40"
            }`}
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language}</span>
          </button>

          {/* Switcher Tema */}
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ease-in-out ${
              showSolidBg
                ? "border-stone-300 dark:border-stone-700 bg-stone-100/80 dark:bg-stone-800/80 text-[#580A14] dark:text-amber-500 hover:bg-stone-200 dark:hover:bg-stone-700"
                : "border-amber-500/30 bg-black/20 backdrop-blur-sm text-amber-200 hover:bg-black/40"
            }`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors duration-500 ease-in-out ${
            showSolidBg ? "text-stone-800 dark:text-stone-200 hover:text-[#580A14] dark:hover:text-amber-500" : "text-amber-100 hover:text-amber-300"
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
            showSolidBg
              ? "bg-white/95 dark:bg-[#1C1917]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
              : "bg-[#3D060D]/95 backdrop-blur-md border-b border-amber-950 text-amber-100"
          }`}
        >
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block py-2 font-medium transition-colors ${
              pathname === "/"
                ? showSolidBg
                  ? "text-[#580A14] dark:text-amber-500 font-bold"
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
                ? showSolidBg
                  ? "text-[#580A14] dark:text-amber-500 font-bold"
                  : "text-amber-300 font-bold"
                : "hover:opacity-80"
            }`}
          >
            {language === "ID" ? "Atraksi" : "Attractions"}
          </Link>
          <Link
            href="https://www.odeonsukabumi.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block py-2 font-medium transition-colors hover:opacity-80`}
          >
            {language === "ID" ? "Web Utama Odeon" : "Odeon Main Web"}
          </Link>
          
          <div className="pt-2 mt-2 border-t border-stone-300/30 dark:border-stone-700/50 flex items-center justify-between">
            <span className="text-xs opacity-75">
              {language === "ID" ? "Pengaturan" : "Settings"}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-300 ${
                  showSolidBg
                    ? "border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-[#580A14] dark:text-amber-500"
                    : "border-amber-800 text-amber-200"
                }`}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors duration-300 ${
                  showSolidBg
                    ? "border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-[#580A14] dark:text-amber-500"
                    : "border-amber-800 text-amber-200"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}