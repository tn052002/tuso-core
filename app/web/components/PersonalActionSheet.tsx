import type { WebCopy } from '../i18n/locales';
import { PersonalSheetFrame } from './PersonalSheetFrame';

type PersonalActionSheetProps = {
  copy: WebCopy;
  onClose: () => void;
};

export function PersonalActionSheet({ copy, onClose }: PersonalActionSheetProps) {
  return (
    <PersonalSheetFrame
      className="personal-action-sheet"
      contentClassName="personal-action-content"
      copy={copy}
      mainClassName="personal-action-main"
      onClose={onClose}
    >
      <div className="personal-reading-message personal-action-message">
        <h2>{copy.personalActionLead}</h2>
        <p>{copy.personalActionSublead}</p>
      </div>

      <div className="personal-action-separator" aria-hidden="true">
        <span />
      </div>

      <div className="personal-action-body">
        <div className="personal-action-prompt">
          <h3>{copy.personalActionPrompt}</h3>
          <p>{copy.personalActionPromptHelp}</p>
        </div>

        <div className="personal-action-list">
          <button className="personal-action-card is-blueprint" type="button">
            <span className="personal-action-orb mountains" aria-hidden="true" />
            <span className="personal-action-card-copy">
              <strong>{copy.personalActionKnowTitle}</strong>
              <b>{copy.personalActionKnowKicker}</b>
              <small>{copy.personalActionKnowDescription}</small>
            </span>
            <em>{copy.personalReadingIncluded}</em>
            <i aria-hidden="true">→</i>
          </button>

          <button className="personal-action-card is-meaning" type="button">
            <span className="personal-action-orb star" aria-hidden="true" />
            <span className="personal-action-card-copy">
              <strong>{copy.personalActionMeaningTitle}</strong>
              <b>{copy.personalActionMeaningKicker}</b>
              <small>{copy.personalActionMeaningDescription}</small>
            </span>
            <em>{copy.personalMeaningPrice}</em>
            <i aria-hidden="true">→</i>
          </button>

          <button className="personal-action-card is-save" type="button">
            <span className="personal-action-orb lock" aria-hidden="true" />
            <span className="personal-action-card-copy">
              <strong>{copy.personalActionSaveTitle}</strong>
              <b>{copy.personalActionSaveKicker}</b>
              <small>{copy.personalActionSaveDescription}</small>
            </span>
            <i aria-hidden="true">→</i>
          </button>
        </div>
      </div>

      <p className="personal-reading-note">{copy.personalActionPrivacy}</p>
    </PersonalSheetFrame>
  );
}
