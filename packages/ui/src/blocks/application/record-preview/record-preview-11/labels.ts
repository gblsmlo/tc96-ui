import { mergeRecordPreviewLabels } from '../shared/merge-labels'
import type {
  RecordPreview11Labels,
  RecordPreview11LabelsOverride,
} from './types'

export const defaultRecordPreview11Labels: RecordPreview11Labels = {
  close: 'Close details',
  fallbackTitle: 'Run',
  fields: {
    createdAt: 'Queued since',
    duration: 'Duration',
    error: 'Last error',
    failure: 'Failure',
    finishedAt: 'Finished',
    kind: 'Type',
    movements: 'Movements',
    publications: 'Publications',
    startedAt: 'Started',
    state: 'Status',
  },
  groups: {
    properties: 'Properties',
    result: 'Result',
  },
  kinds: {
    'court-sweep': 'Court sweep',
    'lawsuit-import': 'Import',
    'oab-lookup': 'OAB lookup',
  },
  noDate: 'No date',
  noError: 'No error',
  noValue: '—',
  openFailure: 'View failure',
  simulated: 'Simulated',
  states: {
    dead: 'Failed',
    done: 'Done',
    failed: 'Failed, will retry',
    queued: 'Queued',
    running: 'Running',
  },
  status: {
    errorDescription: 'Close the details and try again.',
    errorTitle: 'Could not load the run',
    loading: 'Loading the run',
    notFoundDescription:
      'It may have left the latest runs. Close the details and check the list.',
    notFoundTitle: 'Run not found',
    retry: 'Try again',
  },
}

export function resolveRecordPreview11Labels(
  labels?: RecordPreview11LabelsOverride,
): RecordPreview11Labels {
  return mergeRecordPreviewLabels(defaultRecordPreview11Labels, labels, [
    'fields',
    'groups',
    'kinds',
    'states',
    'status',
  ])
}
