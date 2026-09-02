import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DocsShell } from "../../../_components/SiteShell";
import { getPlugin, plugins } from "../../../_data/plugins";

type PluginPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return plugins.map((plugin) => ({ slug: plugin.slug }));
}

export async function generateMetadata({
  params,
}: PluginPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plugin = getPlugin(slug);

  if (!plugin) {
    return {};
  }

  return {
    title: plugin.name,
    description: plugin.shortDescription,
  };
}

export default async function PluginPage({ params }: PluginPageProps) {
  const { slug } = await params;
  const plugin = getPlugin(slug);

  if (!plugin) {
    notFound();
  }

  const hasDemo = Boolean(plugin.screenshots?.length || plugin.videos?.length);

  return (
    <DocsShell activeSlug={plugin.slug} contextLabel={plugin.name}>
      <article className="docs-page">
        <header className="docs-hero">
          <div className="docs-kicker">
            <span className={`status-badge status-${plugin.status}`}>
              {plugin.status === "lab" ? "Lab" : "Published"}
            </span>
            <span>v{plugin.version}</span>
          </div>
          <h1>{plugin.name}</h1>
          <p>{plugin.description}</p>
          <div className="kind-list" aria-label="Plugin kinds">
            {plugin.kinds.map((kind) => (
              <span key={kind}>{kind}</span>
            ))}
          </div>
        </header>

        {hasDemo && (
          <section
            className="docs-section demo-section"
            aria-labelledby="demo-title"
          >
            <p className="docs-label">Demo</p>
            <h2 id="demo-title">See it before you install it</h2>

            {plugin.screenshots && plugin.screenshots.length > 0 && (
              <div className="demo-screenshot-grid">
                {plugin.screenshots.map((screenshot) => (
                  <figure className="demo-figure" key={screenshot.src}>
                    <a
                      className="demo-image-frame"
                      href={screenshot.src}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        fill
                        sizes="(max-width: 48rem) 100vw, 24rem"
                        unoptimized
                      />
                    </a>
                    <figcaption>{screenshot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}

            {plugin.videos && plugin.videos.length > 0 && (
              <div className="demo-video-section">
                <h3>Videos</h3>
                <div className="demo-video-grid">
                  {plugin.videos.map((video) => (
                    <figure className="demo-figure" key={video.src}>
                      <video
                        controls
                        muted
                        playsInline
                        poster={video.poster}
                        preload="metadata"
                      >
                        <source src={video.src} type="video/mp4" />
                        <a href={video.src}>Open the {video.title} video</a>
                      </video>
                      <figcaption>{video.title}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <section className="docs-section" aria-labelledby="does-title">
          <p className="docs-label">Overview</p>
          <h2 id="does-title">What it does</h2>
          <ul className="feature-list">
            {plugin.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        {plugin.installCommand ? (
          <section className="docs-section" aria-labelledby="install-title">
            <p className="docs-label">Quick start</p>
            <h2 id="install-title">Install from GitHub</h2>
            <pre className="command-block">
              <code>{plugin.installCommand}</code>
            </pre>
            <p className="docs-note">
              Review the repository README before installation for current
              dependencies, configuration notes, and removal behavior.
            </p>
          </section>
        ) : (
          <section
            className="docs-section lab-notice"
            aria-labelledby="lab-title"
          >
            <p className="docs-label">Status</p>
            <h2 id="lab-title">Still in the workshop</h2>
            <p>
              This experiment is tracked locally and is not offered as a public
              install yet. Its page records the direction without pretending the
              interface or data contract is finished.
            </p>
          </section>
        )}

        {plugin.sourceUrl && (
          <section className="source-panel" aria-label="Source repository">
            <div>
              <p className="docs-label">Source of truth</p>
              <h2>README, code, issues, and releases</h2>
            </div>
            <a className="button button-primary" href={plugin.sourceUrl}>
              Open on GitHub
            </a>
          </section>
        )}
      </article>
    </DocsShell>
  );
}
