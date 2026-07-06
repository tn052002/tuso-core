import type { WebCopy } from '../i18n/locales';

type PersonalStepProgressProps = {
  copy: WebCopy;
};

export function PersonalStepProgress({ copy }: PersonalStepProgressProps) {
  return (
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
  );
}
