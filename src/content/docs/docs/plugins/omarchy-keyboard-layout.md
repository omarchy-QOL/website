---
title: Keyboard Layout Pulse
description:
  See and select the current physical keyboard layout while keeping per-window
  layout behavior visible and close at hand.
shortDescription: A minimal XKB picker with a pulsing layout indicator.
category: Compositor
status: published
version: 0.2.8
pluginOrder: 3
kinds:
  - bar widget
sourceUrl: https://github.com/omarchy-QOL/omarchy-keyboard-layout
installCommand:
  omarchy plugin add https://github.com/omarchy-QOL/omarchy-keyboard-layout
intro: >-
  Type in more than one language? A quick pulse in the bar tells you which
  layout you just switched to, before the first wrong word appears.
highlights:
  - Displays the active physical keyboard layout
  - Switches XKB layouts directly from the bar
  - Preserves a distinct layout per window
  - Adds custom labels and an on-screen keyboard viewer
screenshots:
  - src: /media/keyboard-layout/preview-v0.2.8.webp
    alt: Keyboard layout menu and settings
    caption: Layout menu and settings
    width: 2597
    height: 731
videos:
  - src: /media/keyboard-layout/demo-v0.2.0.mp4
    poster: /media/keyboard-layout/demo-v0.2.0.webp
    title: Keyboard layout switching
    description:
      Change layouts, choose a pulse color, add languages, and update the
      switching shortcut.
    duration: PT1M22S
    uploadDate: "2026-08-14"
    width: 1920
    height: 1200
---

- It takes the place of Omarchy's keyboard widget and puts the original back if
  you disable or remove it.
- Scroll over the label to cycle through your layouts.
- **View** opens an on-screen keyboard that types into the window you are in
  without taking focus. Handy for the odd accent.
