import { mergeRecordPreviewLabels } from '../shared/merge-labels'
import type {
  RecordPreview8Labels,
  RecordPreview8LabelsOverride,
} from './types'

export const defaultRecordPreview8Labels: RecordPreview8Labels = {
  close: 'Close details',
  confirm: 'Confirm',
  decisions: 'Decide on the proposal',
  expand: 'Open full screen',
  fallbackTitle: 'Deadline',
  fields: {
    client: 'Client',
    daysLeft: 'Days left',
    fatalDate: 'Fatal date',
    internalDate: 'Internal date',
    kind: 'Type',
    label: 'Deadline',
    lawsuit: 'Lawsuit',
    responsible: 'Owner',
    status: 'Status',
  },
  groups: {
    properties: 'Properties',
  },
  noClient: 'No client',
  noDate: 'No date',
  noDaysLeft: 'Not counted',
  noKind: 'No type',
  noLawsuit: 'No lawsuit',
  noResponsible: 'No owner',
  reject: 'Reject',
  status: {
    errorDescription: 'Close the details and try again.',
    errorTitle: 'Could not load the deadline',
    loading: 'Loading the deadline',
    notFoundDescription:
      'It may have left this queue. Close the details and check the filters.',
    notFoundTitle: 'Deadline not found',
    retry: 'Try again',
  },
  statuses: {
    cancelled: 'Cancelled',
    done: 'Done',
    drafting: 'Drafting',
    filed: 'Filed',
    missed: 'Missed',
    no_action: 'No action needed',
    open: 'Open',
    proposed: 'Proposed',
  },
}

export function resolveRecordPreview8Labels(
  labels?: RecordPreview8LabelsOverride,
): RecordPreview8Labels {
  return mergeRecordPreviewLabels(defaultRecordPreview8Labels, labels, [
    'fields',
    'groups',
    'status',
    'statuses',
  ])
}
