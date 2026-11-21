import assert from "node:assert/strict"
import test from "node:test"
import { select, toHtml, toText } from "astro-expressive-code/hast"
import { commandField, commandFields } from "../src/components/command-field.mjs"

test("install and documentation commands share the same field", () => {
  const command = "omarchy plugin add https://github.com/example/plugin"
  const renderData = {}
  commandFields.hooks.postprocessRenderedBlock({ codeBlock: { code: command }, renderData })
  assert.deepEqual(renderData.blockAst, commandField(command))
  assert.equal(toText(select(".command-prompt", renderData.blockAst)), "$")
  assert.equal(toText(select("button", renderData.blockAst)), "Copy")
})

test("multi-line commands retain their exact display and clipboard text", () => {
  const command = "sudo pacman -S --needed intel-gpu-tools\nintel_gpu_top"
  const field = commandField(command)
  assert.ok(field.properties.className.includes("command-field-multiline"))
  assert.equal(select("code", field).children[0].value, command)
  assert.equal(select("button", field).properties.dataCommand, command)
})

test("command text cannot inject markup", () => {
  const command = '<script>alert("test")</script>'
  const field = commandField(command)
  assert.equal(select("button", field).properties.dataCommand, command)
  assert.ok(!toHtml(select("code", field)).includes("<script>"))
  assert.ok(!select("script", field))
})

test("config snippets keep the field without a shell prompt", () => {
  const snippet = 'o.bind("F12", "Player", { tui = "cliamp" })'
  const renderData = {}
  commandFields.hooks.postprocessRenderedBlock({ codeBlock: { code: snippet, language: "lua" }, renderData })
  assert.ok(!select(".command-prompt", renderData.blockAst))
  assert.equal(select("button", renderData.blockAst).properties.dataCommand, snippet)
})
