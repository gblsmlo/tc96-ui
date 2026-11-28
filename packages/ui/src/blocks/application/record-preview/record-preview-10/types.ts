import type {
  RecordPreviewStatus,
  RecordPreviewStatusLabels,
} from '@tc96/ui/patterns/records/preview/core'

export type RecordPreview10Kind =
  | 'capture_stopped'
  | 'oab_silent'
  | 'proposal_failed'

export type RecordPreview10Origin = 'external' | 'registration' | 'system'

export type RecordPreview10State = 'open' | 'resolved'

export type RecordPreview10Resolution =
  | 'checked_by_hand'
  | 'false_alarm'
  | 'no_publication'
  | 'registration_fixed'
  | 'system'

export type RecordPreview10RunState =
  | 'dead'
  | 'done'
  | 'failed'
  | 'queued'
  | 'running'

export interface RecordPreview10Window {
  from: string
  oab: string
  to: string
}

export interface RecordPreview10Silence {
  count: number
  holderName: string
  lastPublishedOn: string
  limit: number
  oab: string
}

export interface RecordPreview10Run {
  id: string
  kind: string
  startedAt: string | null
  state: RecordPreview10RunState
}

export interface RecordPreview10View {
  name: string
  seenAt: string
}

export interface RecordPreview10ResolutionNote {
  checkedOn: string
  found: number
}

export interface RecordPreview10ResolvedBy {
  at: string
  name: string
}

export interface RecordPreview10Record {
  id: string
  kind: RecordPreview10Kind
  origin: RecordPreview10Origin
  publicationHasLawsuit: boolean
  resolution: RecordPreview10Resolution | null
  resolutionNote: RecordPreview10ResolutionNote | null
  resolvedBy: RecordPreview10ResolvedBy | null
  runs: readonly RecordPreview10Run[]
  silence: RecordPreview10Silence | null
  simulated?: boolean
  state: RecordPreview10State
  supportText: string | null
  views: readonly RecordPreview10View[]
  windows: readonly RecordPreview10Window[]
}

export type RecordPreview10Group =
  | 'publication'
  | 'resolution'
  | 'runs'
  | 'views'
  | 'window'

export interface RecordPreview10Labels {
  checkedOf: (day: string, found: number) => string
  close: string
  copied: string
  copy: string
  copyFailed: string
  dismiss: string
  expand: string
  fallbackTitle: string
  groups: Record<RecordPreview10Group, string>
  holderOf: (name: string) => string
  kinds: Record<RecordPreview10Kind, string>
  lastPublishedOn: (day: string) => string
  noViews: string
  openLawsuit: string
  openRuns: string
  origins: Record<RecordPreview10Origin, string>
  resolutions: Record<RecordPreview10Resolution, string>
  resolve: string
  resolvedBy: (name: string, when: string) => string
  runKinds: Record<string, string>
  runStates: Record<RecordPreview10RunState, string>
  seenBy: (name: string, when: string) => string
  silenceOf: (oab: string, count: number, limit: number) => string
  simulated: string
  states: Record<RecordPreview10State, string>
  status: RecordPreviewStatusLabels
  unresolved: string
  windowOf: (oab: string, from: string, to: string) => string
}

export type RecordPreview10LabelsOverride = Partial<
  Omit<
    RecordPreview10Labels,
    | 'groups'
    | 'kinds'
    | 'origins'
    | 'resolutions'
    | 'runKinds'
    | 'runStates'
    | 'states'
    | 'status'
  >
> & {
  groups?: Partial<RecordPreview10Labels['groups']>
  kinds?: Partial<RecordPreview10Labels['kinds']>
  origins?: Partial<RecordPreview10Labels['origins']>
  resolutions?: Partial<RecordPreview10Labels['resolutions']>
  runKinds?: Record<string, string>
  runStates?: Partial<RecordPreview10Labels['runStates']>
  states?: Partial<RecordPreview10Labels['states']>
  status?: Partial<RecordPreview10Labels['status']>
}

export interface RecordPreview10Props {
  className?: string
  finalFocus?: () => HTMLElement | null
  labels?: RecordPreview10LabelsOverride
  locale?: string
  onExpand?: () => void
  onOpenChange: (open: boolean) => void
  onOpenLawsuit?: () => void
  onOpenRuns?: () => void
  onResolve?: () => void
  onRetry?: () => void
  open: boolean
  readOnly?: boolean
  record: RecordPreview10Record | null
  status?: RecordPreviewStatus
  timeZone?: string
}
