import { mergeRecordPreviewLabels } from '../shared/merge-labels'
import type {
  RecordPreview9Labels,
  RecordPreview9LabelsOverride,
} from './types'

export const defaultRecordPreview9Labels: RecordPreview9Labels = {
  actions: {
    createDeadline: 'Create deadline',
    createLawsuit: 'Register lawsuit',
    createTask: 'Create task',
    discard: 'Discard',
    linkDeadline: 'Link to deadline',
    linkLawsuit: 'Link to a lawsuit',
    more: 'More actions',
    noDeadline: 'No deadline',
  },
  close: 'Close publication',
  decisions: 'Decide on the publication',
  expand: 'Open full screen',
  fallbackTitle: 'Publication',
  fields: {
    availableOn: 'Published on',
    caseNumber: 'Case number',
    lawsuit: 'Lawsuit',
    lawyers: 'Lawyers',
  },
  groups: {
    publication: 'Publication',
    text: 'Full text',
  },
  noCaseNumber: 'No CNJ number',
  noDate: 'No date',
  notRegistered: 'Not registered',
  openLawsuit: 'Open lawsuit',
  status: {
    errorDescription: 'Close the details and try again.',
    errorTitle: 'Could not load the publication',
    loading: 'Loading the publication',
    notFoundDescription:
      'It may have left the queue. Close the details and check the filters.',
    notFoundTitle: 'Publication not found',
    retry: 'Try again',
  },
  title: (kind, tribunal) => `${kind} · ${tribunal}`,
}

export function resolveRecordPreview9Labels(
  labels?: RecordPreview9LabelsOverride,
): RecordPreview9Labels {
  return mergeRecordPreviewLabels(defaultRecordPreview9Labels, labels, [
    'actions',
    'fields',
    'groups',
    'status',
  ])
}
