'use client'

import { formatMediumDate, parseIsoDate } from '@tc96/ui/helpers/date'
import { createAmountFormatter } from '@tc96/ui/helpers/format'
import { DateProperty } from '@tc96/ui/patterns/properties/display/date/date-property'
import { PersonProperty } from '@tc96/ui/patterns/properties/display/person/person-property'
import { SelectProperty } from '@tc96/ui/patterns/properties/display/select/select-property'
import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import { RecordGroupRow } from '@tc96/ui/patterns/records/group/composition/record-group-row/record-group-row'
import { RecordPreviewBody } from '@tc96/ui/patterns/records/preview/composition/record-preview-body/record-preview-body'
import { RecordPreviewFrame } from '@tc96/ui/patterns/records/preview/composition/record-preview-frame/record-preview-frame'
import { useMemo } from 'react'
import { ReadOnlyTextRow } from '../shared/read-only-text-row'
import { withoutValueIcon } from '../shared/without-value-icon'
import { resolveRecordPreview6Labels } from './labels'
import type {
  RecordPreview6CategoryDirection,
  RecordPreview6Kind,
  RecordPreview6Props,
} from './types'

const unclassifiedKinds: readonly RecordPreview6Kind[] = [
  'client_money_in',
  'client_money_out',
  'expense_reimbursement',
  'transfer',
]

function categoryDirectionOf(
  kind: RecordPreview6Kind,
): RecordPreview6CategoryDirection {
  return kind === 'expense' ? 'expense' : 'income'
}

const amountDirection = {
  client_money_in: 'in',
  client_money_out: 'out',
  expense: 'out',
  expense_reimbursement: 'in',
  fee: 'in',
  other_income: 'in',
  transfer: 'none',
} as const satisfies Record<RecordPreview6Kind, 'in' | 'none' | 'out'>

export function RecordPreview6({
  accounts,
  categories,
  className,
  costCenters,
  currency = 'BRL',
  finalFocus,
  labels: labelsProp,
  locale = 'en-US',
  members,
  onExpand,
  onOpenChange,
  onRecordChange,
  onRetry,
  onSettle,
  open,
  record,
  status = 'ready',
}: Readonly<RecordPreview6Props>) {
  const labels = useMemo(
    () => resolveRecordPreview6Labels(labelsProp),
    [labelsProp],
  )
  const amount = useMemo(
    () => createAmountFormatter({ currency, locale }),
    [currency, locale],
  )
  const kind = record?.kind
  const categoryId = record?.categoryId
  const categoryOptions = useMemo(() => {
    if (!kind) return []
    const direction = categoryDirectionOf(kind)
    return categories.filter(
      (category) =>
        !category.direction ||
        category.direction === direction ||
        category.value === categoryId,
    )
  }, [categories, categoryId, kind])

  const accountLabel = (id: string | null | undefined) =>
    accounts.find((account) => account.value === id)?.label ?? null
  const dueAt = record ? `${record.dueOn}T12:00:00.000Z` : null
  const dueDate = parseIsoDate(dueAt)
  const editable = record?.canEdit !== false
  const propertiesEditable = editable && !record?.dueOnly
  const classified = record ? !unclassifiedKinds.includes(record.kind) : false
  const settleable = Boolean(onSettle && record?.canSettle)

  return (
    <RecordPreviewFrame
      className={className}
      closeLabel={labels.close}
      expand={onExpand && { label: labels.expand, onClick: onExpand }}
      fallbackTitle={labels.fallbackTitle}
      finalFocus={finalFocus}
      hasRecord={Boolean(record)}
      more={
        settleable
          ? {
              actions: [{ id: 'settle', label: labels.settle }],
              label: labels.more,
              onAction: () => onSettle?.(),
            }
          : undefined
      }
      onOpenChange={onOpenChange}
      onRetry={onRetry}
      open={open}
      status={status}
      statusLabels={labels.status}
      title={record?.title}
    >
      {record ? (
        <RecordPreviewBody>
          <RecordGroup title={labels.groups.summary}>
            <ReadOnlyTextRow
              label={labels.fields.situation}
              value={labels.situations[record.situation]}
            />
            <ReadOnlyTextRow
              label={labels.fields.type}
              value={labels.kinds[record.kind]}
            />
            <ReadOnlyTextRow
              className={
                amountDirection[record.kind] === 'in'
                  ? 'text-success-foreground'
                  : undefined
              }
              label={labels.fields.amount}
              value={amount.format(
                amountDirection[record.kind] === 'out'
                  ? -Math.abs(record.amountCents) / 100
                  : Math.abs(record.amountCents) / 100,
              )}
            />
            <RecordGroupRow label={labels.fields.due}>
              <DateProperty
                allowClear={false}
                ariaLabel={labels.fields.due}
                className={withoutValueIcon}
                displayLabel={
                  dueDate ? formatMediumDate(dueDate, locale, 'UTC') : undefined
                }
                labels={labels.date}
                locale={locale}
                onValueChange={
                  editable
                    ? (value) => {
                        const dueOn = value?.slice(0, 10)
                        if (dueOn && dueOn !== record.dueOn)
                          onRecordChange({ dueOn })
                      }
                    : undefined
                }
                readOnly={!editable}
                timeZone="UTC"
                value={dueAt}
                variant="plain"
              />
            </RecordGroupRow>
          </RecordGroup>
          <RecordGroup title={labels.groups.origin}>
            <ReadOnlyTextRow
              fallback={labels.noPayer}
              label={labels.fields.payer}
              value={record.payer}
            />
            {record.contractTitle ? (
              <ReadOnlyTextRow
                label={labels.fields.contract}
                value={record.contractTitle}
              />
            ) : null}
            {record.installmentCount && record.installmentNumber ? (
              <ReadOnlyTextRow
                label={labels.fields.installment}
                value={labels.installmentOf(
                  record.installmentNumber,
                  record.installmentCount,
                )}
              />
            ) : null}
            <ReadOnlyTextRow
              fallback={labels.noTarget}
              label={labels.fields.target}
              value={record.target}
            />
          </RecordGroup>
          <RecordGroup title={labels.groups.classification}>
            <ReadOnlyTextRow
              fallback={labels.noAccount}
              label={labels.fields.account}
              value={
                record.counterpartAccountId
                  ? labels.transferAccounts(
                      accountLabel(record.accountId) ?? labels.noAccount,
                      accountLabel(record.counterpartAccountId) ??
                        labels.noAccount,
                    )
                  : accountLabel(record.accountId)
              }
            />
            {classified ? (
              <>
                <RecordGroupRow label={labels.fields.category}>
                  <SelectProperty
                    allowEmpty
                    ariaLabel={labels.fields.category}
                    labels={labels.select}
                    onValueChange={(next) =>
                      onRecordChange({ categoryId: next })
                    }
                    options={categoryOptions}
                    placeholder={labels.noCategory}
                    readOnly={!propertiesEditable}
                    value={record.categoryId}
                    variant="plain"
                  />
                </RecordGroupRow>
                <RecordGroupRow label={labels.fields.costCenter}>
                  <SelectProperty
                    allowEmpty
                    ariaLabel={labels.fields.costCenter}
                    labels={labels.select}
                    onValueChange={(next) =>
                      onRecordChange({ costCenterId: next })
                    }
                    options={costCenters}
                    placeholder={labels.noCostCenter}
                    readOnly={!propertiesEditable}
                    value={record.costCenterId}
                    variant="plain"
                  />
                </RecordGroupRow>
              </>
            ) : null}
            <RecordGroupRow label={labels.fields.responsible}>
              <PersonProperty
                ariaLabel={labels.fields.responsible}
                onValueChange={(responsibleId) =>
                  onRecordChange({ responsibleId })
                }
                options={members}
                placeholder={labels.noResponsible}
                readOnly={!propertiesEditable}
                value={record.responsibleId}
                variant="plain"
              />
            </RecordGroupRow>
          </RecordGroup>
        </RecordPreviewBody>
      ) : null}
    </RecordPreviewFrame>
  )
}
