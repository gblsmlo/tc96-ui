import type {
  DatePropertyLabels,
  PropertyOption,
  SelectPropertyLabels,
} from '@tc96/ui/patterns/properties/core'
import type { PersonPropertyOption } from '@tc96/ui/patterns/properties/display/person/person-option-content'
import type {
  RecordPreviewStatus,
  RecordPreviewStatusLabels,
} from '@tc96/ui/patterns/records/preview/core'

export type RecordPreview6Person = PersonPropertyOption

export type RecordPreview6Kind =
  | 'client_money_in'
  | 'client_money_out'
  | 'expense'
  | 'expense_reimbursement'
  | 'fee'
  | 'other_income'
  | 'transfer'

export type RecordPreview6Situation =
  | 'canceled'
  | 'open'
  | 'overdue'
  | 'renegotiated'
  | 'settled'

export type RecordPreview6CategoryDirection = 'expense' | 'income'

export interface RecordPreview6Category extends PropertyOption {
  direction?: RecordPreview6CategoryDirection
}

export interface RecordPreview6Record {
  accountId: string | null
  amountCents: number
  canEdit?: boolean
  canSettle?: boolean
  categoryId: string | null
  contractTitle?: string | null
  costCenterId: string | null
  counterpartAccountId?: string | null
  dueOn: string
  dueOnly?: boolean
  id: string
  installmentCount?: number | null
  installmentNumber?: number | null
  kind: RecordPreview6Kind
  payer: string | null
  responsibleId: string | null
  situation: RecordPreview6Situation
  target: string | null
  title: string
}

export type RecordPreview6Changes = Partial<
  Pick<
    RecordPreview6Record,
    'categoryId' | 'costCenterId' | 'dueOn' | 'responsibleId'
  >
>

export type RecordPreview6Field =
  | 'account'
  | 'amount'
  | 'category'
  | 'contract'
  | 'costCenter'
  | 'due'
  | 'installment'
  | 'payer'
  | 'responsible'
  | 'situation'
  | 'target'
  | 'type'

export type RecordPreview6Group = 'classification' | 'origin' | 'summary'

export interface RecordPreview6Labels {
  close: string
  date: Partial<DatePropertyLabels>
  expand: string
  fallbackTitle: string
  fields: Record<RecordPreview6Field, string>
  groups: Record<RecordPreview6Group, string>
  installmentOf: (number: number, count: number) => string
  kinds: Record<RecordPreview6Kind, string>
  more: string
  noAccount: string
  noCategory: string
  noCostCenter: string
  noPayer: string
  noResponsible: string
  noTarget: string
  select: Partial<SelectPropertyLabels>
  settle: string
  situations: Record<RecordPreview6Situation, string>
  status: RecordPreviewStatusLabels
  transferAccounts: (from: string, to: string) => string
}

export type RecordPreview6LabelsOverride = Partial<
  Omit<
    RecordPreview6Labels,
    'fields' | 'groups' | 'kinds' | 'situations' | 'status'
  >
> & {
  fields?: Partial<RecordPreview6Labels['fields']>
  groups?: Partial<RecordPreview6Labels['groups']>
  kinds?: Partial<RecordPreview6Labels['kinds']>
  situations?: Partial<RecordPreview6Labels['situations']>
  status?: Partial<RecordPreview6Labels['status']>
}

export interface RecordPreview6Props {
  accounts: readonly PropertyOption[]
  categories: readonly RecordPreview6Category[]
  className?: string
  costCenters: readonly PropertyOption[]
  currency?: string
  finalFocus?: () => HTMLElement | null
  labels?: RecordPreview6LabelsOverride
  locale?: string
  members: readonly RecordPreview6Person[]
  onExpand?: () => void
  onOpenChange: (open: boolean) => void
  onRecordChange: (changes: RecordPreview6Changes) => void
  onRetry?: () => void
  onSettle?: () => void
  open: boolean
  record: RecordPreview6Record | null
  status?: RecordPreviewStatus
}
