import Link from "next/link";
import { LandingShell } from "./_components/SiteShell";
import { plugins } from "./_data/plugins";

export default function Home() {
  const publishedPlugins = plugins.filter((plugin) => plugin.status === "published");

  return (
    <LandingShell>
      <div className="home-page">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <h1 className="landing-heading" id="hero-title">
              Plugins that make Omarchy easier to use without blowing up your
              system.
            </h1>
          </div>

          <div className="hero-cta">
            <a href="#plugins">Browse plugins</a>
            <a href="https://github.com/omarchy-QOL">
              <code>github.com/omarchy-QOL</code>
            </a>
          </div>
        </section>

        <section className="section-block" id="plugins" aria-labelledby="plugins-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The plugins</p>
              <h2 id="plugins-title">Six plugins. Each scratches an itch.</h2>
            </div>
          </div>

          <div className="plugin-grid">
            {publishedPlugins.map((plugin) => (
              <Link
                className="plugin-card"
                href={`/docs/plugins/${plugin.slug}`}
                key={plugin.slug}
              >
                <div className="plugin-card-topline">
                  <span>{plugin.category}</span>
                </div>
                <h3>{plugin.name}</h3>
                <p>{plugin.shortDescription}</p>
                <span className="text-link">Have a look</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="labs-callout" aria-labelledby="labs-title">
          <div>
            <p className="eyebrow">Labs</p>
            <h2 id="labs-title">Ideas currently arguing back</h2>
          </div>
          <p>
            Metaplug is the first experiment: a local view of the Omarchy plugin
            ecosystem with custom success metrics. It is still being argued
            with, so there is no public install yet.
          </p>
          <Link className="text-link" href="/docs/plugins/metaplug">
            Poke around
          </Link>
        </section>
      </div>
    </LandingShell>
  );
}
