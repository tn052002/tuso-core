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
  isRevealing: boolean;
  isRevealed: boolean;
  isReleasing: boolean;
  hasHydrated: boolean;
  flippedHex: {
    primary: boolean;
    moving: boolean;
  };
};

type PersonalReadingState = {
  blueprintSelected: boolean;
  meaningSelected: boolean;
};

type TusoStoreActions = {
  clearCastingTimers: () => void;
  closeCastingSheet: () => void;
  closePersonalReadingSheet: () => void;
  handleCast: () => void;
  hydrateFromStorage: () => void;
  openCastingSheet: () => void;
  openPersonalReadingSheet: () => void;
  setPersonalBlueprintSelected: (selected: boolean) => void;
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
  meaningSelected: true,
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
    castTimer = null;
    revealTimer = null;
    releaseTimer = null;
    autoFlipTimer = null;
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
    set((state) => ({
      shell: {
        ...state.shell,
        topSheet: 'hidden',
        activeContext: state.casting.isRevealed ? 'result' : state.shell.activeContext,
      },
    }));
  },

  handleCast() {
    const { casting } = get();

    if (casting.isCasting || casting.isRevealing || casting.lines.length >= 6) return;

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
        topSheet: 'half',
        activeContext: 'personal',
      },
      personalReading: {
        ...state.personalReading,
        blueprintSelected: true,
        meaningSelected: true,
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
