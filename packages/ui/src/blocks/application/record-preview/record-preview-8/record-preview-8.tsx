'use client'

import { Button } from '@tc96/ui/button'
import { formatNumericDate, parseIsoDate } from '@tc96/ui/helpers/date'
import { PersonProperty } from '@tc96/ui/patterns/properties/display/person/person-property'
import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import { RecordPreviewBody } from '@tc96/ui/patterns/records/preview/composition/record-preview-body/record-preview-body'
import { RecordPreviewDecisions } from '@tc96/ui/patterns/records/preview/composition/record-preview-decisions/record-preview-decisions'
import { RecordPreviewFrame } from '@tc96/ui/patterns/records/preview/composition/record-preview-frame/record-preview-frame'
import { useMemo } from 'react'
import { ReadOnlyDateRow } from '../shared/read-only-date-row'
import { ReadOnlyTextRow } from '../shared/read-only-text-row'
import { resolveRecordPreview8Labels } from './labels'
import type { RecordPreview8Props } from './types'

const dayOnlyPattern = /^\d{4}-\d{2}-\d{2}$/

function formatDay(
  value: string | null,
  locale: string,
  timeZone: string | undefined,
) {
  if (!value) return undefined
  if (dayOnlyPattern.test(value)) {
    const date = parseIsoDate(`${value}T12:00:00.000Z`)
    return date ? formatNumericDate(date, locale, 'UTC') : undefined
  }
  const date = parseIsoDate(value)
  return date ? formatNumericDate(date, locale, timeZone) : undefined
}

export function RecordPreview8({
  className,
  finalFocus,
  kinds,
  labels: labelsProp,
  locale = 'en-US',
  onConfirm,
  onExpand,
  onOpenChange,
  onReject,
  onRetry,
  open,
  people,
  record,
  status = 'ready',
  timeZone,
}: Readonly<RecordPreview8Props>) {
  const labels = useMemo(
    () => resolveRecordPreview8Labels(labelsProp),
    [labelsProp],
  )
  const showDecisions =
    record?.deadlineStatus === 'proposed' && Boolean(onConfirm || onReject)

  return (
    <RecordPreviewFrame
      className={className}
      closeLabel={labels.close}
      expand={onExpand && { label: labels.expand, onClick: onExpand }}
      fallbackTitle={labels.fallbackTitle}
      finalFocus={finalFocus}
      footer={
        showDecisions ? (
          <RecordPreviewDecisions
            data-slot="record-preview-8-decisions"
            label={labels.decisions}
          >
            {onConfirm ? (
              <Button onClick={onConfirm} size="sm" variant="outline">
                {labels.confirm}
              </Button>
            ) : null}
            {onReject ? (
              <Button onClick={onReject} size="sm" variant="ghost">
                {labels.reject}
              </Button>
            ) : null}
          </RecordPreviewDecisions>
        ) : undefined
      }
      hasRecord={Boolean(record)}
      onOpenChange={onOpenChange}
      onRetry={onRetry}
      open={open}
      status={status}
      statusLabels={labels.status}
      title={record?.label}
    >
      {record ? (
        <RecordPreviewBody>
          <RecordGroup title={labels.groups.properties}>
            <ReadOnlyTextRow label={labels.fields.label} value={record.label} />
            <ReadOnlyTextRow
              fallback={labels.noKind}
              label={labels.fields.kind}
              value={
                kinds.find((kind) => kind.value === record.kind)?.label ??
                record.kind
              }
            />
            <ReadOnlyTextRow
              label={labels.fields.status}
              value={labels.statuses[record.deadlineStatus]}
            />
            <ReadOnlyDateRow
              display={formatDay(record.internalDate, locale, timeZone)}
              fallback={labels.noDate}
              label={labels.fields.internalDate}
              locale={locale}
              timeZone={timeZone}
              value={record.internalDate}
            />
            <ReadOnlyDateRow
              display={formatDay(record.fatalDate, locale, timeZone)}
              fallback={labels.noDate}
              label={labels.fields.fatalDate}
              locale={locale}
              timeZone={timeZone}
              value={record.fatalDate}
            />
            <ReadOnlyTextRow
              fallback={labels.noDaysLeft}
              label={labels.fields.daysLeft}
              value={record.daysLeft}
            />
            <RecordGroupRow label={labels.fields.responsible}>
              <PersonProperty
                ariaLabel={labels.fields.responsible}
                options={people}
                placeholder={labels.noResponsible}
                readOnly
                value={record.responsibleId}
                variant="plain"
              />
            </RecordGroupRow>
            <ReadOnlyTextRow
              fallback={labels.noLawsuit}
              label={labels.fields.lawsuit}
              value={record.lawsuitTitle}
            />
            <ReadOnlyTextRow
              fallback={labels.noClient}
              label={labels.fields.client}
              value={record.clientNames.join(', ') || null}
            />
          </RecordGroup>
        </RecordPreviewBody>
      ) : null}
    </RecordPreviewFrame>
  )
}
