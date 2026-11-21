---
title: Wispr Flow
description:
  Control Wispr Flow from the Omarchy bar while keeping the app's own tray menu
  and recording behavior intact.
shortDescription: Wispr Flow status and controls in the Omarchy bar.
category: Dictation
status: published
version: 0.6.1
pluginOrder: 7
kinds:
  - service
  - bar widget
sourceUrl: https://github.com/omarchy-QOL/wispr-flow-quattro-plugin
installCommand:
  omarchy plugin add https://github.com/omarchy-QOL/wispr-flow-quattro-plugin
intro: >-
  Wispr Flow keeps working the way it always has; the bar simply shows you when
  it is running and when it is listening.
highlights:
  - Shows when Wispr Flow is running or listening
  - Exposes the app's live tray menu without duplicating its behavior
  - Restores the native tray icon when disabled or removed
---

- You need
  [Wispr Flow Omarchy](https://github.com/omarchy-QOL/wispr-flow-omarchy) first;
  this plugin does not install it. Its README has the build steps.
- Right-click opens Wispr Flow's own tray menu, so everything in it behaves
  exactly as it does in the app.
- Want less on screen? Swap Wispr's floating recording bar for a small purple
  microphone in the bar.
