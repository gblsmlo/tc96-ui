import type {
  SelectPropertyLabels,
  TextPropertyLabels,
} from '@tc96/ui/patterns/properties/core'
import type { PersonPropertyOption } from '@tc96/ui/patterns/properties/display/person/person-option-content'

export type RecordPreview5Person = PersonPropertyOption

export type RecordPreview5Kind = 'file' | 'link' | 'note'

export type RecordPreview5Type =
  | 'audio'
  | 'document'
  | 'image'
  | 'link'
  | 'note'
  | 'video'

export type RecordPreview5TypeColors = Partial<
  Record<RecordPreview5Type, string>
>

export interface RecordPreview5Record {
  canEdit?: boolean
  createdAt: string
  description?: string | null
  id: string
  kind: RecordPreview5Kind
  location?: string | null
  name: string
  ownerId: string | null
  pinned: boolean
  previewUrl?: string | null
  size?: string | null
  type: RecordPreview5Type
  updatedAt: string
  url?: string | null
}

export type RecordPreview5Changes = Partial<
  Pick<RecordPreview5Record, 'name' | 'pinned'>
>

export type RecordPreview5Field =
  | 'address'
  | 'createdAt'
  | 'id'
  | 'location'
  | 'name'
  | 'owner'
  | 'pinned'
  | 'size'
  | 'type'
  | 'updatedAt'

export type RecordPreview5Group = 'properties' | 'record'

export interface RecordPreview5Labels {
  close: string
  copyAddress: string
  copyId: string
  download: string
  expand: string
  fields: Record<RecordPreview5Field, string>
  groups: Record<RecordPreview5Group, string>
  more: string
  noAddress: string
  noLocation: string
  noName: string
  noOwner: string
  noSize: string
  openRecord: string
  pinned: Record<'no' | 'yes', string>
  select: Partial<SelectPropertyLabels>
  text: Partial<TextPropertyLabels>
  types: Record<RecordPreview5Type, string>
}

export type RecordPreview5LabelsOverride = Partial<
  Omit<RecordPreview5Labels, 'fields' | 'groups' | 'pinned' | 'types'>
> & {
  fields?: Partial<RecordPreview5Labels['fields']>
  groups?: Partial<RecordPreview5Labels['groups']>
  pinned?: Partial<RecordPreview5Labels['pinned']>
  types?: Partial<RecordPreview5Labels['types']>
}

export interface RecordPreview5Props {
  className?: string
  finalFocus?: () => HTMLElement | null
  labels?: RecordPreview5LabelsOverride
  locale?: string
  onDownload?: () => void
  onExpand?: () => void
  onOpenChange: (open: boolean) => void
  onOpenRecord?: () => void
  onRecordChange: (changes: RecordPreview5Changes) => void
  open: boolean
  people: readonly RecordPreview5Person[]
  record: RecordPreview5Record
  timeZone?: string
  typeColors?: RecordPreview5TypeColors
}
