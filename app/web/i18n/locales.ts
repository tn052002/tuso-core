import type { LineKind } from '../lib/iching';

export type WebLocale = 'en' | 'vi';

export type WebCopy = {
  localeToggleLabel: string;
  compassLabel: string;
  breathIn: string;
  breathOut: string;
  questionEyebrow: string;
  questionTitle: string;
  questionAriaLabel: string;
  questionPlaceholder: string;
  questionSubmit: string;
  defaultQuestion: string;
  closeSheet: string;
  hexagramGridLabel: string;
  primaryHexagram: string;
  movingHexagram: string;
  cast: string;
  quickCast: string;
  casting: string;
  finalCta: string;
  personalReadingTitle: string;
  personalReadingStepForm: string;
  personalReadingStepLaw: string;
  personalReadingStepAction: string;
  personalReadingStepFormHelp: string;
  personalReadingStepLawHelp: string;
  personalReadingStepActionHelp: string;
  personalBlueprintPackage: string;
  personalBlueprintPrice: string;
  personalBlueprintDescription: string;
  personalMeaningPackage: string;
  personalMeaningPrice: string;
  personalMeaningDescription: string;
  personalReadingContinue: string;
  ready: string;
  forming: string;
  noMoving: string;
  changingHexagram: string;
  waiting: string;
  lineLabels: Record<LineKind, string>;
};

export const webCopy: Record<WebLocale, WebCopy> = {
  en: {
    localeToggleLabel: 'Switch language to Vietnamese',
    compassLabel: 'Breathing compass',
    breathIn: 'Breath in 5.5s',
    breathOut: 'Breath out 5.5s',
    questionEyebrow: 'Take a deep breath, then release slowly',
    questionTitle: "What's on your mind?",
    questionAriaLabel: 'Your question',
    questionPlaceholder: "Ask a question that troubles you deeply",
    questionSubmit: 'Ask the Oracle',
    defaultQuestion: 'Where am I in the river of life?',
    closeSheet: 'Close answer sheet',
    hexagramGridLabel: 'Hexagram placeholders',
    primaryHexagram: 'Primary Hexagram',
    movingHexagram: 'Moving Hexagram',
    cast: 'Cast',
    quickCast: 'Quick Cast',
    casting: 'Casting',
    finalCta: 'See what this mean to YOU',
    personalReadingTitle: 'Personal Reading',
    personalReadingStepForm: 'Hexagram',
    personalReadingStepLaw: 'Raw',
    personalReadingStepAction: 'Personal',
    personalReadingStepFormHelp: 'Form complete',
    personalReadingStepLawHelp: 'Law complete',
    personalReadingStepActionHelp: 'Action current',
    personalBlueprintPackage: 'Personal Blueprint',
    personalBlueprintPrice: 'Free',
    personalBlueprintDescription: 'Keep the cast as your personal pattern entry.',
    personalMeaningPackage: 'Personal Meaning',
    personalMeaningPrice: '10k VND',
    personalMeaningDescription: 'Translate this result into guidance for your current question.',
    personalReadingContinue: 'Continue',
    ready: 'Ready',
    forming: 'Forming...',
    noMoving: 'No Moving',
    changingHexagram: 'Changing hexagram',
    waiting: 'Waiting',
    lineLabels: {
      yin: 'Yin',
      yang: 'Yang',
      'moving-yin': 'Moving Yin',
      'moving-yang': 'Moving Yang',
    },
  },
  vi: {
    localeToggleLabel: 'Chuyển ngôn ngữ sang tiếng Anh',
    compassLabel: 'La bàn hơi thở',
    breathIn: 'Hít vào 5.5s',
    breathOut: 'Thở ra 5.5s',
    questionEyebrow: 'Hít vào một hơi sâu, rồi thở ra từ từ',
    questionTitle: 'Điều gì đang trong tâm trí bạn?',
    questionAriaLabel: 'Câu hỏi của bạn',
    questionPlaceholder: 'Đặt câu hỏi đang làm bạn nhức nhối',
    questionSubmit: 'Hỏi Oracle',
    defaultQuestion: 'Tôi đang ở đâu trong dòng sống này?',
    closeSheet: 'Đóng phiên gieo quẻ',
    hexagramGridLabel: 'Khung quẻ dịch',
    primaryHexagram: 'Quẻ Chính',
    movingHexagram: 'Quẻ Biến',
    cast: 'Gieo',
    quickCast: 'Gieo Nhanh',
    casting: 'Đang gieo',
    finalCta: 'Xem điều này có nghĩa gì với BẠN',
    personalReadingTitle: 'Bản đọc cá nhân',
    personalReadingStepForm: 'Tượng',
    personalReadingStepLaw: 'Lý',
    personalReadingStepAction: 'Nhân',
    personalReadingStepFormHelp: 'Hình tượng đã hoàn thành',
    personalReadingStepLawHelp: 'Lý đã hoàn thành',
    personalReadingStepActionHelp: 'Nhân là bước hiện tại',
    personalBlueprintPackage: 'Personal Blueprint',
    personalBlueprintPrice: 'Miễn phí',
    personalBlueprintDescription: 'Lưu quẻ gieo như một mốc khuôn mẫu cá nhân.',
    personalMeaningPackage: 'Personal Meaning',
    personalMeaningPrice: '10k VND',
    personalMeaningDescription: 'Diễn giải kết quả này thành hướng đi cho câu hỏi hiện tại.',
    personalReadingContinue: 'Tiếp tục',
    ready: 'Sẵn sàng',
    forming: 'Đang kết thành...',
    noMoving: 'Không có hào động',
    changingHexagram: 'Quẻ đang biến',
    waiting: 'Đang chờ',
    lineLabels: {
      yin: 'Âm',
      yang: 'Dương',
      'moving-yin': 'Âm động',
      'moving-yang': 'Dương động',
    },
  },
};

export function getNextLocale(locale: WebLocale): WebLocale {
  return locale === 'en' ? 'vi' : 'en';
}
