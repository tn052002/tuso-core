import type { ReactNode } from 'react';
import type { AppShellState } from './sheetTypes';
import { BottomHalf } from './BottomHalf';
import { SheetHost } from './SheetHost';
import { TopHalf } from './TopHalf';
import type { WebCopy } from '../i18n/locales';

type AppShellProps = {
  bottomContent: ReactNode;
  bottomSheet?: ReactNode;
  copy: WebCopy;
  isAsking: boolean;
  isCapturing: boolean;
  isCasting: boolean;
  shell: AppShellState;
  topContent: ReactNode;
  topSheet?: ReactNode;
};

export function AppShell({
  bottomContent,
  bottomSheet,
  copy,
  isAsking,
  isCapturing,
  isCasting,
  shell,
  topContent,
  topSheet,
}: AppShellProps) {
  return (
    <main
      className={`question-landing top-${shell.topSheet} bottom-${shell.bottomSheet}${
        isAsking ? ' is-asking' : ''
      }${
        isCapturing ? ' is-capturing' : ''
      }${isCasting ? ' is-casting' : ''}`}
      data-active-context={shell.activeContext}
    >
      <section className="question-stage" aria-labelledby="question-title">
        <TopHalf copy={copy}>
          {topContent}
          <SheetHost mode={shell.topSheet} position="top">
            {topSheet}
          </SheetHost>
        </TopHalf>

        <BottomHalf>
          {bottomContent}
          <SheetHost mode={shell.bottomSheet} position="bottom">
            {bottomSheet}
          </SheetHost>
        </BottomHalf>
      </section>
    </main>
  );
}
