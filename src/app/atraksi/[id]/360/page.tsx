"use client";

import { use, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Compass,
  ArrowRight,
  Maximize2,
  Minimize2,
  Box,
  Layers,
  RotateCw,
  Info,
} from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import FadeIn from "../../../../components/FadeIn";

declare global {
  interface Window {
    pannellum: any;
  }
}

// CONFIG DATA MULTI-SCENE 360 PER DESTINASI
const tour360DetailData: Record<
  string,
  {
    title: string;
    badgeTag: { ID: string; EN: string };
    defaultScene: string;
    scenes: Record<
      string,
      {
        title: { ID: string; EN: string };
        image: string; // URL Sampel Foto 360° Equirectangular
        pitch?: number;
        yaw?: number;
        hfov?: number;
        hotSpots?: Array<{
          pitch: number;
          yaw: number;
          type: "scene" | "info";
          text: { ID: string; EN: string };
          sceneId?: string; // ID Scene tujuan jika type === "scene"
        }>;
      }
    >;
    mapsUrl: string;
    model3dImage: string;
    infoParagraphs: { ID: string[]; EN: string[] };
  }
> = {
  "vihara-widhi-sakti": {
    title: "Vihara Widhi Sakti (Odeon)",
    badgeTag: {
      ID: "Live Tour 360°: Vihara Widhi Sakti",
      EN: "Live Tour 360°: Vihara Widhi Sakti",
    },
    defaultScene: "halaman_utama",
    scenes: {
      halaman_utama: {
        title: {
          ID: "Pelataran Utama Vihara",
          EN: "Main Courtyard of Vihara",
        },
        image: "/360/Vihara1.jpg", // Sampel panorama 1
        pitch: 0,
        yaw: 0,
        hfov: 110,
        hotSpots: [
          {
            pitch: -1.27,
            yaw: 88.2,
            type: "scene",
            text: {
              ID: "Naik ke lantai 2 ah",
              EN: "Go up to the second floor",
            },
            sceneId: "serambi_altar",
          },
          {
            pitch: -28,
            yaw: -89,
            type: "info",
            text: {
              ID: "Altar Pemujaan",
              EN: "Main Altar",
            },
          },
          {
            pitch: -9.25,
            yaw: -90,
            type: "info",
            text: {
              ID: "Bodhisattva",
              EN: "Bodhisattva",
            },
          },
        ],
      },
      serambi_altar: {
        title: {
          ID: "Serambi & Ruang Altar Suci",
          EN: "Sacred Altar Porch & Hall",
        },
        image: "/360/Vihara2.jpg", // Sampel panorama 2
        pitch: 0,
        yaw: 0,
        hfov: 100,
        hotSpots: [
          {
            pitch: -42.7,
            yaw: 90.9,
            type: "scene",
            text: {
              ID: "Kembali ke Pelataran Utama",
              EN: "Return to Main Courtyard",
            },
            sceneId: "halaman_utama",
          },
        ],
      },
    },
    mapsUrl: "https://maps.app.goo.gl/mU85gP1Mh4HjBSVt7",
    model3dImage: "/bckodeon2.png",
    infoParagraphs: {
      ID: [
        "Tur Virtual 360° ini dirancang menggunakan teknologi panorami imersif yang memungkinkan Anda menjelajahi lorong, serambi suci, dan area luar Vihara Widhi Sakti secara leluasa.",
        "Gunakan fitur Hotspot Interaktif (ikon lingkaran pada layar) untuk berpindah area ruangan maupun membaca deskripsi edukasi mengenai artefak bersejarah.",
      ],
      EN: [
        "This 360° Virtual Tour utilizes immersive panoramic technology allowing you to navigate halls, sacred porches, and outer areas of Vihara Widhi Sakti freely.",
        "Utilize Interactive Hotspots (circle icons on screen) to switch rooms or read educational descriptions regarding historic artifacts.",
      ],
    },
  },
  "museum-tionghoa-sukabumi": {
    title: "Museum Tionghoa Sukabumi",
    badgeTag: {
      ID: "Live Tour 360°: Museum Tionghoa",
      EN: "Live Tour 360°: Museum Tionghoa",
    },
    defaultScene: "lantai_1",
    scenes: {
      lantai_1: {
        title: {
          ID: "Lantai 1: Ruang Pameran Utama",
          EN: "1st Floor: Main Exhibition Hall",
        },
        image: "/360/Museum1.jpg",
        pitch: 0,
        yaw: 0,
        hfov: 110,
        hotSpots: [
          {
            pitch: 10.25,
            yaw: -87.8,
            type: "scene",
            text: {
              ID: "Naik Tangga ke Lantai 2 (Koleksi Arsip Kuno)",
              EN: "Go Upstairs to 2nd Floor (Ancient Archives)",
            },
            sceneId: "lantai_2",
          },
          {
            pitch: -23.3,
            yaw: 36,
            type: "info",
            text: {
              ID: "Mesin Jahit Tua",
              EN: "Old Sewing Machine",
            },
          },
          {
            pitch: 9,
            yaw: 94.86,
            type: "info",
            text: {
              ID: "Lukisan apa nih?",
              EN: "What the f*** is this?",
            },
          },
        ],
      },
      lantai_2: {
        title: {
          ID: "Lantai 2: Galeri Dokumen & Pakaian Adat",
          EN: "2nd Floor: Document Gallery & Costumes",
        },
        image: "/360/Museum2.jpg", // Sampel panorama 3
        pitch: 0,
        yaw: 0,
        hfov: 100,
        hotSpots: [
          {
            pitch: -54.1,
            yaw: -0.36,
            type: "scene",
            text: {
              ID: "Turun Tangga ke Lantai 1",
              EN: "Go Downstairs to 1st Floor",
            },
            sceneId: "lantai_1",
          },
        ],
      },
    },
    mapsUrl: "https://maps.app.goo.gl/EcwLpaoG9jtL3PKR8",
    model3dImage: "/bckodeon.png",
    infoParagraphs: {
      ID: [
        "Nikmati pengalaman menjelajahi tiap lantai Museum Tionghoa Sukabumi secara virtual. Klik indikator penunjuk arah di area tangga untuk berpindah lantai pameran.",
        "Setiap titik informasi menyediakan wawasan mendalam tentang artefak budaya Sunda-Tionghoa yang tersimpan rapat di museum.",
      ],
      EN: [
        "Enjoy exploring each floor of Museum Tionghoa Sukabumi virtually. Click directional indicators near staircases to switch exhibition floors.",
        "Each info point provides deep insights into Sundanese-Chinese cultural artifacts preserved in the museum.",
      ],
    },
  },
  "odeon-kopitiam": {
    title: "Odeon Kopitiam",
    badgeTag: {
      ID: "Live Tour 360°: Odeon Kopitiam",
      EN: "Live Tour 360°: Odeon Kopitiam",
    },
    defaultScene: "depan_kedai",
    scenes: {
      depan_kedai: {
        title: {
          ID: "Serambi Depan Kedai",
          EN: "Front Porch Cafe",
        },
        image: "/360/Kopi.jpg",
        pitch: 0,
        yaw: 0,
        hfov: 110,
        hotSpots: [
          {
            pitch: -11.9,
            yaw: -127.42,
            type: "scene",
            text: {
              ID: "Masuk ke Area dapur ah",
              EN: "Enter Kitchen Area",
            },
            sceneId: "ruang_dalam",
          },
        ],
      },
      ruang_dalam: {
        title: {
          ID: "Ruang Dalam & Meja Marmer Classic",
          EN: "Interior Hall & Classic Marble Tables",
        },
        image: "/360/Kopi2.jpg",
        pitch: 0,
        yaw: 0,
        hfov: 100,
        hotSpots: [
          {
            pitch: -12.1,
            yaw: 93.4,
            type: "scene",
            text: {
              ID: "Keluar ah, panas bet disini",
              EN: "Exit kitchen, so hott bro",
            },
            sceneId: "depan_kedai",
          },
          {
            pitch: 32.26,
            yaw: -104.5,
            type: "info",
            text: {
              ID: "Gg bang, teh nya melayang",
              EN: "What the f*** ?",
            },
          },
          {
            pitch: -8.47,
            yaw: -95.57,
            type: "info",
            text: {
              ID: "serius amat bang?",
              EN: "Are u Hungry?",
            },
          },
          {
            pitch: -27.79,
            yaw: 68,
            type: "info",
            text: {
              ID: "awas tumpah bang",
              EN: "be carefull bro, its mie ayam, the best food in the world",
            },
          },
        ],
      },
    },
    mapsUrl: "https://maps.app.goo.gl/2ueuSEwr7mZLrY1q6",
    model3dImage: "/bckodeon2.png",
    infoParagraphs: {
      ID: [
        "Jelajahi kehangatan suasana kedai kopi tempo dulu secara 360 derajat. Anda dapat masuk dari area serambi depan menuju meja marmer klasik di dalam kedai.",
      ],
      EN: [
        "Explore the cozy ambiance of a vintage coffee shop in 360 degrees. Navigate from the front porch to classic interior marble tables.",
      ],
    },
  },
};

export default function Tour360DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const { language } = useLanguage();

  const data = tour360DetailData[id];
  const lang = (language as "ID" | "EN") || "ID";

  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  const [currentSceneId, setCurrentSceneId] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Inisialisasi Script CSS & JS Pannellum
  useEffect(() => {
    if (!data) return;

    setCurrentSceneId(data.defaultScene);

    const cssUrl = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
    const jsUrl = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";

    let link = document.querySelector(`link[href="${cssUrl}"]`) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssUrl;
      document.head.appendChild(link);
    }

    if (window.pannellum) {
      initViewer(data.defaultScene);
    } else {
      let script = document.querySelector(`script[src="${jsUrl}"]`) as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.src = jsUrl;
        script.onload = () => {
          initViewer(data.defaultScene);
        };
        document.head.appendChild(script);
      } else {
        const handleLoad = () => initViewer(data.defaultScene);
        script.addEventListener("load", handleLoad);
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [data]);

  if (!data) {
    notFound();
  }

  // Fungsi Inisialisasi Pannellum Viewer Multi-Scene
  const initViewer = (initialSceneId: string) => {
    if (!window.pannellum || !document.getElementById("panorama-container")) return;

    // Transformasi data scenes untuk Pannellum format
    const pannellumScenes: Record<string, any> = {};

    Object.entries(data.scenes).forEach(([sId, sData]) => {
      pannellumScenes[sId] = {
        type: "equirectangular",
        panorama: sData.image,
        pitch: sData.pitch || 0,
        yaw: sData.yaw || 0,
        hfov: sData.hfov || 110,
        hotSpots: (sData.hotSpots || []).map((hs) => ({
          pitch: hs.pitch,
          yaw: hs.yaw,
          type: hs.type,
          text: hs.text[lang],
          sceneId: hs.sceneId,
        })),
      };
    });

    viewerRef.current = window.pannellum.viewer("panorama-container", {
      default: {
        firstScene: initialSceneId,
        sceneFadeDuration: 1000,
        autoLoad: true,
        showControls: false, // Menyembunyikan kontrol bawaan agar menggunakan custom UI kita
      },
      scenes: pannellumScenes,
    });

    viewerRef.current.on("scenechange", (newSceneId: string) => {
      setCurrentSceneId(newSceneId);
    });
  };

  // Switch Ruangan via Dropdown / Button
  const handleSwitchScene = (sId: string) => {
    if (viewerRef.current && typeof viewerRef.current.loadScene === "function") {
      viewerRef.current.loadScene(sId);
      setCurrentSceneId(sId);
    }
  };

  // Toggle Fullscreen Container
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

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#1C1917] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER JUDUL */}
        <section className="text-center max-w-3xl mx-auto space-y-3">
          <FadeIn direction="down" delay={0.1}>
            <span className="inline-block text-xs uppercase tracking-widest text-[#580A14] dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/80 border border-amber-200/80 dark:border-amber-800/60 font-bold px-4 py-1.5 rounded-full shadow-sm">
              TUR VIRTUAL 360° IMERSIF
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
              {data.title}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              {lang === "ID"
                ? "Jelajahi setiap sudut ruangan dan fasilitas cagar budaya secara interaktif dari perangkat Anda."
                : "Explore every corner of the room and heritage facilities interactively from your device."}
            </p>
          </FadeIn>
        </section>

        {/* CONTAINER PANORAMA 360° */}
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

            {/* BOX DISPLAY 360 CONTAINER */}
            <div
              ref={containerRef}
              className={`relative w-full rounded-3xl overflow-hidden border border-stone-300 dark:border-stone-800 shadow-xl bg-black transition-all ${isFullscreen ? "h-screen w-screen rounded-none" : "h-[420px] sm:h-[540px]"
                }`}
            >
              {/* ELEMENT DIV TEMPAT PANNELLUM BISA DIMOUNT */}
              <div id="panorama-container" className="w-full h-full" />

              {/* OVERLAY BADGE (TOP-LEFT) */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 pointer-events-none z-20">
                <span className="bg-[#580A14]/90 backdrop-blur-md text-amber-200 text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-800/60 shadow-md uppercase tracking-wider">
                  {data.badgeTag[lang]}
                </span>
              </div>

              {/* FLOATING ACTION FULLSCREEN (TOP-RIGHT) */}
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
              </div>

              {/* FLOATING CONTROL BAR (BOTTOM-CENTER: PILIH RUANGAN/SCENE) */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[92%] sm:w-auto bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 rounded-full px-4 py-2 shadow-2xl flex items-center justify-between sm:justify-center gap-3">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300 shrink-0 hidden sm:inline-block">
                  {lang === "ID" ? "Pilih Ruangan:" : "Select Room:"}
                </span>

                <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
                  {Object.entries(data.scenes).map(([sId, sData]) => (
                    <button
                      key={sId}
                      onClick={() => handleSwitchScene(sId)}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all shrink-0 border ${currentSceneId === sId
                        ? "bg-[#580A14] dark:bg-amber-600 text-white dark:text-stone-950 border-[#580A14] dark:border-amber-600 shadow-sm"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700"
                        }`}
                    >
                      {sData.title[lang]}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* CONTAINER DESKRIPSI TEKNOLOGI TUR 360 */}
        <FadeIn direction="up" delay={0.3}>
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-12 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-8 max-w-5xl mx-auto">

            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 block">
                PANDUAN NAVIGASI VIRTUAL
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#580A14] dark:text-amber-500">
                {lang === "ID"
                  ? "Petunjuk Penjelajahan Tur Virtual 360°"
                  : "360° Virtual Tour Navigation Guide"}
              </h2>
              <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              <div className="space-y-4">
                {data.infoParagraphs[lang].map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="bg-stone-50 dark:bg-stone-800 p-5 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3">
                <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#580A14] dark:text-amber-400" />
                  <span>{lang === "ID" ? "Petunjuk Ikon Hotspot" : "Hotspot Icon Guide"}</span>
                </h3>
                <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span>
                      {lang === "ID"
                        ? "Ikon Pintu / Panah: Berpindah ke ruangan atau lantai lain."
                        : "Door / Arrow Icon: Move to another room or floor."}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#580A14] dark:bg-amber-400 shrink-0" />
                    <span>
                      {lang === "ID"
                        ? "Ikon Informasi (i): Menampilkan penjelasan artefak bersejarah."
                        : "Info Icon (i): Display historic artifact explanations."}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </FadeIn>

        {/* DUA CARD SEJAJAR (LIHAT MODEL 3D & ATRAKSI BUDAYA) */}
        <FadeIn direction="up" delay={0.35}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* CARD 1: LIHAT MODEL 3D */}
            <div className="bg-[#FFFDF9] dark:bg-stone-900 rounded-2xl overflow-hidden border border-amber-200/80 dark:border-stone-800 shadow-sm space-y-4 p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="relative w-full h-52 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 group">
                  <Image
                    src={data.model3dImage}
                    alt={data.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#580A14]/40 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg border border-orange-400/60 backdrop-blur-sm animate-float group-hover:scale-110 transition-transform duration-300">
                      <Box className="w-6 h-6 stroke-[2]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 px-1">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                    {lang === "ID" ? "LIHAT MODEL 3D" : "VIEW 3D MODEL"}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {lang === "ID"
                      ? "Lihat detail arsitektur bangunan melalui model 3D interaktif."
                      : "View building architecture details through interactive 3D models."}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/atraksi/${id}/3d`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-[#580A14] hover:text-white dark:hover:bg-amber-600 dark:hover:text-stone-950 hover:border-[#580A14] dark:hover:border-amber-600 active:bg-[#580A14] active:text-white text-xs font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-sm"
                >
                  <span>{lang === "ID" ? "Lihat Detail 3D" : "View 3D Details"}</span>
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
                    <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg border border-orange-400/60 backdrop-blur-sm animate-float group-hover:scale-110 transition-transform duration-300">
                      <Layers className="w-6 h-6" />
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