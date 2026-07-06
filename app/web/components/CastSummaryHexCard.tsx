import type { CastLine, Hexagram } from '../lib/iching';
import { HexagramLines } from './HexagramLines';

type CastSummaryHexCardProps = {
  changed?: boolean;
  hexagram: Hexagram | null;
  lines: CastLine[];
  name: string;
};

export function CastSummaryHexCard({
  changed = false,
  hexagram,
  lines,
  name,
}: CastSummaryHexCardProps) {
  return (
    <div className="cast-summary-card">
      <span className="cast-summary-number">{hexagram ? `#${hexagram.number}` : '-'}</span>
      <span className="cast-summary-name">{name.toUpperCase()}</span>
      <div className="cast-summary-mini-hex">
        <HexagramLines changed={changed} lines={lines} showChangedLines={changed && Boolean(hexagram)} />
      </div>
    </div>
  );
}
