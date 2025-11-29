import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://toolux.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
