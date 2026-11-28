'use client'

import { DateProperty } from '@tc96/ui/patterns/properties/display/date/date-property'
import { PeopleProperty } from '@tc96/ui/patterns/properties/display/people/people-property'
import { SelectProperty } from '@tc96/ui/patterns/properties/display/select/select-property'
import { TagsProperty } from '@tc96/ui/patterns/properties/display/tags/tags-property'
import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import { RecordPreviewBody } from '@tc96/ui/patterns/records/preview/composition/record-preview-body/record-preview-body'
import { RecordPreviewFrame } from '@tc96/ui/patterns/records/preview/composition/record-preview-frame/record-preview-frame'
import { RecordPreviewRegister } from '@tc96/ui/patterns/records/preview/composition/record-preview-register/record-preview-register'
import { useMemo } from 'react'
import { withoutValueIcon } from '../shared/without-value-icon'
import { defaultRecordPreview3Catalog } from './catalog'
import { resolveRecordPreview3Labels } from './labels'
import type { RecordPreview3Props } from './types'

export function RecordPreview3({
  catalog = defaultRecordPreview3Catalog,
  className,
  finalFocus,
  kinds,
  labels: labelsProp,
  locale = 'en-US',
  onExpand,
  onOpenChange,
  onRecordChange,
  onRetry,
  open,
  people,
  record,
  status = 'ready',
  tags,
  timeZone,
}: Readonly<RecordPreview3Props>) {
  const labels = useMemo(
    () => resolveRecordPreview3Labels(labelsProp),
    [labelsProp],
  )

  return (
    <RecordPreviewFrame
      className={className}
      closeLabel={labels.close}
      description={record?.description ?? undefined}
      expand={onExpand && { label: labels.expand, onClick: onExpand }}
      fallbackTitle={labels.fallbackTitle}
      finalFocus={finalFocus}
      hasRecord={Boolean(record)}
      onOpenChange={onOpenChange}
      onRetry={onRetry}
      open={open}
      status={status}
      statusLabels={labels.status}
      title={record?.title}
    >
      {record ? (
        <RecordPreviewBody>
          <RecordGroup title={labels.groups.properties}>
            <RecordGroupRow label={labels.fields.status}>
              <SelectProperty
                ariaLabel={labels.fields.status}
                labels={labels.select}
                onValueChange={(status) => {
                  if (status) onRecordChange({ status })
                }}
                options={catalog.status}
                value={record.status}
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.priority}>
              <SelectProperty
                allowEmpty
                ariaLabel={labels.fields.priority}
                labels={labels.select}
                onValueChange={(priority) => onRecordChange({ priority })}
                options={catalog.priority}
                placeholder={labels.noPriority}
                value={record.priority}
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.kind}>
              <SelectProperty
                allowEmpty
                ariaLabel={labels.fields.kind}
                labels={labels.select}
                onValueChange={(kindId) => onRecordChange({ kindId })}
                options={kinds}
                placeholder={labels.noKind}
                value={record.kindId}
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.assignees}>
              <PeopleProperty
                ariaLabel={labels.fields.assignees}
                labels={labels.peoplePicker}
                onValueChange={(assigneeIds) => onRecordChange({ assigneeIds })}
                options={people}
                placeholder={labels.unassigned}
                value={record.assigneeIds}
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.tags}>
              <TagsProperty
                ariaLabel={labels.fields.tags}
                labels={labels.tagPicker}
                onValueChange={(tagIds) => onRecordChange({ tagIds })}
                options={tags}
                placeholder={labels.tagsPlaceholder}
                value={record.tagIds}
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.due}>
              <DateProperty
                ariaLabel={labels.fields.due}
                className={withoutValueIcon}
                isOverdue={record.overdue}
                labels={labels.date}
                locale={locale}
                onValueChange={(dueAt) => onRecordChange({ dueAt })}
                value={record.dueAt}
              />
            </RecordGroupRow>
          </RecordGroup>
          <RecordPreviewRegister
            author={{
              label: labels.fields.creator,
              options: people,
              placeholder: labels.noCreator,
              value: record.creatorId,
            }}
            copyLabel={labels.copyId}
            id={{ label: labels.fields.id, value: record.id }}
            locale={locale}
            timeZone={timeZone}
            title={labels.groups.record}
            updatedAt={{
              label: labels.fields.updated,
              value: record.updatedAt,
            }}
          />
        </RecordPreviewBody>
      ) : null}
    </RecordPreviewFrame>
  )
}
