import { formatTopbarDate } from '../lib/date';
import type { WebCopy, WebLocale } from '../i18n/locales';

type CompassPanelProps = {
  asked: boolean;
  copy: WebCopy;
  isRevealed: boolean;
  isReleasing: boolean;
  locale: WebLocale;
  onToggleLocale: () => void;
  today: Date | null;
};

export function CompassPanel({
  asked,
  copy,
  isRevealed,
  isReleasing,
  locale,
  onToggleLocale,
  today,
}: CompassPanelProps) {
  const isCaptured = asked && (!isRevealed || isReleasing);

  return (
    <div className="question-compass-panel" aria-label={copy.compassLabel}>
      <div className="question-panel-topbar">
        <a className="question-brand" href="/">
          TUSO
        </a>
        <span className="question-topbar-date">
          {today ? formatTopbarDate(today, locale) : ''}
        </span>
        <button
          className="question-locale-toggle"
          type="button"
          onClick={onToggleLocale}
          aria-label={copy.localeToggleLabel}
        >
          {locale === 'en' ? 'VI' : 'EN'}
        </button>
      </div>
      <div className="question-compass">
        <div className="question-ring" aria-hidden="true">
          <div className="question-ring-core">
            <span className="question-axis north">N</span>
            <span className="question-axis east">E</span>
            <span className="question-axis south">S</span>
            <span className="question-axis west">W</span>
            <span className="question-tick vertical" />
            <span className="question-tick horizontal" />
            <span
              className={`question-dot${isCaptured ? ' is-paused' : ''}${
                isReleasing ? ' is-releasing' : ''
              }`}
            />
            <span className="question-breath-text" aria-hidden={isCaptured}>
              <span>{copy.breathIn}</span>
              <span>{copy.breathOut}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
