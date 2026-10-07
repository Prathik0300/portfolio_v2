import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/context/UIContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StructuredData } from "@/components/SEO/StructuredData";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0D0E",
};

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prathikpugazhenthi.dev"),
  title: {
    default: "Prathik Pugazhenthi | AI Platform & Infrastructure Engineer",
    template: "%s | Prathik Pugazhenthi",
  },
  description:
    "AI Platform & Infrastructure Engineer. I build multi-agent AI pipelines, multi-tenant platforms on GKE/Kubernetes, and the CI/CD that ships them. MS CS @ UIC, ex-SDE at Bajaj Finserv Health.",
  keywords: [
    "Prathik Pugazhenthi",
    "AI Platform Engineer",
    "AI Infrastructure Engineer",
    "AI Engineer",
    "Platform Engineer",
    "DevOps Engineer",
    "Software Engineer",
    "Kubernetes",
    "GKE",
    "Multi-agent AI",
    "LLM",
    "CI/CD",
    "GCP",
    "AWS",
    "NestJS",
    "TypeScript",
    "Python",
    "Distributed Systems",
    "Chicago",
    "Portfolio",
  ],
  authors: [{ name: "Prathik Pugazhenthi", url: "https://github.com/Prathik0300" }],
  creator: "Prathik Pugazhenthi",
  publisher: "Prathik Pugazhenthi",
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
  alternates: {
    canonical: "https://prathikpugazhenthi.dev/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prathikpugazhenthi.dev",
    siteName: "Prathik Pugazhenthi",
    title: "Prathik Pugazhenthi | AI Platform & Infrastructure Engineer",
    description:
      "I build multi-agent AI pipelines, multi-tenant platforms on GKE/Kubernetes, and the CI/CD that ships them. Selected work, experience, and case studies.",
    images: [
      {
        url: "/prathik-hero.png",
        width: 430,
        height: 560,
        alt: "Prathik Pugazhenthi — AI Platform & Infrastructure Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathik Pugazhenthi | AI Platform & Infrastructure Engineer",
    description:
      "Multi-agent AI pipelines, multi-tenant platforms on GKE, and the CI/CD that ships them.",
    images: ["/prathik-hero.png"],
    creator: "@prathik0300",
  },
  category: "Technology",
  classification: "Portfolio",
  other: {
    "contact:email": "prathik0300@gmail.com",
    "contact:phone_number": "+13128893640",
    "contact:locality": "Chicago",
    "contact:region": "IL",
    "contact:country_name": "United States",
  },
  formatDetection: {
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} appShell`}
      >
        <StructuredData />
        <UIProvider>
          <ScrollToTop />
          <div className="appInner">{children}</div>
        </UIProvider>
      </body>
    </html>
  );
}
