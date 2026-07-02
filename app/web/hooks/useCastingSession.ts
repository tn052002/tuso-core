'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { HexagramText } from '../i18n/hexagrams';
import type { WebCopy } from '../i18n/locales';
import { castLine, CastLine, getHexagram } from '../lib/iching';

const STORAGE_KEY = 'tuso-web-casting-session';

type StoredCasting = {
  asked: boolean;
  question: string;
  castTime: string;
  lines: CastLine[];
  isRevealed?: boolean;
};

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

export function useCastingSession(copy: WebCopy, hexagrams: Record<number, HexagramText>) {
  const [asked, setAsked] = useState(false);
  const [question, setQuestion] = useState('');
  const [castTime, setCastTime] = useState(() => new Date());
  const [lines, setLines] = useState<CastLine[]>([]);
  const [isCasting, setIsCasting] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);
  const [hasLoadedCasting, setHasLoadedCasting] = useState(false);
  const [flippedHex, setFlippedHex] = useState({ primary: false, moving: false });
  const castTimerRef = useRef<number | null>(null);
  const revealTimerRef = useRef<number | null>(null);
  const releaseTimerRef = useRef<number | null>(null);
  const autoFlipTimerRef = useRef<number | null>(null);

  const capturedQuestion = question.trim() || copy.defaultQuestion;
  const mainHexagram = useMemo(() => getHexagram(lines.map((line) => line.value)), [lines]);
  const hasMovingLines = lines.some(
    (line) => line.kind === 'moving-yin' || line.kind === 'moving-yang',
  );
  const changedHexagram = useMemo(
    () => (hasMovingLines ? getHexagram(lines.map((line) => line.changingValue)) : null),
    [hasMovingLines, lines],
  );
  const currentLineLabel =
    lines.length > 0 ? copy.lineLabels[lines[lines.length - 1].kind] : copy.ready;
  const displayMainHexagram = isRevealed ? mainHexagram : null;
  const displayChangedHexagram = isRevealed ? changedHexagram : null;
  const mainTitle = isRevealing
    ? copy.forming
    : displayMainHexagram
      ? `#${displayMainHexagram.number} ${hexagrams[displayMainHexagram.number].name}`
      : currentLineLabel;
  const changedTitle = isRevealing
    ? copy.forming
    : displayChangedHexagram
      ? `#${displayChangedHexagram.number} ${hexagrams[displayChangedHexagram.number].name}`
      : isRevealed && lines.length === 6
        ? copy.noMoving
        : hasMovingLines
          ? copy.changingHexagram
          : copy.waiting;

  function clearCastingTimers() {
    if (castTimerRef.current) {
      window.clearTimeout(castTimerRef.current);
      castTimerRef.current = null;
    }

    if (revealTimerRef.current) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }

    if (releaseTimerRef.current) {
      window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
    }

    if (autoFlipTimerRef.current) {
      window.clearTimeout(autoFlipTimerRef.current);
      autoFlipTimerRef.current = null;
    }
  }

  function openCastingSheet() {
    clearCastingTimers();
    setCastTime(new Date());
    setLines([]);
    setIsCasting(false);
    setIsRevealing(false);
    setIsRevealed(false);
    setIsReleasing(false);
    setFlippedHex({ primary: false, moving: false });
    setAsked(true);
  }

  function closeCastingSheet() {
    clearCastingTimers();
    setAsked(false);
    setIsCasting(false);
    setIsRevealing(false);
    setIsReleasing(false);
    setFlippedHex({ primary: false, moving: false });
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

  function togglePrimaryHexagram() {
    if (!displayMainHexagram) return;

    setFlippedHex((current) => ({ ...current, primary: !current.primary }));
  }

  function toggleMovingHexagram() {
    if (!displayChangedHexagram) return;

    setFlippedHex((current) => ({ ...current, moving: !current.moving }));
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

  useEffect(() => {
    if (lines.length !== 6 || isRevealed || isRevealing) return;

    setIsRevealing(true);
    revealTimerRef.current = window.setTimeout(() => {
      setIsRevealed(true);
      setIsRevealing(false);
      setIsReleasing(true);
      revealTimerRef.current = null;
      releaseTimerRef.current = window.setTimeout(() => {
        setIsReleasing(false);
        releaseTimerRef.current = null;
      }, 900);
      autoFlipTimerRef.current = window.setTimeout(() => {
        setFlippedHex((current) =>
          current.primary ? current : { ...current, primary: true },
        );
        autoFlipTimerRef.current = null;
      }, 500);
    }, 2500);
  }, [isRevealed, isRevealing, lines.length]);

  return {
    asked,
    capturedQuestion,
    castTime,
    changedTitle,
    displayChangedHexagram,
    displayMainHexagram,
    flippedHex,
    handleCast,
    isCasting,
    isRevealed,
    isRevealing,
    isReleasing,
    lines,
    mainTitle,
    openCastingSheet,
    closeCastingSheet,
    question,
    setQuestion,
    toggleMovingHexagram,
    togglePrimaryHexagram,
  };
}
