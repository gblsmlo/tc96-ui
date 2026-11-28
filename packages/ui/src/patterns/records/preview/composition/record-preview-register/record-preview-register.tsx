'use client'

import { DateProperty } from '@tc96/ui/patterns/properties/display/date/date-property'
import { PersonProperty } from '@tc96/ui/patterns/properties/display/person/person-property'
import { TextProperty } from '@tc96/ui/patterns/properties/display/text/text-property'
import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import type * as React from 'react'
import type {
  RecordPreviewRegisterField,
  RecordPreviewRegisterProps,
} from '../../core'
import { useRecordPreviewTimestamp } from '../../hooks/use-record-preview-timestamp'

const withoutValueIcon = '[&_[data-slot=property-icon]]:hidden'

function RegisterTimestampRow({
  field,
  format,
  locale,
}: Readonly<{
  field: RecordPreviewRegisterField
  format: (value: string | null) => string | undefined
  locale: string
}>): React.ReactElement {
  return (
    <RecordGroupRow label={field.label}>
      <DateProperty
        ariaLabel={field.label}
        className={withoutValueIcon}
        displayLabel={format(field.value)}
        locale={locale}
        readOnly
        value={field.value}
        variant="plain"
      />
    </RecordGroupRow>
  )
}

export function RecordPreviewRegister({
  author,
  copyLabel,
  createdAt,
  defaultOpen,
  id,
  locale,
  timeZone,
  title,
  updatedAt,
}: Readonly<RecordPreviewRegisterProps>): React.ReactElement {
  const formatTimestamp = useRecordPreviewTimestamp(locale, timeZone)

  return (
    <RecordGroup defaultOpen={defaultOpen} title={title}>
      <RecordGroupRow label={id.label}>
        <TextProperty
          ariaLabel={id.label}
          copyable
          labels={{ copy: copyLabel }}
          value={id.value}
          variant="plain"
        />
      </RecordGroupRow>
      {createdAt ? (
        <RegisterTimestampRow
          field={createdAt}
          format={formatTimestamp}
          locale={locale}
        />
      ) : null}
      {updatedAt ? (
        <RegisterTimestampRow
          field={updatedAt}
          format={formatTimestamp}
          locale={locale}
        />
      ) : null}
      {author ? (
        <RecordGroupRow label={author.label}>
          <PersonProperty
            ariaLabel={author.label}
            options={author.options}
            placeholder={author.placeholder}
            readOnly
            value={author.value}
            variant="plain"
          />
        </RecordGroupRow>
      ) : null}
    </RecordGroup>
  )
}
