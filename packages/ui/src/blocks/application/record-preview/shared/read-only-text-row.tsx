import { TextProperty } from '@tc96/ui/patterns/properties/display/text/text-property'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import type * as React from 'react'

export function ReadOnlyTextRow({
  className,
  copyLabel,
  fallback,
  label,
  value,
}: Readonly<{
  className?: string
  copyLabel?: string
  fallback?: string
  label: string
  value: string | null | undefined
}>): React.ReactElement {
  return (
    <RecordGroupRow label={label}>
      <TextProperty
        ariaLabel={label}
        className={className}
        copyable={Boolean(copyLabel)}
        labels={{ copy: copyLabel, fallback }}
        value={value ?? null}
        variant="plain"
      />
    </RecordGroupRow>
  )
}
