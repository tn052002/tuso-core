import { formatCastTime } from '../lib/date';
import type { HexagramText } from '../i18n/hexagrams';
import type { WebCopy, WebLocale } from '../i18n/locales';
import { CastLine, Hexagram } from '../lib/iching';
import { HexagramCard } from './HexagramCard';

type CastingSheetProps = {
  asked: boolean;
  castTime: Date | null;
  changedTitle: string;
  capturedQuestion: string;
  copy: WebCopy;
  displayChangedHexagram: Hexagram | null;
  displayMainHexagram: Hexagram | null;
  flippedHex: { primary: boolean; moving: boolean };
  hexagrams: Record<number, HexagramText>;
  isCasting: boolean;
  isQuickCasting: boolean;
  isRevealing: boolean;
  locale: WebLocale;
  lines: CastLine[];
  mainTitle: string;
  onCast: () => void;
  onClose: () => void;
  onPersonalReading: () => void;
  onQuickCast: () => void;
  onToggleMoving: () => void;
  onTogglePrimary: () => void;
};

export function CastingSheet({
  asked,
  castTime,
  capturedQuestion,
  changedTitle,
  copy,
  displayChangedHexagram,
  displayMainHexagram,
  flippedHex,
  hexagrams,
  isCasting,
  isQuickCasting,
  isRevealing,
  locale,
  lines,
  mainTitle,
  onCast,
  onClose,
  onPersonalReading,
  onQuickCast,
  onToggleMoving,
  onTogglePrimary,
}: CastingSheetProps) {
  const isComplete = lines.length >= 6;
  const castButtonText = isComplete ? copy.finalCta : copy.cast;
  const isLoading = isCasting || isRevealing;
  const canQuickCast = !isLoading && !isQuickCasting && !isComplete;

  return (
    <div className="question-answer-sheet" aria-hidden={!asked}>
      <button
        className="question-sheet-close"
        type="button"
        onClick={onClose}
        aria-label={copy.closeSheet}
      >
        ×
      </button>
      <div className="question-sheet-content">
        <div className="question-sheet-meta">
          <p className="question-sheet-time">
            {castTime ? formatCastTime(castTime, locale) : ''}
          </p>
          <p className="question-sheet-question">{capturedQuestion}</p>
        </div>

        <div className="question-hexagram-grid" aria-label={copy.hexagramGridLabel}>
          <HexagramCard
            counter={`${lines.length} / 6`}
            hexagram={displayMainHexagram}
            hexagrams={hexagrams}
            isFlipped={flippedHex.primary}
            label={copy.primaryHexagram}
            lines={lines}
            onToggle={onTogglePrimary}
            title={mainTitle}
          />
          <HexagramCard
            changed
            hexagram={displayChangedHexagram}
            hexagrams={hexagrams}
            isFlipped={flippedHex.moving}
            label={copy.movingHexagram}
            lines={lines}
            onToggle={onToggleMoving}
            title={changedTitle}
          />
        </div>

        <div className="question-sheet-actions">
          {!isComplete ? (
            <button
              className="question-quick-cast-button"
              type="button"
              onClick={onQuickCast}
              disabled={!canQuickCast}
            >
              {copy.quickCast}
            </button>
          ) : (
            <span />
          )}
          <button
            className="question-cast-button"
            type="button"
            onClick={isComplete ? onPersonalReading : onCast}
            disabled={isLoading || isQuickCasting}
          >
            {isLoading ? (
              <span className="question-cast-spinner" aria-label={copy.casting} />
            ) : (
              castButtonText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
