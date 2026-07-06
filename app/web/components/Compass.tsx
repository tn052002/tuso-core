import { useCallback, useRef, useState } from 'react';
import type { WebCopy } from '../i18n/locales';

type CompassProps = {
  copy: WebCopy;
  disabled?: boolean;
  isCaptured: boolean;
  isReleasing: boolean;
  onHoldOracle?: () => void;
};

const HOLD_DURATION = 900;

export function Compass({
  copy,
  disabled = false,
  isCaptured,
  isReleasing,
  onHoldOracle = () => {},
}: CompassProps) {
  const holdTimerRef = useRef<number | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const compassActions = [
    { className: 'north', direction: 'N', label: 'Compass' },
    { className: 'east', direction: 'E', label: 'Blueprint' },
    { className: 'south', direction: 'S', label: 'Practice' },
    { className: 'west', direction: 'W', label: 'Oracle' },
  ];

  const clearHold = useCallback(() => {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    setIsHolding(false);
  }, []);

  const startHold = useCallback(() => {
    if (disabled || holdTimerRef.current) return;

    setIsHolding(true);
    holdTimerRef.current = window.setTimeout(() => {
      holdTimerRef.current = null;
      setIsHolding(false);
      onHoldOracle();
    }, HOLD_DURATION);
  }, [disabled, onHoldOracle]);

  return (
    <div className="question-compass">
      {/* <span className="question-compass-prompt">{copy.questionEyebrow}</span> */}
      <div
        className={`question-ring${isHolding ? ' is-holding' : ''}`}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={copy.compassHoldLabel}
        aria-disabled={disabled}
        onContextMenu={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (disabled || (event.key !== 'Enter' && event.key !== ' ')) return;

          event.preventDefault();
          onHoldOracle();
        }}
        onPointerCancel={clearHold}
        onPointerDown={startHold}
        onPointerLeave={clearHold}
        onPointerUp={clearHold}
      >
        <div className="question-ring-core">
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
      <div className="question-compass-hold-cue" aria-hidden="true">
        <span className="question-hold-icon" />
        <span>{copy.compassHoldLabel}</span>
      </div>
      <div className="question-compass-actions" aria-label="Compass navigation">
        {compassActions.map((action) => (
          <button
            className={`question-axis ${action.className}`}
            key={action.className}
            type="button"
          >
            <span className="question-axis-icon" aria-hidden="true">
              {action.direction}
            </span>
            <span className="question-axis-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
