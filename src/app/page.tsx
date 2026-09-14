"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import OdeonMapWrapper from "../components/map/OdeonMapWrapper";
import { useLanguage } from "../context/LanguageContext";
import FadeIn from "../components/FadeIn";

const content = {
  ID: {
    badge: "Portal Wisata Digital Interaktif",
    heroTitle1: "Selamat Datang Di",
    heroTitle2: "Lensa Odeon Kampoeng Naga",
    heroDesc:
      "Jelajahi warisan budaya dan berbagai destinasi Odeon Kampoeng Naga melalui tur virtual 360 dan model 3D yang interaktif.",
    ctaButton: "Jelajahi Atraksi Wisata",
    guideTitle: "Panduan Penggunaan Website",
    guideDesc:
      "Jelajahi Odeon Kampoeng Naga melalui berbagai fitur interaktif yang tersedia di website. Temukan pengalaman wisata yang lebih menarik dengan menjelajahi kawasan, mengenal bangunan bersejarah, dan menikmati berbagai atraksi secara digital:",
    guideList: [
      {
        title: "Tur Virtual 360°",
        desc: "Jelajahi kawasan Odeon Kampoeng Naga secara lebih nyata melalui tampilan 360°. Arahkan pandangan ke berbagai sisi untuk melihat suasana dan sudut kawasan seolah-olah sedang berada langsung di lokasi.",
      },
      {
        title: "Model 3D",
        desc: "Kenali berbagai bangunan dan objek menarik melalui model 3D interaktif. Putar dan perbesar tampilan untuk melihat bentuk serta detail bangunan dari berbagai sudut secara lebih dekat.",
      },
      {
        title: "Atraksi",
        desc: "Temukan berbagai atraksi budaya dan aktivitas menarik yang ada di kawasan Odeon Kampoeng Naga. Pilih atraksi untuk mengetahui informasi lebih lanjut dan mengenal pengalaman wisata yang ditawarkan.",
      },
    ],
    exploreLabel: "Jelajahi Atraksi",
    cardTitle: "Atraksi Budaya",
    cardDesc:
      "Temukan ragam pertunjukan seni tradisional, atraksi budaya, dan pengalaman wisata khas Odeon Kampoeng Naga.",
    cardButton: "Lihat Semua Atraksi",
    locationLabel: "Akses & Panduan",
    locationTitle: "Lokasi Kawasan",
    locationDesc:
      "Kunjungi dan jelajahi langsung keindahan kawasan pecinan Odeon Kampoeng Naga Kota Sukabumi.",
  },
  EN: {
    badge: "Interactive Digital Tourism Portal",
    heroTitle1: "Welcome To",
    heroTitle2: "Odeon Kampoeng Naga Len's",
    heroDesc:
      "Explore the cultural heritage and various destinations of Odeon Kampoeng Naga through 360 virtual tours and interactive 3D models.",
    ctaButton: "Explore Tourist Attractions",
    guideTitle: "Website Usage Guide",
    guideDesc:
      "Explore Odeon Kampoeng Naga through various interactive features available on the website. Discover a more engaging tourism experience by exploring the area, learning about historic buildings, and enjoying various attractions digitally:",
    guideList: [
      {
        title: "360° Virtual Tour",
        desc: "Explore the Odeon Kampoeng Naga area more realistically through a 360° view. Look around in every direction to see the atmosphere and corners of the area as if you were there in person.",
      },
      {
        title: "3D Model",
        desc: "Get to know various buildings and interesting objects through interactive 3D models. Rotate and zoom in to see the shape and details of the buildings from different angles up close.",
      },
      {
        title: "Attractions",
        desc: "Discover various cultural attractions and interesting activities in the Odeon Kampoeng Naga area. Select an attraction to learn more and explore the tourism experiences offered.",
      },
    ],
    exploreLabel: "Explore Attractions",
    cardTitle: "Cultural Attractions",
    cardDesc:
      "Discover a variety of traditional art performances, cultural attractions, and unique tourism experiences at Odeon Kampoeng Naga.",
    cardButton: "View All Attractions",
    locationLabel: "Access & Guide",
    locationTitle: "Area Location",
    locationDesc:
      "Visit and explore firsthand the beauty of the Odeon Kampoeng Naga Chinatown area in Sukabumi City.",
  },
} as const;

type Language = keyof typeof content;

export default function HomePage() {
  const { language } = useLanguage();
  const currentLang = (language as Language) in content ? (language as Language) : "ID";
  const t = content[currentLang];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section className="relative text-amber-50 pt-36 pb-24 px-4 sm:px-6 lg:px-8 border-b border-amber-950 overflow-hidden min-h-[550px] flex items-center justify-center">
        <Image
          src="/bckodeon2.png"
          alt="Latar Belakang Odeon Kampoeng Naga"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#3D060D]/60 dark:bg-black/70 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <FadeIn direction="down" delay={0.1}>
            <span className="inline-block text-xs md:text-sm uppercase tracking-widest text-amber-300 font-semibold px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-800/60 shadow-md">
              {t.badge}
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-amber-100 leading-tight drop-shadow-md">
              {t.heroTitle1} <br />
              <span className="italic font-normal text-amber-200">{t.heroTitle2}</span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <p className="text-sm sm:text-base text-amber-200/90 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              {t.heroDesc}
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/atraksi"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold px-6 py-3 rounded-full text-sm shadow-lg transition-all"
              >
                <span>{t.ctaButton}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 2: PANDUAN & BANNER ATRAKSI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Panduan Left */}
          <div className="lg:col-span-2">
            <FadeIn direction="up" delay={0.1} className="h-full">
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200/80 dark:border-stone-800 space-y-4 flex flex-col justify-center h-full">
                <div className="flex items-center gap-2 text-[#580A14] dark:text-amber-500">
                  <Info className="w-5 h-5 shrink-0" />
                  <h2 className="font-serif text-xl md:text-2xl font-bold">{t.guideTitle}</h2>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{t.guideDesc}</p>
                <ul className="space-y-3 text-sm text-stone-700 dark:text-stone-300 pl-1">
                  {t.guideList.map((item) => (
                    <li key={item.title} className="flex items-start gap-2">
                      <span className="text-[#580A14] dark:text-amber-500 font-bold">•</span>
                      <span>
                        <strong className="font-semibold text-stone-900 dark:text-stone-100">{item.title}</strong> — {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Banner Right */}
          <div className="lg:col-span-1">
            <FadeIn direction="up" delay={0.25} className="h-full">
              <div className="space-y-2 flex flex-col justify-between h-full">
                <span className="text-xs tracking-wider uppercase text-stone-500 dark:text-stone-400 font-bold px-1">
                  {t.exploreLabel}
                </span>

                <div className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between h-full group hover:shadow-md transition-shadow">
                  <div>
                    <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-stone-100">
                      <Image
                        src="/bckodeon.png"
                        alt={t.cardTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 tracking-wide uppercase">
                        {t.cardTitle}
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{t.cardDesc}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href="/atraksi"
                      className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-200 bg-stone-50 dark:bg-stone-800 hover:bg-[#580A14] dark:hover:bg-amber-600 hover:text-white dark:hover:text-stone-950 border border-stone-200 dark:border-stone-700 py-2.5 px-4 rounded-xl transition-colors duration-200 text-center"
                    >
                      <span>{t.cardButton}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION 3: LOKASI KAWASAN */}
      <section className="bg-stone-100/70 dark:bg-[#161413] py-16 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <FadeIn direction="up" delay={0.1}>
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#580A14] dark:text-amber-500 font-semibold">
                {t.locationLabel}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                {t.locationTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto">{t.locationDesc}</p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.25}>
            <div>
              <OdeonMapWrapper />
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}