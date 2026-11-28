import { mergeRecordPreviewLabels } from '../shared/merge-labels'
import type {
  RecordPreview1Labels,
  RecordPreview1LabelsOverride,
} from './types'

export const defaultRecordPreview1Labels: RecordPreview1Labels = {
  close: 'Close',
  copyId: 'Copy ID',
  date: {},
  expand: 'Expand',
  fallbackTitle: 'Task',
  fields: {
    assignee: 'Assignee',
    createdAt: 'Created',
    createdBy: 'Created by',
    due: 'Due date',
    id: 'ID',
    priority: 'Priority',
    schedule: 'Date',
    status: 'Status',
    tags: 'Tags',
    type: 'Type',
    updatedAt: 'Updated',
    visibility: 'Visibility',
  },
  groups: {
    properties: 'Properties',
    record: 'Record',
    schedule: 'Schedule',
  },
  noAssignee: 'No assignee',
  noCreator: 'No author',
  schedule: {},
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
  visibilityPlaceholder: 'No visibility',
}

export function resolveRecordPreview1Labels(
  labels?: RecordPreview1LabelsOverride,
): RecordPreview1Labels {
  return mergeRecordPreviewLabels(defaultRecordPreview1Labels, labels, [
    'fields',
    'groups',
    'status',
  ])
}
