import type { WebLocale } from '../i18n/locales';

export function ordinalDay(day: number) {
  if (day > 3 && day < 21) return `${day}th`;

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export function formatCastTime(date: Date, locale: WebLocale) {
  const intlLocale = locale === 'vi' ? 'vi-VN' : 'en-US';
  const weekday = new Intl.DateTimeFormat(intlLocale, { weekday: 'long' }).format(date);
  const month = new Intl.DateTimeFormat(intlLocale, { month: 'short' }).format(date);
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (locale === 'vi') {
    return `${weekday}, ${date.getDate()} ${month}, ${year} ${hours}:${minutes}`;
  }

  return `${weekday}, ${month} ${ordinalDay(date.getDate())}, ${year} ${hours}:${minutes}`;
}

export function formatTopbarDate(date: Date, locale: WebLocale) {
  const intlLocale = locale === 'vi' ? 'vi-VN' : 'en-US';
  const weekday = new Intl.DateTimeFormat(intlLocale, { weekday: 'long' }).format(date);
  const month = new Intl.DateTimeFormat(intlLocale, { month: 'short' }).format(date);
  const day = date.getDate();
  const year = date.getFullYear();

  if (locale === 'vi') {
    return `${day} ${month}, ${year} - ${weekday}`;
  }

  return `${month} ${day}, ${year} - ${weekday}`;
}
