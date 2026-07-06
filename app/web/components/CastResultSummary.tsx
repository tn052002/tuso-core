import type { HexagramText } from '../i18n/hexagrams';
import type { WebCopy } from '../i18n/locales';
import type { CastLine, Hexagram } from '../lib/iching';
import { CastSummaryHexCard } from './CastSummaryHexCard';

type CastResultSummaryProps = {
  changedHexagram: Hexagram | null;
  copy: WebCopy;
  hexagrams: Record<number, HexagramText>;
  lines: CastLine[];
  mainHexagram: Hexagram | null;
};

export function CastResultSummary({
  changedHexagram,
  copy,
  hexagrams,
  lines,
  mainHexagram,
}: CastResultSummaryProps) {
  const mainName = mainHexagram ? hexagrams[mainHexagram.number].name : copy.waiting;
  const changedName = changedHexagram ? hexagrams[changedHexagram.number].name : copy.noMoving;

  return (
    <aside className="cast-summary-sheet" aria-label={copy.hexagramGridLabel}>
      <CastSummaryHexCard hexagram={mainHexagram} lines={lines} name={mainName} />
      <span className="cast-summary-arrow" aria-hidden="true">
        <span className="cast-summary-arrow-mobile">→</span>
        <span className="cast-summary-arrow-desktop">↓</span>
      </span>
      <CastSummaryHexCard changed hexagram={changedHexagram} lines={lines} name={changedName} />
    </aside>
  );
}
