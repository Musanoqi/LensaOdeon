"use client";

import dynamic from "next/dynamic";

const OdeonMap = dynamic(() => import("./OdeonMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-stone-100 rounded-3xl flex items-center justify-center text-stone-400 text-sm animate-pulse">
      Memuat Peta Kawasan Interaktif Odeon...
    </div>
  ),
});

export default function OdeonMapWrapper() {
  return <OdeonMap />;
}