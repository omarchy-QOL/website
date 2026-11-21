---
title: Update Channel
description:
  Keep update actions, channel selection, and update-icon visibility in one
  small Omarchy-native control.
shortDescription:
  Run updates and choose the Omarchy package channel from the bar.
category: System
status: published
version: 0.1.0
pluginOrder: 6
kinds:
  - bar widget
sourceUrl: https://github.com/omarchy-QOL/omarchy-update-stream
installCommand:
  omarchy plugin add https://github.com/omarchy-QOL/omarchy-update-stream
intro: >-
  Updating Omarchy stays a single click, and trying another package channel is
  just as easy when you want to see what comes next.
highlights:
  - Runs the normal Omarchy update flow
  - Switches between available package channels
  - Controls when the update indicator should be visible
screenshots:
  - src: /media/update-channel/preview-v0.1.0.webp
    alt: Update Channel panel and settings
    caption: Update channel controls
    width: 390
    height: 280
---

- It takes the place of Omarchy's update icon and gives it back when removed.
- Pick stable, rc, edge, or dev, and the panel links straight to that channel's
  changelog, pull requests, and issues.
- You decide when the icon shows up: only when updates exist, hidden until the
  next check, or always.
