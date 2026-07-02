import { formatTopbarDate } from '../lib/date';

type CompassPanelProps = {
  asked: boolean;
  isRevealed: boolean;
  isReleasing: boolean;
  today: Date | null;
};

export function CompassPanel({ asked, isRevealed, isReleasing, today }: CompassPanelProps) {
  const isCaptured = asked && (!isRevealed || isReleasing);

  return (
    <div className="question-compass-panel" aria-label="Breathing compass">
      <div className="question-panel-topbar">
        <a className="question-brand" href="/">
          TUSO
        </a>
        <span className="question-topbar-date">{today ? formatTopbarDate(today) : ''}</span>
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
              <span>Breath in 5.5s</span>
              <span>Breath out 5.5s</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
