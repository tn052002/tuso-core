import type { WebCopy } from '../i18n/locales';
import { PersonalStepProgress } from './PersonalStepProgress';

type PersonalReadingSheetProps = {
  blueprintSelected: boolean;
  copy: WebCopy;
  meaningSelected: boolean;
  onBlueprintChange: (selected: boolean) => void;
  onClose: () => void;
  onContinue: () => void;
  onMeaningChange: (selected: boolean) => void;
};

export function PersonalReadingSheet({
  blueprintSelected,
  copy,
  meaningSelected,
  onBlueprintChange,
  onClose,
  onContinue,
  onMeaningChange,
}: PersonalReadingSheetProps) {
  return (
    <div className="personal-reading-sheet">
      <button
        className="question-sheet-close personal-reading-close"
        type="button"
        onClick={onClose}
        aria-label={copy.closeSheet}
      >
        ×
      </button>

      <div className="personal-reading-content">
        <div className="personal-reading-header">
          <PersonalStepProgress copy={copy} />
          <div className="personal-reading-message">
            <h2>{copy.personalReadingLead}</h2>
            <p>{copy.personalReadingSublead}</p>
          </div>
        </div>

        <div className="personal-package-list">
          <label className="personal-package-option is-included">
            <input
              checked={blueprintSelected}
              onChange={(event) => onBlueprintChange(event.target.checked)}
              type="checkbox"
            />
            <span className="personal-package-check" aria-hidden="true" />
            <span className="personal-package-icon blueprint" aria-hidden="true" />
            <span className="personal-package-copy">
              <span>
                <strong>{copy.personalBlueprintPackage}</strong>
                <b>{copy.personalReadingIncluded}</b>
              </span>
              <small>{copy.personalBlueprintDescription}</small>
            </span>
          </label>

          <label className="personal-package-option is-premium">
            <input
              checked={meaningSelected}
              onChange={(event) => onMeaningChange(event.target.checked)}
              type="checkbox"
            />
            <span className="personal-package-check" aria-hidden="true" />
            <span className="personal-package-icon meaning" aria-hidden="true" />
            <span className="personal-package-copy">
              <span>
                <strong>{copy.personalMeaningPackage}</strong>
                <b>{copy.personalMeaningPrice}</b>
              </span>
              <small>{copy.personalMeaningDescription}</small>
            </span>
          </label>
        </div>

        <button className="personal-reading-continue" type="button" onClick={onContinue}>
          <span>{copy.personalReadingContinue}</span>
          <i aria-hidden="true">→</i>
        </button>
        <p className="personal-reading-note">{copy.personalReadingUpgradeNote}</p>
      </div>
    </div>
  );
}
