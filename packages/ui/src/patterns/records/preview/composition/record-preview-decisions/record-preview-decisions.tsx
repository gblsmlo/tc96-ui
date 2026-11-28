import { cn } from '@tc96/utils'
import type * as React from 'react'
import type { RecordPreviewDecisionsProps } from '../../core'

export function RecordPreviewDecisions({
  children,
  className,
  label,
  ...props
}: Readonly<RecordPreviewDecisionsProps>): React.ReactElement {
  return (
    <fieldset
      aria-label={label}
      className={cn('m-0 flex min-w-0 gap-2 border-0 p-0', className)}
      data-slot="record-preview-decisions"
      {...props}
    >
      {children}
    </fieldset>
  )
}
