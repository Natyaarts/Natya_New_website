import GalleryClient from "./GalleryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Moments | Gallery & Stage Shows | Natya Arts Academy",
  description: "Explore the captivating performances, stage shows, Arangetram moments, workshops, and student highlights from Natya Arts Academy in Kozhikode.",
  keywords: "Natya Arts gallery, Bharatanatyam stage shows, Carnatic music performances, Arangetram photos Kerala, Classical dance academy gallery",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Our Moments | Gallery & Stage Shows | Natya Arts Academy",
    description: "Explore the captivating performances, stage shows, Arangetram moments, workshops, and student highlights from Natya Arts Academy in Kozhikode.",
    url: "https://natyaarts.com/gallery",
    images: [{ url: "/img/hero.png", width: 1200, height: 630, alt: "Natya Arts Academy Gallery & Performances" }],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
