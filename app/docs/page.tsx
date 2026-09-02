import type { Metadata } from "next";
import { DocsShell } from "../_components/SiteShell";

export const metadata: Metadata = {
  title: "Docs",
  description: "How Omarchy QOL plugins are meant to behave.",
};

export default function DocsOverview() {
  return (
    <DocsShell contextLabel="Overview">
      <article className="docs-page">
        <header className="docs-hero">
          <h1>Overview</h1>
          <p>
            Plugins that make Omarchy easier to use without blowing up your
            system.
          </p>
        </header>

        <section className="docs-section" aria-labelledby="qol-title">
          <p className="docs-label">Around here, QOL means</p>
          <h2 id="qol-title">Quality of life with opinions</h2>
          <ul className="feature-list">
            <li>
              Start with what Omarchy already ships. Reinventing it is work, not
              progress.
            </li>
            <li>
              Fix what is, to me, obviously wrong or ill-designed. Keep the fix
              small.
            </li>
            <li>Stay quiet when idle. A tray widget does not need a data center.</li>
            <li>
              Ship an uninstall button (so sad), so you can remove my
              {" "}
              <strong>BLOAT</strong> from your beloved system. I&apos;d rather
              get an issue first, though.
            </li>
          </ul>
        </section>

        <section className="docs-section" aria-labelledby="vision-title">
          <p className="docs-label">Why bother</p>
          <h2 id="vision-title">Fix the papercuts. Leave the desktop alone.</h2>
          <div className="vision-grid docs-vision-grid">
            <p className="vision-lead">
              A plugin should solve the thing that annoyed you, then have the
              manners to get out of the way.
            </p>
            <div className="vision-copy">
              <p>
                These start as fixes for my own Omarchy setup. If something
                feels obviously wrong, I change the smallest useful piece
                instead of rebuilding half the desktop.
              </p>
              <p>
                Native controls, low idle cost, and an exit that actually cleans
                up after itself. Revolutionary stuff, apparently.
              </p>
            </div>
          </div>
        </section>
      </article>
    </DocsShell>
  );
}
