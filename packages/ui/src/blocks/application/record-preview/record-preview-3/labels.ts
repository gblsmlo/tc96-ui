import { mergeRecordPreviewLabels } from '../shared/merge-labels'
import type {
  RecordPreview3Labels,
  RecordPreview3LabelsOverride,
} from './types'

export const defaultRecordPreview3Labels: RecordPreview3Labels = {
  close: 'Close',
  copyId: 'Copy ID',
  date: {},
  expand: 'Expand',
  fallbackTitle: 'Task',
  fields: {
    assignees: 'Assignees',
    creator: 'Created by',
    due: 'Due',
    id: 'ID',
    kind: 'Project',
    priority: 'Priority',
    status: 'Status',
    tags: 'Tags',
    updated: 'Updated',
  },
  groups: {
    properties: 'Properties',
    record: 'Record',
  },
  noCreator: 'No author',
  noKind: 'No project',
  noPriority: 'No priority',
  peoplePicker: {},
  select: {},
  status: {
    errorDescription: 'Close the details and try again.',
    errorTitle: 'The task could not be loaded',
    loading: 'Loading the task',
    notFoundDescription:
      'It may have been deleted or you may no longer have access.',
    notFoundTitle: 'Task not found',
    retry: 'Try again',
  },
  tagPicker: {},
  tagsPlaceholder: 'Add a tag',
  unassigned: 'Unassigned',
}

export function resolveRecordPreview3Labels(
  labels?: RecordPreview3LabelsOverride,
): RecordPreview3Labels {
  return mergeRecordPreviewLabels(defaultRecordPreview3Labels, labels, [
    'fields',
    'groups',
    'status',
  ])
}
