'use client'

import { DateProperty } from '@tc96/ui/patterns/properties/display/date/date-property'
import { PersonProperty } from '@tc96/ui/patterns/properties/display/person/person-property'
import { ScheduleProperty } from '@tc96/ui/patterns/properties/display/schedule/schedule-property'
import { SelectProperty } from '@tc96/ui/patterns/properties/display/select/select-property'
import { TagsProperty } from '@tc96/ui/patterns/properties/display/tags/tags-property'
import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import { RecordPreviewBody } from '@tc96/ui/patterns/records/preview/composition/record-preview-body/record-preview-body'
import { RecordPreviewFrame } from '@tc96/ui/patterns/records/preview/composition/record-preview-frame/record-preview-frame'
import { RecordPreviewRegister } from '@tc96/ui/patterns/records/preview/composition/record-preview-register/record-preview-register'
import { useMemo } from 'react'
import { withoutValueIcon } from '../shared/without-value-icon'
import { defaultRecordPreview1Catalog } from './catalog'
import { resolveRecordPreview1Labels } from './labels'
import type { RecordPreview1Props } from './types'

export function RecordPreview1({
  catalog = defaultRecordPreview1Catalog,
  className,
  finalFocus,
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
  timeZone,
  today,
  visibilities,
}: Readonly<RecordPreview1Props>) {
  const labels = useMemo(
    () => resolveRecordPreview1Labels(labelsProp),
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
                onValueChange={(status) => onRecordChange({ status })}
                options={catalog.status}
                value={record.status}
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.priority}>
              <SelectProperty
                ariaLabel={labels.fields.priority}
                labels={labels.select}
                onValueChange={(priority) => onRecordChange({ priority })}
                options={catalog.priority}
                value={record.priority}
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.type}>
              <SelectProperty
                ariaLabel={labels.fields.type}
                labels={labels.select}
                onValueChange={(type) => onRecordChange({ type })}
                options={catalog.type}
                value={record.type}
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.tags}>
              <TagsProperty
                ariaLabel={labels.fields.tags}
                labels={labels.tagPicker}
                onValueChange={(tags) => onRecordChange({ tags })}
                options={catalog.tags}
                placeholder={labels.tagsPlaceholder}
                value={record.tags}
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.assignee}>
              <PersonProperty
                ariaLabel={labels.fields.assignee}
                onValueChange={(assignee) => onRecordChange({ assignee })}
                options={people}
                placeholder={labels.noAssignee}
                value={record.assignee}
              />
            </RecordGroupRow>
            {visibilities ? (
              <RecordGroupRow label={labels.fields.visibility}>
                <SelectProperty
                  ariaLabel={labels.fields.visibility}
                  labels={labels.select}
                  onValueChange={(visibility) => onRecordChange({ visibility })}
                  options={visibilities}
                  placeholder={labels.visibilityPlaceholder}
                  value={record.visibility ?? null}
                />
              </RecordGroupRow>
            ) : null}
          </RecordGroup>
          <RecordGroup title={labels.groups.schedule}>
            <RecordGroupRow label={labels.fields.schedule}>
              <ScheduleProperty
                ariaLabel={labels.fields.schedule}
                className={withoutValueIcon}
                labels={labels.schedule}
                locale={locale}
                onValueChange={(schedule) => onRecordChange({ schedule })}
                today={today}
                value={record.schedule}
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.due}>
              <DateProperty
                allowClear={false}
                ariaLabel={labels.fields.due}
                className={withoutValueIcon}
                isOverdue={record.overdue}
                labels={labels.date}
                locale={locale}
                onValueChange={(due) => onRecordChange({ due })}
                value={record.due}
              />
            </RecordGroupRow>
          </RecordGroup>
          <RecordPreviewRegister
            author={{
              label: labels.fields.createdBy,
              options: people,
              placeholder: labels.noCreator,
              value: record.createdBy,
            }}
            copyLabel={labels.copyId}
            createdAt={{
              label: labels.fields.createdAt,
              value: record.createdAt,
            }}
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
      ) : null}
    </RecordPreviewFrame>
  )
}
