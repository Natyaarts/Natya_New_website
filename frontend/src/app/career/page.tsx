import CareerClient from "./CareerClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Natya Arts | Art Education & Teaching Jobs Kozhikode",
  description: "Join the faculty at Natya Arts Academy. Explore career opportunities and teaching roles for Bharatanatyam, Carnatic Vocals, and Classical Arts tutors in Calicut and remote.",
  keywords: "Natya Arts careers, Classical dance teaching jobs, Carnatic music tutor vacancies, Art academy jobs Kerala, Natya Arts hiring",
  alternates: {
    canonical: "/career",
  },
  openGraph: {
    title: "Careers at Natya Arts | Art Education & Teaching Jobs",
    description: "Join the faculty at Natya Arts Academy. Explore career opportunities and teaching roles for Bharatanatyam, Carnatic Vocals, and Classical Arts tutors in Calicut and remote.",
    url: "https://natyaarts.com/career",
    images: [{ url: "/img/hero.png", width: 1200, height: 630, alt: "Careers at Natya Arts Academy" }],
  },
};

export default function CareerPage() {
  return <CareerClient />;
}
