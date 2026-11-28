import type {
  RecordPreviewStatus,
  RecordPreviewStatusLabels,
} from '@tc96/ui/patterns/records/preview/core'

export interface RecordPreview9Lawsuit {
  caseNumber: string | null
  title: string
}

export interface RecordPreview9Record {
  availableOn: string
  caseNumber: string | null
  id: string
  kind: string
  lawsuit: RecordPreview9Lawsuit | null
  lawyers: readonly string[]
  text: string
  tribunal: string
}

export type RecordPreview9Field =
  | 'availableOn'
  | 'caseNumber'
  | 'lawsuit'
  | 'lawyers'

export type RecordPreview9Group = 'publication' | 'text'

export type RecordPreview9Action =
  | 'createDeadline'
  | 'createLawsuit'
  | 'createTask'
  | 'discard'
  | 'linkDeadline'
  | 'linkLawsuit'
  | 'more'
  | 'noDeadline'

export interface RecordPreview9Labels {
  actions: Record<RecordPreview9Action, string>
  close: string
  decisions: string
  expand: string
  fallbackTitle: string
  fields: Record<RecordPreview9Field, string>
  groups: Record<RecordPreview9Group, string>
  noCaseNumber: string
  noDate: string
  notRegistered: string
  openLawsuit: string
  status: RecordPreviewStatusLabels
  title: (kind: string, tribunal: string) => string
}

export type RecordPreview9LabelsOverride = Partial<
  Omit<RecordPreview9Labels, 'actions' | 'fields' | 'groups' | 'status'>
> & {
  actions?: Partial<RecordPreview9Labels['actions']>
  fields?: Partial<RecordPreview9Labels['fields']>
  groups?: Partial<RecordPreview9Labels['groups']>
  status?: Partial<RecordPreview9Labels['status']>
}

export interface RecordPreview9Props {
  className?: string
  finalFocus?: () => HTMLElement | null
  labels?: RecordPreview9LabelsOverride
  locale?: string
  onCreateDeadline?: () => void
  onCreateLawsuit?: () => void
  onCreateTask?: () => void
  onDiscard?: () => void
  onExpand?: () => void
  onLinkDeadline?: () => void
  onLinkLawsuit?: () => void
  onNoDeadline?: () => void
  onOpenChange: (open: boolean) => void
  onOpenLawsuit?: () => void
  onRetry?: () => void
  open: boolean
  record: RecordPreview9Record | null
  status?: RecordPreviewStatus
}
