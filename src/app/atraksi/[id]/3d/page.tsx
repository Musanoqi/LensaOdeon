"use client";

import { use, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Maximize2,
  Minimize2,
  Compass,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Landmark,
} from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import FadeIn from "../../../../components/FadeIn";

// Deklarasi Tipe untuk Custom Element <model-viewer>
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          poster?: string;
          loading?: string;
          reveal?: string;
          "auto-rotate"?: boolean | string;
          "auto-rotate-delay"?: string | number;
          "camera-controls"?: boolean | string;
          "shadow-intensity"?: string;
          exposure?: string;
          "interaction-prompt"?: string;
          "camera-orbit"?: string;
          "camera-target"?: string;
          "field-of-view"?: string;
          "min-field-of-view"?: string;
          "max-field-of-view"?: string;
        },
        HTMLElement
      >;
    }
  }
}

// DATA MODEL 3D & ATRAKSI PER DESTINASI
const model3dDetailData: Record<
  string,
  {
    title: string;
    badgeTag: { ID: string; EN: string };
    modelPath: string;
    posterImage: string;
    mapsUrl: string;
    tour360Title: { ID: string; EN: string };
    tour360Desc: { ID: string; EN: string };
    tour360Image: string;
    infoParagraphs: { ID: string[]; EN: string[] };
  }
> = {
  "vihara-widhi-sakti": {
    title: "Vihara Widhi Sakti (Odeon)",
    badgeTag: {
      ID: "Live Preview: Vihara Widhi Sakti",
      EN: "Live Preview: Vihara Widhi Sakti",
    },
    modelPath: "/models/vihara-widhi-sakti.glb",
    posterImage: "/bckodeon2.png",
    mapsUrl: "https://maps.app.goo.gl/mU85gP1Mh4HjBSVt7",
    tour360Title: {
      ID: "TUR VIRTUAL 360° VIHARA WIDHI SAKTI",
      EN: "360° VIRTUAL TOUR VIHARA WIDHI SAKTI",
    },
    tour360Desc: {
      ID: "Jelajahi setiap sudut serambi dan altar Vihara Widhi Sakti secara imersif dari perangkat Anda.",
      EN: "Explore every corner of the porch and altar of Vihara Widhi Sakti interactively from your device.",
    },
    tour360Image: "/bckodeon.png",
    infoParagraphs: {
      ID: [
        "Model 3D interaktif ini memungkinkan Anda menjelajahi kawasan cagar budaya Odeon dan Vihara Widhi Sakti secara leluasa layaknya berada langsung di lokasi. Anda dapat memutar bebas 360° model bangunan secara orbital, mengamati gerbang utama megah, pelataran suci, hingga serambi depan dari segala sudut pandang yang diinginkan.",
        "Ubah ketinggian dan sudut pandang kamera dengan mudah, mulai dari perspektif pejalan kaki di lantai dasar hingga pandangan mata burung (bird's-eye view) ke arah lengkungan atap pelana khas arsitektur Tionghoa tradisional. Pengalaman ini memberi kebebasan penuh dalam memahami tata ruang dan keagungan arsitektur bangunan bersejarah ini.",
        "Gunakan kontrol zoom sedekat mungkin untuk mengamati detail keindahan ukiran kayu antik, relief naga pada pilar altar, kaligrafi prasasti bersejarah, dan sambungan konstruksi pasak kayu tradisional tanpa paku yang menjadi mahakarya pertukangan masa lampau.",
        "Banyak ornamen puncak atap dan ukiran dinding yang biasanya sulit disaksikan dengan mata telanjang kini dapat Anda inspeksi secara jelas dan tajam. Setiap tekstur material, warna cat alami, dan lekukan arsitektur tersaji nyata untuk memberi pengalaman apresiasi warisan budaya yang mendalam dan berkesan.",
      ],
      EN: [
        "This interactive 3D model allows you to explore the Odeon cultural heritage area and Vihara Widhi Sakti freely as if you were right on site. You can orbit the 360° building model, observing the grand main gate, sacred courtyard, and front porch from any desired angle.",
        "Adjust camera height and viewing angles effortlessly—from a pedestrian perspective on the ground floor to a bird's-eye view looking down at the traditional Chinese curved gabled roof. This experience offers complete freedom to comprehend the spatial layout and architectural grandeur of this historic building.",
        "Utilize zoom controls to closely inspect intricate antique wood carvings, dragon reliefs on altar pillars, historic calligraphic inscriptions, and traditional nail-less wooden joint constructions showcasing historic craftsmanship.",
        "Roof peak ornaments and wall carvings that are typically difficult to see with the naked eye can now be clearly inspected in sharp detail. Texture materials, natural paint tones, and architectural curves come alive for a memorable cultural appreciation.",
      ],
    },
  },
  "museum-tionghoa-sukabumi": {
    title: "Museum Tionghoa Sukabumi",
    badgeTag: {
      ID: "Live Preview: Museum Tionghoa",
      EN: "Live Preview: Museum Tionghoa",
    },
    modelPath: "/models/museum-tionghoa-sukabumi.glb",
    posterImage: "/museum.png",
    mapsUrl: "https://maps.app.goo.gl/EcwLpaoG9jtL3PKR8",
    tour360Title: {
      ID: "TUR VIRTUAL 360° MUSEUM TIONGHOA",
      EN: "360° VIRTUAL TOUR MUSEUM TIONGHOA",
    },
    tour360Desc: {
      ID: "Jelajahi setiap sudut ruang pameran museum secara imersif dari perangkat Anda.",
      EN: "Explore every corner of the museum exhibition rooms interactively from your device.",
    },
    tour360Image: "/museum.png",
    infoParagraphs: {
      ID: [
        "Model 3D interaktif ini memungkinkan Anda menjelajahi ruang arsitektur Museum Tionghoa Sukabumi secara mendalam. Anda dapat mengamati detail fasad bangunan kolonial berpadu ornamen etnis yang menjadi ruang dokumentasi pusaka bersejarah.",
        "Gunakan fitur rotasi 360° untuk melihat posisi pintu masuk utama, deretan jendela ventilasi klasik khas era 1930-an, serta tata letak ruang pameran koleksi arsip tempo doeloe.",
        "Perbesar tampilan untuk memperhatikan tekstur dinding, pola ubin kuno, hingga susunan konstruksi interior museum yang dirawat keotentikannya.",
        "Visualisasi ini dirancang untuk mempermudah pengunjung, peneliti, dan wisatawan dalam mengapresiasi keindahan fisik bangunan cagar budaya sebelum melakukan kunjungan langsung secara fisik.",
      ],
      EN: [
        "This interactive 3D model allows an in-depth exploration of the Museum Tionghoa Sukabumi architectural space. Observe colonial building facade details combined with ethnic ornaments housing historic heritage documentation.",
        "Use the 360° rotation feature to inspect the main entrance, 1950s classic ventilation windows, and the spatial arrangement of exhibition rooms.",
        "Zoom in to examine wall textures, antique tile patterns, and authentic interior wooden frameworks preserved across time.",
        "This visualization is crafted for visitors, researchers, and tourists to appreciate the physical beauty of heritage sites prior to visiting in person.",
      ],
    },
  },
  "odeon-kopitiam": {
    title: "Odeon Kopitiam",
    badgeTag: {
      ID: "Live Preview: Odeon Kopitiam",
      EN: "Live Preview: Odeon Kopitiam",
    },
    modelPath: "/models/odeon-kopitiam.glb",
    posterImage: "/kopi.png",
    mapsUrl: "https://maps.app.goo.gl/2ueuSEwr7mZLrY1q6",
    tour360Title: {
      ID: "TUR VIRTUAL 360° ODEON KOPITIAM",
      EN: "360° VIRTUAL TOUR ODEON KOPITIAM",
    },
    tour360Desc: {
      ID: "Jelajahi kehangatan interior dan meja marmer vintage Odeon Kopitiam secara imersif.",
      EN: "Explore the cozy interior and vintage marble tables of Odeon Kopitiam interactively.",
    },
    tour360Image: "/kopi.png",
    infoParagraphs: {
      ID: [
        "Visualisasi 3D Odeon Kopitiam menghadirkan pesona arsitektur kedai kopi tradisional khas Pecinan tempo dulu secara interaktif dari layar perangkat Anda.",
        "Anda dapat memutar sudut pandang untuk memperhatikan serambi depan kedai, papan nama kayu klasik, serta tata ruang tempat duduk yang hangat dan bernostalgia.",
        "Zoom dan amati ornamen antik, marmer meja klasik, serta detail kayu ukir yang menghiasi sudut-sudut kedai legendaris ini.",
        "Nikmati pengalaman mengamati estetika kedai kopi bersejarah yang menjadi pusat kehangatan komunitas dan wisata kuliner khas Odeon Sukabumi.",
      ],
      EN: [
        "The 3D visualization of Odeon Kopitiam presents the interactive charm of traditional Chinatown coffee shop architecture directly on your device.",
        "Rotate viewing angles to inspect the front porch, classic wooden signage, and nostalgic seating arrangements.",
        "Zoom in to explore antique ornaments, traditional marble tables, and carved wood accents decorating this legendary cafe.",
        "Enjoy inspecting the aesthetics of a historic coffee shop serving as a hub for community warmth and Chinatown culinary heritage.",
      ],
    },
  },
};

export default function Model3DDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const { language } = useLanguage();

  const data = model3dDetailData[id];
  const lang = (language as "ID" | "EN") || "ID";

  const containerRef = useRef<HTMLDivElement>(null);
  const modelViewerRef = useRef<any>(null);

  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [zoomValue, setZoomValue] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Script Loader untuk Google <model-viewer> & Event Listener Kamera Zoom Sync
  useEffect(() => {
    const srcUrl = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";
    let script = document.querySelector(`script[src="${srcUrl}"]`) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement("script");
      script.type = "module";
      script.src = srcUrl;
      document.head.appendChild(script);
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // SINKRONISASI SLIDER DENGAN ZOOM MANUAL (PINCH / SCROLL WHEEL)
    const viewer = modelViewerRef.current;
    const handleCameraChange = () => {
      if (!viewer) return;

      // Ambil nilai Field of View (FOV) saat ini dari model-viewer (misal: "45deg")
      const currentFovStr = viewer.getFieldOfView(); 
      if (!currentFovStr) return;

      const currentFov = parseFloat(currentFovStr);
      const minFov = 20; // Sesuai min-field-of-view="20deg"
      const maxFov = 65; // Sesuai max-field-of-view="65deg"

      // Hitung persentase slider (0 - 100) berdasarkan selisih FOV
      const calculatedVal = ((maxFov - currentFov) / (maxFov - minFov)) * 100;
      const clampedVal = Math.max(0, Math.min(100, calculatedVal));

      setZoomValue(clampedVal);
    };

    if (viewer) {
      viewer.addEventListener("camera-change", handleCameraChange);
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (viewer) {
        viewer.removeEventListener("camera-change", handleCameraChange);
      }
    };
  }, []);

  if (!data) {
    notFound();
  }

  // Toggle Auto Rotate
  const toggleAutoRotate = () => {
    setIsAutoRotate(!isAutoRotate);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Reset Posisi Bangunan 3D & Kamera View ke Awal
  const handleResetView = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = "0deg 75deg 105%";
      modelViewerRef.current.cameraTarget = "auto auto auto";
      modelViewerRef.current.fieldOfView = "45deg";

      if (typeof modelViewerRef.current.resetTurntable === "function") {
        modelViewerRef.current.resetTurntable();
      }

      setZoomValue(50);
    }
  };

  // Slider Zoom Control Manual
  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setZoomValue(val);
    if (modelViewerRef.current) {
      const fov = 65 - (val / 100) * 45;
      modelViewerRef.current.fieldOfView = `${fov}deg`;
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#1C1917] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER JUDUL PAGE */}
        <section className="text-center max-w-3xl mx-auto space-y-3">
          <FadeIn direction="down" delay={0.1}>
            <span className="inline-block text-xs uppercase tracking-widest text-[#580A14] dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/80 border border-amber-200/80 dark:border-amber-800/60 font-bold px-4 py-1.5 rounded-full shadow-sm">
              JELAJAH 3D INTERAKTIF
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
              {lang === "ID"
                ? "Jelajahi Kawasan Bersejarah Pecinan Sukabumi dalam Dimensi 3D"
                : "Explore Sukabumi Chinatown Historic Area in 3D Dimension"}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              {lang === "ID"
                ? "Eksplorasi detail arsitektur cagar budaya, museum pusaka, dan jejak akulturasi Pecinan Sukabumi melalui visualisasi 3D yang interaktif."
                : "Explore details of heritage architecture, museums, and cultural acculturation through interactive 3D visualizations."}
            </p>
          </FadeIn>
        </section>

        {/* CONTAINER VIEW 3D */}
        <FadeIn direction="up" delay={0.25}>
          <div className="space-y-3">
            
            {/* BUTTON LIHAT PETA */}
            <div className="flex items-center justify-between px-1">
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 px-3.5 py-1.5 rounded-xl shadow-sm transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#580A14] dark:text-amber-400" />
                <span>{lang === "ID" ? "Lihat Peta" : "View Map"}</span>
              </a>
            </div>

            {/* BOX CONTAINER CANVAS */}
            <div
              ref={containerRef}
              className={`relative w-full rounded-3xl overflow-hidden border border-stone-300 dark:border-stone-800 shadow-xl bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 transition-all ${
                isFullscreen ? "h-screen w-screen rounded-none" : "h-[420px] sm:h-[540px]"
              }`}
            >
              
              <model-viewer
                ref={modelViewerRef}
                src={data.modelPath}
                poster={data.posterImage}
                alt={data.title}
                loading="eager"
                render-scale="1"
                camera-controls
                auto-rotate={isAutoRotate ? true : undefined}
                auto-rotate-delay="0"
                shadow-intensity="0.5"
                exposure="1"
                interaction-prompt="none"
                camera-orbit="0deg 75deg 105%"
                camera-target="auto auto auto"
                field-of-view="45deg"
                min-field-of-view="20deg"
                max-field-of-view="65deg"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent",
                }}
              />

              {/* OVERLAY BADGE LIVE PREVIEW */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 pointer-events-none z-20">
                <span className="bg-[#580A14]/90 backdrop-blur-md text-amber-200 text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-800/60 shadow-md uppercase tracking-wider">
                  {data.badgeTag[lang]}
                </span>
              </div>

              {/* FLOATING ACTION BUTTONS */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex flex-col items-end gap-2.5 z-20">
                <button
                  onClick={toggleFullscreen}
                  className="group flex items-center gap-2 bg-black/60 hover:bg-[#580A14] text-white p-2 sm:px-3 sm:py-2 rounded-full border border-white/20 backdrop-blur-md shadow-md transition-all"
                >
                  <span className="text-[11px] font-semibold hidden sm:inline-block pl-1">
                    {isFullscreen
                      ? lang === "ID"
                        ? "Keluar Layar Penuh"
                        : "Exit Fullscreen"
                      : lang === "ID"
                      ? "Layar Penuh"
                      : "Fullscreen"}
                  </span>
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <Maximize2 className="w-4 h-4 shrink-0" />
                  )}
                </button>

                <button
                  onClick={handleResetView}
                  className="group flex items-center gap-2 bg-black/60 hover:bg-[#580A14] text-white p-2 sm:px-3 sm:py-2 rounded-full border border-white/20 backdrop-blur-md shadow-md transition-all"
                >
                  <span className="text-[11px] font-semibold hidden sm:inline-block pl-1">
                    {lang === "ID" ? "Reset Posisi 3D" : "Reset 3D View"}
                  </span>
                  <RotateCw className="w-4 h-4 shrink-0" />
                </button>
              </div>

              {/* FLOATING CONTROL BAR */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[90%] sm:w-auto bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 text-stone-700 dark:text-stone-200 rounded-full px-4 py-2 shadow-2xl flex items-center justify-between sm:justify-center gap-4">
                <div className="flex items-center gap-2">
                  <ZoomOut className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={zoomValue}
                    onChange={handleZoomChange}
                    className="w-20 sm:w-28 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#580A14] dark:accent-amber-500"
                  />
                  <ZoomIn className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                </div>

                <div className="h-4 w-[1px] bg-stone-300 dark:bg-stone-700" />

                <button
                  onClick={toggleAutoRotate}
                  className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold px-3 py-1 rounded-full transition-colors border border-stone-300/80 dark:border-stone-700 shrink-0"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isAutoRotate ? "bg-emerald-500 animate-pulse" : "bg-stone-400 dark:bg-stone-500"
                    }`}
                  />
                  <span>Auto Rotate</span>
                </button>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* CONTAINER DESKRIPSI TEKNOLOGI 3D */}
        <FadeIn direction="up" delay={0.3}>
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-12 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-8 max-w-5xl mx-auto">
            
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 block">
                TEKNOLOGI & DIGITAL PRESERVATION
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#580A14] dark:text-amber-500">
                {lang === "ID"
                  ? "Jelajahi Setiap Sudut Bangunan dalam Model 3D Interaktif"
                  : "Explore Every Corner of the Building in Interactive 3D Model"}
              </h2>
              <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              <div className="space-y-4">
                <p>{data.infoParagraphs[lang][0]}</p>
                <p>{data.infoParagraphs[lang][1]}</p>
              </div>
              <div className="space-y-4">
                <p>{data.infoParagraphs[lang][2]}</p>
                <p>{data.infoParagraphs[lang][3]}</p>
              </div>
            </div>

          </div>
        </FadeIn>

        {/* DUA CARD SEJAJAR */}
        <FadeIn direction="up" delay={0.35}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* CARD 1: TUR VIRTUAL 360° */}
            <div className="bg-[#FFFDF9] dark:bg-stone-900 rounded-2xl overflow-hidden border border-amber-200/80 dark:border-stone-800 shadow-sm space-y-4 p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="relative w-full h-52 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 group">
                  <Image
                    src={data.tour360Image}
                    alt={data.tour360Title[lang]}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#580A14]/35 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shadow-lg border border-amber-300/60 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <Compass className="w-6 h-6 animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 px-1">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                    {data.tour360Title[lang]}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {data.tour360Desc[lang]}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/atraksi/${id}/360`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-[#580A14] hover:text-white dark:hover:bg-amber-600 dark:hover:text-stone-950 hover:border-[#580A14] dark:hover:border-amber-600 active:bg-[#580A14] active:text-white text-xs font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-sm"
                >
                  <span>{lang === "ID" ? "Mulai Tur Sekarang" : "Start Tour Now"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* CARD 2: ATRAKSI BUDAYA */}
            <div className="bg-[#FFFDF9] dark:bg-stone-900 rounded-2xl overflow-hidden border border-amber-200/80 dark:border-stone-800 shadow-sm space-y-4 p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="relative w-full h-52 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 group">
                  <Image
                    src="/bckodeon.png"
                    alt="Atraksi Budaya Odeon"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#580A14]/35 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shadow-lg border border-amber-300/60 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <Landmark className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 px-1">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                    {lang === "ID" ? "ATRAKSI BUDAYA" : "CULTURAL ATTRACTIONS"}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {lang === "ID"
                      ? "Temukan ragam pertunjukan seni tradisional, atraksi budaya, dan pengalaman wisata khas Odeon Kampoeng Naga."
                      : "Discover a variety of traditional art performances, cultural attractions, and unique tourism experiences of Odeon Kampoeng Naga."}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/atraksi"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-[#580A14] hover:text-white dark:hover:bg-amber-600 dark:hover:text-stone-950 hover:border-[#580A14] dark:hover:border-amber-600 active:bg-[#580A14] active:text-white text-xs font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-sm"
                >
                  <span>{lang === "ID" ? "Lihat Semua Atraksi" : "View All Attractions"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </FadeIn>

      </div>
    </main>
  );
}