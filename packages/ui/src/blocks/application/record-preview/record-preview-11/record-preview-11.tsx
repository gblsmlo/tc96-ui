'use client'

import { Badge } from '@tc96/ui/badge'
import { Button } from '@tc96/ui/button'
import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import { RecordPreviewBody } from '@tc96/ui/patterns/records/preview/composition/record-preview-body/record-preview-body'
import { RecordPreviewFrame } from '@tc96/ui/patterns/records/preview/composition/record-preview-frame/record-preview-frame'
import { useMemo } from 'react'
import { ReadOnlyDateRow } from '../shared/read-only-date-row'
import { ReadOnlyTextRow } from '../shared/read-only-text-row'
import { useRecordPreviewTimestamp } from '../shared/use-record-preview-timestamp'
import { resolveRecordPreview11Labels } from './labels'
import type { RecordPreview11Props } from './types'

export function RecordPreview11({
  className,
  finalFocus,
  labels: labelsProp,
  locale = 'en-US',
  onOpenChange,
  onOpenFailure,
  onRetry,
  open,
  record,
  status = 'ready',
  timeZone,
}: Readonly<RecordPreview11Props>) {
  const labels = useMemo(
    () => resolveRecordPreview11Labels(labelsProp),
    [labelsProp],
  )
  const formatTimestamp = useRecordPreviewTimestamp(locale, timeZone)
  const failureId = record?.failureId ?? null

  const instant = (label: string, value: string | null) => (
    <ReadOnlyDateRow
      display={formatTimestamp(value)}
      fallback={labels.noDate}
      label={label}
      locale={locale}
      timeZone={timeZone}
      value={value}
    />
  )

  const count = (label: string, value: number | null) => (
    <ReadOnlyTextRow
      fallback={labels.noValue}
      label={label}
      value={value === null ? null : String(value)}
    />
  )

  return (
    <RecordPreviewFrame
      className={className}
      closeLabel={labels.close}
      description={record ? labels.states[record.state] : undefined}
      fallbackTitle={labels.fallbackTitle}
      finalFocus={finalFocus}
      hasRecord={Boolean(record)}
      onOpenChange={onOpenChange}
      onRetry={onRetry}
      open={open}
      status={status}
      statusLabels={labels.status}
      title={record && (labels.kinds[record.kind] ?? record.kind)}
    >
      {record ? (
        <RecordPreviewBody>
          <RecordGroup title={labels.groups.properties}>
            <ReadOnlyTextRow
              label={labels.fields.kind}
              value={labels.kinds[record.kind] ?? record.kind}
            />
            <ReadOnlyTextRow
              label={labels.fields.state}
              value={labels.states[record.state]}
            />
            {instant(labels.fields.createdAt, record.createdAt)}
            {instant(labels.fields.startedAt, record.startedAt)}
            {instant(labels.fields.finishedAt, record.finishedAt)}
            <ReadOnlyTextRow
              fallback={labels.noValue}
              label={labels.fields.duration}
              value={record.duration}
            />
          </RecordGroup>
          <RecordGroup title={labels.groups.result}>
            {count(labels.fields.publications, record.publications)}
            {count(labels.fields.movements, record.movements)}
            <RecordGroupRow label={labels.fields.error}>
              <span className="inline-flex min-w-0 flex-wrap items-center gap-x-2 text-sm">
                {record.error && record.errorSimulated ? (
                  <Badge variant="warning">{labels.simulated}</Badge>
                ) : null}
                {record.error ? (
                  <span className="min-w-0 break-words">{record.error}</span>
                ) : (
                  <span className="text-muted-foreground">
                    {labels.noError}
                  </span>
                )}
              </span>
            </RecordGroupRow>
            {failureId && onOpenFailure ? (
              <RecordGroupRow label={labels.fields.failure}>
                <Button
                  onClick={() => onOpenFailure(failureId)}
                  size="xs"
                  variant="link"
                >
                  {labels.openFailure}
                </Button>
              </RecordGroupRow>
            ) : null}
          </RecordGroup>
        </RecordPreviewBody>
      ) : null}
    </RecordPreviewFrame>
  )
}
