import type {
  PropertyOption,
  SelectPropertyLabels,
  TagsPropertyLabels,
  TextPropertyLabels,
} from '@tc96/ui/patterns/properties/core'
import type { PersonPropertyOption } from '@tc96/ui/patterns/properties/display/person/person-option-content'
import type {
  RecordPreviewStatus,
  RecordPreviewStatusLabels,
} from '@tc96/ui/patterns/records/preview/core'

export type RecordPreview7Person = PersonPropertyOption

export interface RecordPreview7Record {
  contractId: string | null
  createdAt: string
  description?: string | null
  id: string
  phaseId: string | null
  responsibleId: string | null
  tagIds: readonly string[]
  title: string
  updatedAt: string
}

export type RecordPreview7Changes = Partial<
  Pick<
    RecordPreview7Record,
    'contractId' | 'phaseId' | 'responsibleId' | 'tagIds'
  >
>

export type RecordPreview7Field =
  | 'contract'
  | 'createdAt'
  | 'id'
  | 'number'
  | 'phase'
  | 'responsible'
  | 'tags'
  | 'updatedAt'

export type RecordPreview7Group = 'properties' | 'record'

export interface RecordPreview7Labels {
  close: string
  copyId: string
  expand: string
  fallbackTitle: string
  fields: Record<RecordPreview7Field, string>
  groups: Record<RecordPreview7Group, string>
  noContract: string
  noNumber: string
  noPhase: string
  noResponsible: string
  select: Partial<SelectPropertyLabels>
  status: RecordPreviewStatusLabels
  tagPicker: Partial<TagsPropertyLabels>
  tagsPlaceholder: string
  text: Partial<TextPropertyLabels>
}

export type RecordPreview7LabelsOverride = Partial<
  Omit<RecordPreview7Labels, 'fields' | 'groups' | 'status'>
> & {
  fields?: Partial<RecordPreview7Labels['fields']>
  groups?: Partial<RecordPreview7Labels['groups']>
  status?: Partial<RecordPreview7Labels['status']>
}

export interface RecordPreview7Props {
  className?: string
  contracts: readonly PropertyOption[]
  finalFocus?: () => HTMLElement | null
  labels?: RecordPreview7LabelsOverride
  locale?: string
  onExpand?: () => void
  onOpenChange: (open: boolean) => void
  onRecordChange: (changes: RecordPreview7Changes) => void
  onRetry?: () => void
  open: boolean
  people: readonly RecordPreview7Person[]
  phases: readonly PropertyOption[]
  readOnly?: boolean
  readOnlyFields?: readonly RecordPreview7Field[]
  record: RecordPreview7Record | null
  status?: RecordPreviewStatus
  tags: readonly PropertyOption[]
  timeZone?: string
}
