import { mergeRecordPreviewLabels } from '../shared/merge-labels'
import type {
  RecordPreview5Labels,
  RecordPreview5LabelsOverride,
} from './types'

export const defaultRecordPreview5Labels: RecordPreview5Labels = {
  close: 'Close details',
  copyAddress: 'Copy address',
  copyId: 'Copy ID',
  download: 'Download',
  expand: 'Open full screen',
  fields: {
    address: 'Address',
    createdAt: 'Created',
    id: 'ID',
    location: 'Attached to',
    name: 'Name',
    owner: 'Owner',
    pinned: 'Pinned',
    size: 'Size',
    type: 'Type',
    updatedAt: 'Updated',
  },
  groups: {
    properties: 'Properties',
    record: 'Record',
  },
  noAddress: 'No address',
  more: 'More actions',
  noLocation: 'Not attached',
  noName: 'No name',
  noOwner: 'No owner',
  noSize: 'No size',
  openRecord: 'Open',
  pinned: { no: 'No', yes: 'Yes' },
  select: {},
  text: {},
  types: {
    audio: 'Audio',
    document: 'Document',
    image: 'Image',
    link: 'Link',
    note: 'Note',
    video: 'Video',
  },
}

export function resolveRecordPreview5Labels(
  labels?: RecordPreview5LabelsOverride,
): RecordPreview5Labels {
  return mergeRecordPreviewLabels(defaultRecordPreview5Labels, labels, [
    'fields',
    'groups',
    'pinned',
    'types',
  ])
}
