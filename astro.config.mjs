import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"

const description = "Plugins that improve Omarchy without blowing up your system."

export default defineConfig({
  site: "https://omarchyqol.com",
  output: "static",
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    starlight({
      title: "Omarchy QOL",
      description,
      favicon: "/omarchy-wordmark.svg",
      pagefind: false,
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
      head: [
        { tag: "meta", attrs: { property: "og:title", content: "Omarchy QOL" } },
        { tag: "meta", attrs: { property: "og:description", content: description } },
        { tag: "meta", attrs: { property: "og:type", content: "website" } },
        { tag: "meta", attrs: { property: "og:image", content: "https://omarchyqol.com/og-green.png" } },
        { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
      ],
    }),
  ],
})
