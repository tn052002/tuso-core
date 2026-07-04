import type { ReactNode } from 'react';
import type { WebCopy } from '../i18n/locales';

type TopHalfProps = {
  children: ReactNode;
  copy: WebCopy;
};

export function TopHalf({ children, copy }: TopHalfProps) {
  return (
    <div className="question-compass-panel" aria-label={copy.compassLabel}>
      {children}
    </div>
  );
}
