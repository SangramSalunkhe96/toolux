import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://toolux.in";

  const routes = [
    "",
    "/tools/merge-pdf",
    "/tools/split-pdf",
    "/tools/compress-pdf",
    "/tools/pdf-to-jpg",
    "/tools/jpg-to-pdf",
    "/tools/pdf-to-word",
    "/tools/word-to-pdf",
    "/about",
    "/contact",
    "/privacy-policy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
