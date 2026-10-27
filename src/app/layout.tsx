import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Noto_Serif_Sinhala } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion, SmoothScroll } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import { Cursor, FloatingContact } from "@/components/Chrome";

const bodoni = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-bodoni", display: "swap" });
const sinhala = Noto_Serif_Sinhala({ subsets: ["sinhala"], weight: "400", variable: "--font-noto-sinhala", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Golden Flower · Wedding venue in Hingurakgoda", template: "%s · Golden Flower, Hingurakgoda" },
  description:
    "Garden and hall weddings, décor and catering on Airport Road, Hingurakgoda. Poruwa ceremonies at your nekath, receptions under string lights, rooms for the family.",
  openGraph: { type: "website", locale: "en_LK", siteName: "Golden Flower", images: ["/assets/photos/garden-ceremony.jpg"] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#14120e" },
  ],
};

// Runs before paint: marks repeat visits (skips the preloader) and enables motion styles.
// If the JS bundle never arrives, the safety timer un-hides everything.
const boot = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem('gf-visited'))d.dataset.visited='1'}catch(e){}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion');setTimeout(function(){if(!window.__gfMotion){d.classList.remove('motion')}},4000)})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Hotel", "EventVenue"],
  name: site.legalName,
  url: site.url,
  image: `${site.url}/assets/photos/garden-ceremony.jpg`,
  telephone: site.phones[3].tel,
  address: { "@type": "PostalAddress", streetAddress: site.address.line1, addressLocality: site.address.town, addressRegion: "North Central Province", addressCountry: "LK" },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.mapUrl,
  aggregateRating: { "@type": "AggregateRating", ratingValue: site.reviews.google.rating, reviewCount: site.reviews.google.count, bestRating: 5 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${sinhala.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <style>{`html[data-visited] .preloader{display:none}`}</style>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <Motion />
        <Header />
        {children}
        <Footer />
        <FloatingContact />
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
