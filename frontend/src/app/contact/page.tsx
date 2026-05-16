import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Natya Arts | Admissions & Course Enquiries | Kozhikode",
  description: "Get in touch with Natya Arts Academy at SG Arcade, KT Gopalan Rd, Kottooli, Kozhikode. Connect via WhatsApp (+91-75598-61455) or request a call back for course admissions and fee structures.",
  keywords: "Contact Natya Arts, Natya Arts Kozhikode address, Natya Arts phone number, Classical dance admission Kerala, Carnatic music enquiry",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Natya Arts | Admissions & Course Enquiries",
    description: "Get in touch with Natya Arts Academy at SG Arcade, KT Gopalan Rd, Kottooli, Kozhikode. Connect via WhatsApp (+91-75598-61455) or request a call back for course admissions.",
    url: "https://natyaarts.com/contact",
    images: [{ url: "/img/hero.png", width: 1200, height: 630, alt: "Contact Natya Arts Academy Kozhikode" }],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
