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
  casting: string;
  finalCta: string;
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
    questionEyebrow: 'Take a deep breath',
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
    casting: 'Casting',
    finalCta: 'See what this mean to YOU',
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
    questionEyebrow: 'Hãy hít một hơi sâu',
    questionTitle: 'Điều gì đang trong tâm trí bạn?',
    questionAriaLabel: 'Câu hỏi của bạn',
    questionPlaceholder: 'Đătj câu hỏi đang làm bạn nhức nhối',
    questionSubmit: 'Hỏi Oracle',
    defaultQuestion: 'Tôi đang ở đâu trong dòng sống này?',
    closeSheet: 'Đóng phiên gieo quẻ',
    hexagramGridLabel: 'Khung quẻ dịch',
    primaryHexagram: 'Quẻ Chính',
    movingHexagram: 'Quẻ Biến',
    cast: 'Gieo',
    casting: 'Đang gieo',
    finalCta: 'Xem điều này có nghĩa gì với BẠN',
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
