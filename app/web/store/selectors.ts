import type { HexagramText } from '../i18n/hexagrams';
import type { WebCopy } from '../i18n/locales';
import { getHexagram } from '../lib/iching';
import type { TusoStoreState } from './useTusoStore';

export function getCastingView(
  state: TusoStoreState,
  copy: WebCopy,
  hexagrams: Record<number, HexagramText>,
) {
  const { casting } = state;
  const capturedQuestion = casting.question.trim() || copy.defaultQuestion;
  const mainHexagram = getHexagram(casting.lines.map((line) => line.value));
  const hasMovingLines = casting.lines.some(
    (line) => line.kind === 'moving-yin' || line.kind === 'moving-yang',
  );
  const changedHexagram = hasMovingLines
    ? getHexagram(casting.lines.map((line) => line.changingValue))
    : null;
  const currentLineLabel =
    casting.lines.length > 0
      ? copy.lineLabels[casting.lines[casting.lines.length - 1].kind]
      : copy.ready;
  const displayMainHexagram = casting.isRevealed ? mainHexagram : null;
  const displayChangedHexagram = casting.isRevealed ? changedHexagram : null;
  const mainTitle = casting.isRevealing
    ? copy.forming
    : displayMainHexagram
      ? `#${displayMainHexagram.number} ${hexagrams[displayMainHexagram.number].name}`
      : currentLineLabel;
  const changedTitle = casting.isRevealing
    ? copy.forming
    : displayChangedHexagram
      ? `#${displayChangedHexagram.number} ${hexagrams[displayChangedHexagram.number].name}`
      : casting.isRevealed && casting.lines.length === 6
        ? copy.noMoving
        : hasMovingLines
          ? copy.changingHexagram
          : copy.waiting;

  return {
    capturedQuestion,
    changedTitle,
    displayChangedHexagram,
    displayMainHexagram,
    mainTitle,
  };
}
