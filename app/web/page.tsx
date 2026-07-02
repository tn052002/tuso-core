'use client';

import { useState } from 'react';

export default function WebPage() {
  const [asked, setAsked] = useState(false);

  return (
    <main className={`question-landing${asked ? ' is-asking' : ''}`}>
      <section className="question-stage" aria-labelledby="question-title">
        <div className="question-compass-panel" aria-label="Breathing compass">
          <a className="question-brand question-panel-brand" href="/">
            TUSO
          </a>
          <div className="question-compass">
            <div className="question-ring" aria-hidden="true">
              <span className="question-axis north">N</span>
              <span className="question-axis east">E</span>
              <span className="question-axis south">S</span>
              <span className="question-axis west">W</span>
              <span className="question-tick vertical" />
              <span className="question-tick horizontal" />
              <span className={`question-dot${asked ? ' is-paused' : ''}`} />
              <span className="question-breath-text" aria-hidden={asked}>
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
            <button
              className="question-submit"
              type="button"
              onClick={() => setAsked(true)}
              aria-expanded={asked}
            >
              Cast an I-Ching
            </button>
          </div>
          <div className="question-answer-sheet" aria-hidden={!asked}>
            <button
              className="question-sheet-close"
              type="button"
              onClick={() => setAsked(false)}
              aria-label="Close answer sheet"
            >
              ×
            </button>
            <div>
              <p className="question-eyebrow">Casting</p>
              <h2>The answer is forming.</h2>
              <p>
                Hold the question still. The next layer can open here when the
                oracle flow is connected.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
