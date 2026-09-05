import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { docsLoader } from "@astrojs/starlight/loaders"
import { docsSchema } from "@astrojs/starlight/schema"

const screenshot = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
})

const video = z.object({
  src: z.string(),
  poster: z.string(),
  title: z.string(),
  description: z.string(),
  duration: z.string().regex(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/),
  uploadDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
})

const plugin = z.object({
  pluginOrder: z.number().int(),
  category: z.string(),
  status: z.enum(["published", "lab"]),
  version: z.string(),
  kinds: z.array(z.string()),
  highlights: z.array(z.string()),
  shortDescription: z.string(),
  sourceUrl: z.url().optional(),
  installCommand: z.string().optional(),
  screenshots: z.array(screenshot).optional(),
  videos: z.array(video).optional(),
})

// Pages without a plugin order can use the regular Starlight frontmatter.
const page = plugin.partial().extend({ pluginOrder: z.undefined().optional() })

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: z.union([plugin, page]) }),
  }),
}
