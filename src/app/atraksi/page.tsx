"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import FadeIn from "../../components/FadeIn";

// Rumus Haversine untuk Menghitung Jarak Real-Time (dalam Meter atau Kilometer)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): string {
  const R = 6371e3; // Jari-jari bumi dalam meter
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // dalam meter

  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  }
  return `${(distance / 1000).toFixed(1)}km`;
}

// Data 3 Atraksi Utama dengan Koordinat Lat & Lng
const attractionsData = [
  {
    id: "vihara-widhi-sakti",
    category: {
      ID: "Cagar Budaya & Klenteng Bersejarah (1908)",
      EN: "Heritage Site & Historic Temple (1908)",
    },
    title: "Vihara Widhi Sakti (Odeon)",
    subtitle: {
      ID: "Klenteng Bersejarah Sejak 1908",
      EN: "Historic Temple Since 1908",
    },
    desc: {
      ID: "Klenteng megah berumur satu abad lebih, pusat sejarah dan spiritual kawasan Odeon dengan ornamen naga kembar yang ikonik dan tradisi Cap Go Meh.",
      EN: "A century-old grand temple, the historical and spiritual heart of the Odeon area featuring iconic twin dragon ornaments and Cap Go Meh traditions.",
    },
    lat: -6.924823,
    lng: 106.924194,
    fallbackDistance: "50m",
    image: "/bckodeon2.png",
  },
  {
    id: "museum-tionghoa-sukabumi",
    category: {
      ID: "Museum & Cagar Budaya",
      EN: "Museum & Cultural Heritage",
    },
    title: "Museum Tionghoa Sukabumi",
    subtitle: {
      ID: "Pusat Dokumentasi Sejarah & Artefak Pusaka",
      EN: "Center for Historical Documentation & Heritage Artifacts",
    },
    desc: {
      ID: "Menyimpan koleksi berharga rekam jejak sejarah Sukabumi tempo doeloe, naskah kuno, foto kolonial otentik, dan artefak kebudayaan lokal Sunda-Tionghoa.",
      EN: "Houses a valuable collection recording historic Sukabumi, ancient manuscripts, authentic colonial photos, and local Sundanese-Chinese cultural artifacts.",
    },
    lat: -6.92465,
    lng: 106.9245,
    fallbackDistance: "30m",
    image: "/museum.png",
  },
  {
    id: "odeon-kopitiam",
    category: {
      ID: "Kedai Kopi Otentik Pecinan",
      EN: "Authentic Chinatown Coffee Shop",
    },
    title: "Odeon Kopitiam",
    subtitle: {
      ID: "Kuliner & Warisan Pecinan",
      EN: "Culinary & Chinatown Heritage",
    },
    desc: {
      ID: "Temukan nostalgia secangkir kopi bubuk dan kudapan hangat di kedai bermuansa tempo dulu yang autentik dengan interior kayu antik khas Pecinan.",
      EN: "Discover the nostalgia of a cup of traditional coffee and warm snacks in an authentic vintage coffee shop with classic Chinatown wooden interiors.",
    },
    lat: -6.92211,
    lng: 106.92688,
    fallbackDistance: "350m",
    image: "/kopi.png",
  },
];

const pageText = {
  ID: {
    badge: "Panduan Kawasan Bersejarah Pecinan",
    title: "Eksplorasi Kawasan Bersejarah &\nKuliner Pecinan Sukabumi",
    desc: "Menelusuri jejak akulturasi budaya, klenteng abad ke-20, museum pusaka berharga, dan kenikmatan citarasa legendaris yang terjaga melintasi generasi di kawasan Odeon.",
    moreInfo: "Info Selengkapnya",
  },
  EN: {
    badge: "Chinatown Historical Area Guide",
    title: "Explore Historic Areas &\nSukabumi Chinatown Culinary",
    desc: "Tracing the footsteps of cultural acculturation, 20th-century temples, precious heritage museums, and legendary culinary delights preserved across generations in the Odeon area.",
    moreInfo: "More Details",
  },
};

export default function AtraksiPage() {
  const { language } = useLanguage();
  const t = pageText[language as keyof typeof pageText] ?? pageText.ID;

  // State penyimpan jarak real-time berdasarkan ID destinasi
  const [realDistances, setRealDistances] = useState<Record<string, string>>({});

  // Efek Deteksi GPS Real-Time
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          const distances: Record<string, string> = {};
          attractionsData.forEach((item) => {
            distances[item.id] = calculateDistance(
              userLat,
              userLng,
              item.lat,
              item.lng
            );
          });
          setRealDistances(distances);
        },
        () => {
          // Fallback ke jarak standar jika GPS di-deny / error
          const fallbackMap: Record<string, string> = {};
          attractionsData.forEach((item) => {
            fallbackMap[item.id] = item.fallbackDistance;
          });
          setRealDistances(fallbackMap);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      const fallbackMap: Record<string, string> = {};
      attractionsData.forEach((item) => {
        fallbackMap[item.id] = item.fallbackDistance;
      });
      setRealDistances(fallbackMap);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF8F5] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER PAGE */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <FadeIn direction="down" delay={0.1}>
            <span className="inline-block text-xs uppercase tracking-widest text-[#580A14] bg-amber-100/80 border border-amber-200/80 font-semibold px-4 py-1.5 rounded-full shadow-sm">
              {t.badge}
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight whitespace-pre-line">
              {t.title}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t.desc}
            </p>
          </FadeIn>
        </section>

        {/* GRID CARD ATRAKSI (3 ITEMS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractionsData.map((item, idx) => (
            <FadeIn key={item.id} direction="up" delay={0.15 * (idx + 1)}>
              <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full group">
                <div>
                  {/* GAMBAR CARD & BADGE KATEGORI */}
                  <div className="relative w-full h-52 bg-stone-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-amber-200 text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-900/40">
                      {item.category[language as "ID" | "EN"] ?? item.category.ID}
                    </div>
                  </div>

                  {/* DESKRIPSI CARD */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="font-serif font-bold text-xl text-stone-900 leading-snug">
                          {item.title}
                        </h2>
                        <p className="text-xs font-medium text-[#580A14] mt-0.5">
                          {item.subtitle[language as "ID" | "EN"] ?? item.subtitle.ID}
                        </p>
                      </div>

                      {/* INDIKATOR JARAK REAL-TIME */}
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full shrink-0">
                        <MapPin className="w-3 h-3 text-amber-600 animate-pulse" />
                        <span>{realDistances[item.id] || "..."}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {item.desc[language as "ID" | "EN"] ?? item.desc.ID}
                    </p>
                  </div>
                </div>

                {/* BUTTON LINK KE PAGE DETAIL */}
                <div className="p-6 pt-0 flex justify-end">
                  <Link
                    href={`/atraksi/${item.id}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 bg-stone-50 hover:bg-[#580A14] hover:text-white border border-stone-200 py-2.5 px-4 rounded-xl transition-all duration-200"
                  >
                    <span>{t.moreInfo}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </section>

      </div>
    </main>
  );
}