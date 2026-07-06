import type { WebCopy } from '../i18n/locales';
import type { PersonalInfo } from '../store/useTusoStore';
import { PersonalSheetFrame } from './PersonalSheetFrame';

const birthHourBranches = [
  { label: 'Giờ Tý (23:00 – 00:59)', start: 23, end: 0 },
  { label: 'Giờ Sửu (01:00 – 02:59)', start: 1, end: 2 },
  { label: 'Giờ Dần (03:00 – 04:59)', start: 3, end: 4 },
  { label: 'Giờ Mão (05:00 – 06:59)', start: 5, end: 6 },
  { label: 'Giờ Thìn (07:00 – 08:59)', start: 7, end: 8 },
  { label: 'Giờ Tỵ (09:00 – 10:59)', start: 9, end: 10 },
  { label: 'Giờ Ngọ (11:00 – 12:59)', start: 11, end: 12 },
  { label: 'Giờ Mùi (13:00 – 14:59)', start: 13, end: 14 },
  { label: 'Giờ Thân (15:00 – 16:59)', start: 15, end: 16 },
  { label: 'Giờ Dậu (17:00 – 18:59)', start: 17, end: 18 },
  { label: 'Giờ Tuất (19:00 – 20:59)', start: 19, end: 20 },
  { label: 'Giờ Hợi (21:00 – 22:59)', start: 21, end: 22 },
];

function getBirthHourBranch(time: string) {
  const hour = Number(time.split(':')[0]);

  if (!Number.isInteger(hour) || hour < 0 || hour > 23) return '';

  return (
    birthHourBranches.find(({ start, end }) =>
      start > end ? hour >= start || hour <= end : hour >= start && hour <= end,
    )?.label ?? ''
  );
}

type PersonalInfoSheetProps = {
  copy: WebCopy;
  info: PersonalInfo;
  isCalculating: boolean;
  onClose: () => void;
  onContinue: () => void;
  onInfoChange: (field: keyof PersonalInfo, value: string) => void;
};

export function PersonalInfoSheet({
  copy,
  info,
  isCalculating,
  onClose,
  onContinue,
  onInfoChange,
}: PersonalInfoSheetProps) {
  function handleBirthTimeChange(value: string) {
    onInfoChange('birthTime', value);
    onInfoChange('birthTimeBranch', getBirthHourBranch(value));
  }

  return (
    <PersonalSheetFrame copy={copy} onClose={onClose}>
      <div className="personal-reading-message">
        <h2>{copy.personalInfoLead}</h2>
        <p>{copy.personalInfoSublead}</p>
        <small>{copy.personalInfoPrivacy}</small>
      </div>

      <div className="personal-info-form">
        <div className="personal-info-list">
          <label className="personal-info-row">
            <span className="personal-info-icon name" aria-hidden="true" />
            <span>
              <small>{copy.personalInfoName}</small>
              <input
                aria-label={copy.personalInfoName}
                placeholder={copy.personalInfoNamePlaceholder}
                type="text"
                value={info.name}
                onChange={(event) => onInfoChange('name', event.target.value)}
              />
            </span>
          </label>
          <label className="personal-info-row">
            <span className="personal-info-icon calendar" aria-hidden="true" />
            <span>
              <small>{copy.personalInfoDateOfBirth}</small>
              <input
                aria-label={copy.personalInfoDateOfBirth}
                type="date"
                value={info.birthDate}
                onChange={(event) => onInfoChange('birthDate', event.target.value)}
              />
            </span>
          </label>
          <label className="personal-info-row with-branch">
            <span className="personal-info-icon clock" aria-hidden="true" />
            <span>
              <small>{copy.personalInfoTimeOfBirth}</small>
              <input
                aria-label={copy.personalInfoTimeOfBirth}
                type="time"
                value={info.birthTime}
                onChange={(event) => handleBirthTimeChange(event.target.value)}
              />
            </span>
            <select
              aria-label={copy.personalInfoTimeBranchLabel}
              value={info.birthTimeBranch}
              onChange={(event) => onInfoChange('birthTimeBranch', event.target.value)}
            >
              <option value="">{copy.personalInfoTimeBranchLabel}</option>
              {birthHourBranches.map((branch) => (
                <option key={branch.label} value={branch.label}>
                  {branch.label}
                </option>
              ))}
            </select>
          </label>
          <label className="personal-info-row">
            <span className="personal-info-icon place" aria-hidden="true" />
            <span>
              <small>{copy.personalInfoPlaceOfBirth}</small>
              <input
                aria-label={copy.personalInfoPlaceOfBirth}
                placeholder={copy.personalInfoPlacePlaceholder}
                type="text"
                value={info.birthPlace}
                onChange={(event) => onInfoChange('birthPlace', event.target.value)}
              />
            </span>
          </label>
          <label className="personal-info-row">
            <span className="personal-info-icon gender" aria-hidden="true" />
            <span>
              <small>{copy.personalInfoGender}</small>
              <select
                aria-label={copy.personalInfoGender}
                value={info.gender}
                onChange={(event) => onInfoChange('gender', event.target.value)}
              >
                <option value="">{copy.personalInfoGenderPlaceholder}</option>
                <option value="male">{copy.personalInfoGenderMale}</option>
                <option value="female">{copy.personalInfoGenderFemale}</option>
                <option value="other">{copy.personalInfoGenderOther}</option>
              </select>
            </span>
          </label>
        </div>

        <div className="personal-info-tip">
          <span className="personal-info-icon star" aria-hidden="true" />
          <p>
            <strong>{copy.personalInfoTip}</strong>
            <small>{copy.personalInfoTipDetail}</small>
          </p>
        </div>
      </div>

      <button
        className="personal-reading-continue"
        type="button"
        onClick={onContinue}
        disabled={isCalculating}
      >
        <span>{copy.personalReadingContinue}</span>
        <i aria-hidden="true">→</i>
      </button>
      <p className="personal-reading-note">{copy.personalInfoEditNote}</p>

      {isCalculating ? (
        <div className="personal-calculation-overlay" role="status" aria-live="polite">
          <div className="personal-calculation-panel">
            <span className="personal-calculation-ring" aria-hidden="true">
              <span />
            </span>
            <strong>{copy.personalCalculationTitle}</strong>
            <p>{copy.personalCalculationDetail}</p>
            <div className="personal-calculation-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      ) : null}
    </PersonalSheetFrame>
  );
}
