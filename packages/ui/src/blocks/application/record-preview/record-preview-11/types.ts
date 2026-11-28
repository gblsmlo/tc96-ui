import type {
  RecordPreviewStatus,
  RecordPreviewStatusLabels,
} from '@tc96/ui/patterns/records/preview/core'

export type RecordPreview11State =
  | 'dead'
  | 'done'
  | 'failed'
  | 'queued'
  | 'running'

export interface RecordPreview11Record {
  createdAt: string
  duration: string | null
  error: string | null
  errorSimulated?: boolean
  failureId: string | null
  finishedAt: string | null
  id: string
  kind: string
  movements: number | null
  publications: number | null
  startedAt: string | null
  state: RecordPreview11State
}

export type RecordPreview11Field =
  | 'createdAt'
  | 'duration'
  | 'error'
  | 'failure'
  | 'finishedAt'
  | 'kind'
  | 'movements'
  | 'publications'
  | 'startedAt'
  | 'state'

export type RecordPreview11Group = 'properties' | 'result'

export interface RecordPreview11Labels {
  close: string
  fallbackTitle: string
  fields: Record<RecordPreview11Field, string>
  groups: Record<RecordPreview11Group, string>
  kinds: Record<string, string>
  noDate: string
  noError: string
  noValue: string
  openFailure: string
  simulated: string
  states: Record<RecordPreview11State, string>
  status: RecordPreviewStatusLabels
}

export type RecordPreview11LabelsOverride = Partial<
  Omit<
    RecordPreview11Labels,
    'fields' | 'groups' | 'kinds' | 'states' | 'status'
  >
> & {
  fields?: Partial<RecordPreview11Labels['fields']>
  groups?: Partial<RecordPreview11Labels['groups']>
  kinds?: Record<string, string>
  states?: Partial<RecordPreview11Labels['states']>
  status?: Partial<RecordPreview11Labels['status']>
}

export interface RecordPreview11Props {
  className?: string
  finalFocus?: () => HTMLElement | null
  labels?: RecordPreview11LabelsOverride
  locale?: string
  onOpenChange: (open: boolean) => void
  onOpenFailure?: (failureId: string) => void
  onRetry?: () => void
  open: boolean
  record: RecordPreview11Record | null
  status?: RecordPreviewStatus
  timeZone?: string
}
