---
title: Plugin Control
description:
  Add, update, enable, disable, and remove plugins from a fuzzy command palette
  inspired by Sublime Text Package Control and editor command palettes.
shortDescription: A fast command palette for the entire plugin lifecycle.
category: Launcher
status: published
version: 0.3.3
pluginOrder: 1
kinds:
  - service
  - overlay
  - bar widget
sourceUrl: https://github.com/omarchy-QOL/plugin-control
installCommand: omarchy plugin add https://github.com/omarchy-QOL/plugin-control
intro: >-
  Managing plugins can feel like opening a file in your editor: press a key,
  type a few letters, pick an action. Plugin Control keeps the whole plugin
  lifecycle one shortcut away.
highlights:
  - Opens only when called and stays light while idle
  - Supports a configurable keybinding and optional tray icon
  - Keeps common plugin operations in one keyboard-first surface
screenshots:
  - src: /media/plugin-control/preview-v0.2.1.webp
    alt: Plugin Control command palette
    caption: Command palette
    width: 1920
    height: 720
videos:
  - src: /media/plugin-control/add-remove-v0.2.1.mp4
    poster: /media/plugin-control/add-remove-v0.2.1.webp
    title: Add, remove, enable, and disable
    description:
      Add, remove, enable, and disable an Omarchy plugin from one action menu.
    duration: PT1M32S
    uploadDate: "2026-08-16"
    width: 1920
    height: 1200
  - src: /media/plugin-control/settings-v0.2.1.mp4
    poster: /media/plugin-control/settings-v0.2.1.webp
    title: Refresh and settings
    description:
      Refresh the catalog, change settings, and cleanly reinstall Plugin
      Control.
    duration: PT2M29S
    uploadDate: "2026-08-16"
    width: 1920
    height: 1200
---

- It opens from a local cache, so it is there the moment you call it. `Ctrl+r`
  pulls fresh catalog data when you want it.
- `Ctrl+u` lists the plugins you can update. Only clean fast-forward updates are
  offered, and when one is not safe it tells you why.

Plugins cannot register global shortcuts themselves. To open it with `Ctrl+p`,
add this to your `bindings.lua`:

```lua
o.bind(
  "CTRL + P",
  "Plugin Control",
  "omarchy-shell shell toggle io.github.ilyazar.plugin-control '{}'"
)
```
