'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const hexagramBars = Array.from({ length: 6 }, (_, index) => index);
const STORAGE_KEY = 'tuso-web-casting-session';

type LineKind = 'yin' | 'yang' | 'moving-yin' | 'moving-yang';

type CastLine = {
  kind: LineKind;
  value: 0 | 1;
  changingValue: 0 | 1;
};

type StoredCasting = {
  asked: boolean;
  question: string;
  castTime: string;
  lines: CastLine[];
  isRevealed?: boolean;
};

const lineLabels: Record<LineKind, string> = {
  yin: 'Yin',
  yang: 'Yang',
  'moving-yin': 'Moving Yin',
  'moving-yang': 'Moving Yang',
};

const trigramOrder = ['111', '110', '101', '100', '011', '010', '001', '000'];
const kingWenTable = [
  [1, 43, 14, 34, 9, 5, 26, 11],
  [10, 58, 38, 54, 61, 60, 41, 19],
  [13, 49, 30, 55, 37, 63, 22, 36],
  [25, 17, 21, 51, 42, 3, 27, 24],
  [44, 28, 50, 32, 57, 48, 18, 46],
  [6, 47, 64, 40, 59, 29, 4, 7],
  [33, 31, 56, 62, 53, 39, 52, 15],
  [12, 45, 35, 16, 20, 8, 23, 2],
];

const hexagramNames: Record<number, string> = {
  1: 'The Creative',
  2: 'The Receptive',
  3: 'Difficulty at the Beginning',
  4: 'Youthful Folly',
  5: 'Waiting',
  6: 'Conflict',
  7: 'The Army',
  8: 'Holding Together',
  9: 'Small Taming',
  10: 'Treading',
  11: 'Peace',
  12: 'Standstill',
  13: 'Fellowship',
  14: 'Great Possession',
  15: 'Modesty',
  16: 'Enthusiasm',
  17: 'Following',
  18: 'Work on What Has Been Spoiled',
  19: 'Approach',
  20: 'Contemplation',
  21: 'Biting Through',
  22: 'Grace',
  23: 'Splitting Apart',
  24: 'Return',
  25: 'Innocence',
  26: 'Great Taming',
  27: 'Nourishment',
  28: 'Great Preponderance',
  29: 'The Abysmal',
  30: 'The Clinging',
  31: 'Influence',
  32: 'Duration',
  33: 'Retreat',
  34: 'Great Power',
  35: 'Progress',
  36: 'Darkening of the Light',
  37: 'The Family',
  38: 'Opposition',
  39: 'Obstruction',
  40: 'Deliverance',
  41: 'Decrease',
  42: 'Increase',
  43: 'Breakthrough',
  44: 'Coming to Meet',
  45: 'Gathering Together',
  46: 'Pushing Upward',
  47: 'Oppression',
  48: 'The Well',
  49: 'Revolution',
  50: 'The Cauldron',
  51: 'The Arousing',
  52: 'Keeping Still',
  53: 'Development',
  54: 'The Marrying Maiden',
  55: 'Abundance',
  56: 'The Wanderer',
  57: 'The Gentle',
  58: 'The Joyous',
  59: 'Dispersion',
  60: 'Limitation',
  61: 'Inner Truth',
  62: 'Small Preponderance',
  63: 'After Completion',
  64: 'Before Completion',
};

function ordinalDay(day: number) {
  if (day > 3 && day < 21) return `${day}th`;

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function formatCastTime(date: Date) {
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${weekday}, ${month} ${ordinalDay(date.getDate())}, ${year} ${hours}:${minutes}`;
}

function castLine(): CastLine {
  const roll = Math.floor(Math.random() * 8);

  if (roll === 0) {
    return { kind: 'moving-yin', value: 0, changingValue: 1 };
  }

  if (roll === 7) {
    return { kind: 'moving-yang', value: 1, changingValue: 0 };
  }

  if (roll < 4) {
    return { kind: 'yang', value: 1, changingValue: 1 };
  }

  return { kind: 'yin', value: 0, changingValue: 0 };
}

function getHexagram(values: Array<0 | 1>) {
  if (values.length !== 6) return null;

  const lower = values.slice(0, 3).join('');
  const upper = values.slice(3, 6).join('');
  const upperIndex = trigramOrder.indexOf(upper);
  const lowerIndex = trigramOrder.indexOf(lower);

  if (upperIndex < 0 || lowerIndex < 0) return null;

  const number = kingWenTable[upperIndex][lowerIndex];

  return {
    number,
    name: hexagramNames[number],
  };
}

function getSavedCasting() {
  if (typeof window === 'undefined') return null;

  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) return null;

  try {
    return JSON.parse(saved) as StoredCasting;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function getLineClass(line?: CastLine, changed = false, showMoving = true) {
  if (!line) return '';

  const value = changed ? line.changingValue : line.value;
  const moving = line.kind === 'moving-yin' || line.kind === 'moving-yang';

  return ` is-cast is-${value ? 'yang' : 'yin'}${moving && showMoving ? ' is-moving' : ''}`;
}

export default function WebPage() {
  const [asked, setAsked] = useState(false);
  const [question, setQuestion] = useState('');
  const [castTime, setCastTime] = useState(() => new Date());
  const [lines, setLines] = useState<CastLine[]>([]);
  const [isCasting, setIsCasting] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasLoadedCasting, setHasLoadedCasting] = useState(false);
  const castTimerRef = useRef<number | null>(null);
  const revealTimerRef = useRef<number | null>(null);

  const capturedQuestion = question.trim() || 'Ask a question that will not leave you';
  const mainHexagram = useMemo(() => getHexagram(lines.map((line) => line.value)), [lines]);
  const hasMovingLines = lines.some(
    (line) => line.kind === 'moving-yin' || line.kind === 'moving-yang',
  );
  const changedHexagram = useMemo(
    () => (hasMovingLines ? getHexagram(lines.map((line) => line.changingValue)) : null),
    [hasMovingLines, lines],
  );
  const currentLineLabel = lines.length > 0 ? lineLabels[lines[lines.length - 1].kind] : 'Ready';
  const displayMainHexagram = isRevealed ? mainHexagram : null;
  const displayChangedHexagram = isRevealed ? changedHexagram : null;
  const mainTitle = isRevealing
    ? 'Forming...'
    : displayMainHexagram
      ? `#${displayMainHexagram.number} ${displayMainHexagram.name}`
      : currentLineLabel;
  const changedTitle = isRevealing
    ? 'Forming...'
    : displayChangedHexagram
      ? `#${displayChangedHexagram.number} ${displayChangedHexagram.name}`
      : isRevealed && lines.length === 6
        ? 'No Moving'
        : hasMovingLines
          ? 'Changing hexagram'
          : 'Waiting';

  function clearCastingTimers() {
    if (castTimerRef.current) {
      window.clearTimeout(castTimerRef.current);
      castTimerRef.current = null;
    }

    if (revealTimerRef.current) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  }

  useEffect(() => {
    const saved = getSavedCasting();

    if (saved) {
      setAsked(saved.asked);
      setQuestion(saved.question);
      setCastTime(new Date(saved.castTime));
      setLines(saved.lines);
      setIsRevealed(saved.isRevealed ?? saved.lines.length === 6);
    }

    setHasLoadedCasting(true);
  }, []);

  useEffect(() => clearCastingTimers, []);

  useEffect(() => {
    if (!hasLoadedCasting) return;

    const payload: StoredCasting = {
      asked,
      question,
      castTime: castTime.toISOString(),
      lines,
      isRevealed,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [asked, castTime, hasLoadedCasting, isRevealed, lines, question]);

  function openCastingSheet() {
    clearCastingTimers();
    setCastTime(new Date());
    setLines([]);
    setIsCasting(false);
    setIsRevealing(false);
    setIsRevealed(false);
    setAsked(true);
  }

  function handleCast() {
    if (isCasting || lines.length >= 6) return;

    setIsCasting(true);

    castTimerRef.current = window.setTimeout(() => {
      setLines((currentLines) =>
        currentLines.length >= 6 ? currentLines : [...currentLines, castLine()],
      );
      setIsCasting(false);
      castTimerRef.current = null;
    }, 1500);
  }

  useEffect(() => {
    if (lines.length !== 6 || isRevealed || isRevealing) return;

    setIsRevealing(true);
    revealTimerRef.current = window.setTimeout(() => {
      setIsRevealed(true);
      setIsRevealing(false);
      revealTimerRef.current = null;
    }, 2500);
  }, [isRevealed, isRevealing, lines.length]);

  return (
    <main className={`question-landing${asked ? ' is-asking' : ''}`}>
      <section className="question-stage" aria-labelledby="question-title">
        <div className="question-compass-panel" aria-label="Breathing compass">
          <a className="question-brand question-panel-brand" href="/">
            TUSO
          </a>
          <div className="question-compass">
            <div className="question-ring" aria-hidden="true">
              <span className="question-axis north">N</span>
              <span className="question-axis east">E</span>
              <span className="question-axis south">S</span>
              <span className="question-axis west">W</span>
              <span className="question-tick vertical" />
              <span className="question-tick horizontal" />
              <span className={`question-dot${asked ? ' is-paused' : ''}`} />
              <span className="question-breath-text" aria-hidden={asked}>
                <span>Breath in 5.5s</span>
                <span>Breath out 5.5s</span>
              </span>
            </div>
          </div>
        </div>

        <div className="question-form-panel">
          <div className="question-form">
            <p className="question-eyebrow">Ask the oracle</p>
            <h1 id="question-title">What&apos;s on your mind?</h1>
            <textarea
              className="question-textarea"
              aria-label="Your question"
              placeholder="Ask a question that won&apos;t leave you"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows={7}
            />
            <button
              className="question-submit"
              type="button"
              onClick={openCastingSheet}
              aria-expanded={asked}
            >
              Cast an I-Ching
            </button>
          </div>
          <div className="question-answer-sheet" aria-hidden={!asked}>
            <button
              className="question-sheet-close"
              type="button"
              onClick={() => {
                clearCastingTimers();
                setAsked(false);
                setIsCasting(false);
                setIsRevealing(false);
              }}
              aria-label="Close answer sheet"
            >
              ×
            </button>
            <div className="question-sheet-content">
              <div className="question-sheet-meta">
                <p>{formatCastTime(castTime)}</p>
                <p>
                  <span>Question:</span> {capturedQuestion}
                </p>
              </div>

              <div className="question-hexagram-grid" aria-label="Hexagram placeholders">
                <div
                  className={`question-hexagram-panel${displayMainHexagram ? ' is-complete' : ''}`}
                >
                  <p className="question-hexagram-label">Primary Hexagram</p>
                  <p className="question-hexagram-title">{mainTitle}</p>
                  <div className="question-hexagram-bars" aria-hidden="true">
                    {hexagramBars.map((bar) => (
                      <span key={bar} className={getLineClass(lines[bar])} />
                    ))}
                  </div>
                  <span className="question-line-counter">{lines.length} / 6</span>
                </div>
                <div
                  className={`question-hexagram-panel${displayChangedHexagram ? ' is-complete' : ''}`}
                >
                  <p className="question-hexagram-label">Moving Hexagram</p>
                  <p className="question-hexagram-title">{changedTitle}</p>
                  <div className="question-hexagram-bars changed" aria-hidden="true">
                    {hexagramBars.map((bar) => (
                      <span
                        key={bar}
                        className={
                          displayChangedHexagram ? getLineClass(lines[bar], true, false) : ''
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="question-sheet-actions">
                <button
                  className="question-cast-button"
                  type="button"
                  onClick={handleCast}
                  disabled={isCasting || isRevealing || lines.length >= 6}
                >
                  {isCasting || isRevealing ? (
                    <span className="question-cast-spinner" aria-label="Casting" />
                  ) : (
                    'Cast'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
