'use client';

import { Compass } from '../components/Compass';
import { webCopy } from '../i18n/locales';
import { AppShell } from '../shell/AppShell';
import type { SheetMode, SheetPosition } from '../shell/sheetTypes';
import { useTusoStore } from '../store/useTusoStore';
import '../web.css';

const visibleModes: SheetMode[] = ['collapsed', 'half', 'full', 'hidden'];

function sheetLabel(mode: SheetMode) {
  return mode === 'hidden' ? 'closed' : mode;
}

function sheetName(position: SheetPosition) {
  return position === 'top' ? 'top / left' : 'bottom / right';
}

function SheetModeControls({
  mode,
  position,
  setSheetMode,
}: {
  mode: SheetMode;
  position: SheetPosition;
  setSheetMode: (position: SheetPosition, mode: SheetMode) => void;
}) {
  return (
    <div className="test-control-block">
      <p className="test-kicker">{sheetName(position)} sheet controller</p>
      <div className="test-button-row">
        {visibleModes.map((sheetMode) => (
          <button
            className={mode === sheetMode ? 'is-active' : ''}
            key={sheetMode}
            onClick={() => setSheetMode(position, sheetMode)}
            type="button"
          >
            {sheetLabel(sheetMode)}
          </button>
        ))}
      </div>
    </div>
  );
}

function BottomController({
  bottomSheet,
  setSheetMode,
  topSheet,
}: {
  bottomSheet: SheetMode;
  setSheetMode: (position: SheetPosition, mode: SheetMode) => void;
  topSheet: SheetMode;
}) {
  return (
    <div className="test-main-controller">
      <p className="test-kicker">bottom half state: visible</p>
      <h1 id="question-title">Core App Shell Test</h1>
      <p className="test-state-line">
        top / left sheet: {sheetLabel(topSheet)} · bottom / right sheet:{' '}
        {sheetLabel(bottomSheet)}
      </p>

      <div className="test-button-row">
        <button onClick={() => setSheetMode('top', 'collapsed')} type="button">
          open top / left sheet
        </button>
        <button onClick={() => setSheetMode('bottom', 'collapsed')} type="button">
          open bottom / right sheet
        </button>
      </div>

      <SheetModeControls mode={topSheet} position="top" setSheetMode={setSheetMode} />
      <SheetModeControls mode={bottomSheet} position="bottom" setSheetMode={setSheetMode} />
    </div>
  );
}

function TestSheetContent({
  mode,
  position,
  setSheetMode,
}: {
  mode: SheetMode;
  position: SheetPosition;
  setSheetMode: (position: SheetPosition, mode: SheetMode) => void;
}) {
  return (
    <div className="test-sheet-content">
      <button
        className="test-sheet-close"
        onClick={() => setSheetMode(position, 'hidden')}
        type="button"
        aria-label={`Close ${sheetName(position)} sheet`}
      >
        ×
      </button>
      <p className="test-kicker">{sheetName(position)} sheet state: {sheetLabel(mode)}</p>
      <SheetModeControls mode={mode} position={position} setSheetMode={setSheetMode} />
    </div>
  );
}

export default function WebShellTestPage() {
  const locale = useTusoStore((state) => state.locale);
  const shell = useTusoStore((state) => state.shell);
  const setSheetMode = useTusoStore((state) => state.setSheetMode);
  const copy = webCopy[locale];

  return (
    <div className={`test-app-shell top-${shell.topSheet} bottom-${shell.bottomSheet}`}>
      <AppShell
        bottomContent={
          <BottomController
            bottomSheet={shell.bottomSheet}
            setSheetMode={setSheetMode}
            topSheet={shell.topSheet}
          />
        }
        bottomSheet={
          <TestSheetContent
            mode={shell.bottomSheet}
            position="bottom"
            setSheetMode={setSheetMode}
          />
        }
        copy={copy}
        isAsking={shell.topSheet !== 'hidden' || shell.bottomSheet !== 'hidden'}
        isCapturing={false}
        isCasting={false}
        shell={shell}
        topContent={
          <>
            <p className="test-top-state">top half state: visible</p>
            <Compass
              copy={copy}
              isCaptured={false}
              isReleasing={false}
            />
          </>
        }
        topSheet={
          <TestSheetContent mode={shell.topSheet} position="top" setSheetMode={setSheetMode} />
        }
      />

      <style jsx global>{`
        .test-app-shell .question-landing {
          min-height: 100svh;
        }

        .test-app-shell .question-stage {
          gap: 0;
          grid-template-columns: 1fr;
          grid-template-rows: 50% 50%;
          height: 100svh;
          min-height: 0;
        }

        .test-app-shell .question-compass-panel,
        .test-app-shell .question-form-panel {
          min-height: 0;
          padding: 0;
          border: 1px solid rgba(246, 244, 239, 0.08);
        }

        .test-app-shell .question-compass-panel {
          grid-template-rows: 1fr;
        }

        .test-app-shell .question-compass {
          width: min(68vw, 320px);
        }

        .test-app-shell .question-form-panel {
          align-items: center;
          justify-items: center;
          overflow: hidden;
        }

        .test-app-shell .app-sheet-host {
          position: fixed;
          z-index: 8;
          display: block;
          overflow: visible;
          transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1), height 520ms ease;
        }

        .test-app-shell .app-sheet-host-top {
          top: 0;
          bottom: auto;
        }

        .test-app-shell .app-sheet-host-bottom {
          top: auto;
          bottom: 0;
        }

        .test-app-shell .app-sheet-host-top.is-hidden {
          height: 50svh;
          transform: translateY(-105%);
        }

        .test-app-shell .app-sheet-host-bottom.is-hidden {
          height: 50svh;
          transform: translateY(105%);
        }

        .test-app-shell .app-sheet-host.is-collapsed {
          height: 78px;
          transform: translateY(0);
        }

        .test-app-shell .app-sheet-host.is-half {
          height: 50svh;
          transform: translateY(0);
        }

        .test-app-shell .app-sheet-host.is-full {
          height: 100svh;
          transform: translateY(0);
        }

        .test-app-shell.top-full.bottom-collapsed .app-sheet-host-top {
          height: calc(100svh - 78px);
        }

        .test-app-shell.top-full.bottom-collapsed .app-sheet-host-bottom {
          transform: translateY(0);
        }

        .test-app-shell.top-collapsed.bottom-full .app-sheet-host-top {
          transform: translateY(0);
        }

        .test-app-shell.top-collapsed.bottom-full .app-sheet-host-bottom {
          height: calc(100svh - 78px);
        }

        .test-app-shell .app-sheet-host > * {
          height: 100%;
        }

        .test-top-state {
          position: absolute;
          top: 18px;
          left: 18px;
          z-index: 2;
          margin: 0;
          color: rgba(246, 244, 239, 0.62);
          font-size: 0.72rem;
          font-weight: 780;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .test-main-controller,
        .test-sheet-content {
          width: min(100% - 32px, 620px);
          padding: 22px;
          border: 1px solid rgba(212, 178, 106, 0.28);
          border-radius: 12px;
          display: grid;
          gap: 14px;
          background: rgba(11, 19, 32, 0.58);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);
        }

        .test-sheet-content {
          position: relative;
          width: 100%;
          height: 100%;
          border: 0;
          border-radius: 0;
          align-content: center;
          justify-items: center;
          background:
            radial-gradient(circle at 50% 18%, rgba(212, 178, 106, 0.13), transparent 18rem),
            rgba(246, 244, 239, 0.98);
          color: var(--midnight);
        }

        .test-sheet-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(212, 178, 106, 0.72);
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(246, 244, 239, 0.36);
          color: var(--polaris);
          cursor: pointer;
          font: inherit;
          font-size: 1.35rem;
          line-height: 1;
        }

        .app-sheet-host.is-collapsed .test-sheet-content {
          padding: 0 18px;
          align-content: center;
        }

        .app-sheet-host.is-collapsed .test-sheet-content .test-control-block {
          display: none;
        }

        .test-main-controller h1 {
          margin: 0;
          color: var(--stone);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.8rem, 4vw, 3.2rem);
          font-weight: 400;
          line-height: 1;
        }

        .test-kicker {
          margin: 0;
          color: var(--polaris);
          font-size: 0.72rem;
          font-weight: 780;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .test-sheet-content .test-kicker {
          color: rgba(11, 19, 32, 0.62);
        }

        .test-state-line {
          margin: 0;
          color: rgba(246, 244, 239, 0.72);
          line-height: 1.5;
        }

        .test-control-block {
          display: grid;
          gap: 10px;
        }

        .test-button-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .test-button-row button {
          min-height: 38px;
          padding: 0 14px;
          border: 1px solid rgba(212, 178, 106, 0.42);
          border-radius: 999px;
          background: rgba(246, 244, 239, 0.06);
          color: var(--stone);
          cursor: pointer;
          font: inherit;
          font-size: 0.82rem;
          font-weight: 720;
          text-transform: capitalize;
        }

        .test-sheet-close:hover {
          background: rgba(212, 178, 106, 0.12);
        }

        .test-sheet-content .test-button-row button {
          border-color: rgba(11, 19, 32, 0.18);
          background: rgba(11, 19, 32, 0.04);
          color: var(--midnight);
        }

        .test-button-row button.is-active {
          border-color: var(--polaris);
          background: var(--polaris);
          color: var(--midnight);
        }

        @media (min-width: 900px) {
          .test-app-shell .question-stage {
            grid-template-rows: none;
            grid-template-columns: 50% 50%;
          }

          .test-app-shell .app-sheet-host {
            top: 0;
            bottom: 0;
            width: 50vw;
            height: 100svh;
            transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1), width 520ms ease;
          }

          .test-app-shell .app-sheet-host-top {
            right: auto;
            left: 0;
          }

          .test-app-shell .app-sheet-host-bottom {
            right: 0;
            left: auto;
          }

          .test-app-shell .app-sheet-host-top.is-hidden {
            height: 100svh;
            transform: translateX(-105%);
          }

          .test-app-shell .app-sheet-host-bottom.is-hidden {
            height: 100svh;
            transform: translateX(105%);
          }

          .test-app-shell .app-sheet-host.is-collapsed {
            width: 88px;
            height: 100svh;
          }

          .test-app-shell .app-sheet-host.is-half {
            width: 50vw;
            height: 100svh;
          }

          .test-app-shell .app-sheet-host.is-full {
            width: 100vw;
            height: 100svh;
          }

          .test-app-shell .app-sheet-host-top.is-full {
            left: 0;
            right: 0;
            width: 100vw;
          }

          .test-app-shell .app-sheet-host-bottom.is-full {
            left: 0;
            right: 0;
            width: 100vw;
          }

          .test-app-shell.top-full.bottom-collapsed .app-sheet-host-top {
            right: 88px;
            left: 0;
            width: auto;
            height: 100svh;
          }

          .test-app-shell.top-full.bottom-collapsed .app-sheet-host-bottom {
            right: 0;
            left: auto;
            width: 88px;
            height: 100svh;
            transform: translateX(0);
          }

          .test-app-shell.top-collapsed.bottom-full .app-sheet-host-top {
            right: auto;
            left: 0;
            width: 88px;
            height: 100svh;
            transform: translateX(0);
          }

          .test-app-shell.top-collapsed.bottom-full .app-sheet-host-bottom {
            right: 0;
            left: 88px;
            width: auto;
            height: 100svh;
          }

          .app-sheet-host.is-collapsed .test-sheet-content {
            padding: 18px 0;
          }

          .app-sheet-host.is-collapsed .test-sheet-content .test-kicker {
            writing-mode: vertical-rl;
            text-orientation: mixed;
          }
        }
      `}</style>
    </div>
  );
}
