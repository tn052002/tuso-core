import { create } from 'zustand';
import type { AppShellState, SheetMode, SheetPosition } from '../shell/sheetTypes';
import { getNextLocale, type WebLocale } from '../i18n/locales';
import { castLine, type CastLine } from '../lib/iching';
import { loadCasting, loadLocale, saveLocale } from './persistence';

type CastingState = {
  asked: boolean;
  question: string;
  castTime: Date | null;
  lines: CastLine[];
  isCasting: boolean;
  isQuickCasting: boolean;
  isRevealing: boolean;
  isRevealed: boolean;
  isReleasing: boolean;
  hasHydrated: boolean;
  flippedHex: {
    primary: boolean;
    moving: boolean;
  };
};

export type PersonalInfo = {
  name: string;
  birthDate: string;
  birthTime: string;
  birthTimeBranch: string;
  birthPlace: string;
  gender: string;
};

type PersonalReadingState = {
  blueprintSelected: boolean;
  info: PersonalInfo;
  isCalculating: boolean;
  meaningSelected: boolean;
  step: 'selection' | 'info' | 'action';
};

type TusoStoreActions = {
  clearCastingTimers: () => void;
  closeCastingSheet: () => void;
  closePersonalReadingSheet: () => void;
  handleCast: () => void;
  handleQuickCast: () => void;
  hydrateFromStorage: () => void;
  openCastingSheet: () => void;
  openPersonalReadingSheet: () => void;
  continuePersonalReading: () => void;
  continuePersonalInfo: () => void;
  setPersonalBlueprintSelected: (selected: boolean) => void;
  setPersonalInfoField: (field: keyof PersonalInfo, value: string) => void;
  setPersonalMeaningSelected: (selected: boolean) => void;
  setQuestion: (question: string) => void;
  setSheetMode: (position: SheetPosition, mode: SheetMode) => void;
  setToday: (today: Date) => void;
  toggleLocale: () => void;
  toggleMovingHexagram: () => void;
  togglePrimaryHexagram: () => void;
};

export type TusoStoreState = {
  locale: WebLocale;
  today: Date | null;
  shell: AppShellState;
  casting: CastingState;
  personalReading: PersonalReadingState;
};

type TusoStore = TusoStoreState & TusoStoreActions;

let castTimer: number | null = null;
let revealTimer: number | null = null;
let releaseTimer: number | null = null;
let autoFlipTimer: number | null = null;
let quickCastTimer: number | null = null;
let personalStepTimer: number | null = null;
let personalCalculationTimer: number | null = null;
let personalActionTimer: number | null = null;

function clearTimer(timer: number | null) {
  if (timer) {
    window.clearTimeout(timer);
  }
}

const initialShell: AppShellState = {
  topSheet: 'hidden',
  bottomSheet: 'hidden',
  activeContext: 'question',
};

const initialCasting: CastingState = {
  asked: false,
  question: '',
  castTime: null,
  lines: [],
  isCasting: false,
  isQuickCasting: false,
  isRevealing: false,
  isRevealed: false,
  isReleasing: false,
  hasHydrated: false,
  flippedHex: {
    primary: false,
    moving: false,
  },
};

const initialPersonalReading: PersonalReadingState = {
  blueprintSelected: true,
  info: {
    name: '',
    birthDate: '',
    birthTime: '',
    birthTimeBranch: '',
    birthPlace: '',
    gender: '',
  },
  isCalculating: false,
  meaningSelected: true,
  step: 'selection',
};

export const useTusoStore = create<TusoStore>((set, get) => ({
  locale: 'en',
  today: null,
  shell: initialShell,
  casting: initialCasting,
  personalReading: initialPersonalReading,

  clearCastingTimers() {
    clearTimer(castTimer);
    clearTimer(revealTimer);
    clearTimer(releaseTimer);
    clearTimer(autoFlipTimer);
    clearTimer(quickCastTimer);
    clearTimer(personalStepTimer);
    clearTimer(personalCalculationTimer);
    clearTimer(personalActionTimer);
    castTimer = null;
    revealTimer = null;
    releaseTimer = null;
    autoFlipTimer = null;
    quickCastTimer = null;
    personalStepTimer = null;
    personalCalculationTimer = null;
    personalActionTimer = null;
  },

  closeCastingSheet() {
    get().clearCastingTimers();
    set((state) => ({
      shell: {
        ...state.shell,
        topSheet: 'hidden',
        bottomSheet: 'hidden',
        activeContext: 'question',
      },
      casting: {
        ...state.casting,
        asked: false,
        isCasting: false,
        isQuickCasting: false,
        isRevealing: false,
        isReleasing: false,
        flippedHex: {
          primary: false,
          moving: false,
        },
      },
    }));
  },

  closePersonalReadingSheet() {
    clearTimer(personalStepTimer);
    clearTimer(personalCalculationTimer);
    clearTimer(personalActionTimer);
    personalStepTimer = null;
    personalCalculationTimer = null;
    personalActionTimer = null;

    set((state) => ({
      shell: {
        ...state.shell,
        topSheet: 'hidden',
        bottomSheet: state.casting.isRevealed ? 'half' : state.shell.bottomSheet,
        activeContext: state.casting.isRevealed ? 'result' : state.shell.activeContext,
      },
      personalReading: {
        ...state.personalReading,
        isCalculating: false,
      },
    }));
  },

  continuePersonalReading() {
    clearTimer(personalStepTimer);
    clearTimer(personalCalculationTimer);
    clearTimer(personalActionTimer);
    personalStepTimer = null;
    personalCalculationTimer = null;
    personalActionTimer = null;

    set((state) => ({
      shell: {
        ...state.shell,
        topSheet: 'hidden',
        bottomSheet: 'collapsed',
        activeContext: 'personal',
      },
    }));

    personalStepTimer = window.setTimeout(() => {
      set((state) => ({
        shell: {
          ...state.shell,
          topSheet: 'full',
          bottomSheet: 'collapsed',
          activeContext: 'personal',
        },
        personalReading: {
          ...state.personalReading,
          step: 'info',
        },
      }));
      personalStepTimer = null;
    }, 760);
  },

  continuePersonalInfo() {
    const { personalReading } = get();

    if (personalReading.step !== 'info' || personalReading.isCalculating) return;

    clearTimer(personalCalculationTimer);
    clearTimer(personalActionTimer);
    personalCalculationTimer = null;
    personalActionTimer = null;

    set((state) => ({
      personalReading: {
        ...state.personalReading,
        isCalculating: true,
      },
    }));

    personalCalculationTimer = window.setTimeout(() => {
      set((state) => ({
        shell: {
          ...state.shell,
          topSheet: 'hidden',
          bottomSheet: 'collapsed',
          activeContext: 'personal',
        },
        personalReading: {
          ...state.personalReading,
          isCalculating: false,
        },
      }));
      personalCalculationTimer = null;

      personalActionTimer = window.setTimeout(() => {
        set((state) => ({
          shell: {
            ...state.shell,
            topSheet: 'full',
            bottomSheet: 'collapsed',
            activeContext: 'personal',
          },
          personalReading: {
            ...state.personalReading,
            step: 'action',
          },
        }));
        personalActionTimer = null;
      }, 760);
    }, 2400);
  },

  handleCast() {
    const { casting } = get();

    if (
      casting.isCasting ||
      casting.isQuickCasting ||
      casting.isRevealing ||
      casting.lines.length >= 6
    ) {
      return;
    }

    set((state) => ({
      casting: {
        ...state.casting,
        isCasting: true,
      },
    }));

    castTimer = window.setTimeout(() => {
      const currentLines = get().casting.lines;
      const nextLines = currentLines.length >= 6 ? currentLines : [...currentLines, castLine()];
      const shouldReveal = nextLines.length === 6;

      set((state) => ({
        casting: {
          ...state.casting,
          lines: nextLines,
          isCasting: false,
          isRevealing: shouldReveal && !state.casting.isRevealed,
        },
        shell: {
          ...state.shell,
          activeContext: shouldReveal ? 'result' : 'casting',
        },
      }));
      castTimer = null;

      if (!shouldReveal) return;

      revealTimer = window.setTimeout(() => {
        set((state) => ({
          casting: {
            ...state.casting,
            isRevealed: true,
            isRevealing: false,
            isReleasing: true,
          },
        }));
        revealTimer = null;

        releaseTimer = window.setTimeout(() => {
          set((state) => ({
            casting: {
              ...state.casting,
              isReleasing: false,
            },
          }));
          releaseTimer = null;
        }, 900);

        autoFlipTimer = window.setTimeout(() => {
          set((state) => ({
            casting: {
              ...state.casting,
              flippedHex: {
                ...state.casting.flippedHex,
                primary: true,
              },
            },
          }));
          autoFlipTimer = null;
        }, 500);
      }, 2500);
    }, 1500);
  },

  handleQuickCast() {
    const { casting } = get();

    if (
      casting.isCasting ||
      casting.isQuickCasting ||
      casting.isRevealing ||
      casting.lines.length >= 6
    ) {
      return;
    }

    set((state) => ({
      casting: {
        ...state.casting,
        isQuickCasting: true,
      },
    }));

    const runQuickCastStep = () => {
      const currentCasting = get().casting;

      if (
        !currentCasting.isQuickCasting ||
        currentCasting.isRevealing ||
        currentCasting.lines.length >= 6
      ) {
        set((state) => ({
          casting: {
            ...state.casting,
            isCasting: false,
            isQuickCasting: false,
          },
        }));
        quickCastTimer = null;
        return;
      }

      set((state) => ({
        casting: {
          ...state.casting,
          isCasting: true,
        },
      }));

      quickCastTimer = window.setTimeout(() => {
        const currentLines = get().casting.lines;
        const nextLines = currentLines.length >= 6 ? currentLines : [...currentLines, castLine()];
        const shouldReveal = nextLines.length === 6;

        set((state) => ({
          casting: {
            ...state.casting,
            lines: nextLines,
            isCasting: false,
            isQuickCasting: !shouldReveal,
            isRevealing: shouldReveal && !state.casting.isRevealed,
          },
          shell: {
            ...state.shell,
            activeContext: shouldReveal ? 'result' : 'casting',
          },
        }));
        quickCastTimer = null;

        if (!shouldReveal) {
          quickCastTimer = window.setTimeout(runQuickCastStep, 180);
          return;
        }

        revealTimer = window.setTimeout(() => {
          set((state) => ({
            casting: {
              ...state.casting,
              isQuickCasting: false,
              isRevealed: true,
              isRevealing: false,
              isReleasing: true,
            },
          }));
          revealTimer = null;

          releaseTimer = window.setTimeout(() => {
            set((state) => ({
              casting: {
                ...state.casting,
                isReleasing: false,
              },
            }));
            releaseTimer = null;
          }, 900);

          autoFlipTimer = window.setTimeout(() => {
            set((state) => ({
              casting: {
                ...state.casting,
                flippedHex: {
                  ...state.casting.flippedHex,
                  primary: true,
                },
              },
            }));
            autoFlipTimer = null;
          }, 500);
        }, 2500);
      }, 1500);
    };

    runQuickCastStep();
  },

  hydrateFromStorage() {
    const savedLocale = loadLocale();
    const savedCasting = loadCasting();

    set((state) => ({
      locale: savedLocale ?? state.locale,
      shell: savedCasting?.asked
        ? {
            ...state.shell,
            bottomSheet: 'full',
            activeContext:
              savedCasting.isRevealed || savedCasting.lines.length === 6 ? 'result' : 'casting',
          }
        : state.shell,
      casting: savedCasting
        ? {
            ...state.casting,
            asked: savedCasting.asked,
            question: savedCasting.question,
            castTime: savedCasting.castTime ? new Date(savedCasting.castTime) : null,
            lines: savedCasting.lines,
            isRevealed: Boolean(savedCasting.isRevealed || savedCasting.lines.length === 6),
            hasHydrated: true,
          }
        : {
            ...state.casting,
            hasHydrated: true,
          },
    }));
  },

  openCastingSheet() {
    get().clearCastingTimers();
    set((state) => ({
      shell: {
        ...state.shell,
        topSheet: 'hidden',
        bottomSheet: 'half',
        activeContext: 'casting',
      },
      casting: {
        ...state.casting,
        asked: true,
        castTime: new Date(),
        lines: [],
        isCasting: false,
        isQuickCasting: false,
        isRevealing: false,
        isRevealed: false,
        isReleasing: false,
        flippedHex: {
          primary: false,
          moving: false,
        },
      },
    }));
  },

  openPersonalReadingSheet() {
    const { casting } = get();

    if (!casting.isRevealed || casting.lines.length < 6) return;

    set((state) => ({
      shell: {
        ...state.shell,
        topSheet: 'full',
        bottomSheet: 'collapsed',
        activeContext: 'personal',
      },
      personalReading: {
        ...state.personalReading,
        blueprintSelected: true,
        meaningSelected: true,
        isCalculating: false,
        step: 'selection',
      },
    }));
  },

  setPersonalBlueprintSelected(selected) {
    set((state) => ({
      personalReading: {
        ...state.personalReading,
        blueprintSelected: selected,
        meaningSelected: selected ? state.personalReading.meaningSelected : false,
      },
    }));
  },

  setPersonalInfoField(field, value) {
    set((state) => ({
      personalReading: {
        ...state.personalReading,
        info: {
          ...state.personalReading.info,
          [field]: value,
        },
      },
    }));
  },

  setPersonalMeaningSelected(selected) {
    set((state) => ({
      personalReading: {
        ...state.personalReading,
        meaningSelected: selected,
        blueprintSelected: selected ? true : state.personalReading.blueprintSelected,
      },
    }));
  },

  setQuestion(question: string) {
    set((state) => ({
      casting: {
        ...state.casting,
        question,
      },
    }));
  },

  setSheetMode(position: SheetPosition, mode: SheetMode) {
    set((state) => ({
      shell: (() => {
        const nextShell = {
          ...state.shell,
          activeContext: mode === 'hidden' ? state.shell.activeContext : 'question',
          [position === 'top' ? 'topSheet' : 'bottomSheet']: mode,
        };
        const oppositeKey = position === 'top' ? 'bottomSheet' : 'topSheet';
        const oppositeMode = nextShell[oppositeKey];
        const bothVisible = mode !== 'hidden' && oppositeMode !== 'hidden';

        if (bothVisible && mode === 'full' && oppositeMode !== 'collapsed') {
          nextShell[oppositeKey] = 'collapsed';
        }

        if (bothVisible && oppositeMode === 'full' && mode !== 'collapsed') {
          nextShell[oppositeKey] = 'collapsed';
        }

        return nextShell;
      })(),
    }));
  },

  setToday(today: Date) {
    set({ today });
  },

  toggleLocale() {
    set((state) => {
      const locale = getNextLocale(state.locale);

      saveLocale(locale);

      return { locale };
    });
  },

  toggleMovingHexagram() {
    const { casting } = get();
    const hasMovingLines = casting.lines.some(
      (line) => line.kind === 'moving-yin' || line.kind === 'moving-yang',
    );

    if (!casting.isRevealed || !hasMovingLines) return;

    set((state) => ({
      casting: {
        ...state.casting,
        flippedHex: {
          ...state.casting.flippedHex,
          moving: !state.casting.flippedHex.moving,
        },
      },
    }));
  },

  togglePrimaryHexagram() {
    if (!get().casting.isRevealed) return;

    set((state) => ({
      casting: {
        ...state.casting,
        flippedHex: {
          ...state.casting.flippedHex,
          primary: !state.casting.flippedHex.primary,
        },
      },
    }));
  },
}));
