import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://natyaarts.com"),
  title: "Natya | Elevating Art Beyond Boundaries",
  description: "Natya is a premier institute for arts, offering professional courses in dance, music, and creative expression. Discover our gallery and career opportunities.",
  keywords: "Natya, Arts, Dance, Music, Courses, Academy, Professional Arts, Bharatanatyam, Carnatic Music, Mohiniyattam, Kuchipudi, Kathak",
  authors: [{ name: "Kalamandalam Sivaprasad" }, { name: "Kalakshetra Anjali" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Natya | Elevating Art Beyond Boundaries",
    description: "Natya is a premier institute for arts, offering professional courses in dance, music, and creative expression. Discover our gallery and career opportunities.",
    url: "https://natyaarts.com",
    siteName: "Natya Arts",
    images: [
      {
        url: "/img/hero.png",
        width: 1200,
        height: 630,
        alt: "Natya Arts Academy Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Natya | Elevating Art Beyond Boundaries",
    description: "Natya is a premier institute for arts, offering professional courses in dance, music, and creative expression.",
    images: ["/img/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} font-sans h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Natya Arts",
              url: "https://natyaarts.com",
              logo: "https://natyaarts.com/img/hero.png",
              foundingDate: "2020",
              founders: [
                {
                  "@type": "Person",
                  name: "Kalamandalam Sivaprasad",
                },
                {
                  "@type": "Person",
                  name: "Kalakshetra Anjali",
                },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "SG Arcade, KT Gopalan Rd, Kottooli",
                addressLocality: "Kozhikode",
                addressRegion: "Kerala",
                postalCode: "673016",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-75598-61455",
                contactType: "customer service",
                email: "info@natyaarts.com",
                availableLanguage: ["English", "Malayalam", "Hindi", "Tamil"],
              },
              sameAs: [
                "https://twitter.com/natyaarts",
                "https://instagram.com/natyaarts",
                "https://facebook.com/natyaarts",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
