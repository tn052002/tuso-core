import { CastLine, getLineClass, hexagramBars } from '../lib/iching';

type HexagramLinesProps = {
  changed?: boolean;
  lines: CastLine[];
  showChangedLines?: boolean;
};

export function HexagramLines({ changed = false, lines, showChangedLines = false }: HexagramLinesProps) {
  return (
    <div className={`question-hexagram-bars${changed ? ' changed' : ''}`} aria-hidden="true">
      {hexagramBars.map((bar) => (
        <span
          key={bar}
          className={showChangedLines ? getLineClass(lines[bar], true, false) : getLineClass(lines[bar])}
        />
      ))}
    </div>
  );
}
