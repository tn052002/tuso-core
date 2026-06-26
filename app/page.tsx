import Link from 'next/link';

const swatches = [
  ['Midnight Blue', '#0B1320', 'swatch-midnight'],
  ['Dawn Blue', '#4F6D8A', 'swatch-dawn'],
  ['Polaris Gold', '#D4B26A', 'swatch-polaris'],
  ['Stone', '#F6F4EF', 'swatch-stone'],
  ['Charcoal', '#222222', 'swatch-ink'],
];

const principles = [
  ['Stillness', 'Whitespace and quiet contrast create the first impression before any copy is read.'],
  ['Alignment', 'The True North mark anchors the system around horizon, center, star, and vertical intent.'],
  ['Restraint', 'Gold is used as a compass detail, never as decoration or a dominant theme.'],
];

export default function Home() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <Link className="brand-lockup" href="/">
          <span className="mini-mark" aria-hidden="true">
            <span className="star">*</span>
            <span className="center" />
          </span>
          TUSO
        </Link>
        <nav className="nav-links" aria-label="Sample routes">
          <Link href="/web">Web</Link>
          <Link href="/app">App</Link>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">Quiet confidence</p>
          <h1 id="hero-title">A navigation system for living.</h1>
          <p className="lede">
            TUSO should feel like standing on a mountain before sunrise: clear,
            grounded, and still enough to see what matters.
          </p>
          <div className="actions">
            <Link className="button button-primary" href="/app">
              Open app sample
            </Link>
            <Link className="button button-secondary" href="/web">
              View web sample
            </Link>
          </div>
        </div>

        <div className="instrument-panel" aria-label="True North symbol sample">
          <div className="true-north" aria-hidden="true">
            <span className="north-star">*</span>
            <span className="north-center" />
          </div>
          <div className="landscape" aria-hidden="true" />
          <div className="panel-caption">
            <span>Horizon</span>
            <span>Center</span>
            <span>North</span>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="palette-title">
        <div className="section-heading">
          <h2 id="palette-title">Sky, paper, ink.</h2>
          <p>
            The palette avoids astrology cues and uses natural orientation:
            night sky, first light, old brass, handmade paper, and charcoal.
          </p>
        </div>
        <div className="swatch-grid">
          {swatches.map(([name, value, className]) => (
            <div className={`swatch ${className}`} key={name}>
              <strong>{name}</strong>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="ui-title">
        <div className="section-heading">
          <h2 id="ui-title">Quiet interface samples.</h2>
          <p>
            Thin lines, 8-12px radius, slow transitions, and typographic
            hierarchy carry the UI without decorative noise.
          </p>
        </div>

        <div className="sample-grid">
          <article className="sample-panel">
            <p className="eyebrow">Visual principles</p>
            <h3>Designed around stillness, not mysticism.</h3>
            <ul className="alignment-list">
              {principles.map(([title, text]) => (
                <li key={title}>
                  <span className="line-icon" aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="sample-panel dark">
            <p className="eyebrow">Control surface</p>
            <h3>App styling in Midnight Blue.</h3>
            <p>
              Inputs and segmented controls stay calm, with Polaris Gold saved
              for a selected or focused state.
            </p>
            <div className="field-group">
              <label className="field-label" htmlFor="intention">
                Intention
              </label>
              <input
                className="quiet-input"
                id="intention"
                defaultValue="Move with clarity"
              />
            </div>
            <div className="control-row" aria-label="Mode samples">
              <span className="pill active">Observe</span>
              <span className="pill">Align</span>
              <span className="pill">Act</span>
            </div>
          </article>
        </div>

        <div className="quote-band">
          <p>
            Nature already knows how to move. <span>So do you.</span>
          </p>
        </div>
      </section>
    </main>
  );
}
