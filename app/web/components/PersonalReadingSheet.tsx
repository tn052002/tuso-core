import type { WebCopy } from '../i18n/locales';

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
          <p>{copy.personalReadingTitle}</p>
          <div className="personal-reading-steps" aria-label={copy.personalReadingTitle}>
            <span className="is-complete">
              <strong>{copy.personalReadingStepForm}</strong>
              <small>{copy.personalReadingStepFormHelp}</small>
            </span>
            <span className="is-complete">
              <strong>{copy.personalReadingStepLaw}</strong>
              <small>{copy.personalReadingStepLawHelp}</small>
            </span>
            <span className="is-current">
              <strong>{copy.personalReadingStepAction}</strong>
              <small>{copy.personalReadingStepActionHelp}</small>
            </span>
          </div>
        </div>

        <div className="personal-package-list">
          <label className="personal-package-option">
            <input
              checked={blueprintSelected}
              onChange={(event) => onBlueprintChange(event.target.checked)}
              type="checkbox"
            />
            <span className="personal-package-check" aria-hidden="true" />
            <span className="personal-package-copy">
              <span>
                <strong>{copy.personalBlueprintPackage}</strong>
                <em>{copy.personalBlueprintPrice}</em>
              </span>
              <small>{copy.personalBlueprintDescription}</small>
            </span>
          </label>

          <label className="personal-package-option">
            <input
              checked={meaningSelected}
              onChange={(event) => onMeaningChange(event.target.checked)}
              type="checkbox"
            />
            <span className="personal-package-check" aria-hidden="true" />
            <span className="personal-package-copy">
              <span>
                <strong>{copy.personalMeaningPackage}</strong>
                <em>{copy.personalMeaningPrice}</em>
              </span>
              <small>{copy.personalMeaningDescription}</small>
            </span>
          </label>
        </div>

        <button className="personal-reading-continue" type="button" onClick={onContinue}>
          {copy.personalReadingContinue}
        </button>
      </div>
    </div>
  );
}
