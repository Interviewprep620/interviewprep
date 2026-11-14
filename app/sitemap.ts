import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://interviewprep-ruddy.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://interviewprep-ruddy.vercel.app/dashboard",
      lastModified: new Date(),
    },
  ];
}