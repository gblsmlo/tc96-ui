'use client'

import { DotsThreeIcon } from '@phosphor-icons/react'
import { Button } from '@tc96/ui/button'
import { formatNumericDate, parseIsoDate } from '@tc96/ui/helpers/date'
import { Menu, MenuItem, MenuPopup, MenuTrigger } from '@tc96/ui/menu'
import { TextProperty } from '@tc96/ui/patterns/properties/display/text/text-property'
import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import { RecordPreviewBody } from '@tc96/ui/patterns/records/preview/composition/record-preview-body/record-preview-body'
import { RecordPreviewDecisions } from '@tc96/ui/patterns/records/preview/composition/record-preview-decisions/record-preview-decisions'
import { RecordPreviewFrame } from '@tc96/ui/patterns/records/preview/composition/record-preview-frame/record-preview-frame'
import { useMemo } from 'react'
import { ReadOnlyDateRow } from '../shared/read-only-date-row'
import { ReadOnlyTextRow } from '../shared/read-only-text-row'
import { resolveRecordPreview9Labels } from './labels'
import type { RecordPreview9Props } from './types'

function formatDay(value: string, locale: string) {
  const date = parseIsoDate(`${value}T12:00:00.000Z`)
  return date ? formatNumericDate(date, locale, 'UTC') : undefined
}

export function RecordPreview9({
  className,
  finalFocus,
  labels: labelsProp,
  locale = 'en-US',
  onCreateDeadline,
  onCreateLawsuit,
  onCreateTask,
  onDiscard,
  onExpand,
  onLinkDeadline,
  onLinkLawsuit,
  onNoDeadline,
  onOpenChange,
  onOpenLawsuit,
  onRetry,
  open,
  record,
  status = 'ready',
}: Readonly<RecordPreview9Props>) {
  const labels = useMemo(
    () => resolveRecordPreview9Labels(labelsProp),
    [labelsProp],
  )
  const linked = Boolean(record?.lawsuit)
  const hasMore = Boolean(onCreateTask || onDiscard)
  const showDecisions = linked
    ? Boolean(onCreateDeadline || onLinkDeadline || onNoDeadline || hasMore)
    : Boolean(onCreateLawsuit || onLinkLawsuit || hasMore)

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
            className="flex-wrap items-center"
            data-slot="record-preview-9-decisions"
            label={labels.decisions}
          >
            {linked ? (
              <>
                {onCreateDeadline ? (
                  <Button onClick={onCreateDeadline} size="sm">
                    {labels.actions.createDeadline}
                  </Button>
                ) : null}
                {onLinkDeadline ? (
                  <Button onClick={onLinkDeadline} size="sm" variant="outline">
                    {labels.actions.linkDeadline}
                  </Button>
                ) : null}
                {onNoDeadline ? (
                  <Button onClick={onNoDeadline} size="sm" variant="outline">
                    {labels.actions.noDeadline}
                  </Button>
                ) : null}
              </>
            ) : (
              <>
                {onCreateLawsuit ? (
                  <Button onClick={onCreateLawsuit} size="sm">
                    {labels.actions.createLawsuit}
                  </Button>
                ) : null}
                {onLinkLawsuit ? (
                  <Button onClick={onLinkLawsuit} size="sm" variant="outline">
                    {labels.actions.linkLawsuit}
                  </Button>
                ) : null}
              </>
            )}
            {hasMore ? (
              <Menu>
                <MenuTrigger render={<Button size="sm" variant="ghost" />}>
                  <DotsThreeIcon aria-hidden />
                  {labels.actions.more}
                </MenuTrigger>
                <MenuPopup align="end">
                  {onCreateTask ? (
                    <MenuItem onClick={onCreateTask}>
                      {labels.actions.createTask}
                    </MenuItem>
                  ) : null}
                  {onDiscard ? (
                    <MenuItem onClick={onDiscard} variant="destructive">
                      {labels.actions.discard}
                    </MenuItem>
                  ) : null}
                </MenuPopup>
              </Menu>
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
      title={record && labels.title(record.kind, record.tribunal)}
    >
      {record ? (
        <RecordPreviewBody>
          <RecordGroup title={labels.groups.publication}>
            <ReadOnlyDateRow
              display={formatDay(record.availableOn, locale)}
              fallback={labels.noDate}
              label={labels.fields.availableOn}
              locale={locale}
              timeZone="UTC"
              value={record.availableOn}
            />
            {record.lawyers.length > 0 ? (
              <ReadOnlyTextRow
                label={labels.fields.lawyers}
                value={record.lawyers.join(', ')}
              />
            ) : null}
            <RecordGroupRow label={labels.fields.lawsuit}>
              <div className="flex min-w-0 flex-wrap items-center gap-x-2">
                <TextProperty
                  ariaLabel={labels.fields.lawsuit}
                  labels={{ fallback: labels.notRegistered }}
                  value={record.lawsuit?.title ?? null}
                  variant="plain"
                />
                {record.lawsuit && onOpenLawsuit ? (
                  <Button onClick={onOpenLawsuit} size="xs" variant="link">
                    {labels.openLawsuit}
                  </Button>
                ) : null}
              </div>
            </RecordGroupRow>
            <ReadOnlyTextRow
              fallback={labels.noCaseNumber}
              label={labels.fields.caseNumber}
              value={record.lawsuit?.caseNumber ?? record.caseNumber}
            />
          </RecordGroup>
          <RecordGroup collapsible={false} title={labels.groups.text}>
            <p
              className="whitespace-pre-line text-sm"
              data-slot="record-preview-9-text"
            >
              {record.text}
            </p>
          </RecordGroup>
        </RecordPreviewBody>
      ) : null}
    </RecordPreviewFrame>
  )
}
