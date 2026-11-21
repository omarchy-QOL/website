import { h, s } from "astro-expressive-code/hast"

export function commandField(command) {
  return h(
    "div",
    { className: ["command-field", "not-content", ...(command.includes("\n") ? ["command-field-multiline"] : [])] },
    [
      h("span", { className: "command-prompt", ariaHidden: "true" }, "$"),
      h("code", command),
      h("button", { className: "command-copy", type: "button", dataCommand: command, ariaLabel: "Copy command" }, [
        s(
          "svg",
          {
            className: "command-copy-icon",
            viewBox: "0 0 16 16",
            width: "0.95rem",
            height: "0.95rem",
            ariaHidden: "true",
          },
          [s("use", { href: "#command-copy-document" })],
        ),
        h("span", { ariaLive: "polite" }, "Copy"),
      ]),
    ],
  )
}

export const commandFields = {
  name: "Shared command fields",
  hooks: {
    postprocessRenderedBlock: ({ codeBlock, renderData }) => {
      renderData.blockAst = commandField(codeBlock.code)
    },
  },
}
