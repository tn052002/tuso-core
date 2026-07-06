'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CastResultSummary } from './components/CastResultSummary';
import { CastingSheet } from './components/CastingSheet';
import { Compass } from './components/Compass';
import { PersonalActionSheet } from './components/PersonalActionSheet';
import { PersonalInfoSheet } from './components/PersonalInfoSheet';
import { PersonalReadingSheet } from './components/PersonalReadingSheet';
import { QuestionForm } from './components/QuestionForm';
import { TopBar } from './components/TopBar';
import { hexagramText } from './i18n/hexagrams';
import { webCopy } from './i18n/locales';
import { AppShell } from './shell/AppShell';
import { saveCasting } from './store/persistence';
import { getCastingView } from './store/selectors';
import { useTusoStore } from './store/useTusoStore';

type WebOracleProps = {
  anonymousSessionId?: string;
};

export function WebOracle({ anonymousSessionId }: WebOracleProps) {
  const pathname = usePathname();
  const router = useRouter();
  const state = useTusoStore();
  const { casting, locale, personalReading, shell, today } = state;
  const copy = webCopy[locale];
  const hexagrams = hexagramText[locale];
  const castingView = getCastingView(state, copy, hexagrams);
  const isCapturing = casting.asked && (!casting.isRevealed || casting.isReleasing);
  const isPersonalContext = shell.activeContext === 'personal';

  useEffect(() => {
    state.setToday(new Date());
    state.hydrateFromStorage(anonymousSessionId);

    return state.clearCastingTimers;
  }, [anonymousSessionId]);

  useEffect(() => {
    const sessionId = personalReading.anonymousSessionId;

    if (!sessionId || pathname === `/web/${sessionId}`) return;

    router.push(`/web/${sessionId}`);
  }, [pathname, personalReading.anonymousSessionId, router]);

  useEffect(() => {
    if (!casting.hasHydrated) return;

    saveCasting({
      asked: casting.asked,
      question: casting.question,
      castTime: casting.castTime?.toISOString() ?? null,
      lines: casting.lines,
      isRevealed: casting.isRevealed,
    });
  }, [
    casting.asked,
    casting.castTime,
    casting.hasHydrated,
    casting.isRevealed,
    casting.lines,
    casting.question,
  ]);

  return (
    <AppShell
      bottomContent={
        <QuestionForm
          asked={casting.asked}
          copy={copy}
          locale={locale}
          onAsk={state.openCastingSheet}
          question={casting.question}
          setQuestion={state.setQuestion}
          today={today}
        />
      }
      bottomSheet={
        isPersonalContext ? (
          <CastResultSummary
            castTime={casting.castTime}
            copy={copy}
            locale={locale}
            question={casting.question}
          />
        ) : (
          <CastingSheet
            asked={casting.asked}
            castTime={casting.castTime}
            capturedQuestion={castingView.capturedQuestion}
            changedTitle={castingView.changedTitle}
            copy={copy}
            displayChangedHexagram={castingView.displayChangedHexagram}
            displayMainHexagram={castingView.displayMainHexagram}
            flippedHex={casting.flippedHex}
            hexagrams={hexagrams}
            isCasting={casting.isCasting}
            isQuickCasting={casting.isQuickCasting}
            isRevealing={casting.isRevealing}
            locale={locale}
            lines={casting.lines}
            mainTitle={castingView.mainTitle}
            onCast={state.handleCast}
            onClose={state.closeCastingSheet}
            onPersonalReading={state.openPersonalReadingSheet}
            onQuickCast={state.handleQuickCast}
            onToggleMoving={state.toggleMovingHexagram}
            onTogglePrimary={state.togglePrimaryHexagram}
          />
        )
      }
      copy={copy}
      isAsking={casting.asked}
      isCapturing={isCapturing}
      isCasting={casting.isCasting}
      shell={shell}
      topContent={
        <>
          <TopBar
            copy={copy}
            locale={locale}
            onToggleLocale={state.toggleLocale}
          />
          <Compass
            copy={copy}
            disabled={casting.asked}
            isCaptured={isCapturing}
            isReleasing={casting.isReleasing}
            onHoldOracle={state.openCastingSheet}
          />
        </>
      }
      topSheet={
        personalReading.step === 'action' ? (
          <PersonalActionSheet
            copy={copy}
            onClose={state.closePersonalReadingSheet}
          />
        ) : personalReading.step === 'info' ? (
          <PersonalInfoSheet
            copy={copy}
            info={personalReading.info}
            isCalculating={personalReading.isCalculating}
            onClose={state.closePersonalReadingSheet}
            onContinue={state.continuePersonalInfo}
            onInfoChange={state.setPersonalInfoField}
          />
        ) : (
          <PersonalReadingSheet
            blueprintSelected={personalReading.blueprintSelected}
            copy={copy}
            meaningSelected={personalReading.meaningSelected}
            onBlueprintChange={state.setPersonalBlueprintSelected}
            onClose={state.closePersonalReadingSheet}
            onContinue={state.continuePersonalReading}
            onMeaningChange={state.setPersonalMeaningSelected}
          />
        )
      }
    />
  );
}
