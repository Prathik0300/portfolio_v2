import type { Metadata } from "next";
import { Ubuntu, Raleway, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/context/UIContext";

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
  title: "Prathik Pugazhenthi | Software Developer",
  description:
    "Portfolio of Prathik Pugazhenthi, a software developer specializing in full-stack engineering, cloud infrastructure, CI/CD automation, and scalable product architectures.",
  metadataBase: new URL("https://www.example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prathik Pugazhenthi | Software Developer",
    description:
      "Explore experience, research, and services from Prathik Pugazhenthi, a full-stack and cloud developer working on distributed, production-ready systems.",
    url: "/",
    siteName: "Prathik Pugazhenthi Portfolio",
    images: [
      {
        url: "/images/prathik-hero.png",
        width: 768,
        height: 1024,
        alt: "Portrait of Prathik Pugazhenthi",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathik Pugazhenthi | Software Developer",
    description:
      "Software developer focused on full-stack systems, cloud infrastructure, DevOps, and AI-enabled automation.",
    images: ["/images/prathik-hero.png"],
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
        <UIProvider>
          <div className="appInner">{children}</div>
        </UIProvider>
      </body>
    </html>
  );
}
