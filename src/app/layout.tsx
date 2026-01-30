import type { Metadata, Viewport } from "next";
import { Ubuntu, Raleway, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/context/UIContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StructuredData } from "@/components/SEO/StructuredData";
import { Analytics } from "@/components/Analytics/Analytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#005461",
};

const ubuntu = Ubuntu({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const raleway = Raleway({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prathikpugazhenthi.dev"), // Update with your actual domain
  title: {
    default: "Prathik Pugazhenthi | Full-Stack & Cloud Developer",
    template: "%s | Prathik Pugazhenthi",
  },
  description:
    "Full-stack and cloud software developer building scalable web apps and infrastructure with React, Node.js, Kubernetes, CI/CD, and GCP/AWS.",
  keywords: [
    "Prathik Pugazhenthi",
    "Software Developer",
    "Full-Stack Developer",
    "Cloud Developer",
    "DevOps Engineer",
    "Kubernetes",
    "GCP",
    "AWS",
    "CI/CD",
    "Node.js",
    "React",
    "TypeScript",
    "NestJS",
    "Python",
    "AI Automation",
    "Distributed Systems",
    "Chicago Developer",
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
    url: "https://prathikpugazhenthi.dev", // Update with your actual domain
    siteName: "Prathik Pugazhenthi Portfolio",
    title: "Prathik Pugazhenthi | Full-Stack & Cloud Developer",
    description:
      "Software Developer specializing in full-stack engineering, cloud infrastructure, CI/CD automation, and scalable product architectures. Explore my projects, experience, and services.",
    images: [
      {
        url: "/prathik-hero.png",
        width: 430,
        height: 560,
        alt: "Prathik Pugazhenthi - Full-Stack & Cloud Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathik Pugazhenthi | Full-Stack & Cloud Developer",
    description:
      "Software Developer specializing in full-stack engineering, cloud infrastructure, CI/CD automation, and scalable product architectures.",
    images: ["/prathik-hero.png"],
    creator: "@prathik0300", // Update with your Twitter handle if available
  },
  verification: {
    // Add verification codes when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
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
        className={`${ubuntu.variable} ${raleway.variable} ${jetBrainsMono.variable} appShell`}
      >
        <Analytics />
        <StructuredData />
        <UIProvider>
          <ScrollToTop />
          <div className="appInner">{children}</div>
        </UIProvider>
      </body>
    </html>
  );
}
