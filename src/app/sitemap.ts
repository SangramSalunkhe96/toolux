import { MetadataRoute } from "next";
import { tools } from "@/config/tools"; // your tool list

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://toolux.in";

  // Tool pages from tools config
  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: tool.pro ? 0.6 : 0.9,
  }));

  // Static pages
  const staticUrls = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/cookies",
    "/disclaimer",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Homepage
  const home = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
  ];

  return [...home, ...staticUrls, ...toolUrls];
}
