export default function WebPage() {
  return (
    <main className="question-landing">
      <header className="question-topbar" aria-label="TUSO">
        <a className="question-brand" href="/">
          TUSO
        </a>
      </header>

      <section className="question-stage" aria-labelledby="question-title">
        <div className="question-compass-panel" aria-label="Breathing compass">
          <div className="question-compass">
            <div className="question-ring" aria-hidden="true">
              <span className="question-axis north">N</span>
              <span className="question-axis east">E</span>
              <span className="question-axis south">S</span>
              <span className="question-axis west">W</span>
              <span className="question-tick vertical" />
              <span className="question-tick horizontal" />
              <span className="question-dot" />
              <span className="question-breath-text">
                <span>Breath in 5.5s</span>
                <span>Breath out 5.5s</span>
              </span>
            </div>
          </div>
        </div>

        <div className="question-form-panel">
          <div className="question-form">
            <p className="question-eyebrow">Ask the oracle</p>
            <h1 id="question-title">What&apos;s on your mind?</h1>
            <textarea
              className="question-textarea"
              aria-label="Your question"
              placeholder="Ask a question that won&apos;t leave you"
              rows={7}
            />
            <button className="question-submit" type="button">
              Cast an I-Ching
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
