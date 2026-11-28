'use client'

import { createAmountFormatter } from '@tc96/ui/helpers/format'
import { PersonProperty } from '@tc96/ui/patterns/properties/display/person/person-property'
import { SelectProperty } from '@tc96/ui/patterns/properties/display/select/select-property'
import { TagsProperty } from '@tc96/ui/patterns/properties/display/tags/tags-property'
import { TextProperty } from '@tc96/ui/patterns/properties/display/text/text-property'
import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import { RecordPreviewBody } from '@tc96/ui/patterns/records/preview/composition/record-preview-body/record-preview-body'
import { RecordPreviewFrame } from '@tc96/ui/patterns/records/preview/composition/record-preview-frame/record-preview-frame'
import { RecordPreviewRegister } from '@tc96/ui/patterns/records/preview/composition/record-preview-register/record-preview-register'
import { useMemo } from 'react'
import { createFieldLock } from '../shared/locked-fields'
import { ReadOnlyTextRow } from '../shared/read-only-text-row'
import { defaultRecordPreview4Catalog } from './catalog'
import { resolveRecordPreview4Labels } from './labels'
import type { RecordPreview4Field, RecordPreview4Props } from './types'

function partiesLabel(names: readonly string[]) {
  const [first] = names
  if (!first) return null
  return names.length > 1 ? `${first} +${names.length - 1}` : first
}

export function RecordPreview4({
  catalog = defaultRecordPreview4Catalog,
  className,
  contracts,
  courts,
  currency = 'BRL',
  finalFocus,
  labels: labelsProp,
  locale = 'en-US',
  onExpand,
  onOpenChange,
  onRecordChange,
  onRetry,
  open,
  people,
  readOnly = false,
  readOnlyFields,
  record,
  status = 'ready',
  tags,
  timeZone,
}: Readonly<RecordPreview4Props>) {
  const labels = useMemo(
    () => resolveRecordPreview4Labels(labelsProp),
    [labelsProp],
  )
  const locked = createFieldLock<RecordPreview4Field>(readOnly, readOnlyFields)
  const amount = useMemo(
    () => createAmountFormatter({ currency, locale }),
    [currency, locale],
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
            <ReadOnlyTextRow
              fallback={labels.notInformed}
              label={labels.fields.plaintiff}
              value={partiesLabel(record.plaintiffs)}
            />
            <ReadOnlyTextRow
              fallback={labels.notInformed}
              label={labels.fields.defendant}
              value={partiesLabel(record.defendants)}
            />
            <RecordGroupRow label={labels.fields.caseNumber}>
              <TextProperty
                ariaLabel={labels.fields.caseNumber}
                copyable
                labels={{
                  ...labels.text,
                  copy: labels.copyNumber,
                  fallback: labels.noNumber,
                  inputPlaceholder: labels.caseNumberPlaceholder,
                }}
                onCommit={
                  locked('caseNumber')
                    ? undefined
                    : (caseNumber) => onRecordChange({ caseNumber })
                }
                value={record.caseNumber}
                variant="plain"
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.phase}>
              <SelectProperty
                ariaLabel={labels.fields.phase}
                readOnly={locked('phase')}
                labels={labels.select}
                onValueChange={(phaseId) => onRecordChange({ phaseId })}
                options={catalog.phase}
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
                onValueChange={(responsibleId) =>
                  onRecordChange({ responsibleId })
                }
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
          <RecordGroup title={labels.groups.lawsuit}>
            <RecordGroupRow label={labels.fields.justice}>
              <SelectProperty
                allowEmpty
                ariaLabel={labels.fields.justice}
                readOnly={locked('justice')}
                labels={labels.select}
                onValueChange={(justice) => onRecordChange({ justice })}
                options={catalog.justice}
                placeholder={labels.noJustice}
                value={record.justice}
                variant="plain"
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.smallClaims}>
              <SelectProperty
                ariaLabel={labels.fields.smallClaims}
                readOnly={locked('smallClaims')}
                labels={labels.select}
                onValueChange={(value) =>
                  onRecordChange({ smallClaims: value === 'yes' })
                }
                options={catalog.smallClaims}
                value={record.smallClaims ? 'yes' : 'no'}
                variant="plain"
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.court}>
              <SelectProperty
                allowEmpty
                ariaLabel={labels.fields.court}
                readOnly={locked('court')}
                labels={labels.select}
                onValueChange={(courtSlug) => onRecordChange({ courtSlug })}
                options={courts}
                placeholder={labels.noCourt}
                value={record.courtSlug}
                variant="plain"
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.division}>
              <TextProperty
                ariaLabel={labels.fields.division}
                labels={{ ...labels.text, fallback: labels.noDivision }}
                onCommit={
                  locked('division')
                    ? undefined
                    : (courtDivision) => onRecordChange({ courtDivision })
                }
                value={record.courtDivision}
                variant="plain"
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.venue}>
              <TextProperty
                ariaLabel={labels.fields.venue}
                labels={{ ...labels.text, fallback: labels.noVenue }}
                onCommit={
                  locked('venue')
                    ? undefined
                    : (courtVenue) => onRecordChange({ courtVenue })
                }
                value={record.courtVenue}
                variant="plain"
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.actionClass}>
              <TextProperty
                ariaLabel={labels.fields.actionClass}
                labels={{ ...labels.text, fallback: labels.noAction }}
                onCommit={
                  locked('actionClass')
                    ? undefined
                    : (actionClass) => onRecordChange({ actionClass })
                }
                value={record.actionClass}
                variant="plain"
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.subject}>
              <TextProperty
                ariaLabel={labels.fields.subject}
                labels={{ ...labels.text, fallback: labels.noSubject }}
                onCommit={
                  locked('subject')
                    ? undefined
                    : (subject) => onRecordChange({ subject })
                }
                value={record.subject}
                variant="plain"
              />
            </RecordGroupRow>
            <RecordGroupRow label={labels.fields.instance}>
              <SelectProperty
                allowEmpty
                ariaLabel={labels.fields.instance}
                readOnly={locked('instance')}
                labels={labels.select}
                onValueChange={(instance) => onRecordChange({ instance })}
                options={catalog.instance}
                placeholder={labels.noInstance}
                value={record.instance}
                variant="plain"
              />
            </RecordGroupRow>
            <ReadOnlyTextRow
              fallback={labels.noAmount}
              label={labels.fields.claimAmount}
              value={
                record.claimAmountCents === null
                  ? null
                  : amount.format(record.claimAmountCents / 100)
              }
            />
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
