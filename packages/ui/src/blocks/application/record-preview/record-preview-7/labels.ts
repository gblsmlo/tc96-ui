import { mergeRecordPreviewLabels } from '../shared/merge-labels'
import type {
  RecordPreview7Labels,
  RecordPreview7LabelsOverride,
} from './types'

export const defaultRecordPreview7Labels: RecordPreview7Labels = {
  close: 'Close details',
  copyId: 'Copy ID',
  expand: 'Open full screen',
  fallbackTitle: 'Matter',
  fields: {
    contract: 'Contract',
    createdAt: 'Created',
    id: 'ID',
    number: 'Number',
    phase: 'Phase',
    responsible: 'Owner',
    tags: 'Tags',
    updatedAt: 'Updated',
  },
  groups: {
    properties: 'Properties',
    record: 'Record',
  },
  noContract: 'No contract',
  noNumber: 'No number',
  noPhase: 'No phase',
  noResponsible: 'No owner',
  select: {},
  status: {
    errorDescription: 'Close the details and try again.',
    errorTitle: 'Could not load the matter',
    loading: 'Loading the matter',
    notFoundDescription:
      'It may have been deleted or you may have lost access.',
    notFoundTitle: 'Matter not found',
    retry: 'Try again',
  },
  tagPicker: {},
  tagsPlaceholder: 'Add a tag',
  text: {},
}

export function resolveRecordPreview7Labels(
  labels?: RecordPreview7LabelsOverride,
): RecordPreview7Labels {
  return mergeRecordPreviewLabels(defaultRecordPreview7Labels, labels, [
    'fields',
    'groups',
    'status',
  ])
}
