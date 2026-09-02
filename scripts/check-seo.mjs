import { existsSync, readFileSync, readdirSync } from "node:fs"
import { basename, join } from "node:path"
import { fileURLToPath } from "node:url"
import { NOINDEX_PATHS, SITE } from "../src/config/site.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))
const contentDir = join(root, "src/content/docs/docs/plugins")
const publicDir = join(root, "public")
const distDir = join(root, "dist/client")
const errors = []
const referencedMedia = new Set()
const labRoutes = new Set()

const assert = (condition, message) => {
  if (!condition) errors.push(message)
}

const read = (path) => readFileSync(path, "utf8")
const scalar = (source, key) => source.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.replace(/^['"]|['"]$/g, "")
const mediaPaths = (source) =>
  [...source.matchAll(/^\s+(?:-\s+)?(?:src|poster):\s+(\/media\/\S+)$/gm)].map((match) => match[1])
const videoPaths = (source) => [...source.matchAll(/^\s+- src:\s+(\/media\/\S+\.mp4)$/gm)].map((match) => match[1])
const firstScreenshot = (source) => source.match(/^screenshots:\n\s+- src:\s+(\/media\/\S+)$/m)?.[1]
const firstPoster = (source) => source.match(/^\s+poster:\s+(\/media\/\S+)$/m)?.[1]

const tags = (html, tagName) => html.match(new RegExp(`<${tagName}\\b[^>]*>`, "g")) ?? []
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
const meta = (html, key) =>
  tags(html, "meta")
    .filter((tag) => attribute(tag, "name") === key || attribute(tag, "property") === key)
    .map((tag) => attribute(tag, "content"))
    .filter(Boolean)
const canonical = (html) =>
  tags(html, "link")
    .find((tag) => attribute(tag, "rel") === "canonical")
    ?.match(/\bhref="([^"]*)"/)?.[1]
const structuredData = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]))
const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  })

const sitemapIndexPath = join(distDir, "sitemap-index.xml")
const robotsPath = join(distDir, "robots.txt")
const videoSitemapPath = join(distDir, "video-sitemap.xml")
const notFoundPath = join(distDir, "404.html")
const pagefindPath = join(distDir, "pagefind/pagefind.js")
const docsPath = join(distDir, "docs/index.html")

assert(existsSync(sitemapIndexPath), "missing sitemap-index.xml")
assert(existsSync(robotsPath), "missing robots.txt")
assert(existsSync(videoSitemapPath), "missing video-sitemap.xml")
assert(existsSync(notFoundPath), "missing 404 page")
assert(existsSync(pagefindPath), "missing Pagefind search index")
assert(existsSync(docsPath), "missing documentation index")

if (existsSync(docsPath)) {
  assert(read(docsPath).includes('aria-keyshortcuts="Control+K"'), "documentation search shortcut is missing")
}

const sitemapFiles = existsSync(distDir) ? readdirSync(distDir).filter((file) => /^sitemap-\d+\.xml$/.test(file)) : []
const sitemap = sitemapFiles.map((file) => read(join(distDir, file))).join("\n")
const videoSitemap = existsSync(videoSitemapPath) ? read(videoSitemapPath) : ""
const robots = existsSync(robotsPath) ? read(robotsPath) : ""

if (existsSync(notFoundPath)) {
  assert(meta(read(notFoundPath), "robots")[0] === "noindex,follow", "404 page must be noindex,follow")
}

assert(robots.includes(`Sitemap: ${SITE.origin}/sitemap-index.xml`), "robots.txt does not reference the page sitemap")
assert(robots.includes(`Sitemap: ${SITE.origin}/video-sitemap.xml`), "robots.txt does not reference the video sitemap")

const rootHtmlPath = join(distDir, "index.html")
assert(existsSync(rootHtmlPath), "missing built landing page")
if (existsSync(rootHtmlPath)) {
  const html = read(rootHtmlPath)
  assert(canonical(html) === `${SITE.origin}/`, "landing canonical URL is incorrect")
  assert(meta(html, "og:url")[0] === `${SITE.origin}/`, "landing og:url is incorrect")
  assert(meta(html, "og:title").length === 1, "landing page must have one og:title")
  assert(meta(html, "og:description").length === 1, "landing page must have one og:description")
  assert(meta(html, "og:image").length === 1, "landing page must have one og:image")
  assert(meta(html, "robots")[0]?.includes("index,follow"), "landing page is not indexable")
  assert(
    structuredData(html).some((entry) => entry["@type"] === "WebSite"),
    "landing page is missing WebSite JSON-LD",
  )
}

let publishedCount = 0
let labCount = 0
let videoCount = 0
let syncshellVideoCount = 0
const publishedRoutes = []

for (const file of readdirSync(contentDir)
  .filter((name) => name.endsWith(".md"))
  .sort()) {
  const source = read(join(contentDir, file))
  const slug = basename(file, ".md")
  const route = `/docs/plugins/${slug}/`
  const title = scalar(source, "title")
  const description = scalar(source, "description")
  const status = scalar(source, "status")
  const pagePath = join(distDir, route, "index.html")
  const expectedCanonical = new URL(route, SITE.origin).href
  const expectedImage = new URL(firstScreenshot(source) ?? firstPoster(source) ?? SITE.socialImage, SITE.origin).href

  assert(title, `${file}: missing title`)
  assert(description, `${file}: missing description`)
  assert(status === "published" || status === "lab", `${file}: invalid status`)
  assert(existsSync(pagePath), `${file}: missing built page`)

  for (const mediaPath of mediaPaths(source)) {
    referencedMedia.add(mediaPath)
    assert(/-v\d+\.\d+\.\d+\.(?:mp4|webp)$/.test(mediaPath), `${file}: media URL is not versioned: ${mediaPath}`)
    assert(existsSync(join(publicDir, mediaPath)), `${file}: missing public media: ${mediaPath}`)
    assert(existsSync(join(distDir, mediaPath)), `${file}: missing built media: ${mediaPath}`)
  }

  if (!existsSync(pagePath)) continue
  const html = read(pagePath)
  const pageVideos = videoPaths(source)
  videoCount += pageVideos.length
  if (slug === "syncshell") syncshellVideoCount = pageVideos.length

  assert(canonical(html) === expectedCanonical, `${file}: canonical URL is incorrect`)
  assert(meta(html, "og:title").length === 1, `${file}: page must have one og:title`)
  assert(meta(html, "og:description").length === 1, `${file}: page must have one og:description`)
  assert(meta(html, "og:image").length === 1, `${file}: page must have one og:image`)
  assert(meta(html, "twitter:title").length === 1, `${file}: page must have one twitter:title`)
  assert(meta(html, "twitter:description").length === 1, `${file}: page must have one twitter:description`)
  assert(meta(html, "twitter:image").length === 1, `${file}: page must have one twitter:image`)
  assert(meta(html, "og:title")[0] === title, `${file}: og:title is not page-specific`)
  assert(meta(html, "og:description")[0] === description, `${file}: og:description is not page-specific`)
  assert(meta(html, "og:image")[0] === expectedImage, `${file}: og:image is incorrect`)
  assert(meta(html, "twitter:title")[0] === title, `${file}: twitter:title is not page-specific`)
  assert(meta(html, "twitter:description")[0] === description, `${file}: twitter:description is not page-specific`)
  assert(meta(html, "twitter:image")[0] === expectedImage, `${file}: twitter:image is incorrect`)

  if (status === "lab") {
    labCount += 1
    labRoutes.add(route)
    assert(meta(html, "robots")[0] === "noindex,follow", `${file}: lab page must be noindex,follow`)
    assert(!sitemap.includes(`<loc>${expectedCanonical}</loc>`), `${file}: lab page is present in the page sitemap`)
    assert(NOINDEX_PATHS.includes(route), `${file}: lab route is missing from NOINDEX_PATHS`)
  } else {
    publishedCount += 1
    publishedRoutes.push(route)
    assert(!meta(html, "robots")[0]?.includes("noindex"), `${file}: published page is noindex`)
    assert(
      sitemap.includes(`<loc>${expectedCanonical}</loc>`),
      `${file}: published page is missing from the page sitemap`,
    )
  }

  if (pageVideos.length) {
    const videoObjects = structuredData(html)
      .flatMap((entry) => entry["@graph"] ?? [entry])
      .filter((entry) => entry["@type"] === "VideoObject")
    assert(videoObjects.length === pageVideos.length, `${file}: VideoObject count does not match its videos`)
    assert(
      (html.match(/class="demo-caption-description"/g) ?? []).length === pageVideos.length,
      `${file}: visible video description count does not match its videos`,
    )
    for (const video of videoObjects) {
      assert(video.name && video.description, `${file}: VideoObject is missing its name or description`)
      assert(video.thumbnailUrl && video.contentUrl, `${file}: VideoObject is missing a media URL`)
      assert(video.uploadDate && video.duration, `${file}: VideoObject is missing its date or duration`)
    }
    for (const videoPath of pageVideos) {
      const videoUrl = new URL(videoPath, SITE.origin).href
      assert(
        videoSitemap.includes(`<video:content_loc>${videoUrl}</video:content_loc>`),
        `${file}: video missing from video sitemap`,
      )
    }
  }
}

if (existsSync(rootHtmlPath)) {
  const landingHtml = read(rootHtmlPath)
  const landingVideos = tags(landingHtml, "video")
  const landingLinks = tags(landingHtml, "a").map((tag) => attribute(tag, "href"))
  const docsLinkIndex = landingLinks.indexOf("/docs")
  const githubLinkIndex = landingLinks.indexOf("https://github.com/omarchy-QOL")
  assert(landingVideos.length === syncshellVideoCount, "landing Syncshell video count is stale")
  assert(
    landingVideos.every((tag) => attribute(tag, "preload") === "none"),
    "landing videos must not preload media",
  )
  assert(!landingHtml.includes('class="hero-cta"'), "removed landing action buttons returned")
  assert(docsLinkIndex >= 0, "landing navigation is missing Docs")
  assert(githubLinkIndex >= 0, "landing navigation is missing GitHub")
  assert(
    docsLinkIndex >= 0 && githubLinkIndex >= 0 && docsLinkIndex < githubLinkIndex,
    "landing navigation order is wrong",
  )
  for (const route of publishedRoutes) {
    assert(
      landingLinks.includes(route) || landingLinks.includes(route.slice(0, -1)),
      `landing page does not link ${route}`,
    )
  }
}

for (const file of walk(join(publicDir, "media"))) {
  const mediaPath = `/${file.slice(publicDir.length + 1).replaceAll("\\", "/")}`
  assert(referencedMedia.has(mediaPath), `unreferenced public media: ${mediaPath}`)
}

assert(videoSitemap.match(/<video:video>/g)?.length === videoCount, "video sitemap count does not match content")
assert(
  NOINDEX_PATHS.length === labRoutes.size && NOINDEX_PATHS.every((path) => labRoutes.has(path)),
  "NOINDEX_PATHS does not exactly match the Labs routes",
)

for (const path of NOINDEX_PATHS) {
  assert(
    !sitemap.includes(`<loc>${new URL(path, SITE.origin).href}</loc>`),
    `noindex route is present in sitemap: ${path}`,
  )
}

if (errors.length) {
  console.error(`SEO checks failed (${errors.length})`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`SEO checks passed: ${publishedCount} published plugins, ${labCount} labs, ${videoCount} videos`)
}
