'use client'

import { IconFrame } from '@tc96/ui/icon-frame'
import { PersonProperty } from '@tc96/ui/patterns/properties/display/person/person-property'
import { SelectProperty } from '@tc96/ui/patterns/properties/display/select/select-property'
import { TextProperty } from '@tc96/ui/patterns/properties/display/text/text-property'
import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import { RecordPreviewBody } from '@tc96/ui/patterns/records/preview/composition/record-preview-body/record-preview-body'
import { RecordPreviewCover } from '@tc96/ui/patterns/records/preview/composition/record-preview-cover/record-preview-cover'
import { RecordPreviewFrame } from '@tc96/ui/patterns/records/preview/composition/record-preview-frame/record-preview-frame'
import { RecordPreviewRegister } from '@tc96/ui/patterns/records/preview/composition/record-preview-register/record-preview-register'
import { useMemo } from 'react'
import { ReadOnlyTextRow } from '../shared/read-only-text-row'
import {
  createRecordPreview5PinnedOptions,
  createRecordPreview5TypeOptions,
  recordPreview5TypeIcons,
} from './catalog'
import { resolveRecordPreview5Labels } from './labels'
import type { RecordPreview5Props } from './types'

export function RecordPreview5({
  className,
  finalFocus,
  labels: labelsProp,
  locale = 'en-US',
  onDownload,
  onExpand,
  onOpenChange,
  onOpenRecord,
  onRecordChange,
  open,
  people,
  record,
  timeZone,
  typeColors,
}: Readonly<RecordPreview5Props>) {
  const labels = useMemo(
    () => resolveRecordPreview5Labels(labelsProp),
    [labelsProp],
  )
  const typeOptions = useMemo(
    () => createRecordPreview5TypeOptions(labels.types),
    [labels.types],
  )
  const pinnedOptions = useMemo(
    () => createRecordPreview5PinnedOptions(labels.pinned),
    [labels.pinned],
  )
  const editable = record.canEdit !== false
  const TypeIcon = recordPreview5TypeIcons[record.type]
  const showDownload = Boolean(onDownload) && record.kind === 'file'
  const moreActions = [
    ...(onOpenRecord ? [{ id: 'open-record', label: labels.openRecord }] : []),
    ...(showDownload ? [{ id: 'download', label: labels.download }] : []),
  ]

  return (
    <RecordPreviewFrame
      className={className}
      closeLabel={labels.close}
      description={record.description ?? undefined}
      expand={onExpand && { label: labels.expand, onClick: onExpand }}
      finalFocus={finalFocus}
      more={{
        actions: moreActions,
        label: labels.more,
        onAction: (actionId) => {
          if (actionId === 'open-record') onOpenRecord?.()
          if (actionId === 'download') onDownload?.()
        },
      }}
      onOpenChange={onOpenChange}
      open={open}
      title={record.name}
    >
      <RecordPreviewBody>
        <RecordPreviewCover
          alt={record.name}
          data-slot="record-preview-5-preview"
          data-type={record.type}
          fallback={
            <IconFrame
              color={typeColors?.[record.type]}
              shape="rounded"
              size="xl"
            >
              <TypeIcon aria-hidden="true" />
            </IconFrame>
          }
          src={record.type === 'image' ? record.previewUrl : null}
        />
        <RecordGroup title={labels.groups.properties}>
          <RecordGroupRow label={labels.fields.name}>
            <TextProperty
              ariaLabel={labels.fields.name}
              editing="inline"
              labels={{ ...labels.text, fallback: labels.noName }}
              onCommit={
                editable
                  ? (name) => {
                      if (name) onRecordChange({ name })
                    }
                  : undefined
              }
              value={record.name}
              variant="plain"
            />
          </RecordGroupRow>
          <RecordGroupRow label={labels.fields.type}>
            <SelectProperty
              ariaLabel={labels.fields.type}
              labels={labels.select}
              options={typeOptions}
              readOnly
              value={record.type}
              variant="plain"
            />
          </RecordGroupRow>
          <RecordGroupRow label={labels.fields.owner}>
            <PersonProperty
              ariaLabel={labels.fields.owner}
              options={people}
              placeholder={labels.noOwner}
              readOnly
              value={record.ownerId}
              variant="plain"
            />
          </RecordGroupRow>
          {record.kind === 'file' ? (
            <ReadOnlyTextRow
              fallback={labels.noSize}
              label={labels.fields.size}
              value={record.size}
            />
          ) : null}
          {record.kind === 'link' ? (
            <ReadOnlyTextRow
              copyLabel={labels.copyAddress}
              fallback={labels.noAddress}
              label={labels.fields.address}
              value={record.url}
            />
          ) : null}
          <ReadOnlyTextRow
            fallback={labels.noLocation}
            label={labels.fields.location}
            value={record.location}
          />
          <RecordGroupRow label={labels.fields.pinned}>
            <SelectProperty
              ariaLabel={labels.fields.pinned}
              labels={labels.select}
              onValueChange={(value) =>
                onRecordChange({ pinned: value === 'yes' })
              }
              options={pinnedOptions}
              value={record.pinned ? 'yes' : 'no'}
              variant="plain"
            />
          </RecordGroupRow>
        </RecordGroup>
        <RecordPreviewRegister
          copyLabel={labels.copyId}
          createdAt={{
            label: labels.fields.createdAt,
            value: record.createdAt,
          }}
          defaultOpen={false}
          id={{ label: labels.fields.id, value: record.id }}
          locale={locale}
          timeZone={timeZone}
          title={labels.groups.record}
          updatedAt={{
            label: labels.fields.updatedAt,
            value: record.updatedAt,
          }}
        />
      </RecordPreviewBody>
    </RecordPreviewFrame>
  )
}
