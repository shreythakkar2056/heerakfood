import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// 1. Configure Fonts
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["600", "700", "800"],
  display: "swap",
});

// 2. Viewport Configuration (Mobile Responsiveness)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFBEB", // Matches your cream background
};

// 3. SEO & Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://www.heerakfood.in'), // Your actual domain
  
  // Title Template allows pages to have "Page Name | Heerak Food" automatically
  title: {
    default: "Heerak Food | Premium Mamra, Poha & Jaggery Manufacturer in India",
    template: "%s | Heerak Food"
  },
  
  description: "Buy high-quality Mamra (puffed rice), Jaggery, and Poha at best prices from Heerak Food. Trusted brand in Ahmedabad for 15+ years. 100% Natural, No Onion No Garlic, Fast delivery across India.",
  
  // Extracted & Optimized Keywords from your old site
  keywords: [
    "Heerak Food", "Mamra", "Puffed Rice", "Poha", "Flattened Rice", "Jaggery", "Gur",
    "Best Mamra in Ahmedabad", "Poha Manufacturer India", "Chemical Free Jaggery",
    "Basmati Mamra", "Kolhapuri Mamra", "Maize Poha", "Makai Poha",
    "Healthy Snacks India", "Swaminarayan Food", "No Onion No Garlic Snacks",
    "Wholesale Food Supplier", "Gujarat Food Export", "Indian Breakfast Cereals"
  ],

  authors: [{ name: "Heerak Food" }],
  creator: "Shri Hari Traders",
  publisher: "Heerak Food",
  
  // Search Engine Bot Instructions
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // OpenGraph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.heerakfood.in",
    title: "Heerak Food | The Crunch of Tradition",
    description: "Discover premium-quality Mamra, Poha & Jaggery. Trusted by 500+ stores and thousands of families in Gujarat and beyond.",
    siteName: "Heerak Food",
    images: [
      {
        url: "/images/logo.webp", // Ensure this image is high quality (1200x630 is best)
        width: 1200,
        height: 630,
        alt: "Heerak Food Premium Products",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Heerak Food | Best Mamra & Poha in India",
    description: "100% Natural & Fresh snacks from Ahmedabad. Order Wholesale today.",
    images: ["/images/logo.webp"], // Or use a banner image here
  },

  // Location Metadata for Local SEO
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad",
    "geo.position": "23.0225;72.5714", // Coordinates for Ahmedabad
    "ICBM": "23.0225, 72.5714"
  },

  icons: {
    icon: "/images/logo.webp",
    shortcut: "/images/logo.webp",
    apple: "/images/logo.webp", // Add this image to public folder if you have it
  },
};

// 4. JSON-LD Schema (Structured Data for Google)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Heerak Food",
  "url": "https://www.heerakfood.in",
  "logo": "https://www.heerakfood.in/images/logo.webp",
  "sameAs": [
    "https://www.instagram.com/heerakfoods/",
    // Add Facebook/LinkedIn URLs here if you have them
  ],
  "description": "Top supplier of Mamra, Poha and Jaggery in Ahmedabad & Gujarat for 15+ years. Pure, healthy, and traditional snacks.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Beside Aiiyapa Mandir, Vasna",
    "addressLocality": "Ahmedabad",
    "addressRegion": "Gujarat",
    "postalCode": "382330",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9727724404",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["en", "gu", "hi"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Inject JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${sans.variable} ${serif.variable} antialiased bg-[#FFFBEB] text-[#4A3B32]`}
      >
        {children}
      </body>
    </html>
  );
}