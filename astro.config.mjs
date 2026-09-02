import sitemap from "@astrojs/sitemap"
import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import { NOINDEX_PATHS, SITE } from "./src/config/site.mjs"

export default defineConfig({
  site: SITE.origin,
  output: "static",
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname
        return !NOINDEX_PATHS.includes(path) && !path.endsWith(".xml") && !path.endsWith(".txt")
      },
    }),
    starlight({
      title: SITE.name,
      description: SITE.description,
      favicon: "/omarchy-wordmark.svg",
      pagefind: true,
      lastUpdated: false,
      pagination: false,
      tableOfContents: false,
      credits: false,
      customCss: [
        "@fontsource/ibm-plex-mono/400.css",
        "@fontsource/ibm-plex-mono/500.css",
        "@fontsource/ibm-plex-mono/600.css",
        "@fontsource/ibm-plex-mono/700.css",
        "./src/styles/custom.css",
      ],
      components: {
        Head: "./src/components/SeoHead.astro",
        Header: "./src/components/DocsHeader.astro",
        MarkdownContent: "./src/components/MarkdownContent.astro",
        PageTitle: "./src/components/PageTitle.astro",
        Sidebar: "./src/components/DocsSidebar.astro",
      },
      sidebar: [
        { label: "Overview", slug: "docs" },
        {
          label: "Plugins",
          items: [
            { label: "Plugin Control", slug: "docs/plugins/plugin-control" },
            { label: "Syncshell", slug: "docs/plugins/syncshell" },
            { label: "btop Activity", slug: "docs/plugins/omarchy-btop-activity" },
            { label: "Keyboard Layout Pulse", slug: "docs/plugins/omarchy-keyboard-layout" },
            { label: "CLIamp Window Control", slug: "docs/plugins/omarchy-cliamp-control" },
            { label: "Update Channel", slug: "docs/plugins/omarchy-update-stream" },
            { label: "Wispr Flow", slug: "docs/plugins/wispr-flow" },
          ],
        },
        {
          label: "Labs",
          items: [
            { label: "Dropbox Quota", slug: "docs/plugins/dropbox-quota" },
            { label: "Metaplug", slug: "docs/plugins/metaplug" },
          ],
        },
      ],
    }),
  ],
})
