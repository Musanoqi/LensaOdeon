export interface Attraction {
  id: string;
  name: string;
  category: "Wisata & Budaya" | "Kuliner Legendaris";
  tagline: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    googleMapsUrl: string;
  };
  operationalHours: string;
  price: string;
  thumbnail: string;
  model3dUrl: string;
  tour360: {
    roomName: string;
    imageUrl: string;
  }[];
}

export const ATTRACTIONS_DATA: Attraction[] = [
  {
    id: "vihara-widhi-sakti",
    name: "Vihara Widhi Sakti",
    category: "Wisata & Budaya",
    tagline: "Cagar Budaya & Klenteng Historical",
    description: "Klenteng bersejarah di kawasan Odeon dengan arsitektur ornamen Tionghoa klasik dan nuansa lampion khas.",
    location: {
      lat: -6.921820,
      lng: 106.922900,
      address: "Jl. Pajagalan No.20, Nyomplong, Kota Sukabumi",
      googleMapsUrl: "https://maps.app.goo.gl/HevcAryAQ61t9q5Q7"
    },
    operationalHours: "07.00 - 20.00 WIB",
    price: "Gratis",
    thumbnail: "/samples/vihara-thumb.jpg",
    model3dUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    tour360: [{ roomName: "Halaman Utama", imageUrl: "https://pannellum.org/images/alma.jpg" }]
  },
  {
    id: "odeon-kopitiam",
    name: "Odeon Kopitiam",
    category: "Kuliner Legendaris",
    tagline: "Kopi & Kudapan Tradisional",
    description: "Kedai kopi klasik bernuansa tempo dulu dengan hidangan kudapan khas dan tempat bersantai wisatawan.",
    location: {
      lat: -6.921100,
      lng: 106.923450,
      address: "Jl. Pajagalan, Nyomplong, Kota Sukabumi",
      googleMapsUrl: "https://maps.app.goo.gl/ZQqP3ttZ13DZfV8a8"
    },
    operationalHours: "06.00 - 18.00 WIB",
    price: "Rp 10.000 - Rp 35.000",
    thumbnail: "/samples/kopitiam-thumb.jpg",
    model3dUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    tour360: [{ roomName: "Area Cafe", imageUrl: "https://pannellum.org/images/cerro-tolo.jpg" }]
  },
  {
    id: "museum-tionghoa-sukabumi",
    name: "Museum Tionghoa Sukabumi",
    category: "Wisata & Budaya",
    tagline: "Eksplorasi Sejarah & Artefak Heritage",
    description: "Museum yang menyimpan rekam jejak, artefak, dan sejarah keberagaman etnis Tionghoa di Soekaboemi.",
    location: {
      lat: -6.923150,
      lng: 106.923520,
      address: "Gg. Murni, Nyomplong, Kota Sukabumi",
      googleMapsUrl: "https://maps.app.goo.gl/9KWWVBcGj8SndHJb8"
    },
    operationalHours: "08.00 - 16.00 WIB",
    price: "Gratis / Donasi",
    thumbnail: "/samples/museum-thumb.jpg",
    model3dUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    tour360: [{ roomName: "Ruang Pameran", imageUrl: "https://pannellum.org/images/alma.jpg" }]
  }
];