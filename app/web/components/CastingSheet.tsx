import { formatCastTime } from '../lib/date';
import { CastLine, Hexagram } from '../lib/iching';
import { HexagramCard } from './HexagramCard';

type CastingSheetProps = {
  asked: boolean;
  castTime: Date;
  changedTitle: string;
  capturedQuestion: string;
  displayChangedHexagram: Hexagram | null;
  displayMainHexagram: Hexagram | null;
  flippedHex: { primary: boolean; moving: boolean };
  isCasting: boolean;
  isRevealing: boolean;
  lines: CastLine[];
  mainTitle: string;
  onCast: () => void;
  onClose: () => void;
  onToggleMoving: () => void;
  onTogglePrimary: () => void;
};

export function CastingSheet({
  asked,
  castTime,
  capturedQuestion,
  changedTitle,
  displayChangedHexagram,
  displayMainHexagram,
  flippedHex,
  isCasting,
  isRevealing,
  lines,
  mainTitle,
  onCast,
  onClose,
  onToggleMoving,
  onTogglePrimary,
}: CastingSheetProps) {
  const castButtonText = lines.length >= 6 ? 'See what this mean to YOU' : 'Cast';

  return (
    <div className="question-answer-sheet" aria-hidden={!asked}>
      <button
        className="question-sheet-close"
        type="button"
        onClick={onClose}
        aria-label="Close answer sheet"
      >
        ×
      </button>
      <div className="question-sheet-content">
        <div className="question-sheet-meta">
          <p className="question-sheet-time">{formatCastTime(castTime)}</p>
          <p className="question-sheet-question">{capturedQuestion}</p>
        </div>

        <div className="question-hexagram-grid" aria-label="Hexagram placeholders">
          <HexagramCard
            counter={`${lines.length} / 6`}
            hexagram={displayMainHexagram}
            isFlipped={flippedHex.primary}
            label="Primary Hexagram"
            lines={lines}
            onToggle={onTogglePrimary}
            title={mainTitle}
          />
          <HexagramCard
            changed
            hexagram={displayChangedHexagram}
            isFlipped={flippedHex.moving}
            label="Moving Hexagram"
            lines={lines}
            onToggle={onToggleMoving}
            title={changedTitle}
          />
        </div>

        <div className="question-sheet-actions">
          <button
            className="question-cast-button"
            type="button"
            onClick={onCast}
            disabled={isCasting || isRevealing || lines.length >= 6}
          >
            {isCasting || isRevealing ? (
              <span className="question-cast-spinner" aria-label="Casting" />
            ) : (
              castButtonText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
