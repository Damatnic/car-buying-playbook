import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtCurrency(n: number): string {
  return '$' + Math.round(n).toLocaleString();
}

export function fmtCurrencyRange(low: number, high: number): string {
  return `$${(low / 1000).toFixed(0)}-${(high / 1000).toFixed(0)}k`;
}
