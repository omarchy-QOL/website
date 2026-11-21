---
title: Voxtype Control
description:
  Select local speech models and spoken languages from the Omarchy bar.
shortDescription: Local dictation model and language controls.
category: Dictation
status: published
version: 0.4.0
pluginOrder: 8
kinds:
  - service
  - bar widget
sourceUrl: https://github.com/omarchy-QOL/voxtype-control
installCommand:
  omarchy plugin add https://github.com/omarchy-QOL/voxtype-control
intro: >-
  Speak instead of type, entirely on your own machine. Pick the model and
  language that fit the moment, right from the bar.
highlights:
  - Selects installed models and their supported language choices
  - Unloads models without deleting their files
  - Recovers completed transcripts
  - Opens the Voxtype TUI, settings, and spelling replacements
---

- You need a working Voxtype setup with local models, plus the `voxtype-control`
  helper. Neither comes with the plugin.
- Every finished dictation is saved locally as text, never as audio, so one that
  did not paste is not lost. Find and copy it under **Transcripts**.

Words it keeps getting wrong go into a small replacements file:

```toml
"heard phrase" = "replacement"
```
