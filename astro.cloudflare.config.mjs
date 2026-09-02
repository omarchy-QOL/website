import cloudflare from "@astrojs/cloudflare"
import { defineConfig } from "astro/config"
import baseConfig from "./astro.config.mjs"

export default defineConfig({
  ...baseConfig,
  output: "server",
  adapter: cloudflare({
    configPath: process.env.SST_WRANGLER_PATH,
    imageService: "passthrough",
  }),
})
