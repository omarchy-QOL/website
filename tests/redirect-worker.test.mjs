import assert from "node:assert/strict"
import test from "node:test"

import worker from "../infra/redirect-worker.js"

test("redirects alternate hosts to the canonical URL", () => {
  const response = worker.fetch(new Request("http://omarchy-qol.com/docs/plugins/syncshell/?source=old-domain"))

  assert.equal(response.status, 308)
  assert.equal(response.headers.get("location"), "https://omarchyqol.com/docs/plugins/syncshell/?source=old-domain")
})
