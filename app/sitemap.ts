import type { MetadataRoute } from "next";
import { supabase } from "../dbclient/superBaseClient";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "https://webslots.africa"
).replace(/\/$/, "");

const publicRoutes = [
  "/",
  "/about",
  "/slots",
  "/reviews",
  "/news",
  "/providers",
  "/responsible",
  "/terms",
  "/casino-bonus-calculator",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));

  try {
    const [slotsResult, reviewsResult] = await Promise.all([
      supabase.from("slotcatalog").select("gameSlug, updatedAt"),
      supabase.from("review").select("reviewSlug, updatedAt"),
    ]);

    if (slotsResult.error) throw slotsResult.error;
    if (reviewsResult.error) throw reviewsResult.error;

    const slotEntries = (slotsResult.data ?? [])
      .filter((slot) => slot.gameSlug)
      .map((slot) => ({
        url: `${siteUrl}/games/${encodeURIComponent(slot.gameSlug)}`,
        lastModified: slot.updatedAt ? new Date(slot.updatedAt) : undefined,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    const reviewEntries = (reviewsResult.data ?? [])
      .filter((review) => review.reviewSlug)
      .map((review) => ({
        url: `${siteUrl}/review/${encodeURIComponent(review.reviewSlug)}`,
        lastModified: review.updatedAt ? new Date(review.updatedAt) : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    return [...staticEntries, ...slotEntries, ...reviewEntries];
  } catch (error) {
    console.error("Unable to load dynamic sitemap entries:", error);
    return staticEntries;
  }
}
