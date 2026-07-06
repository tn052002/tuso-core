import type { WebLocale } from '../i18n/locales';
import type { CastLine } from '../lib/iching';

export const CASTING_STORAGE_KEY = 'tuso-web-casting-session';
export const ANONYMOUS_SESSION_INDEX_KEY = 'tuso-web-anonymous-session-id';
export const ANONYMOUS_SESSION_STORAGE_PREFIX = 'tuso-web-anonymous-session';
export const LOCALE_STORAGE_KEY = 'tuso-web-locale';

export type StoredCasting = {
  asked: boolean;
  question: string;
  castTime: string | null;
  lines: CastLine[];
  isRevealed?: boolean;
};

export type StoredPersonalInfo = {
  name: string;
  birthDate: string;
  birthTime: string;
  birthTimeBranch: string;
  birthPlace: string;
  gender: string;
};

export type StoredPersonalReading = {
  blueprintSelected: boolean;
  info: StoredPersonalInfo;
  meaningSelected: boolean;
  step: 'selection' | 'info' | 'action';
};

export type StoredAnonymousSession = {
  id: string;
  createdAt: string;
  locale: WebLocale;
  casting: StoredCasting;
  personalReading: StoredPersonalReading;
};

function getAnonymousSessionKey(sessionId: string) {
  return `${ANONYMOUS_SESSION_STORAGE_PREFIX}-${sessionId}`;
}

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

export function createAnonymousSessionId() {
  if (typeof window === 'undefined') return '';

  let sessionId = '';

  do {
    sessionId = String(Math.floor(Math.random() * 100000000)).padStart(8, '0');
  } while (window.sessionStorage.getItem(getAnonymousSessionKey(sessionId)));

  return sessionId;
}

export function loadAnonymousSession(sessionId: string) {
  if (typeof window === 'undefined' || !/^\d{8}$/.test(sessionId)) return null;

  const saved = window.sessionStorage.getItem(getAnonymousSessionKey(sessionId));

  if (!saved) return null;

  try {
    return JSON.parse(saved) as StoredAnonymousSession;
  } catch {
    window.sessionStorage.removeItem(getAnonymousSessionKey(sessionId));
    return null;
  }
}

export function saveAnonymousSession(payload: StoredAnonymousSession) {
  if (typeof window === 'undefined') return;

  const serialized = JSON.stringify(payload);

  window.sessionStorage.setItem(getAnonymousSessionKey(payload.id), serialized);
  window.sessionStorage.setItem(ANONYMOUS_SESSION_INDEX_KEY, payload.id);
}
