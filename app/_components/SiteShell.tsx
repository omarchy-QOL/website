import Image from "next/image";
import Link from "next/link";
import { plugins } from "../_data/plugins";

type ShellProps = {
  children: React.ReactNode;
};

type DocsShellProps = ShellProps & {
  activeSlug?: string;
  contextLabel: string;
};

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Omarchy QOL home">
      <Image
        src="/omarchy-wordmark.svg"
        alt="Omarchy"
        width={1215}
        height={285}
        priority
      />
      <span className="brand-badge">QOL</span>
    </Link>
  );
}

function SiteHeader({ layer }: { layer: "landing" | "docs" }) {
  return (
    <header className="site-header">
      <div className="brand-cluster">
        <Brand />
        {layer === "landing" && (
          <span className="brand-subtitle">
            Quality-of-life plugin development
          </span>
        )}
      </div>
      <nav className="header-meta" aria-label="Primary navigation">
        {layer === "landing" ? (
          <>
            <a href="https://github.com/omarchy-QOL">GitHub</a>
            <Link href="/docs">Docs</Link>
          </>
        ) : (
          <>
            <Link href="/">Home</Link>
            <a href="https://github.com/omarchy-QOL">GitHub</a>
          </>
        )}
      </nav>
    </header>
  );
}

function PluginNav({ activeSlug }: { activeSlug?: string }) {
  const published = plugins.filter((plugin) => plugin.status === "published");
  const labs = plugins.filter((plugin) => plugin.status === "lab");

  return (
    <nav aria-label="Plugin documentation" className="plugin-nav">
      <Link className={!activeSlug ? "active" : ""} href="/docs">
        Overview
      </Link>
      <p>Plugins</p>
      {published.map((plugin) => (
        <Link
          className={activeSlug === plugin.slug ? "active" : ""}
          href={`/docs/plugins/${plugin.slug}`}
          key={plugin.slug}
        >
          {plugin.name}
        </Link>
      ))}
      <p>Labs</p>
      {labs.map((plugin) => (
        <Link
          className={activeSlug === plugin.slug ? "active" : ""}
          href={`/docs/plugins/${plugin.slug}`}
          key={plugin.slug}
        >
          {plugin.name}
        </Link>
      ))}
    </nav>
  );
}

export function LandingShell({ children }: ShellProps) {
  return (
    <div className="site-shell landing-shell">
      <SiteHeader layer="landing" />
      <main className="landing-main">{children}</main>
    </div>
  );
}

export function DocsShell({
  activeSlug,
  children,
  contextLabel,
}: DocsShellProps) {
  return (
    <div className="site-shell docs-shell">
      <SiteHeader layer="docs" />

      <details className="mobile-nav">
        <summary>Documentation</summary>
        <PluginNav activeSlug={activeSlug} />
      </details>

      <div className="site-body docs-body">
        <aside className="sidebar">
          <PluginNav activeSlug={activeSlug} />
          <p className="sidebar-note">
            Independent community work. Not Omarchy. Not Omacom. The icon
            situation is still being negotiated with the trademark gods.
          </p>
        </aside>

        <div className="docs-main">
          <div className="docs-context" aria-label="Documentation location">
            <span>On this page</span>
            <span aria-hidden="true">&gt;</span>
            <strong>{contextLabel}</strong>
          </div>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
