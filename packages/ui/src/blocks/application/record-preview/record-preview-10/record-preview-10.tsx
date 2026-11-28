'use client'

import { Badge } from '@tc96/ui/badge'
import { Button } from '@tc96/ui/button'
import { copyToClipboard } from '@tc96/ui/helpers/clipboard'
import { formatNumericDate, parseIsoDate } from '@tc96/ui/helpers/date'
import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import { RecordPreviewBody } from '@tc96/ui/patterns/records/preview/composition/record-preview-body/record-preview-body'
import { RecordPreviewFrame } from '@tc96/ui/patterns/records/preview/composition/record-preview-frame/record-preview-frame'
import { type ReactNode, useMemo, useState } from 'react'
import { useRecordPreviewTimestamp } from '../shared/use-record-preview-timestamp'
import { resolveRecordPreview10Labels } from './labels'
import type { RecordPreview10Props } from './types'

const listClassName = 'm-0 flex list-none flex-col gap-1 p-0 text-sm'

function Facts({
  children,
  title,
}: Readonly<{ children: ReactNode; title: string }>) {
  return (
    <RecordGroup collapsible={false} title={title}>
      <ul className={listClassName}>{children}</ul>
    </RecordGroup>
  )
}

export function RecordPreview10({
  className,
  finalFocus,
  labels: labelsProp,
  locale = 'en-US',
  onExpand,
  onOpenChange,
  onOpenLawsuit,
  onOpenRuns,
  onResolve,
  onRetry,
  open,
  readOnly = false,
  record,
  status = 'ready',
  timeZone,
}: Readonly<RecordPreview10Props>) {
  const labels = useMemo(
    () => resolveRecordPreview10Labels(labelsProp),
    [labelsProp],
  )
  const formatTimestamp = useRecordPreviewTimestamp(locale, timeZone)
  const [copy, setCopy] = useState<{
    id: string
    result: 'copied' | 'failed'
  } | null>(null)

  const formatDay = (value: string) => {
    const date = parseIsoDate(`${value}T12:00:00.000Z`)
    return date ? formatNumericDate(date, locale, 'UTC') : value
  }
  const when = (value: string) => formatTimestamp(value) ?? value

  const copyDetails = () => {
    if (!record?.supportText) return
    const id = record.id
    const written = copyToClipboard(record.supportText)
    if (!written) return setCopy({ id, result: 'failed' })
    void written.then(
      () => setCopy({ id, result: 'copied' }),
      () => setCopy({ id, result: 'failed' }),
    )
  }

  const copyResult = record && copy?.id === record.id ? copy.result : null
  const canResolve = Boolean(record && record.state === 'open' && onResolve)
  const hasFooter = !readOnly && Boolean(record)

  return (
    <RecordPreviewFrame
      className={className}
      closeLabel={labels.close}
      description={
        record
          ? `${labels.origins[record.origin]} · ${labels.states[record.state]}`
          : undefined
      }
      expand={onExpand && { label: labels.expand, onClick: onExpand }}
      fallbackTitle={labels.fallbackTitle}
      finalFocus={finalFocus}
      footer={
        hasFooter ? (
          <>
            <Button onClick={() => onOpenChange(false)} variant="ghost">
              {labels.dismiss}
            </Button>
            {record?.supportText ? (
              <Button onClick={copyDetails} variant="outline">
                {labels.copy}
              </Button>
            ) : null}
            {canResolve ? (
              <Button onClick={onResolve}>{labels.resolve}</Button>
            ) : null}
          </>
        ) : undefined
      }
      hasRecord={Boolean(record)}
      onOpenChange={onOpenChange}
      onRetry={onRetry}
      open={open}
      status={status}
      statusLabels={labels.status}
      title={record && labels.kinds[record.kind]}
    >
      {record ? (
        <RecordPreviewBody>
          {record.simulated ? (
            <div>
              <Badge variant="warning">{labels.simulated}</Badge>
            </div>
          ) : null}
          {record.windows.length > 0 ? (
            <Facts title={labels.groups.window}>
              {record.windows.map(({ from, oab, to }) => (
                <li key={oab}>
                  {labels.windowOf(oab, formatDay(from), formatDay(to))}
                </li>
              ))}
            </Facts>
          ) : null}
          {record.publicationHasLawsuit && onOpenLawsuit ? (
            <Facts title={labels.groups.publication}>
              <li>
                <Button onClick={onOpenLawsuit} size="xs" variant="link">
                  {labels.openLawsuit}
                </Button>
              </li>
            </Facts>
          ) : null}
          {record.silence ? (
            <Facts title={labels.kinds.oab_silent}>
              <li>
                {labels.silenceOf(
                  record.silence.oab,
                  record.silence.count,
                  record.silence.limit,
                )}
              </li>
              <li>
                {labels.lastPublishedOn(
                  formatDay(record.silence.lastPublishedOn),
                )}
              </li>
              <li>{labels.holderOf(record.silence.holderName)}</li>
            </Facts>
          ) : null}
          {record.runs.length > 0 ? (
            <Facts title={labels.groups.runs}>
              {record.runs.map((run) => (
                <li key={run.id}>
                  {labels.runKinds[run.kind] ?? run.kind} ·{' '}
                  {labels.runStates[run.state]}
                  {run.startedAt ? ` · ${when(run.startedAt)}` : ''}
                </li>
              ))}
              {onOpenRuns ? (
                <li>
                  <Button onClick={onOpenRuns} size="xs" variant="link">
                    {labels.openRuns}
                  </Button>
                </li>
              ) : null}
            </Facts>
          ) : null}
          <Facts title={labels.groups.views}>
            {record.views.length === 0 ? (
              <li className="text-muted-foreground">{labels.noViews}</li>
            ) : (
              record.views.map(({ name, seenAt }) => (
                <li key={`${name}-${seenAt}`}>
                  {labels.seenBy(name, when(seenAt))}
                </li>
              ))
            )}
          </Facts>
          <Facts title={labels.groups.resolution}>
            {record.resolution ? (
              <>
                <li>{labels.resolutions[record.resolution]}</li>
                {record.resolutionNote ? (
                  <li>
                    {labels.checkedOf(
                      formatDay(record.resolutionNote.checkedOn),
                      record.resolutionNote.found,
                    )}
                  </li>
                ) : null}
                {record.resolvedBy ? (
                  <li className="text-muted-foreground">
                    {labels.resolvedBy(
                      record.resolvedBy.name,
                      when(record.resolvedBy.at),
                    )}
                  </li>
                ) : null}
              </>
            ) : (
              <li className="text-muted-foreground">{labels.unresolved}</li>
            )}
          </Facts>
          {copyResult ? (
            <output
              className={
                copyResult === 'failed'
                  ? 'text-destructive-foreground text-sm'
                  : 'text-muted-foreground text-sm'
              }
            >
              {copyResult === 'copied' ? labels.copied : labels.copyFailed}
            </output>
          ) : null}
        </RecordPreviewBody>
      ) : null}
    </RecordPreviewFrame>
  )
}
