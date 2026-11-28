import { mergeRecordPreviewLabels } from '../shared/merge-labels'
import type {
  RecordPreview2Labels,
  RecordPreview2LabelsOverride,
} from './types'

export const defaultRecordPreview2Labels: RecordPreview2Labels = {
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

export function resolveRecordPreview2Labels(
  labels?: RecordPreview2LabelsOverride,
): RecordPreview2Labels {
  return mergeRecordPreviewLabels(defaultRecordPreview2Labels, labels, [
    'fields',
    'groups',
    'status',
  ])
}
