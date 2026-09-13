import type { MetadataRoute } from "next";

const siteUrl = "https://skillswap-mu-pied.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/profile/",
        "/bookings/",
        "/availability/",
        "/swaps/",
        "/login",
        "/register",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
