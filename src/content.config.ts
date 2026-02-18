import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const works = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/works" }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    role: z.string(),
    client: z.string(),
    category: z.enum([
      "commercial",
      "music-video",
      "documentary",
      "wedding",
      "brand",
      "short-film",
    ]),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    previewVideo: z.string().optional(),
    fullVideoUrl: z.string().optional(),
    description: z.string(),
    credits: z
      .array(
        z.object({
          role: z.string(),
          name: z.string(),
        })
      )
      .optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { works };
