import {
  FileTextIcon,
  type Icon,
  ImageIcon,
  LinkSimpleIcon,
  MusicNotesIcon,
  NotePencilIcon,
  VideoIcon,
} from '@phosphor-icons/react'
import type { PropertyOption } from '@tc96/ui/patterns/properties/core'
import type { RecordPreview5Labels, RecordPreview5Type } from './types'

export const recordPreview5TypeIcons: Record<RecordPreview5Type, Icon> = {
  audio: MusicNotesIcon,
  document: FileTextIcon,
  image: ImageIcon,
  link: LinkSimpleIcon,
  note: NotePencilIcon,
  video: VideoIcon,
}

const typeOrder = [
  'document',
  'note',
  'link',
  'image',
  'video',
  'audio',
] as const satisfies readonly RecordPreview5Type[]

export function createRecordPreview5TypeOptions(
  types: RecordPreview5Labels['types'],
): readonly PropertyOption[] {
  return typeOrder.map((value) => ({
    icon: recordPreview5TypeIcons[value],
    label: types[value],
    value,
  }))
}

export function createRecordPreview5PinnedOptions(
  pinned: RecordPreview5Labels['pinned'],
): readonly PropertyOption[] {
  return [
    { label: pinned.yes, value: 'yes' },
    { label: pinned.no, value: 'no' },
  ]
}
