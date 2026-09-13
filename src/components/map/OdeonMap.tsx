"use client";

import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ATTRACTIONS_DATA, Attraction } from "../../data/attractions";
import { MapPin, ExternalLink, X, Clock, Navigation } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const ODEON_CENTER: [number, number] = [-6.92185, 106.9235];

function GoogleTileLayer() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const googleTile = L.tileLayer(
      "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        attribution: "&copy; Google Maps",
        maxZoom: 21,
      }
    );

    googleTile.addTo(map);

    return () => {
      if (map && googleTile) {
        map.removeLayer(googleTile);
      }
    };
  }, [map]);

  return null;
}

const createCustomMarker = (name: string, category: string, isHovered: boolean) => {
  const isHeritage = category === "Wisata & Budaya" || category === "Heritage & Culture";
  const bgColor = isHeritage ? "#8E2828" : "#D97706";
  const size = isHovered ? 48 : 40;

  return L.divIcon({
    className: "custom-odeon-pin",
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translate(-50%, -100%); cursor: pointer;">
        <div style="
          background-color: ${bgColor};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2.5px solid white;
          box-shadow: 0 4px 14px rgba(0,0,0,0.4);
          transition: all 0.2s ease-in-out;
        ">
          <div style="transform: rotate(45deg); color: white; display: flex; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="${isHovered ? 22 : 18}" height="${isHovered ? 22 : 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
        </div>
        
        <div style="
          margin-top: 6px;
          background-color: #3D060D;
          color: #F59E0B;
          font-weight: 700;
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 8px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.3);
          border: 1.5px solid #580A14;
          white-space: nowrap;
          font-family: sans-serif;
          letter-spacing: 0.3px;
        ">
          ${name}
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const mapContent = {
  ID: {
    allFilter: "Semua",
    heritageFilter: "Wisata & Budaya",
    culinaryFilter: "Kuliner Legendaris",
    guideButton: "📖 Panduan Peta",
    guideBadge: "Panduan Eksplorasi Odeon",
    guideTitle: "Jelajahi titik ikonik di kawasan pecinan",
    guideDesc: "Arahkan kursor ke titik lokasi untuk melihat info lengkap secara interaktif.",
    guideItem1Title: "Hover / Klik Pin Marker",
    guideItem1Desc: "Buka kartu info detail dan petunjuk arah langsung di lokasi pin.",
    guideItem2Title: "Tampilan Google Maps",
    guideItem2Desc: "Peta menggunakan Google Maps Roadmap asli.",
    getDirections: "Petunjuk Arah",
    footerTitle: "Kawasan Cagar Budaya & Kuliner Odeon Sukabumi",
    footerAddress: "Jl. Pajagalan, Nyomplong, Kec. Warudoyong, Kota Sukabumi, Jawa Barat 43131",
    openGmaps: "Buka di Google Maps",
  },
  EN: {
    allFilter: "All",
    heritageFilter: "Heritage & Culture",
    culinaryFilter: "Legendary Culinary",
    guideButton: "📖 Map Guide",
    guideBadge: "Odeon Exploration Guide",
    guideTitle: "Explore iconic spots in the Chinatown area",
    guideDesc: "Hover over map markers to view detailed information interactively.",
    guideItem1Title: "Hover / Click Pin Marker",
    guideItem1Desc: "Open detailed info card and directions directly at the pin position.",
    guideItem2Title: "Google Maps View",
    guideItem2Desc: "Map rendered using genuine Google Maps Roadmap.",
    getDirections: "Get Directions",
    footerTitle: "Odeon Sukabumi Cultural Heritage & Culinary Area",
    footerAddress: "Jl. Pajagalan, Nyomplong, Warudoyong, Sukabumi City, West Java 43131",
    openGmaps: "Open in Google Maps",
  },
};

// Terjemahan Deskripsi berdasarkan ID Lokasi Asli
const ATTRACTION_TRANSLATIONS_EN: Record<string, { category: string; description: string }> = {
  "vihara-widhi-sakti": {
    category: "Heritage & Culture",
    description: "A historic Chinese temple in the Odeon area featuring classic Chinese architectural ornaments and traditional lanterns.",
  },
  "odeon-kopitiam": {
    category: "Legendary Culinary",
    description: "A classic vintage coffee shop serving traditional snacks and a favorite relaxing spot for tourists.",
  },
  "museum-tionghoa-sukabumi": {
    category: "Heritage & Culture",
    description: "A museum showcasing the history, artifacts, and cultural journey of ethnic Chinese heritage in Soekaboemi.",
  },
};

export default function OdeonMap() {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(true);

  const { language } = useLanguage();
  const t = mapContent[language as keyof typeof mapContent] ?? mapContent.ID;

  const overallKawasanGmapsUrl = "https://maps.google.com/?q=Odeon+Kampoeng+Naga+Sukabumi";

  const filteredAttractions = ATTRACTIONS_DATA.filter((item) => {
    if (activeCategory === "Semua") return true;
    if (activeCategory === "Wisata & Budaya") return item.category === "Wisata & Budaya";
    if (activeCategory === "Kuliner Legendaris") return item.category === "Kuliner Legendaris";
    return true;
  });

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-stone-200/90 space-y-6">
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 1rem !important;
          overflow: hidden !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: 320px !important;
        }
        .leaflet-container {
          font-family: inherit !important;
        }
      `}</style>

      {/* 1. Header & Filter Kategori */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCategory("Semua")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              activeCategory === "Semua"
                ? "bg-[#580A14] text-white shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {t.allFilter} ({ATTRACTIONS_DATA.length} {language === "ID" ? "Titik" : "Spots"})
          </button>
          <button
            onClick={() => setActiveCategory("Wisata & Budaya")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeCategory === "Wisata & Budaya"
                ? "bg-[#580A14] text-white shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#580A14]" />
            {t.heritageFilter} (2)
          </button>
          <button
            onClick={() => setActiveCategory("Kuliner Legendaris")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeCategory === "Kuliner Legendaris"
                ? "bg-amber-700 text-white shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-700" />
            {t.culinaryFilter} (1)
          </button>
        </div>

        <button
          onClick={() => setShowGuide(!showGuide)}
          className="text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors flex items-center gap-1"
        >
          {t.guideButton}
        </button>
      </div>

      {/* 2. Banner Panduan */}
      {showGuide && (
        <div className="relative bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 md:p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700">
          <button
            onClick={() => setShowGuide(false)}
            className="absolute top-3 right-3 text-stone-400 hover:text-stone-700"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="md:col-span-1 space-y-1 border-b md:border-b-0 md:border-r border-amber-200/60 pb-3 md:pb-0 md:pr-4">
            <span className="text-[10px] uppercase font-bold text-[#580A14] tracking-wider">
              {t.guideBadge}
            </span>
            <h4 className="font-serif font-bold text-sm text-stone-900">
              {t.guideTitle}
            </h4>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              {t.guideDesc}
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-0.5">
              <strong className="text-stone-900 font-semibold">• {t.guideItem1Title}</strong>
              <p className="text-stone-600 text-[11px]">{t.guideItem1Desc}</p>
            </div>
            <div className="space-y-0.5">
              <strong className="text-stone-900 font-semibold">• {t.guideItem2Title}</strong>
              <p className="text-stone-600 text-[11px]">{t.guideItem2Desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Peta Interaktif Utama */}
      <div className="relative w-full h-[480px] md:h-[520px] rounded-2xl overflow-hidden border border-stone-200 z-10 shadow-inner">
        <MapContainer
          center={ODEON_CENTER}
          zoom={17}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <GoogleTileLayer />

          {filteredAttractions.map((item: Attraction) => {
            const isHovered = hoveredId === item.id;
            
            const categoryText =
              language === "EN"
                ? ATTRACTION_TRANSLATIONS_EN[item.id]?.category ?? item.category
                : item.category;

            const descriptionText =
              language === "EN"
                ? ATTRACTION_TRANSLATIONS_EN[item.id]?.description ?? item.description
                : item.description;

            return (
              <Marker
                key={item.id}
                position={[item.location.lat, item.location.lng]}
                icon={createCustomMarker(item.name, item.category, isHovered)}
                eventHandlers={{
                  mouseover: (e) => {
                    setHoveredId(item.id);
                    e.target.openPopup();
                  },
                  mouseout: () => setHoveredId(null),
                }}
              >
                <Popup className="custom-popup-card" autoPan={true}>
                  <div className="bg-white p-4 space-y-3">
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-xl bg-[#580A14] text-amber-100 flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#580A14] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {categoryText}
                        </span>
                        <h3 className="font-serif font-bold text-base text-stone-900 leading-snug pt-1.5">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {descriptionText}
                    </p>

                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-stone-100">
                      <div className="flex items-center gap-1 text-[11px] text-stone-500">
                        <Clock className="w-3.5 h-3.5 text-[#580A14]" />
                        <span>{item.operationalHours}</span>
                      </div>
                      <a
                        href={item.location.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#580A14] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-900 transition-colors shadow-sm"
                      >
                        <span className="text-white">{t.getDirections}</span>
                        <Navigation className="w-3 h-3 text-white" />
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* 4. Footer Bar Peta */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-700 font-medium">
          <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-[#580A14]" />
          </div>
          <div>
            <strong className="block text-stone-900">{t.footerTitle}</strong>
            <span className="text-stone-500 text-[11px]">{t.footerAddress}</span>
          </div>
        </div>

        <a
          href={overallKawasanGmapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#580A14] hover:bg-amber-900 text-amber-100 px-4 py-2.5 rounded-xl font-semibold transition-colors shrink-0 shadow-sm"
        >
          <span>{t.openGmaps}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}