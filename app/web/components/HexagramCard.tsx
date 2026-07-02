import type { HexagramText } from '../i18n/hexagrams';
import { Hexagram } from '../lib/iching';
import { HexagramLines } from './HexagramLines';
import { CastLine } from '../lib/iching';

type HexagramCardProps = {
  changed?: boolean;
  counter?: string;
  hexagram: Hexagram | null;
  hexagrams: Record<number, HexagramText>;
  isFlipped: boolean;
  label: string;
  lines: CastLine[];
  onToggle: () => void;
  title: string;
};

export function HexagramCard({
  changed = false,
  counter,
  hexagram,
  hexagrams,
  isFlipped,
  label,
  lines,
  onToggle,
  title,
}: HexagramCardProps) {
  const isAvailable = Boolean(hexagram);
  const hexagramText = hexagram ? hexagrams[hexagram.number] : null;

  return (
    <button
      className={`question-hexagram-panel${isAvailable ? ' is-complete is-clickable' : ''}${
        isFlipped ? ' is-flipped' : ''
      }`}
      type="button"
      onClick={onToggle}
      disabled={!isAvailable}
    >
      <div className="question-hexagram-card">
        <div className="question-hexagram-face question-hexagram-front">
          <p className="question-hexagram-label">{label}</p>
          <p className="question-hexagram-title">{title}</p>
          <HexagramLines changed={changed} lines={lines} showChangedLines={changed && isAvailable} />
          {counter ? <span className="question-line-counter">{counter}</span> : null}
          {isAvailable ? <span className="question-flip-cue" aria-hidden="true" /> : null}
        </div>
        <div className="question-hexagram-face question-hexagram-back">
          <p className="question-hexagram-label">{label}</p>
          <h3>
            #{hexagram?.number} {hexagramText?.name}
          </h3>
          <p>{hexagramText?.description ?? ''}</p>
          {isAvailable ? <span className="question-flip-cue" aria-hidden="true" /> : null}
        </div>
      </div>
    </button>
  );
}
