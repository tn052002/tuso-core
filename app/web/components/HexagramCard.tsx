import { Hexagram, hexagramDescriptions } from '../lib/iching';
import { HexagramLines } from './HexagramLines';
import { CastLine } from '../lib/iching';

type HexagramCardProps = {
  changed?: boolean;
  counter?: string;
  hexagram: Hexagram | null;
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
  isFlipped,
  label,
  lines,
  onToggle,
  title,
}: HexagramCardProps) {
  const isAvailable = Boolean(hexagram);

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
            #{hexagram?.number} {hexagram?.name}
          </h3>
          <p>{hexagram ? hexagramDescriptions[hexagram.number] : ''}</p>
          {isAvailable ? <span className="question-flip-cue" aria-hidden="true" /> : null}
        </div>
      </div>
    </button>
  );
}
