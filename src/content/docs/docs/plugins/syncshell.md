---
title: Syncshell
description:
  Monitor file changes, inspect sync state, safely manage folders, and control
  Syncthing without leaving the Omarchy shell.
shortDescription:
  Syncthing status, folder controls, and an Omarchy-aware web UI.
category: Files
status: published
version: 0.2.4
pluginOrder: 2
kinds:
  - service
  - bar widget
sourceUrl: https://github.com/omarchy-QOL/syncshell
installCommand: omarchy plugin add https://github.com/omarchy-QOL/syncshell
intro: >-
  Syncthing quietly does its job; Syncshell lets you see it working. A glance at
  the bar tells you your folders are in sync, and the odd problem gets fixed
  without opening a browser tab.
highlights:
  - Shows file activity and folder-level sync information
  - Controls the service and common settings from the shell
  - Manages remote devices and folder sharing from the panel
  - Includes a Syncthing web theme that follows the Omarchy theme
screenshots:
  - src: /media/syncshell/preview-v0.2.4.webp
    alt: Redesigned web UI next to the Syncshell panel
    caption: Syncshell panel and web UI
    width: 2504
    height: 1200
videos:
  - src: /media/syncshell/01_syncthing_file_activity-v0.2.4.mp4
    poster: /media/syncshell/01_syncthing_file_activity-v0.2.4.webp
    title: File activity
    description:
      Copy and remove files while the panel reports live synchronization
      activity.
    duration: PT1M14S
    uploadDate: "2026-10-04"
    width: 1920
    height: 1200
  - src: /media/syncshell/02_syncthing_folder_lifecycle-v0.2.4.mp4
    poster: /media/syncshell/02_syncthing_folder_lifecycle-v0.2.4.webp
    title: Folder lifecycle
    description:
      Unlink, relink, and forget a folder without deleting its local files.
    duration: PT1M28S
    uploadDate: "2026-10-04"
    width: 1920
    height: 1200
  - src: /media/syncshell/03_syncthing_theme_aware_webUI-v0.2.4.mp4
    poster: /media/syncshell/03_syncthing_theme_aware_webUI-v0.2.4.webp
    title: Theme-aware web UI, bar icon, and settings
    description:
      Switch the redesigned web UI to follow the Omarchy theme, and choose a
      branded or themed bar icon.
    duration: PT1M50S
    uploadDate: "2026-10-05"
    width: 1920
    height: 1200
  - src: /media/syncshell/04_syncthing_icon_change_and_other_settings-v0.2.4.mp4
    poster: /media/syncshell/04_syncthing_icon_change_and_other_settings-v0.2.4.webp
    title: Multi-device management
    description:
      Pause and resume a remote device, remove and re-add it by ID, and unshare
      or re-share folders without deleting local files.
    duration: PT3M
    uploadDate: "2026-10-05"
    width: 1920
    height: 1200
---

- No Syncthing yet? Open the panel, expand **More** and choose **Install
  Syncthing**. An existing installation is picked up on its own.
- With UFW enabled, other devices can only find you after
  `sudo ufw allow syncthing`.
- The bundled web UI is a much smaller rewrite of Syncthing's own, about 0.5 MB
  instead of 6.6 MB, with a tab for reviewing sync conflicts (still in beta).
  Set it to `omarchy` and it follows your theme.
- `r` rescans, `w` opens the web UI, `p` starts or stops the service.
