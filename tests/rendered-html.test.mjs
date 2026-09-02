import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const demoRoutes = [
  {
    route: "/docs/plugins/plugin-control",
    files: [
      "media/plugin-control/preview.png",
      "media/plugin-control/add-remove.png",
      "media/plugin-control/settings.png",
    ],
    videos: 0,
  },
  {
    route: "/docs/plugins/omarchy-keyboard-layout",
    files: [
      "media/keyboard-layout/preview.png",
      "media/keyboard-layout/demo.mp4",
    ],
    videos: 1,
  },
  {
    route: "/docs/plugins/omarchy-update-stream",
    files: ["media/update-channel/preview.png"],
    videos: 0,
  },
  {
    route: "/docs/plugins/metaplug",
    files: ["media/metaplug/preview.png"],
    videos: 0,
  },
];

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the vision page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /class="brand-subtitle">Quality-of-life plugin development<\/span>/,
  );
  assert.doesNotMatch(html, /hero-lockup/);
  assert.match(html, /Six plugins\. Each scratches an itch\./);
  assert.match(html, /without blowing up your system/);
  assert.match(html, /Plugin Control/);
  assert.match(html, /Metaplug/);
  assert.match(html, /og-green\.png/);
  assert.doesNotMatch(html, /Plugin documentation/);
  assert.doesNotMatch(html, /react-loading-skeleton/i);
});

test("server-renders the documentation overview", async () => {
  const response = await render("/docs");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /On this page/);
  assert.match(html, /Overview/);
  assert.match(html, /Quality of life with opinions/);
  assert.match(html, /Fix the papercuts\. Leave the desktop alone\./);
  assert.match(html, /A tray widget does not need a data center/);
  assert.match(html, /\/docs\/plugins\/plugin-control/);
  assert.doesNotMatch(html, /class="brand-subtitle"/);
});

test("server-renders plugin documentation", async () => {
  const response = await render("/docs/plugins/syncshell");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Syncshell/);
  assert.match(html, /Install from GitHub/);
  assert.match(html, /omarchy-QOL\/syncshell/);
  assert.match(html, /Open on GitHub/);
});

test("server-renders every published demo asset", async () => {
  for (const demo of demoRoutes) {
    const response = await render(demo.route);
    assert.equal(response.status, 200, demo.route);

    const html = await response.text();
    assert.match(html, /See it before you install it/, demo.route);

    for (const file of demo.files) {
      await access(new URL(`../public/${file}`, import.meta.url));
      assert.ok(html.includes(`/${file}`), `${demo.route} is missing ${file}`);
    }

    assert.equal(
      html.match(/<video\b/g)?.length ?? 0,
      demo.videos,
      `${demo.route} has the wrong video count`,
    );
  }

  const response = await render("/docs/plugins/omarchy-cliamp-control");
  const html = await response.text();
  assert.doesNotMatch(html, /See it before you install it/);

  for (const route of [
    "/docs/plugins/syncshell",
    "/docs/plugins/omarchy-btop-activity",
  ]) {
    const noDemoResponse = await render(route);
    const noDemoHtml = await noDemoResponse.text();
    assert.doesNotMatch(noDemoHtml, /See it before you install it/);
  }
});

test("sets baseline security headers", async () => {
  const response = await render();
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.equal(
    response.headers.get("permissions-policy"),
    "camera=(), geolocation=(), microphone=()",
  );
});
