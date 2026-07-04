import { formatTopbarDate } from '../lib/date';
import type { WebCopy, WebLocale } from '../i18n/locales';

type TopBarProps = {
  copy: WebCopy;
  locale: WebLocale;
  onToggleLocale: () => void;
  today: Date | null;
};

export function TopBar({ copy, locale, onToggleLocale, today }: TopBarProps) {
  return (
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
  );
}
