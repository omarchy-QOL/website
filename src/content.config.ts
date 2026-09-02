import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { docsLoader } from "@astrojs/starlight/loaders"
import { docsSchema } from "@astrojs/starlight/schema"

const screenshot = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string(),
})

const video = z.object({
  src: z.string(),
  poster: z.string(),
  title: z.string(),
})

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        pluginOrder: z.number().int().optional(),
        category: z.string().optional(),
        status: z.enum(["published", "lab"]).optional(),
        version: z.string().optional(),
        kinds: z.array(z.string()).optional(),
        highlights: z.array(z.string()).optional(),
        shortDescription: z.string().optional(),
        sourceUrl: z.url().optional(),
        installCommand: z.string().optional(),
        screenshots: z.array(screenshot).optional(),
        videos: z.array(video).optional(),
      }),
    }),
  }),
}
