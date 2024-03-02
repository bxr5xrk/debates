import { MONTH_NAMES } from 'lib/const';

interface charData {
  date: string; // 'Mar 2024'
}

export function formatDate(date: Date): string {
  const newDate = new Date(date);
  return `${MONTH_NAMES[newDate.getMonth()]} ${newDate.getFullYear()}`;
}

export function compareByYearAndMonth(a: charData, b: charData) {
  const aMonth = a.date.split(' ')[0];
  const aYear = parseInt(a.date.split(' ')[1]);
  const bMonth = b.date.split(' ')[0];
  const bYear = parseInt(b.date.split(' ')[1]);

  if (aYear !== bYear) {
    return aYear - bYear;
  } else {
    return MONTH_NAMES.indexOf(aMonth) - MONTH_NAMES.indexOf(bMonth);
  }
}
