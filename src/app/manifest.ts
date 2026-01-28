import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prathik Pugazhenthi Portfolio",
    short_name: "Prathik Portfolio",
    description:
      "Portfolio website of Prathik Pugazhenthi, a software developer specializing in full-stack engineering, cloud infrastructure, and scalable product architectures.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#005461",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
