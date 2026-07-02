import type { WebCopy } from '../i18n/locales';

type QuestionFormProps = {
  asked: boolean;
  copy: WebCopy;
  onAsk: () => void;
  question: string;
  setQuestion: (question: string) => void;
};

export function QuestionForm({ asked, copy, onAsk, question, setQuestion }: QuestionFormProps) {
  return (
    <div className="question-form">
      <p className="question-eyebrow">{copy.questionEyebrow}</p>
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
