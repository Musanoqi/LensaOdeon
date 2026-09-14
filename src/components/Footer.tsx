"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

const content = {
  ID: {
    ctaLabel: "Siap Menjelajahi Lebih Dekat?",
    ctaTitle1: "Wisata Digital Interaktif di",
    ctaTitle2: "Kampung Odeon Sukabumi",
    ctaDesc:
      "Pindai kode QR di setiap sudut destinasi atau mulai tur virtual 360° Anda sekarang untuk menemukan kekayaan sejarah dan kuliner legendaris.",
    brandDesc:
      "Kawasan wisata budaya pecinan modern yang memadukan warisan sejarah dan denyut ekonomi lokal Kota Sukabumi.",
    navTitle: "Navigasi",
    navHome: "Beranda",
    navAttraction: "Destinasi / Atraksi",
    contactTitle: "Kontak",
    locationTitle: "Lokasi",
    address:
      "Komplek Ruko Danalaga Square, Jl. Pajagalan, Nyomplong, Kota Sukabumi, Jawa Barat 43131",
    mapsButton: "Buka Google Maps",
    rights: "All rights reserved.",
  },
  EN: {
    ctaLabel: "Ready To Explore Closer?",
    ctaTitle1: "Interactive Digital Tourism in",
    ctaTitle2: "Kampung Odeon Sukabumi",
    ctaDesc:
      "Scan the QR code at every destination corner or start your 360° virtual tour now to discover a wealth of history and legendary culinary delights.",
    brandDesc:
      "A modern Chinatown cultural tourism area combining historical heritage and the local economic pulse of Sukabumi City.",
    navTitle: "Navigation",
    navHome: "Home",
    navAttraction: "Destinations / Attractions",
    contactTitle: "Contact",
    locationTitle: "Location",
    address:
      "Danalaga Square Shophouse Complex, Jl. Pajagalan, Nyomplong, Sukabumi City, West Java 43131",
    mapsButton: "Open Google Maps",
    rights: "All rights reserved.",
  },
} as const;

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language as keyof typeof content] ?? content.ID;

  // Konfigurasi Kontak (Ganti nomor WA & Email di sini jika ada perubahan)
  const whatsappNumber = "6281234567890"; // Format nomor tanpa '+' atau '0' di depan
  const emailAddress = "info@odeon.id";

  return (
    <footer className="bg-[#FAF7F2] dark:bg-[#3D060D] text-stone-800 dark:text-amber-50/90 pt-16 pb-8 border-t border-stone-200 dark:border-amber-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center px-4 mb-16">
        <span className="text-xs tracking-widest text-[#580A14] dark:text-amber-300 uppercase font-semibold">
          {t.ctaLabel}
        </span>
        <h2 className="font-serif text-2xl md:text-4xl text-stone-900 dark:text-amber-100 font-bold mt-2 mb-4">
          {t.ctaTitle1} <br className="hidden sm:inline" />
          <span className="italic font-normal">{t.ctaTitle2}</span>
        </h2>
        <p className="text-sm text-stone-600 dark:text-amber-200/70 max-w-xl mx-auto">{t.ctaDesc}</p>
      </div>

      <hr className="border-stone-300 dark:border-amber-900/40 max-w-7xl mx-auto mb-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-odeon.png"
              alt="Logo Odeon Kampoeng Naga"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
            />
            <span className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">
              Odeon Kampoeng Naga
            </span>
          </div>
          <p className="text-xs text-stone-500 dark:text-amber-200/60 leading-relaxed">{t.brandDesc}</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#580A14] dark:text-amber-200 uppercase text-xs tracking-wider mb-3">
            {t.navTitle}
          </h3>
          <ul className="space-y-2 text-xs text-stone-600 dark:text-amber-200/70">
            <li>
              <Link href="/" className="hover:text-[#580A14] dark:hover:text-amber-100 transition-colors">
                {t.navHome}
              </Link>
            </li>
            <li>
              <Link href="/atraksi" className="hover:text-[#580A14] dark:hover:text-amber-100 transition-colors">
                {t.navAttraction}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#580A14] dark:text-amber-200 uppercase text-xs tracking-wider mb-3">
            {t.contactTitle}
          </h3>
          <ul className="space-y-2.5 text-xs text-stone-600 dark:text-amber-200/70">
            {/* LINK WHATSAPP */}
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#580A14] dark:text-amber-400 shrink-0" />
              <a
                href={`https://wa.me/${+6281234567890}?text=Halo%20Odeon%20Kampoeng%20Naga,%20saya%20ingin%20bertanya%20informasi%20wisata.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[#580A14] dark:hover:text-amber-200 transition-colors"
              >
                +62 812-3456-7890
              </a>
            </li>

            {/* LINK INSTAGRAM */}
            <li className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#580A14] dark:text-amber-400 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <a
                href="https://www.instagram.com/kampoengnagaodeon/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[#580A14] dark:hover:text-amber-200 transition-colors"
              >
                @kampoengnagaodeon
              </a>
            </li>

            {/* LINK EMAIL */}
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#580A14] dark:text-amber-400 shrink-0" />
              <a
                href={`mailto:${emailAddress}`}
                className="hover:underline hover:text-[#580A14] dark:hover:text-amber-200 transition-colors"
              >
                {emailAddress}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#580A14] dark:text-amber-200 uppercase text-xs tracking-wider mb-3">
            {t.locationTitle}
          </h3>
          <p className="text-xs text-stone-600 dark:text-amber-200/70 mb-3 leading-relaxed">{t.address}</p>
          <a
            href="https://maps.app.goo.gl/KwzdYYTGvgw4eEnZ7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs bg-stone-200 hover:bg-[#580A14] dark:bg-amber-950/80 dark:hover:bg-amber-900 border border-stone-300 dark:border-amber-800 text-stone-700 hover:text-white dark:text-amber-200 px-3 py-1.5 rounded-md transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#580A14] dark:text-amber-400" />
            <span>{t.mapsButton}</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-stone-200 dark:border-amber-950 text-center text-xs text-stone-400 dark:text-amber-200/40">
        © {new Date().getFullYear()} Lensa Odeon Kampoeng Naga. {t.rights}
      </div>
    </footer>
  );
}