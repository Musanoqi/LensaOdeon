"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  Ticket,
  Navigation,
  Compass,
  Box,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Building2,
  Landmark,
  Utensils,
  Award,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import FadeIn from "../../../components/FadeIn";

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
    return `${Math.round(distance)} m`;
  }
  return `${(distance / 1000).toFixed(1)} km`;
}

// DATA ATRAKSI LENGKAP
const attractionsDetailData: Record<
  string,
  {
    title: string;
    tagline: { ID: string; EN: string };
    image: string;
    imageCaption: { ID: string; EN: string };
    topBadgeText: { ID: string; EN: string };
    lat: number;
    lng: number;
    fallbackDistance: string;
    mapsUrl: string;
    address: string;
    openTime: string;
    closeTime: string;
    ticket: { ID: string; EN: string };
    historyTitle: { ID: string; EN: string };
    historyParagraphs: { ID: string[]; EN: string[] };
    quote: { ID: string; EN: string };
    quickFacts: Array<{
      iconName: "landmark" | "building" | "utensils" | "award";
      title: { ID: string; EN: string };
      desc: { ID: string; EN: string };
    }>;
    tour360Image: string;
    model3dImage: string;
  }
> = {
  "vihara-widhi-sakti": {
    title: "Vihara Widhi Sakti (Odeon)",
    tagline: {
      ID: "Klenteng Bersejarah Sejak 1908 & Pusat Spiritual Pecinan",
      EN: "Historic Temple Since 1908 & Chinatown Spiritual Center",
    },
    image: "/bckodeon2.png",
    imageCaption: {
      ID: "Tempat Ibadah tertua peninggalan etnis Tionghoa Sukabumi",
      EN: "The oldest Chinese heritage place of worship in Sukabumi",
    },
    topBadgeText: {
      ID: "HERITAGE LANDMARK EST. 1908",
      EN: "HERITAGE LANDMARK EST. 1908",
    },
    lat: -6.924823,
    lng: 106.924194,
    fallbackDistance: "50 m",
    mapsUrl: "https://maps.app.goo.gl/mU85gP1Mh4HjBSVt7",
    address: "Jl. Pajagalan No.20, Nyomplong, Kec. Warudoyong, Kota Sukabumi, Jawa Barat 43131",
    openTime: "07:00",
    closeTime: "20:00",
    ticket: {
      ID: "Bebas Masuk / Gratis (Tempat Ibadah)",
      EN: "Free Admission (Place of Worship)",
    },
    historyTitle: {
      ID: "Sejarah Singkat & Filosofi Vihara Widhi Sakti",
      EN: "Brief History & Philosophy of Vihara Widhi Sakti",
    },
    historyParagraphs: {
      ID: [
        "Vihara Widhi Sakti didirikan pada tahun 1908 dan menjadi salah satu klenteng tertua serta pusat spiritual masyarakat etnis Tionghoa di Kota Sukabumi. Berdirinya vihara ini menjadi pilar utama berkembangnya pemukiman kawasan Pecinan Odeon.",
        "Arsitektur bangunan menampilkan corak khas Tiongkok Selatan dengan ornamentasi Naga Kembar di puncak atap yang melambangkan kemakmuran, perlindungan spiritual, dan keharmonisan hidup antar pemeluk agama.",
        "Setiap perayaan Imlek dan Cap Go Meh, Vihara Widhi Sakti menjadi pusat perhatian ribuan masyarakat dan wisatawan lokal. Tradisi arak-arakan Gotong Toapekong serta pertunjukan Barongsai & Liong digelar meriah melintasi jalanan bersejarah kawasan Odeon.",
        "Hingga kini, Vihara Widhi Sakti tidak hanya berdiri sebagai rumah ibadah, melainkan juga warisan cagar budaya penting yang merepresentasikan simpul akulturasi budaya Sunda dan Tionghoa yang terjalin erat melintasi zaman.",
      ],
      EN: [
        "Vihara Widhi Sakti was established in 1908 as one of the oldest temples and the spiritual heart of the ethnic Chinese community in Sukabumi City. Its founding served as a catalyst for the growth of the Odeon Chinatown district.",
        "The architecture features distinct Southern Chinese styles with twin dragon roof ornaments symbolizing prosperity, spiritual protection, and harmonious coexistence among diverse communities.",
        "During Chinese New Year and Cap Go Meh celebrations, the temple becomes the focal point for thousands of visitors. Traditional Toapekong parades and vibrant Lion and Dragon dances line the historic streets of Odeon.",
        "Today, Vihara Widhi Sakti stands not only as a place of worship but also as an invaluable cultural heritage site representing deep-rooted Sundanese and Chinese cultural acculturation over a century.",
      ],
    },
    quote: {
      ID: "Simbol Akulturasi Budaya & Harmoni Kebangsaan di Sukabumi.",
      EN: "A Symbol of Cultural Acculturation & National Harmony in Sukabumi.",
    },
    quickFacts: [
      {
        iconName: "landmark",
        title: { ID: "Tahun Berdiri", EN: "Established Year" },
        desc: { ID: "1908 (Lebih dari 1 Abad)", EN: "1908 (Over a Century Old)" },
      },
      {
        iconName: "award",
        title: { ID: "Ornamen Ikonik", EN: "Iconic Feature" },
        desc: { ID: "Naga Kembar & Lampion Merah", EN: "Twin Dragons & Red Lanterns" },
      },
      {
        iconName: "building",
        title: { ID: "Kegiatan Utama", EN: "Key Events" },
        desc: { ID: "Perayaan Cap Go Meh & Ritual", EN: "Cap Go Meh & Spiritual Rituals" },
      },
    ],
    tour360Image: "/bckodeon.png",
    model3dImage: "/bckodeon2.png",
  },
  "museum-tionghoa-sukabumi": {
    title: "Museum Tionghoa Sukabumi",
    tagline: {
      ID: "Pusat Dokumentasi Sejarah & Artefak Pusaka Sukabumi",
      EN: "Sukabumi Historical Documentation & Heritage Artifact Center",
    },
    image: "/museum.png",
    imageCaption: {
      ID: "Ruang dokumentasi jejak sejarah & kebudayaan lokal",
      EN: "Documentation space of local history & culture traces",
    },
    topBadgeText: {
      ID: "HERITAGE LANDMARK EST. 1935",
      EN: "HERITAGE LANDMARK EST. 1935",
    },
    lat: -6.92465,
    lng: 106.9245,
    fallbackDistance: "30 m",
    mapsUrl: "https://maps.app.goo.gl/EcwLpaoG9jtL3PKR8",
    address: "Kawasan Danalaga Square, Nyomplong, Kota Sukabumi, Jawa Barat 43131",
    openTime: "09:00",
    closeTime: "16:00",
    ticket: {
      ID: "Gratis / Bebas Kunjungan Edukasi",
      EN: "Free / Educational Visit Included",
    },
    historyTitle: {
      ID: "Jejak Rekam Sejarah & Koleksi Museum",
      EN: "Historical Traces & Museum Collection",
    },
    historyParagraphs: {
      ID: [
        "Museum Tionghoa Sukabumi merupakan destinasi edukasi budaya yang mendokumentasikan rekam jejak historis interaksi masyarakat etnis Tionghoa dengan warga lokal Sunda sejak era kolonial Hindia Belanda.",
        "Di dalam ruang pameran museum, pengunjung dapat menyaksikan secara langsung berbagai koleksi pusaka bernilai tinggi seperti naskah kuno, foto-foto arsitektur Sukabumi tempo doeloe, dokumen perizinan kuno, hingga alat musik tradisional.",
        "Kehadiran museum ini digagas sebagai ruang refleksi sejarah dan sarana edukasi generasi muda untuk merawat nilai-nilai toleransi, menghargai peninggalan leluhur, serta memahami dinamika sosial ekonomi yang membentuk Kota Sukabumi modern.",
        "Setiap ruangan dirancang secara interaktif sehingga pengunjung dapat mempelajari kronologi perkembangan kawasan Odeon sebagai pusat ekonomi perdagangan kuno hingga menjadi destinasi wisata budaya modern saat ini.",
      ],
      EN: [
        "Museum Tionghoa Sukabumi is a cultural education destination documenting the historical interactions between ethnic Chinese residents and local Sundanese communities since the Dutch colonial era.",
        "Inside the exhibition rooms, visitors can view valuable collections including ancient manuscripts, vintage Sukabumi architectural photographs, historic trade licenses, and traditional musical instruments.",
        "The museum serves as a historical reflection space and an educational tool for younger generations to nurture tolerance, respect ancestral heritage, and understand the socio-economic dynamics of modern Sukabumi.",
        "Each exhibition room is interactively curated to guide visitors through the chronological evolution of Odeon from a historic trading hub into a modern cultural tourism destination.",
      ],
    },
    quote: {
      ID: "Menatap Masa Depan dengan Merawat Akar Sejarah.",
      EN: "Facing the Future by Preserving Historical Roots.",
    },
    quickFacts: [
      {
        iconName: "landmark",
        title: { ID: "Kategori Koleksi", EN: "Collection Category" },
        desc: { ID: "Arsip, Foto & Artefak Kuno", EN: "Archives, Photos & Antiques" },
      },
      {
        iconName: "award",
        title: { ID: "Fungsi Utama", EN: "Main Function" },
        desc: { ID: "Pusat Riset & Edukasi Budaya", EN: "Research & Cultural Education" },
      },
      {
        iconName: "building",
        title: { ID: "Akses Kunjungan", EN: "Visit Access" },
        desc: { ID: "Terbuka Umum & Komunitas", EN: "Open for Public & Researchers" },
      },
    ],
    tour360Image: "/museum.png",
    model3dImage: "/bckodeon.png",
  },
  "odeon-kopitiam": {
    title: "Odeon Kopitiam",
    tagline: {
      ID: "Kedai Kopi Otentik & Warisan Kuliner Pecinan",
      EN: "Authentic Coffee Shop & Chinatown Culinary Heritage",
    },
    image: "/kopi.png",
    imageCaption: {
      ID: "Suasana autentik kedai kopi bernuansa tempo dulu",
      EN: "Authentic atmosphere of a vintage coffee shop",
    },
    topBadgeText: {
      ID: "AUTHENTIC CULINARY HERITAGE",
      EN: "AUTHENTIC CULINARY HERITAGE",
    },
    lat: -6.92211,
    lng: 106.92688,
    fallbackDistance: "350 m",
    mapsUrl: "https://maps.app.goo.gl/2ueuSEwr7mZLrY1q6",
    address: "Sobri, Jl. Lettu Bakrie No.8, Gunungparang, Kec. Cikole, Kota Sukabumi, Jawa Barat 43131",
    openTime: "08:00",
    closeTime: "21:00",
    ticket: {
      ID: "Bayar sesuai pesananmu (Mulai Rp 10.000)",
      EN: "Pay-as-you-order (Starting from IDR 10,000)",
    },
    historyTitle: {
      ID: "Cita Rasa Nostalgia & Kehangatan Komunitas",
      EN: "Nostalgic Flavor & Community Warmth",
    },
    historyParagraphs: {
      ID: [
        "Odeon Kopitiam menghadirkan nostalgia budaya minum kopi khas Pecinan yang autentik. Kedai ini mempertahankan resep saringan kopi tradisional serta pilihan kudapan klasik yang digemari dari generasi ke generasi.",
        "Interior kedai didesain anggun dengan sentuhan mebel kayu antik, marmer klasik, dan pajangan bingkai foto bersejarah kawasan Odeon Sukabumi era pertengahan abad ke-20.",
        "Suasana kedai hangat dan ramah, menjadikannya titik kumpul favorit bagi warga lokal untuk bersosialisasi, budayawan, hingga wisatawan yang ingin merasakan langsung denyut nadi kehidupan santai Pecinan Sukabumi.",
        "Nikmati keharuman aroma Kopi O panggang tradisional yang disajikan berdampingan dengan roti bakar kaya panggang dan makanan khas lokal bernuansa otentik.",
      ],
      EN: [
        "Odeon Kopitiam brings the nostalgic charm of authentic Chinatown coffee culture to life. The shop maintains traditional drip coffee recipes and classic snacks favored across generations.",
        "The interior is elegantly decorated with antique wooden furniture, vintage marble tables, and framed historical photographs of mid-20th-century Odeon Sukabumi.",
        "With its warm and welcoming atmosphere, the kopitiam serves as a beloved gathering spot for locals, cultural enthusiasts, and tourists experiencing Sukabumi's relaxed Chinatown lifestyle.",
        "Savor the rich aroma of traditionally roasted Kopi O paired with toasted kaya bread and authentic local heritage delicacies.",
      ],
    },
    quote: {
      ID: "Menikmati Secangkir Kopi dalam Balutan Sejarah.",
      EN: "Savoring a Cup of Coffee Wrapped in History.",
    },
    quickFacts: [
      {
        iconName: "utensils",
        title: { ID: "Menu Unggulan", EN: "Signature Menu" },
        desc: { ID: "Kopi O Tradisional & Roti Kaya", EN: "Traditional Kopi O & Kaya Toast" },
      },
      {
        iconName: "building",
        title: { ID: "Suasana Kedai", EN: "Ambiance" },
        desc: { ID: "Klasik Vintage Pecinan 1950", EN: "1950s Classic Vintage Chinatown" },
      },
      {
        iconName: "award",
        title: { ID: "Pengalaman", EN: "Experience" },
        desc: { ID: "Kuliner & Tempat Berkumpul", EN: "Culinary & Community Hub" },
      },
    ],
    tour360Image: "/kopi.png",
    model3dImage: "/bckodeon2.png",
  },
};

// Text Dictionary untuk UI Bilingual
const uiText = {
  ID: {
    locationStatus: "Status Kedekatan Lokasi",
    fromYourPos: "dari posisi Anda saat ini",
    calculating: "Menghitung jarak...",
    getDirections: "Panduan Rute",
    fullAddress: "Alamat Lengkap",
    showMap: "Tampilkan di Peta Kawasan",
    opHours: "Jam Operasional",
    openDaily: "Buka Setiap Hari",
    openToday: "Sedang Beroperasi Hari Ini",
    closedNow: "Tutup (Di Luar Jam Buka)",
    ticketPrice: "Tiket / Kisaran Harga",
    publicAccess: "Akses kawasan publik terbuka ramah wisatawan.",
    heritageLabel: "Jejak Warisan",
    quickFactsTitle: "Fakta Unik & Daya Tarik Utama",
    digitalAccess: "Akses Digital",
    tour360Title: "Tur Virtual 360°",
    tour360Desc: "Jelajahi setiap sudut lokasi secara imersif dari perangkat Anda.",
    startTour: "Mulai Tur Sekarang",
    model3dTitle: "Lihat Model 3D",
    model3dDesc: "Lihat detail arsitektur bangunan melalui model 3D interaktif.",
    view3d: "Lihat Detail 3D",
  },
  EN: {
    locationStatus: "Location Proximity Status",
    fromYourPos: "from your current position",
    calculating: "Calculating distance...",
    getDirections: "Get Directions",
    fullAddress: "Full Address",
    showMap: "Show on Area Map",
    opHours: "Operating Hours",
    openDaily: "Open Daily",
    openToday: "Open Today",
    closedNow: "Closed Now",
    ticketPrice: "Ticket / Price Range",
    publicAccess: "Open public cultural heritage area.",
    heritageLabel: "Heritage Traces",
    quickFactsTitle: "Quick Facts & Key Highlights",
    digitalAccess: "Digital Access",
    tour360Title: "360° Virtual Tour",
    tour360Desc: "Explore every corner interactively from your device.",
    startTour: "Start Tour Now",
    model3dTitle: "View 3D Model",
    model3dDesc: "View detailed building architecture through 3D models.",
    view3d: "View 3D Details",
  },
};

export default function AtraksiDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { language } = useLanguage();

  const [isOpenNow, setIsOpenNow] = useState<boolean | null>(null);
  const [realDistance, setRealDistance] = useState<string | null>(null);

  const data = attractionsDetailData[id];
  const lang = (language as "ID" | "EN") || "ID";
  const t = uiText[lang];

  // Efek Real-Time Geolocation
  useEffect(() => {
    if (!data) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const calculated = calculateDistance(
            userLat,
            userLng,
            data.lat,
            data.lng
          );
          setRealDistance(calculated);
        },
        () => {
          // Fallback jika GPS ditolak atau error
          setRealDistance(data.fallbackDistance);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setRealDistance(data.fallbackDistance);
    }
  }, [data]);

  // Efek Deteksi Jam Buka Operasional
  useEffect(() => {
    if (!data) return;

    const checkOperatingStatus = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const [openH, openM] = data.openTime.split(":").map(Number);
      const [closeH, closeM] = data.closeTime.split(":").map(Number);

      const openMinutes = openH * 60 + openM;
      const closeMinutes = closeH * 60 + closeM;

      if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };

    checkOperatingStatus();
    const interval = setInterval(checkOperatingStatus, 60000);
    return () => clearInterval(interval);
  }, [data]);

  if (!data) {
    notFound();
  }

  // Helper Ikon
  const renderFactIcon = (name: string) => {
    switch (name) {
      case "landmark":
        return <Landmark className="w-5 h-5 text-[#580A14] dark:text-amber-400" />;
      case "building":
        return <Building2 className="w-5 h-5 text-[#580A14] dark:text-amber-400" />;
      case "utensils":
        return <Utensils className="w-5 h-5 text-[#580A14] dark:text-amber-400" />;
      case "award":
      default:
        return <Award className="w-5 h-5 text-[#580A14] dark:text-amber-400" />;
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#1C1917] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER JUDUL */}
        <section className="space-y-2 text-center md:text-left">
          <FadeIn direction="down" delay={0.1}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
              {data.title}
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base max-w-3xl">
              {data.tagline[lang]}
            </p>
          </FadeIn>
        </section>

        {/* HERO IMAGE & CAPTION */}
        <FadeIn direction="up" delay={0.2}>
          <div className="relative w-full h-[340px] sm:h-[440px] rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md group">
            <Image
              src={data.image}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              priority
            />
            
            {/* OVERLAY MERAH MARUN TIPIS */}
            <div className="absolute inset-0 bg-[#580A14]/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* BADGE TAMBAHAN DI ATAS KIRI */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-1.5 bg-[#580A14]/90 backdrop-blur-md text-amber-200 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-amber-800/60 shadow-lg tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{data.topBadgeText[lang]}</span>
            </div>

            {/* CAPTION DI BAWAH KIRI */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-300">
                SUASANA AUTENTIK
              </span>
              <p className="font-serif text-xl sm:text-2xl font-semibold drop-shadow-md">
                {data.imageCaption[lang]}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* BANNER KEDEKATAN LOKASI (REAL-TIME GPS) & BUTTON PANDUAN RUTE */}
        <FadeIn direction="up" delay={0.25}>
          <div className="bg-[#3D060D] text-amber-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-amber-950">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-950/80 border border-amber-800 rounded-xl text-amber-400 shrink-0">
                <MapPin className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-300/80 tracking-wider block">
                  {t.locationStatus}
                </span>
                <p className="text-xs sm:text-sm font-semibold">
                  {realDistance ? (
                    <>
                      <span className="text-amber-300 font-bold">{realDistance}</span>{" "}
                      {t.fromYourPos}
                    </>
                  ) : (
                    t.calculating
                  )}
                </p>
              </div>
            </div>

            <a
              href={data.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow transition-colors shrink-0"
            >
              <Navigation className="w-4 h-4 fill-current" />
              <span>{t.getDirections}</span>
            </a>
          </div>
        </FadeIn>

        {/* 3 CARD INFORMASI (ALAMAT, JAM OPERASIONAL, TIKET) */}
        <FadeIn direction="up" delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. ALAMAT */}
            <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#580A14] dark:text-amber-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    {t.fullAddress}
                  </span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                  {data.address}
                </p>
              </div>
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#580A14] dark:text-amber-400 hover:underline inline-flex items-center gap-1 pt-2"
              >
                <span>{t.showMap}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* 2. JAM OPERASIONAL DENGAN DYNAMIC STATUS */}
            <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#580A14] dark:text-amber-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    {t.opHours}
                  </span>
                </div>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {data.openTime} - {data.closeTime} WIB
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">{t.openDaily}</p>
              </div>

              {/* DYNAMIC OPERATING STATUS */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center gap-1.5 text-xs font-semibold">
                {isOpenNow === true ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-emerald-700 dark:text-emerald-400">{t.openToday}</span>
                  </>
                ) : isOpenNow === false ? (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    <span className="text-rose-700 dark:text-rose-400">{t.closedNow}</span>
                  </>
                ) : (
                  <span className="text-stone-400">...</span>
                )}
              </div>
            </div>

            {/* 3. TIKET & BIAYA */}
            <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#580A14] dark:text-amber-500">
                <Ticket className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {t.ticketPrice}
                </span>
              </div>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-snug">
                {data.ticket[lang]}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {t.publicAccess}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* SECTION SEJARAH & AKSES DIGITAL (SPLIT GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* SEJARAH & FAKTA UNIK (LEFT - 2 COLS) */}
          <div className="lg:col-span-2">
            <FadeIn direction="up" delay={0.35} className="h-full">
              <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-wider text-[#580A14] dark:text-amber-500 font-bold block">
                    {t.heritageLabel}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {data.historyTitle[lang]}
                  </h2>
                  <div className="space-y-3.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {data.historyParagraphs[lang].map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="pt-2">
                    <blockquote className="italic font-serif text-sm text-[#580A14] dark:text-amber-200 bg-amber-50/80 dark:bg-amber-950/50 border-l-4 border-[#580A14] dark:border-amber-600 p-3.5 rounded-r-xl">
                      "{data.quote[lang]}"
                    </blockquote>
                  </div>
                </div>

                {/* PENAMBAHAN: GRID FAKTA UNIK UNTUK MENGISI RUANG KOSONG DESKTOP */}
                <div className="pt-6 border-t border-stone-100 dark:border-stone-800 space-y-3">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400">
                    {t.quickFactsTitle}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {data.quickFacts.map((fact, idx) => (
                      <div
                        key={idx}
                        className="bg-stone-50 dark:bg-stone-800 p-3 rounded-xl border border-stone-200/70 dark:border-stone-700/50 space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          {renderFactIcon(fact.iconName)}
                          <span className="text-[11px] font-bold text-stone-800 dark:text-stone-200">
                            {fact.title[lang]}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-tight">
                          {fact.desc[lang]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>

          {/* AKSES DIGITAL (RIGHT - 1 COL) */}
          <div className="space-y-6">
            <FadeIn direction="up" delay={0.4} className="h-full">
              <div className="space-y-5 flex flex-col justify-between h-full">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1 block">
                  {t.digitalAccess}
                </span>

                {/* CARD 1: TUR VIRTUAL 360° */}
                <div className="bg-[#FFFDF9] dark:bg-stone-900 rounded-3xl overflow-hidden border border-amber-200/80 dark:border-stone-800 shadow-sm space-y-4 p-4 hover:shadow-md transition-all duration-300">
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 group">
                    <Image
                      src={data.tour360Image}
                      alt={t.tour360Title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#580A14]/35 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg border border-orange-400/60 backdrop-blur-sm animate-float group-hover:scale-110 transition-transform duration-300">
                        <Compass className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 px-1">
                    <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                      {t.tour360Title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {t.tour360Desc}
                    </p>
                  </div>

                  <div className="pt-1">
                    <Link
                      href={`/atraksi/${id}/360`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-[#580A14] hover:text-white dark:hover:bg-amber-600 dark:hover:text-stone-950 hover:border-[#580A14] dark:hover:border-amber-600 active:bg-[#580A14] active:text-white text-xs font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-sm"
                    >
                      <span>{t.startTour}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* CARD 2: LIHAT MODEL 3D */}
                <div className="bg-[#FFFDF9] dark:bg-stone-900 rounded-3xl overflow-hidden border border-amber-200/80 dark:border-stone-800 shadow-sm space-y-4 p-4 hover:shadow-md transition-all duration-300">
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 group">
                    <Image
                      src={data.model3dImage}
                      alt={t.model3dTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#580A14]/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg border border-orange-400/40 backdrop-blur-sm animate-float group-hover:scale-110 transition-transform duration-300">
                        <Box className="w-6 h-6 stroke-[2]" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 px-1">
                    <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                      {t.model3dTitle}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {t.model3dDesc}
                    </p>
                  </div>

                  <div className="pt-1">
                    <Link
                      href={`/atraksi/${id}/3d`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-[#580A14] hover:text-white dark:hover:bg-amber-600 dark:hover:text-stone-950 hover:border-[#580A14] dark:hover:border-amber-600 active:bg-[#580A14] active:text-white text-xs font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-sm"
                    >
                      <span>{t.view3d}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </main>
  );
}