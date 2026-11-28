import type { PropertyOption } from '@tc96/ui/patterns/properties/core'
import type { PersonPropertyOption } from '@tc96/ui/patterns/properties/display/person/person-option-content'
import type {
  RecordPreviewStatus,
  RecordPreviewStatusLabels,
} from '@tc96/ui/patterns/records/preview/core'

export type RecordPreview8Person = PersonPropertyOption

export type RecordPreview8DeadlineStatus =
  | 'cancelled'
  | 'done'
  | 'drafting'
  | 'filed'
  | 'missed'
  | 'no_action'
  | 'open'
  | 'proposed'

export interface RecordPreview8Record {
  clientNames: readonly string[]
  daysLeft: string | null
  deadlineStatus: RecordPreview8DeadlineStatus
  fatalDate: string
  id: string
  internalDate: string | null
  kind: string
  label: string
  lawsuitTitle: string | null
  responsibleId: string | null
}

export type RecordPreview8Field =
  | 'client'
  | 'daysLeft'
  | 'fatalDate'
  | 'internalDate'
  | 'kind'
  | 'label'
  | 'lawsuit'
  | 'responsible'
  | 'status'

export type RecordPreview8Group = 'properties'

export interface RecordPreview8Labels {
  close: string
  confirm: string
  decisions: string
  expand: string
  fallbackTitle: string
  fields: Record<RecordPreview8Field, string>
  groups: Record<RecordPreview8Group, string>
  noClient: string
  noDate: string
  noDaysLeft: string
  noKind: string
  noLawsuit: string
  noResponsible: string
  reject: string
  status: RecordPreviewStatusLabels
  statuses: Record<RecordPreview8DeadlineStatus, string>
}

export type RecordPreview8LabelsOverride = Partial<
  Omit<RecordPreview8Labels, 'fields' | 'groups' | 'status' | 'statuses'>
> & {
  fields?: Partial<RecordPreview8Labels['fields']>
  groups?: Partial<RecordPreview8Labels['groups']>
  status?: Partial<RecordPreview8Labels['status']>
  statuses?: Partial<RecordPreview8Labels['statuses']>
}

export interface RecordPreview8Props {
  className?: string
  finalFocus?: () => HTMLElement | null
  kinds: readonly PropertyOption[]
  labels?: RecordPreview8LabelsOverride
  locale?: string
  onConfirm?: () => void
  onExpand?: () => void
  onOpenChange: (open: boolean) => void
  onReject?: () => void
  onRetry?: () => void
  open: boolean
  people: readonly RecordPreview8Person[]
  record: RecordPreview8Record | null
  status?: RecordPreviewStatus
  timeZone?: string
}
