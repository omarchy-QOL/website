import cloudflare from "@astrojs/cloudflare"
import { defineConfig } from "astro/config"
import baseConfig from "./astro.config.mjs"

export default defineConfig({
  ...baseConfig,
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
})
