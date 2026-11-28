import { mergeRecordPreviewLabels } from '../shared/merge-labels'
import type {
  RecordPreview10Labels,
  RecordPreview10LabelsOverride,
} from './types'

export const defaultRecordPreview10Labels: RecordPreview10Labels = {
  checkedOf: (day, found) =>
    `Checked on ${day}: ${found === 1 ? '1 publication found' : `${found} publications found`}.`,
  close: 'Close failure',
  copied: 'Details copied.',
  copy: 'Copy details for support',
  copyFailed: 'Could not copy. Try again.',
  dismiss: 'Close',
  expand: 'Open in Failures',
  fallbackTitle: 'Failure',
  groups: {
    publication: 'Publication without proposal',
    resolution: 'Resolution',
    runs: 'Capture runs',
    views: 'Seen by',
    window: 'Window that may lack publications',
  },
  holderOf: (name) => `Holder: ${name}`,
  kinds: {
    capture_stopped: 'Capture stopped',
    oab_silent: 'OAB without publications',
    proposal_failed: 'Deadline proposal not generated',
  },
  lastPublishedOn: (day) => `Last publication on ${day}.`,
  noViews: 'Nobody has opened this failure yet.',
  openLawsuit: 'View in the lawsuit',
  openRuns: 'View runs',
  origins: {
    external: 'External source',
    registration: 'Registration',
    system: 'System',
  },
  resolutions: {
    checked_by_hand: 'Checked by hand',
    false_alarm: 'False alarm',
    no_publication: 'No publication indeed',
    registration_fixed: 'Registration fixed',
    system: 'Resolved by the system',
  },
  resolve: 'Resolve',
  resolvedBy: (name, when) => `By ${name} on ${when}`,
  runKinds: {
    'court-sweep': 'Court sweep',
    'lawsuit-import': 'Import',
    'oab-lookup': 'OAB lookup',
  },
  runStates: {
    dead: 'Failed',
    done: 'Done',
    failed: 'Failed, will retry',
    queued: 'Queued',
    running: 'Running',
  },
  seenBy: (name, when) => `${name} on ${when}`,
  silenceOf: (oab, count, limit) =>
    `OAB ${oab}: ${count} business days without publications, above the longest gap of ${limit} days.`,
  simulated: 'Simulated',
  states: {
    open: 'Open',
    resolved: 'Resolved',
  },
  status: {
    errorDescription: 'Close the details and try again.',
    errorTitle: 'Could not load the failure',
    loading: 'Loading the failure',
    notFoundDescription: 'It may have been resolved more than 90 days ago.',
    notFoundTitle: 'Failure not found',
    retry: 'Try again',
  },
  unresolved: 'Open, waiting for resolution.',
  windowOf: (oab, from, to) => `OAB ${oab}: ${from} to ${to}`,
}

export function resolveRecordPreview10Labels(
  labels?: RecordPreview10LabelsOverride,
): RecordPreview10Labels {
  return mergeRecordPreviewLabels(defaultRecordPreview10Labels, labels, [
    'groups',
    'kinds',
    'origins',
    'resolutions',
    'runKinds',
    'runStates',
    'states',
    'status',
  ])
}
