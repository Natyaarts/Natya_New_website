import type { Metadata } from "next";
import CourseClient from "./CourseClient";

export const metadata: Metadata = {
  title: "Explore Classical Arts Courses | Bharatanatyam & Carnatic Music | Natya Arts",
  description: "Enroll in professional online and offline courses at Natya Arts Academy. Expert training in Bharatanatyam, Mohiniyattam, Kuchipudi, Kathak, Carnatic Vocals, Mridangam, Violin, and Yoga.",
  keywords: "Bharatanatyam online classes, Carnatic music courses, Mohiniyattam training, Kuchipudi online, Kathak classes, Natya Arts courses Kozhikode",
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "Explore Classical Arts Courses | Bharatanatyam & Carnatic Music",
    description: "Enroll in professional online and offline courses at Natya Arts Academy. Expert training in Bharatanatyam, Mohiniyattam, Kuchipudi, Kathak, Carnatic Vocals, Mridangam, Violin, and Yoga.",
    url: "https://natyaarts.com/courses",
    images: [{ url: "/img/hero.png", width: 1200, height: 630, alt: "Natya Arts Classical Dance & Music Courses" }],
  },
};

export default function CoursesPage() {
  return <CourseClient />;
}
