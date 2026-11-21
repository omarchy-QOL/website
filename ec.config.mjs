import { defineEcConfig } from "@astrojs/starlight/expressive-code"

export default defineEcConfig({
  // Tokyo Night matches the Omarchy palette the site already uses.
  themes: ["tokyo-night"],
  // Prerendering runs in workerd, which refuses Shiki's WebAssembly engine.
  shiki: { engine: "javascript" },
  // Commands get a plain box; a title such as a config path still adds a tab.
  defaultProps: { frame: "code" },
})
