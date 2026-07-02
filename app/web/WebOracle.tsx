'use client';

import { useEffect, useState } from 'react';
import { CastingSheet } from './components/CastingSheet';
import { CompassPanel } from './components/CompassPanel';
import { QuestionForm } from './components/QuestionForm';
import { useCastingSession } from './hooks/useCastingSession';
import { hexagramText } from './i18n/hexagrams';
import { getNextLocale, webCopy, WebLocale } from './i18n/locales';

const LOCALE_STORAGE_KEY = 'tuso-web-locale';

export function WebOracle() {
  const [locale, setLocale] = useState<WebLocale>('en');
  const [today, setToday] = useState<Date | null>(null);
  const copy = webCopy[locale];
  const hexagrams = hexagramText[locale];
  const casting = useCastingSession(copy, hexagrams);

  useEffect(() => {
    setToday(new Date());

    const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

    if (savedLocale === 'en' || savedLocale === 'vi') {
      setLocale(savedLocale);
    }
  }, []);

  function toggleLocale() {
    setLocale((currentLocale) => {
      const nextLocale = getNextLocale(currentLocale);

      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);

      return nextLocale;
    });
  }

  return (
    <main
      className={`question-landing${casting.asked ? ' is-asking' : ''}${
        casting.asked && (!casting.isRevealed || casting.isReleasing) ? ' is-capturing' : ''
      }${casting.isCasting ? ' is-casting' : ''}`}
    >
      <section className="question-stage" aria-labelledby="question-title">
        <CompassPanel
          asked={casting.asked}
          copy={copy}
          isRevealed={casting.isRevealed}
          isReleasing={casting.isReleasing}
          locale={locale}
          onToggleLocale={toggleLocale}
          today={today}
        />

        <div className="question-form-panel">
          <QuestionForm
            asked={casting.asked}
            copy={copy}
            onAsk={casting.openCastingSheet}
            question={casting.question}
            setQuestion={casting.setQuestion}
          />
          <CastingSheet
            asked={casting.asked}
            castTime={casting.castTime}
            capturedQuestion={casting.capturedQuestion}
            changedTitle={casting.changedTitle}
            copy={copy}
            displayChangedHexagram={casting.displayChangedHexagram}
            displayMainHexagram={casting.displayMainHexagram}
            flippedHex={casting.flippedHex}
            hexagrams={hexagrams}
            isCasting={casting.isCasting}
            isRevealing={casting.isRevealing}
            locale={locale}
            lines={casting.lines}
            mainTitle={casting.mainTitle}
            onCast={casting.handleCast}
            onClose={casting.closeCastingSheet}
            onToggleMoving={casting.toggleMovingHexagram}
            onTogglePrimary={casting.togglePrimaryHexagram}
          />
        </div>
      </section>
    </main>
  );
}
