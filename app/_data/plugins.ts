export type Plugin = {
  slug: string;
  name: string;
  category: string;
  status: "published" | "lab";
  version: string;
  kinds: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  sourceUrl?: string;
  installCommand?: string;
  screenshots?: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  videos?: Array<{
    src: string;
    poster: string;
    title: string;
  }>;
};

export const plugins: Plugin[] = [
  {
    slug: "plugin-control",
    name: "Plugin Control",
    category: "Launcher",
    status: "published",
    version: "0.2.1",
    kinds: ["service", "overlay", "bar widget"],
    shortDescription: "A fast command palette for the entire plugin lifecycle.",
    description:
      "Add, update, enable, disable, and remove plugins from a fuzzy command palette inspired by Sublime Text Package Control and editor command palettes.",
    highlights: [
      "Opens only when called and stays light while idle",
      "Supports a configurable keybinding and optional tray icon",
      "Keeps common plugin operations in one keyboard-first surface",
    ],
    sourceUrl: "https://github.com/omarchy-QOL/plugin-control",
    installCommand:
      "omarchy plugin add https://github.com/omarchy-QOL/plugin-control",
    screenshots: [
      {
        src: "/media/plugin-control/preview.png",
        alt: "Plugin Control command palette",
        caption: "Command palette",
      },
      {
        src: "/media/plugin-control/add-remove.png",
        alt: "Plugin Control managing installed plugins",
        caption: "Add, update, enable, disable, and remove",
      },
      {
        src: "/media/plugin-control/settings.png",
        alt: "Plugin Control settings",
        caption: "Settings",
      },
    ],
  },
  {
    slug: "syncshell",
    name: "Syncshell",
    category: "Files",
    status: "published",
    version: "0.1.7",
    kinds: ["service", "bar widget"],
    shortDescription:
      "Syncthing status, folder controls, and an Omarchy-aware web UI.",
    description:
      "Monitor file changes, inspect sync state, safely manage folders, and control Syncthing without leaving the Omarchy shell.",
    highlights: [
      "Shows file activity and folder-level sync information",
      "Controls the service and common settings from the shell",
      "Includes a Syncthing web theme that follows the Omarchy theme",
    ],
    sourceUrl: "https://github.com/omarchy-QOL/syncshell",
    installCommand:
      "omarchy plugin add https://github.com/omarchy-QOL/syncshell",
  },
  {
    slug: "omarchy-btop-activity",
    name: "btop Activity",
    category: "System",
    status: "published",
    version: "0.2.0",
    kinds: ["service", "bar widget"],
    shortDescription:
      "Low-overhead system meters with one-click access to btop.",
    description:
      "Put useful CPU, RAM, GPU, and temperature signals in the bar, then open btop only when the numbers deserve a closer look.",
    highlights: [
      "Live system meters with a configurable polling interval",
      "Floating or tiled btop window modes",
      "Built-in icon choices plus support for a custom icon",
    ],
    sourceUrl: "https://github.com/omarchy-QOL/omarchy-btop-activity",
    installCommand:
      "omarchy plugin add https://github.com/omarchy-QOL/omarchy-btop-activity",
  },
  {
    slug: "omarchy-keyboard-layout",
    name: "Keyboard Layout Pulse",
    category: "Compositor",
    status: "published",
    version: "0.2.0",
    kinds: ["bar widget"],
    shortDescription: "A minimal XKB picker with a pulsing layout indicator.",
    description:
      "See and select the current physical keyboard layout while keeping per-window layout behavior visible and close at hand.",
    highlights: [
      "Displays the active physical keyboard layout",
      "Switches XKB layouts directly from the bar",
      "Preserves a distinct layout per window",
    ],
    sourceUrl: "https://github.com/omarchy-QOL/omarchy-keyboard-layout",
    installCommand:
      "omarchy plugin add https://github.com/omarchy-QOL/omarchy-keyboard-layout",
    screenshots: [
      {
        src: "/media/keyboard-layout/preview.png",
        alt: "Keyboard layout menu and settings",
        caption: "Layout menu and settings",
      },
    ],
    videos: [
      {
        src: "/media/keyboard-layout/demo.mp4",
        poster: "/media/keyboard-layout/preview.png",
        title: "Keyboard layout switching",
      },
    ],
  },
  {
    slug: "omarchy-cliamp-control",
    name: "CLIamp Window Control",
    category: "System",
    status: "published",
    version: "0.1.5",
    kinds: ["service", "bar widget"],
    shortDescription:
      "A binding-scoped CLIamp drop-down with precise geometry.",
    description:
      "Turn stock CLIamp into a dependable top-edge drop-down with compact bar controls and explicit sizing and alignment.",
    highlights: [
      "Toggles CLIamp from one scoped keybinding",
      "Controls horizontal alignment, width, and height",
      "Lets the bar control disappear when keyboard control is enough",
    ],
    sourceUrl: "https://github.com/omarchy-QOL/omarchy-cliamp-control",
    installCommand:
      "omarchy plugin add https://github.com/omarchy-QOL/omarchy-cliamp-control",
  },
  {
    slug: "omarchy-update-stream",
    name: "Update Channel",
    category: "System",
    status: "published",
    version: "0.1.0",
    kinds: ["bar widget"],
    shortDescription:
      "Run updates and choose the Omarchy package channel from the bar.",
    description:
      "Keep update actions, channel selection, and update-icon visibility in one small Omarchy-native control.",
    highlights: [
      "Runs the normal Omarchy update flow",
      "Switches between available package channels",
      "Controls when the update indicator should be visible",
    ],
    sourceUrl: "https://github.com/omarchy-QOL/omarchy-update-stream",
    installCommand:
      "omarchy plugin add https://github.com/omarchy-QOL/omarchy-update-stream",
    screenshots: [
      {
        src: "/media/update-channel/preview.png",
        alt: "Update Channel panel and settings",
        caption: "Update channel controls",
      },
    ],
  },
  {
    slug: "metaplug",
    name: "Metaplug",
    category: "Labs",
    status: "lab",
    version: "0.1.0",
    kinds: ["overlay"],
    shortDescription:
      "Explore the plugin ecosystem through transparent, custom metrics.",
    description:
      "Discover and analyze Omarchy plugin activity, then define your own success metric computations with small Lua functions.",
    highlights: [
      "Reads a transparent snapshot of public plugin data",
      "Supports custom Lua scoring functions",
      "Lives in Labs while the data model and interaction settle",
    ],
    screenshots: [
      {
        src: "/media/metaplug/preview.png",
        alt: "Metaplug browser and pinned metric analysis",
        caption: "Plugin browser and pinned analysis",
      },
    ],
  },
];

export function getPlugin(slug: string) {
  return plugins.find((plugin) => plugin.slug === slug);
}
