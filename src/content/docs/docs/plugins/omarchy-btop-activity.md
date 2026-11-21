---
title: btop Activity
description:
  Put useful CPU, RAM, GPU, and temperature signals in the bar, then open btop
  only when the numbers deserve a closer look.
shortDescription: Low-overhead system meters with one-click access to btop.
category: System
status: published
version: 0.2.8
pluginOrder: 2
kinds:
  - service
  - bar widget
sourceUrl: https://github.com/omarchy-QOL/omarchy-btop-activity
installCommand:
  omarchy plugin add https://github.com/omarchy-QOL/omarchy-btop-activity
intro: >-
  Keep an eye on your machine without keeping a monitor open. The numbers sit
  quietly in the bar, and btop is one click away when they look interesting.
highlights:
  - Live system meters with a configurable polling interval
  - Floating or tiled btop window modes
  - Built-in icon choices plus support for a custom icon
screenshots:
  - src: /media/btop-activity/preview-v0.2.8.webp
    alt: btop Activity on the Omarchy desktop
    caption: System meters and btop controls
    width: 1920
    height: 1200
videos:
  - src: /media/btop-activity/demo-v0.2.8.mp4
    poster: /media/btop-activity/demo-v0.2.8.webp
    title: Launch, layouts, refresh interval, and keybinding
    description:
      Launch btop, switch window layouts, change the refresh interval, and
      update its keybinding.
    duration: PT2M8S
    uploadDate: "2026-10-08"
    width: 1920
    height: 1200
---

- Readings only refresh while you hover over the icon or have its menu open, so
  it costs next to nothing when you are not looking. On an older i7-4790 it
  added about 10 MiB of RAM.
- Settings apply to the running btop straight away and are kept apart from your
  own `btop.conf`.
- Missing GPU numbers? The
  [hardware setup guide](/docs/plugins/omarchy-btop-activity/hardware/) covers
  the extra tools for AMD, Intel, and NVIDIA.
