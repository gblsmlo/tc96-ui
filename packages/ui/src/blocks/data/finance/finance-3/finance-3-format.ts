import { formatNumericDate } from '@tc96/ui/helpers/date'
import { formatAmount } from '@tc96/ui/helpers/format'
import type { Finance3Direction, Finance3FormatProps } from './types'

export const defaultFinance3Locale = 'pt-BR'
export const defaultFinance3Currency = 'BRL'

export interface Finance3Formatter {
  amount: (cents: number, direction?: Finance3Direction) => string
  day: (day: string) => string
  dayValue: (day: string) => string
  parseAmount: (text: string) => number | null
}

const signedCents = (cents: number, direction: Finance3Direction) => {
  if (direction === 'in') return Math.abs(cents)
  if (direction === 'out') return -Math.abs(cents)
  return cents
}

export function parseFinance3Amount(
  text: string,
  locale: string,
): number | null {
  const decimal =
    new Intl.NumberFormat(locale)
      .formatToParts(1.1)
      .find((part) => part.type === 'decimal')?.value ?? '.'
  const digits = [...text]
    .filter((char) => /[0-9]/.test(char) || char === decimal)
    .join('')
    .replace(decimal, '.')
  if (!/[0-9]/.test(digits)) return null
  const value = Number(digits)
  return Number.isFinite(value) ? Math.round(value * 100) : null
}

export function createFinance3Formatter({
  currency = defaultFinance3Currency,
  locale = defaultFinance3Locale,
}: Finance3FormatProps): Finance3Formatter {
  const dayValue = (day: string) => `${day.slice(0, 10)}T12:00:00.000Z`
  return {
    amount: (cents, direction = 'none') =>
      formatAmount(signedCents(cents, direction) / 100, {
        currency,
        locale,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        signDisplay: 'auto',
        style: 'currency',
      }),
    day: (day) => formatNumericDate(new Date(dayValue(day)), locale, 'UTC'),
    dayValue,
    parseAmount: (text) => parseFinance3Amount(text, locale),
  }
}

export const finance3SignDirection = (cents: number): Finance3Direction => {
  if (cents > 0) return 'in'
  if (cents < 0) return 'out'
  return 'none'
}
