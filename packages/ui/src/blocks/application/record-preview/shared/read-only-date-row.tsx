import { DateProperty } from '@tc96/ui/patterns/properties/display/date/date-property'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import type * as React from 'react'
import { withoutValueIcon } from './without-value-icon'

export function ReadOnlyDateRow({
  display,
  fallback,
  label,
  locale,
  timeZone,
  value,
}: Readonly<{
  display?: string
  fallback?: string
  label: string
  locale: string
  timeZone?: string
  value: string | null
}>): React.ReactElement {
  return (
    <RecordGroupRow label={label}>
      <DateProperty
        ariaLabel={label}
        className={withoutValueIcon}
        displayLabel={display}
        labels={{ fallback }}
        locale={locale}
        readOnly
        timeZone={timeZone}
        value={value}
        variant="plain"
      />
    </RecordGroupRow>
  )
}
