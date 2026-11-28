import type {
  DatePropertyLabels,
  PropertyOption,
  SchedulePropertyLabels,
  ScheduleValue,
  SelectPropertyLabels,
  TagsPropertyLabels,
} from '@tc96/ui/patterns/properties/core'
import type { PersonPropertyOption } from '@tc96/ui/patterns/properties/display/person/person-option-content'
import type {
  RecordPreviewStatus,
  RecordPreviewStatusLabels,
} from '@tc96/ui/patterns/records/preview/core'

export type RecordPreview1Person = PersonPropertyOption

export type RecordPreview1CatalogKey = 'priority' | 'status' | 'tags' | 'type'

export type RecordPreview1Catalog = Readonly<
  Record<RecordPreview1CatalogKey, readonly PropertyOption[]>
>

export interface RecordPreview1CatalogLabels {
  priority: Record<'high' | 'low' | 'medium' | 'urgent', string>
  status: Record<
    'backlog' | 'done' | 'in-progress' | 'in-review' | 'todo',
    string
  >
  tags: Record<'civil' | 'deadline' | 'labor' | 'urgent', string>
  type: Record<'filing' | 'hearing' | 'petition' | 'review', string>
}

export interface RecordPreview1Record {
  assignee: string | null
  createdAt: string
  createdBy: string | null
  description?: string | null
  due: string | null
  id: string
  overdue?: boolean
  priority: string | null
  schedule: ScheduleValue
  status: string | null
  tags: readonly string[]
  title: string
  type: string | null
  updatedAt: string
  visibility?: string | null
}

export type RecordPreview1Changes = Partial<
  Pick<
    RecordPreview1Record,
    | 'assignee'
    | 'due'
    | 'priority'
    | 'schedule'
    | 'status'
    | 'tags'
    | 'type'
    | 'visibility'
  >
>

export type RecordPreview1Field =
  | 'assignee'
  | 'createdAt'
  | 'createdBy'
  | 'due'
  | 'id'
  | 'priority'
  | 'schedule'
  | 'status'
  | 'tags'
  | 'type'
  | 'updatedAt'
  | 'visibility'

export type RecordPreview1Group = 'properties' | 'record' | 'schedule'

export interface RecordPreview1Labels {
  close: string
  copyId: string
  date: Partial<DatePropertyLabels>
  expand: string
  fallbackTitle: string
  fields: Record<RecordPreview1Field, string>
  groups: Record<RecordPreview1Group, string>
  noAssignee: string
  noCreator: string
  schedule: Partial<SchedulePropertyLabels>
  select: Partial<SelectPropertyLabels>
  status: RecordPreviewStatusLabels
  tagPicker: Partial<TagsPropertyLabels>
  tagsPlaceholder: string
  visibilityPlaceholder: string
}

export type RecordPreview1LabelsOverride = Partial<
  Omit<RecordPreview1Labels, 'fields' | 'groups' | 'status'>
> & {
  fields?: Partial<RecordPreview1Labels['fields']>
  groups?: Partial<RecordPreview1Labels['groups']>
  status?: Partial<RecordPreview1Labels['status']>
}

export interface RecordPreview1Props {
  catalog?: RecordPreview1Catalog
  className?: string
  finalFocus?: () => HTMLElement | null
  labels?: RecordPreview1LabelsOverride
  locale?: string
  onExpand?: () => void
  onOpenChange: (open: boolean) => void
  onRecordChange: (changes: RecordPreview1Changes) => void
  open: boolean
  people: readonly RecordPreview1Person[]
  onRetry?: () => void
  record: RecordPreview1Record | null
  status?: RecordPreviewStatus
  timeZone?: string
  today?: Date
  visibilities?: readonly PropertyOption[]
}
