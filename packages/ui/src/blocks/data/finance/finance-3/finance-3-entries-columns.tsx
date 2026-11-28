import type { DataTableColumnDef } from '@tc96/ui/patterns/data-table/data-table-features'
import { createDataTableSelectColumn } from '@tc96/ui/patterns/data-table/data-table-select-column'
import { DateProperty } from '@tc96/ui/patterns/properties/display/date/date-property'
import { SelectProperty } from '@tc96/ui/patterns/properties/display/select/select-property'
import { DataCollectionTitleCell } from '../../shared/collection/data-collection-record-parts'
import {
  DataDate,
  DataOwner,
  DataSelect,
  dataSelectOptions,
} from '../../shared/properties/data-properties'
import {
  Finance3Amount,
  Finance3AmountField,
  Finance3TextField,
  finance3AmountName,
} from './finance-3-fields'
import type { Finance3Formatter } from './finance-3-format'
import {
  finance3CategoryDirectionOf,
  finance3EntryKinds,
  finance3FeeTypes,
  finance3KindAppearance,
  finance3KindDirection,
  finance3SituationAppearance,
  finance3Situations,
} from './finance-3-options'
import type {
  Finance3Category,
  Finance3Entry,
  Finance3EntryColumnId,
  Finance3Labels,
  Finance3Option,
  Finance3Person,
} from './types'

export interface Finance3EntriesContext {
  accounts: readonly Finance3Option[]
  categories: readonly Finance3Category[]
  format: Finance3Formatter
  labels: Finance3Labels
  locale: string
  members: readonly Finance3Person[]
  onAccountChange?: (entryId: string, accountId: string | null) => void
  onAmountChange?: (entryId: string, amount: number) => void
  onCategoryChange?: (entryId: string, categoryId: string | null) => void
  onDueChange?: (entryId: string, dueOn: string) => void
  onResponsibleChange?: (entryId: string, memberId: string) => void
}

type CellProps = Readonly<{
  context: Finance3EntriesContext
  item: Finance3Entry
}>

function DueField({ context, item }: CellProps) {
  const { format, labels, locale, onDueChange } = context
  const ariaLabel = labels.entries.columns.due
  const value = format.dayValue(item.dueOn)
  const overdue = item.situation === 'overdue'
  if (!onDueChange || !(item.canEditDue ?? item.canEdit)) {
    return (
      <DataDate
        ariaLabel={ariaLabel}
        fallback={labels.noValue}
        locale={locale}
        overdue={overdue}
        timeZone="UTC"
        value={value}
        variant="plain"
      />
    )
  }
  return (
    <DateProperty
      ariaLabel={ariaLabel}
      isOverdue={overdue}
      labels={{ fallback: labels.noValue }}
      locale={locale}
      onValueChange={(next) => {
        if (next) onDueChange(item.id, next.slice(0, 10))
      }}
      timeZone="UTC"
      value={value}
      variant="plain"
    />
  )
}

function AmountField({ context, item }: CellProps) {
  const { format, labels, onAmountChange } = context
  const direction = finance3KindDirection[item.kind]
  const label = finance3AmountName(
    labels.amountName,
    format,
    item.amount,
    direction,
  )
  if (!onAmountChange || !(item.canEditAmount ?? item.canEdit)) {
    return (
      <Finance3Amount
        cents={item.amount}
        direction={direction}
        format={format}
        label={label}
      />
    )
  }
  return (
    <Finance3AmountField
      ariaLabel={labels.entries.columns.amount}
      cents={item.amount}
      direction={direction}
      format={format}
      label={label}
      onCommit={(amount) => {
        if (amount !== item.amount) onAmountChange(item.id, amount)
      }}
    />
  )
}

const labelOf = (options: readonly Finance3Option[], id: string | null) =>
  options.find((option) => option.id === id)?.label ?? null

function AccountField({ context, item }: CellProps) {
  const { accounts, labels, onAccountChange } = context
  const columnLabel = labels.entries.columns.account
  if (item.counterpartAccountId) {
    const from = labelOf(accounts, item.accountId) ?? labels.noValue
    const to = labelOf(accounts, item.counterpartAccountId) ?? labels.noValue
    return (
      <Finance3TextField
        ariaLabel={columnLabel}
        fallback={labels.noValue}
        value={labels.entries.transferAccounts(from, to)}
      />
    )
  }
  return (
    <SelectProperty
      ariaLabel={columnLabel}
      onValueChange={
        onAccountChange && item.canEdit
          ? (accountId) => {
              if (accountId !== item.accountId)
                onAccountChange(item.id, accountId)
            }
          : undefined
      }
      options={accounts.map((account) => ({
        label: account.label,
        value: account.id,
      }))}
      value={item.accountId}
      variant="plain"
      allowEmpty
      labels={{
        emptyOption: labels.entries.noAccount,
        fallback: labels.noValue,
      }}
    />
  )
}

function CategoryField({ context, item }: CellProps) {
  const { categories, labels, onCategoryChange } = context
  const direction =
    finance3CategoryDirectionOf[finance3KindDirection[item.kind]]
  const offered = categories.filter(
    (category) =>
      category.id === item.categoryId ||
      !category.direction ||
      category.direction === direction,
  )
  return (
    <SelectProperty
      ariaLabel={labels.entries.columns.category}
      onValueChange={
        onCategoryChange && item.canEdit && direction
          ? (categoryId) => {
              if (categoryId !== item.categoryId)
                onCategoryChange(item.id, categoryId)
            }
          : undefined
      }
      options={offered.map((category) => ({
        label: category.label,
        value: category.id,
      }))}
      value={item.categoryId}
      variant="plain"
      allowEmpty
      labels={{
        emptyOption: labels.entries.noCategory,
        fallback: labels.noValue,
      }}
    />
  )
}

function ResponsibleField({ context, item }: CellProps) {
  const { labels, members, onResponsibleChange } = context
  return (
    <DataOwner
      ariaLabel={labels.entries.columns.responsible}
      onChange={
        onResponsibleChange && item.canEdit
          ? (memberId) => {
              if (memberId !== item.responsibleId)
                onResponsibleChange(item.id, memberId)
            }
          : undefined
      }
      owners={members}
      placeholder={labels.entries.unassigned}
      value={item.responsibleId}
      variant="plain"
    />
  )
}

export function createFinance3EntriesColumns(
  context: Finance3EntriesContext,
  selectable: boolean,
): DataTableColumnDef<Finance3Entry>[] {
  const { labels } = context
  const entryLabels = labels.entries
  const column = (id: Finance3EntryColumnId) => ({
    header: entryLabels.columns[id],
    id,
    meta: { label: entryLabels.columns[id] },
  })
  const kindOptions = dataSelectOptions(
    finance3EntryKinds,
    entryLabels.kinds,
    finance3KindAppearance,
  )
  const situationOptions = dataSelectOptions(
    finance3Situations,
    entryLabels.situations,
    finance3SituationAppearance,
  )
  const feeTypeOptions = finance3FeeTypes.map((feeType) => ({
    label: entryLabels.feeTypes[feeType],
    value: feeType,
  }))

  return [
    ...(selectable
      ? [
          createDataTableSelectColumn<Finance3Entry>({
            getRowLabel: (item) => entryLabels.selectRecord(item.description),
            selectAllLabel: entryLabels.selectAll,
          }),
        ]
      : []),
    {
      ...column('description'),
      accessorFn: (item) => item.description,
      cell: ({ row }) => (
        <DataCollectionTitleCell title={row.original.description} />
      ),
      enableHiding: false,
      size: 300,
    },
    {
      ...column('kind'),
      accessorFn: (item) => item.kind,
      cell: ({ row }) => (
        <DataSelect
          ariaLabel={entryLabels.columns.kind}
          options={kindOptions}
          value={row.original.kind}
        />
      ),
      size: 190,
    },
    {
      ...column('feeType'),
      accessorFn: (item) => item.feeType,
      cell: ({ row }) => (
        <SelectProperty
          ariaLabel={entryLabels.columns.feeType}
          options={feeTypeOptions}
          readOnly
          value={row.original.feeType}
          labels={{ fallback: labels.noValue }}
        />
      ),
      size: 170,
    },
    {
      ...column('payer'),
      accessorFn: (item) => item.payer,
      cell: ({ row }) => (
        <Finance3TextField
          ariaLabel={entryLabels.columns.payer}
          fallback={labels.noValue}
          value={row.original.payer}
        />
      ),
      size: 200,
    },
    {
      ...column('target'),
      accessorFn: (item) => item.target,
      cell: ({ row }) => (
        <Finance3TextField
          ariaLabel={entryLabels.columns.target}
          fallback={labels.noValue}
          value={row.original.target}
        />
      ),
      size: 220,
    },
    {
      ...column('responsible'),
      accessorFn: (item) => item.responsibleId,
      cell: ({ row }) => (
        <ResponsibleField context={context} item={row.original} />
      ),
      size: 190,
    },
    {
      ...column('account'),
      accessorFn: (item) => item.accountId,
      cell: ({ row }) => <AccountField context={context} item={row.original} />,
      size: 190,
    },
    {
      ...column('category'),
      accessorFn: (item) => item.categoryId,
      cell: ({ row }) => (
        <CategoryField context={context} item={row.original} />
      ),
      size: 180,
    },
    {
      ...column('due'),
      accessorFn: (item) => item.dueOn,
      cell: ({ row }) => <DueField context={context} item={row.original} />,
      size: 140,
    },
    {
      ...column('amount'),
      accessorFn: (item) => item.amount,
      cell: ({ row }) => <AmountField context={context} item={row.original} />,
      meta: { align: 'end', label: entryLabels.columns.amount },
      size: 150,
    },
    {
      ...column('situation'),
      accessorFn: (item) => item.situation,
      cell: ({ row }) => (
        <DataSelect
          ariaLabel={entryLabels.columns.situation}
          options={situationOptions}
          value={row.original.situation}
        />
      ),
      size: 160,
    },
  ]
}
