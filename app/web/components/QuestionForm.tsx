import type { WebCopy, WebLocale } from '../i18n/locales';
import { formatTopbarDate } from '../lib/date';

type QuestionFormProps = {
  asked: boolean;
  copy: WebCopy;
  locale: WebLocale;
  onAsk: () => void;
  question: string;
  setQuestion: (question: string) => void;
  today: Date | null;
};

export function QuestionForm({
  asked,
  copy,
  locale,
  onAsk,
  question,
  setQuestion,
  today,
}: QuestionFormProps) {
  return (
    <div className="question-form">
      <p className="question-form-date">{today ? formatTopbarDate(today, locale) : ''}</p>
      <h1 id="question-title">{copy.questionTitle}</h1>
      <textarea
        className="question-textarea"
        aria-label={copy.questionAriaLabel}
        placeholder={copy.questionPlaceholder}
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        rows={7}
      />
      <button
        className="question-submit"
        type="button"
        onClick={onAsk}
        aria-expanded={asked}
      >
        {copy.questionSubmit}
      </button>
    </div>
  );
}
