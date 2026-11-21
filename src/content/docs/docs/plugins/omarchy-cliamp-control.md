---
title: CLIamp quake
description:
  Open CLIamp as a Quake-style drop-down from any screen edge, with its
  position, size, and background dimming set from the bar.
shortDescription: CLIamp as a drop-down from any screen edge.
category: System
status: published
version: 0.3.0
pluginOrder: 5
kinds:
  - service
  - bar widget
sourceUrl: https://github.com/omarchy-QOL/omarchy-cliamp-control
installCommand:
  omarchy plugin add https://github.com/omarchy-QOL/omarchy-cliamp-control
intro: >-
  Music that is there when you want it and gone when you don't. Press your
  shortcut and CLIamp slides in from the edge you chose; press it again and it
  is out of the way.
highlights:
  - Shows and hides CLIamp from your music shortcut or the bar
  - Opens from any screen edge, at its start, center, or end
  - Resizes instantly and can leave the desktop undimmed
  - Can stay open while you work in other windows
screenshots:
  - src: /media/cliamp-control/preview-v0.2.1.webp
    alt: CLIamp drop-down and window controls
    caption: Drop-down and window controls
    width: 1920
    height: 1200
videos:
  - src: /media/cliamp-control/demo-v0.2.1.mp4
    poster: /media/cliamp-control/demo-v0.2.1.webp
    title: Position, size, and toggle
    description:
      Change the drop-down position, resize the player, and show or hide it.
    duration: PT1M5S
    uploadDate: "2026-09-08"
    width: 1920
    height: 1200
---

- It works with the CLIamp shortcut you already have (Omarchy's default is
  `Super+Shift+Alt+M`), so there is nothing to rebind.
- Turn on **Keep open** to leave the player up while you work. It then floats
  above your windows, and Alt+Tab still reaches everything else.

Flags after `cliamp` in your shortcut are passed on, so it can start a playlist
right away:

```lua title="~/.config/hypr/bindings.lua"
o.bind("F12", "CLIamp drop-down",
  { tui = "cliamp --playlist Tracks --auto-play", focus = true })
```
