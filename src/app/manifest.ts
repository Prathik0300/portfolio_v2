import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prathik Pugazhenthi Portfolio",
    short_name: "Prathik Portfolio",
    description:
      "AI Platform & Infrastructure Engineer \u2014 multi-agent AI pipelines, multi-tenant platforms on GKE, and the CI/CD that ships them.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0D0E",
    theme_color: "#0A0D0E",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
