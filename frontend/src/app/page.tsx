import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Natya | Indian Classical Arts Academy | Learn Dance & Music Online",
  description: "Natya is a premier e-learning platform for Indian classical arts. Join professional online & offline courses in Bharatanatyam, Carnatic Music, Mohiniyattam, Kuchipudi, Kathak, and Yoga.",
  keywords: "Natya Arts, Learn Bharatanatyam Online, Carnatic Music Classes, Indian Classical Dance Academy, Mohiniyattam, Kuchipudi, Kathak, Kozhikode Art School",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomeClient />;
}
