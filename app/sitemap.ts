import type { MetadataRoute } from "next";

/**
 * Generates sitemap entries for the Korean and English home pages including alternate language links.
 *
 * @returns An array of sitemap entries for `/ko/home` and `/en/home`, each containing `url`, `lastModified` (current date), `changeFrequency: "weekly"`, `priority: 1`, and `alternates.languages` mapping `ko` and `en` to their respective URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://next-umsungjun.vercel.app";

  return [
    {
      url: `${baseUrl}/ko/home`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/home`,
          en: `${baseUrl}/en/home`,
        },
      },
    },
    {
      url: `${baseUrl}/en/home`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/home`,
          en: `${baseUrl}/en/home`,
        },
      },
    },
  ];
}