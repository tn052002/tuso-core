'use client';

import { useEffect, useState } from 'react';
import { CastingSheet } from './components/CastingSheet';
import { CompassPanel } from './components/CompassPanel';
import { QuestionForm } from './components/QuestionForm';
import { useCastingSession } from './hooks/useCastingSession';

export function WebOracle() {
  const [today, setToday] = useState<Date | null>(null);
  const casting = useCastingSession();

  useEffect(() => {
    setToday(new Date());
  }, []);

  return (
    <main
      className={`question-landing${casting.asked ? ' is-asking' : ''}${
        casting.asked && (!casting.isRevealed || casting.isReleasing) ? ' is-capturing' : ''
      }${casting.isCasting ? ' is-casting' : ''}`}
    >
      <section className="question-stage" aria-labelledby="question-title">
        <CompassPanel
          asked={casting.asked}
          isRevealed={casting.isRevealed}
          isReleasing={casting.isReleasing}
          today={today}
        />

        <div className="question-form-panel">
          <QuestionForm
            asked={casting.asked}
            onAsk={casting.openCastingSheet}
            question={casting.question}
            setQuestion={casting.setQuestion}
          />
          <CastingSheet
            asked={casting.asked}
            castTime={casting.castTime}
            capturedQuestion={casting.capturedQuestion}
            changedTitle={casting.changedTitle}
            displayChangedHexagram={casting.displayChangedHexagram}
            displayMainHexagram={casting.displayMainHexagram}
            flippedHex={casting.flippedHex}
            isCasting={casting.isCasting}
            isRevealing={casting.isRevealing}
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
