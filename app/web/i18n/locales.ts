import type { LineKind } from '../lib/iching';

export type WebLocale = 'en' | 'vi';

export type WebCopy = {
  localeToggleLabel: string;
  compassLabel: string;
  compassHoldLabel: string;
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
  personalReadingLead: string;
  personalReadingSublead: string;
  personalInfoLead: string;
  personalInfoSublead: string;
  personalInfoPrivacy: string;
  personalInfoName: string;
  personalInfoNamePlaceholder: string;
  personalInfoDateOfBirth: string;
  personalInfoTimeOfBirth: string;
  personalInfoTimeBranchLabel: string;
  personalInfoPlaceOfBirth: string;
  personalInfoPlacePlaceholder: string;
  personalInfoGender: string;
  personalInfoGenderPlaceholder: string;
  personalInfoGenderMale: string;
  personalInfoGenderFemale: string;
  personalInfoGenderOther: string;
  personalInfoTip: string;
  personalInfoTipDetail: string;
  personalInfoEditNote: string;
  personalCalculationTitle: string;
  personalCalculationDetail: string;
  personalActionLead: string;
  personalActionSublead: string;
  personalActionPrompt: string;
  personalActionPromptHelp: string;
  personalActionKnowTitle: string;
  personalActionKnowKicker: string;
  personalActionKnowDescription: string;
  personalActionMeaningTitle: string;
  personalActionMeaningKicker: string;
  personalActionMeaningDescription: string;
  personalActionSaveTitle: string;
  personalActionSaveKicker: string;
  personalActionSaveDescription: string;
  personalActionPrivacy: string;
  personalBlueprintPackage: string;
  personalBlueprintPrice: string;
  personalBlueprintDescription: string;
  personalMeaningPackage: string;
  personalMeaningPrice: string;
  personalMeaningDescription: string;
  personalReadingContinue: string;
  personalReadingIncluded: string;
  personalReadingUpgradeNote: string;
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
    compassHoldLabel: 'Press & hold center for Oracle',
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
    personalReadingLead: 'The oracle has spoken.',
    personalReadingSublead: 'Now make it yours.',
    personalInfoLead: "Let's build your personal compass",
    personalInfoSublead:
      'Your birth details are used to create your BaZi and Zi Wei chart — the foundation of your personal reading.',
    personalInfoPrivacy: 'Your data is private and never shared.',
    personalInfoName: 'Name',
    personalInfoNamePlaceholder: 'Your name',
    personalInfoDateOfBirth: 'Date of birth',
    personalInfoTimeOfBirth: 'Time of birth',
    personalInfoTimeBranchLabel: 'Birth hour branch',
    personalInfoPlaceOfBirth: 'Place of birth',
    personalInfoPlacePlaceholder: 'City, country',
    personalInfoGender: 'Gender',
    personalInfoGenderPlaceholder: 'Select gender',
    personalInfoGenderMale: 'Male',
    personalInfoGenderFemale: 'Female',
    personalInfoGenderOther: 'Other',
    personalInfoTip: 'Accurate birth time is important for a precise reading.',
    personalInfoTipDetail: 'If you’re unsure, choose the closest time.',
    personalInfoEditNote: 'You can edit this anytime in Settings.',
    personalCalculationTitle: 'Reading your compass',
    personalCalculationDetail: 'Connecting your question with your nature and current season.',
    personalActionLead: 'Your compass is ready.',
    personalActionSublead: 'We’ve connected your question with your nature and current season.',
    personalActionPrompt: 'Where would you like to begin?',
    personalActionPromptHelp: 'You can explore any of these anytime.',
    personalActionKnowTitle: 'Know Yourself',
    personalActionKnowKicker: 'Your personal blueprint',
    personalActionKnowDescription: 'Discover how you’re naturally designed to move through life.',
    personalActionMeaningTitle: 'Understand This Question',
    personalActionMeaningKicker: 'Your personal reading',
    personalActionMeaningDescription: 'See what this question means for you, right now.',
    personalActionSaveTitle: 'Save My Compass',
    personalActionSaveKicker: 'Create a free account',
    personalActionSaveDescription: 'Keep your compass, readings and future guidance in one place.',
    personalActionPrivacy: 'Your data is private and never shared.',
    personalBlueprintPackage: 'Personal Blueprint',
    personalBlueprintPrice: 'Free',
    personalBlueprintDescription: 'Keep the cast as your personal pattern entry.',
    personalMeaningPackage: 'Personal Meaning',
    personalMeaningPrice: '10k VND',
    personalMeaningDescription: 'Translate this result into guidance for your current question.',
    personalReadingContinue: 'Continue',
    personalReadingIncluded: 'Included',
    personalReadingUpgradeNote: 'You can upgrade to the full reading anytime.',
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
    compassHoldLabel: 'Nhấn giữ tâm để hỏi Oracle',
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
    personalReadingLead: 'Oracle đã lên tiếng.',
    personalReadingSublead: 'Giờ hãy biến nó thành của bạn.',
    personalInfoLead: 'Hãy dựng la bàn cá nhân của bạn',
    personalInfoSublead:
      'Thông tin sinh được dùng để lập lá số Bát Tự và Tử Vi — nền tảng cho bản đọc cá nhân.',
    personalInfoPrivacy: 'Dữ liệu của bạn riêng tư và không bao giờ được chia sẻ.',
    personalInfoName: 'Tên',
    personalInfoNamePlaceholder: 'Tên của bạn',
    personalInfoDateOfBirth: 'Ngày sinh',
    personalInfoTimeOfBirth: 'Giờ sinh',
    personalInfoTimeBranchLabel: 'Canh giờ sinh',
    personalInfoPlaceOfBirth: 'Nơi sinh',
    personalInfoPlacePlaceholder: 'Thành phố, quốc gia',
    personalInfoGender: 'Giới tính',
    personalInfoGenderPlaceholder: 'Chọn giới tính',
    personalInfoGenderMale: 'Nam',
    personalInfoGenderFemale: 'Nữ',
    personalInfoGenderOther: 'Khác',
    personalInfoTip: 'Giờ sinh chính xác giúp bản đọc rõ hơn.',
    personalInfoTipDetail: 'Nếu bạn không chắc, hãy chọn mốc gần nhất.',
    personalInfoEditNote: 'Bạn có thể chỉnh sửa bất cứ lúc nào trong Cài đặt.',
    personalCalculationTitle: 'Đang đọc la bàn của bạn',
    personalCalculationDetail: 'Kết nối câu hỏi với bản tính và mùa hiện tại của bạn.',
    personalActionLead: 'La bàn của bạn đã sẵn sàng.',
    personalActionSublead: 'Chúng tôi đã kết nối câu hỏi với bản tính và mùa hiện tại của bạn.',
    personalActionPrompt: 'Bạn muốn bắt đầu từ đâu?',
    personalActionPromptHelp: 'Bạn có thể khám phá các phần này bất cứ lúc nào.',
    personalActionKnowTitle: 'Hiểu Chính Mình',
    personalActionKnowKicker: 'Bản thiết kế cá nhân của bạn',
    personalActionKnowDescription: 'Khám phá cách bạn được thiết kế tự nhiên để đi qua cuộc sống.',
    personalActionMeaningTitle: 'Hiểu Câu Hỏi Này',
    personalActionMeaningKicker: 'Bản đọc cá nhân của bạn',
    personalActionMeaningDescription: 'Xem câu hỏi này có ý nghĩa gì với bạn ngay lúc này.',
    personalActionSaveTitle: 'Lưu La Bàn Của Tôi',
    personalActionSaveKicker: 'Tạo tài khoản miễn phí',
    personalActionSaveDescription: 'Lưu la bàn, các bản đọc và hướng dẫn tương lai ở một nơi.',
    personalActionPrivacy: 'Dữ liệu của bạn riêng tư và không bao giờ được chia sẻ.',
    personalBlueprintPackage: 'Personal Blueprint',
    personalBlueprintPrice: 'Miễn phí',
    personalBlueprintDescription: 'Lưu quẻ gieo như một mốc khuôn mẫu cá nhân.',
    personalMeaningPackage: 'Personal Meaning',
    personalMeaningPrice: '10k VND',
    personalMeaningDescription: 'Diễn giải kết quả này thành hướng đi cho câu hỏi hiện tại.',
    personalReadingContinue: 'Tiếp tục',
    personalReadingIncluded: 'Đã bao gồm',
    personalReadingUpgradeNote: 'Bạn có thể nâng cấp lên bản đọc đầy đủ bất cứ lúc nào.',
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
