import type { WebCopy } from '../i18n/locales';
import type { WebLocale } from '../i18n/locales';
import { formatCastTime } from '../lib/date';

type CastResultSummaryProps = {
  castTime: Date | null;
  copy: WebCopy;
  locale: WebLocale;
  question: string;
};

export function CastResultSummary({
  castTime,
  copy,
  locale,
  question,
}: CastResultSummaryProps) {
  const displayQuestion = question.trim() || copy.defaultQuestion;

  return (
    <aside className="cast-summary-sheet" aria-label={copy.questionAriaLabel}>
      <span className="cast-summary-time">
        {castTime ? formatCastTime(castTime, locale) : ''}
      </span>
      <p className="cast-summary-question">{displayQuestion}</p>
    </aside>
  );
}
