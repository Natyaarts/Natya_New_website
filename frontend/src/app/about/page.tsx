import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Natya Arts | Indian Classical Dance & Music Academy Kozhikode",
  description: "Discover Natya Arts Academy in Kozhikode. Founded by Kalamandalam Sivaprasad & Kalakshetra Anjali, offering premier online & offline training in Bharatanatyam, Carnatic Music, Mohiniyattam, and Kuchipudi.",
  keywords: "Natya Arts, Kalamandalam Sivaprasad, Kalakshetra Anjali, Bharatanatyam Academy Kozhikode, Carnatic Music Institute Kerala, Classical Dance Online",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Natya Arts | Indian Classical Dance & Music Academy",
    description: "Discover Natya Arts Academy in Kozhikode. Founded by Kalamandalam Sivaprasad & Kalakshetra Anjali, offering premier online & offline training in Bharatanatyam, Carnatic Music, Mohiniyattam, and Kuchipudi.",
    url: "https://natyaarts.com/about",
    images: [{ url: "/img/hero.png", width: 1200, height: 630, alt: "Natya Arts Academy Founders & Legacy" }],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
