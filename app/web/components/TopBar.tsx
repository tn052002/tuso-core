import type { WebCopy, WebLocale } from '../i18n/locales';

type TopBarProps = {
  copy: WebCopy;
  locale: WebLocale;
  onToggleLocale: () => void;
};

export function TopBar({ copy, locale, onToggleLocale }: TopBarProps) {
  return (
    <div className="question-panel-topbar">
      <a className="question-brand" href="/">
        TUSO
      </a>
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
