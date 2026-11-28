import { TextProperty } from '@tc96/ui/patterns/properties/display/text/text-property'
import { cn } from '@tc96/utils'
import type { Finance3Formatter } from './finance-3-format'
import type { Finance3Direction, Finance3Due, Finance3DueTone } from './types'

const directionClass: Record<Finance3Direction, string | undefined> = {
  in: 'text-success-foreground',
  none: undefined,
  out: undefined,
}

const dueToneClass: Record<Finance3DueTone, string> = {
  danger: 'text-destructive-foreground',
  neutral: 'text-muted-foreground',
  warning: 'text-warning-foreground',
}

export function Finance3Amount({
  cents,
  direction = 'none',
  format,
  label,
}: Readonly<{
  cents: number
  direction?: Finance3Direction
  format: Finance3Formatter
  label?: string
}>) {
  const className = cn('font-medium tabular-nums', directionClass[direction])
  const text = format.amount(cents, direction)
  if (label)
    return (
      <span
        aria-label={label}
        className={className}
        data-direction={direction}
        data-slot="finance-3-amount"
        role="img"
      >
        {text}
      </span>
    )
  return (
    <span
      className={className}
      data-direction={direction}
      data-slot="finance-3-amount"
    >
      {text}
    </span>
  )
}

export function Finance3AmountField({
  ariaLabel,
  cents,
  direction = 'none',
  format,
  label,
  onCommit,
}: Readonly<{
  ariaLabel: string
  cents: number
  direction?: Finance3Direction
  format: Finance3Formatter
  label?: string
  onCommit: (cents: number) => void
}>) {
  const className = cn('font-medium tabular-nums', directionClass[direction])
  const field = (
    <TextProperty
      ariaLabel={ariaLabel}
      className={directionClass[direction]}
      editing="inline"
      onCommit={(text) => {
        const next = text === null ? null : format.parseAmount(text)
        if (next !== null && next > 0) onCommit(next)
      }}
      value={format.amount(cents, direction)}
      variant="plain"
    />
  )
  if (label)
    return (
      <fieldset
        aria-label={label}
        className={cn('m-0 inline-flex min-w-0 border-0 p-0', className)}
        data-direction={direction}
        data-slot="finance-3-amount"
      >
        {field}
      </fieldset>
    )
  return (
    <span
      className={className}
      data-direction={direction}
      data-slot="finance-3-amount"
    >
      {field}
    </span>
  )
}

export const finance3AmountName = (
  name: (amount: string, direction: Finance3Direction) => string,
  format: Finance3Formatter,
  cents: number,
  direction: Finance3Direction,
) => name(format.amount(Math.abs(cents)).replace(/\u00a0/g, ' '), direction)

export function Finance3DueText({ due }: Readonly<{ due: Finance3Due }>) {
  return (
    <span
      className={dueToneClass[due.tone]}
      data-slot="finance-3-due"
      data-tone={due.tone}
    >
      {due.label}
    </span>
  )
}

export function Finance3TextField({
  ariaLabel,
  fallback,
  value,
}: Readonly<{ ariaLabel: string; fallback: string; value: string | null }>) {
  return (
    <TextProperty
      ariaLabel={ariaLabel}
      value={value}
      variant="plain"
      labels={{ fallback: fallback }}
    />
  )
}
