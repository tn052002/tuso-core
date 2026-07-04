import type { WebCopy } from '../i18n/locales';

type CompassProps = {
  copy: WebCopy;
  isCaptured: boolean;
  isReleasing: boolean;
};

export function Compass({ copy, isCaptured, isReleasing }: CompassProps) {
  return (
    <div className="question-compass">
      <span className="question-compass-prompt">{copy.questionEyebrow}</span>
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
  );
}
