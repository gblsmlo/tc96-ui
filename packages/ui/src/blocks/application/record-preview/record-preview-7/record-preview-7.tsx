'use client'

import { PersonProperty } from '@tc96/ui/patterns/properties/display/person/person-property'
import { SelectProperty } from '@tc96/ui/patterns/properties/display/select/select-property'
import { TagsProperty } from '@tc96/ui/patterns/properties/display/tags/tags-property'
import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import { RecordPreviewBody } from '@tc96/ui/patterns/records/preview/composition/record-preview-body/record-preview-body'
import { RecordPreviewFrame } from '@tc96/ui/patterns/records/preview/composition/record-preview-frame/record-preview-frame'
import { RecordPreviewRegister } from '@tc96/ui/patterns/records/preview/composition/record-preview-register/record-preview-register'
import { useMemo } from 'react'
import { createFieldLock } from '../shared/locked-fields'
import { ReadOnlyTextRow } from '../shared/read-only-text-row'
import { resolveRecordPreview7Labels } from './labels'
import type { RecordPreview7Field, RecordPreview7Props } from './types'

export function RecordPreview7({
  className,
  contracts,
  finalFocus,
  labels: labelsProp,
  locale = 'en-US',
  onExpand,
  onOpenChange,
  onRecordChange,
  onRetry,
  open,
  people,
  phases,
  readOnly = false,
  readOnlyFields,
  record,
  status = 'ready',
  tags,
  timeZone,
}: Readonly<RecordPreview7Props>) {
  const labels = useMemo(
    () => resolveRecordPreview7Labels(labelsProp),
    [labelsProp],
  )
  const locked = createFieldLock<RecordPreview7Field>(readOnly, readOnlyFields)

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
            <ReadOnlyTextRow
              fallback={labels.noNumber}
              label={labels.fields.number}
              value={null}
            />
            <RecordGroupRow label={labels.fields.phase}>
              <SelectProperty
                ariaLabel={labels.fields.phase}
                readOnly={locked('phase')}
                labels={labels.select}
                onValueChange={(phaseId) => onRecordChange({ phaseId })}
                options={phases}
                placeholder={labels.noPhase}
                value={record.phaseId}
                variant="plain"
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.contract}>
              <SelectProperty
                allowEmpty
                ariaLabel={labels.fields.contract}
                readOnly={locked('contract')}
                labels={labels.select}
                onValueChange={(contractId) => onRecordChange({ contractId })}
                options={contracts}
                placeholder={labels.noContract}
                value={record.contractId}
                variant="plain"
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.responsible}>
              <PersonProperty
                ariaLabel={labels.fields.responsible}
                readOnly={locked('responsible')}
                onValueChange={(responsibleId) => {
                  if (responsibleId) onRecordChange({ responsibleId })
                }}
                options={people}
                placeholder={labels.noResponsible}
                value={record.responsibleId}
                variant="plain"
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.tags}>
              <TagsProperty
                ariaLabel={labels.fields.tags}
                readOnly={locked('tags')}
                labels={labels.tagPicker}
                onValueChange={(tagIds) => onRecordChange({ tagIds })}
                options={tags}
                placeholder={labels.tagsPlaceholder}
                value={record.tagIds}
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
      ) : null}
    </RecordPreviewFrame>
  )
}
