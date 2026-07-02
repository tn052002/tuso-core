type QuestionFormProps = {
  asked: boolean;
  onAsk: () => void;
  question: string;
  setQuestion: (question: string) => void;
};

export function QuestionForm({ asked, onAsk, question, setQuestion }: QuestionFormProps) {
  return (
    <div className="question-form">
      <p className="question-eyebrow">Take a deep breath</p>
      <h1 id="question-title">What&apos;s on your mind?</h1>
      <textarea
        className="question-textarea"
        aria-label="Your question"
        placeholder="Ask a question that won&apos;t leave you"
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
        Ask the Oracle
      </button>
    </div>
  );
}
