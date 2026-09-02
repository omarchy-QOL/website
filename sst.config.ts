/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "omarchy-qol",
      home: "cloudflare",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: input?.stage === "production",
    }
  },
  async run() {
    const web = new sst.cloudflare.Astro("Web", {
      path: ".",
      domain:
        $app.stage === "production"
          ? {
              name: "omarchyqol.com",
              redirects: ["www.omarchyqol.com", "omarchy-qol.com", "www.omarchy-qol.com"],
            }
          : undefined,
    })

    return {
      WebUrl: web.url,
    }
  },
})
