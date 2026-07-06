import type { ReactNode } from 'react';
import type { WebCopy } from '../i18n/locales';
import { PersonalStepProgress } from './PersonalStepProgress';

type PersonalSheetFrameProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  copy: WebCopy;
  mainClassName?: string;
  onClose: () => void;
};

export function PersonalSheetFrame({
  children,
  className = '',
  contentClassName = '',
  copy,
  mainClassName = '',
  onClose,
}: PersonalSheetFrameProps) {
  return (
    <div className={`personal-reading-sheet ${className}`.trim()}>
      <button
        className="question-sheet-close personal-reading-close"
        type="button"
        onClick={onClose}
        aria-label={copy.closeSheet}
      >
        ×
      </button>

      <div className={`personal-reading-content ${contentClassName}`.trim()}>
        <div className="personal-progress-area">
          <PersonalStepProgress copy={copy} />
        </div>
        <div className={`personal-sheet-main ${mainClassName}`.trim()}>{children}</div>
      </div>
    </div>
  );
}
