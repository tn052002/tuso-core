import type { WebLocale } from '../i18n/locales';
import type { CastLine } from '../lib/iching';

export const CASTING_STORAGE_KEY = 'tuso-web-casting-session';
export const LOCALE_STORAGE_KEY = 'tuso-web-locale';

export type StoredCasting = {
  asked: boolean;
  question: string;
  castTime: string | null;
  lines: CastLine[];
  isRevealed?: boolean;
};

export function loadLocale() {
  if (typeof window === 'undefined') return null;

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  return savedLocale === 'en' || savedLocale === 'vi' ? savedLocale : null;
}

export function saveLocale(locale: WebLocale) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

export function loadCasting() {
  if (typeof window === 'undefined') return null;

  const saved = window.localStorage.getItem(CASTING_STORAGE_KEY);

  if (!saved) return null;

  try {
    return JSON.parse(saved) as StoredCasting;
  } catch {
    window.localStorage.removeItem(CASTING_STORAGE_KEY);
    return null;
  }
}

export function saveCasting(payload: StoredCasting) {
  if (typeof window === 'undefined') return;

  const serialized = JSON.stringify(payload);

  window.localStorage.setItem(CASTING_STORAGE_KEY, serialized);
  window.sessionStorage.setItem(CASTING_STORAGE_KEY, serialized);
}
