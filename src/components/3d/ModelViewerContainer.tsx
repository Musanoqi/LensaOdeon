"use client";

import { useEffect } from "react";

interface ModelViewerProps {
  src: string;
  alt: string;
}

export default function ModelViewerContainer({ src, alt }: ModelViewerProps) {
  useEffect(() => {
    // Import script @google/model-viewer secara dinamis di browser
    import("@google/model-viewer");
  }, []);

  return (
    <div className="w-full h-[350px] md:h-[500px] bg-stone-900 rounded-xl overflow-hidden relative border border-stone-800">
      {/* @ts-ignore custom element */}
      <model-viewer
        src={src}
        alt={alt}
        auto-rotate
        camera-controls
        touch-action="pan-y"
        shadow-intensity="1"
        style={{ width: "100%", height: "100%" }}
      >
        <div slot="poster" className="flex items-center justify-center h-full text-stone-400 text-sm">
          Memuat Model 3D...
        </div>
      {/* @ts-ignore */}
      </model-viewer>
    </div>
  );
}