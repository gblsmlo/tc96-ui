import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { PersonPropertyOption } from '../../properties/display/person/person-option-content'

export type RecordPreviewStatus = 'error' | 'loading' | 'not-found' | 'ready'

export interface RecordPreviewStatusLabels {
  errorDescription?: string
  errorTitle: string
  loading: string
  notFoundDescription?: string
  notFoundTitle: string
  retry: string
}

export interface RecordPreviewExpand {
  label: string
  onClick: () => void
}

export interface RecordPreviewMoreAction {
  disabled?: boolean
  id: string
  label: string
}

export interface RecordPreviewMore {
  actions: readonly RecordPreviewMoreAction[]
  label: string
  onAction: (actionId: string) => void
}

interface RecordPreviewBaseProps {
  children?: ReactNode
  className?: string
  closeLabel: string
  description?: ReactNode
  expand?: RecordPreviewExpand
  finalFocus?: () => HTMLElement | null
  footer?: ReactNode
  more?: RecordPreviewMore
  onOpenChange: (open: boolean) => void
  onRetry?: () => void
  open: boolean
  title: ReactNode
}

export type RecordPreviewProps = RecordPreviewBaseProps &
  (
    | {
        status?: 'ready'
        statusLabels?: Omit<RecordPreviewStatusLabels, 'loading'>
      }
    | {
        status: 'error' | 'not-found'
        statusLabels: Omit<RecordPreviewStatusLabels, 'loading'>
      }
  )

export interface RecordPreviewBodyProps {
  children?: ReactNode
  className?: string
}

interface RecordPreviewFrameBaseProps {
  children?: ReactNode
  className?: string
  closeLabel: string
  description?: ReactNode
  expand?: RecordPreviewExpand
  fallbackTitle?: ReactNode
  finalFocus?: () => HTMLElement | null
  footer?: ReactNode
  more?: RecordPreviewMore
  onOpenChange: (open: boolean) => void
  onRetry?: () => void
  open: boolean
  title?: ReactNode
}

export type RecordPreviewFrameProps = RecordPreviewFrameBaseProps &
  (
    | {
        hasRecord?: true
        status?: 'ready'
        statusLabels?: RecordPreviewStatusLabels
      }
    | {
        hasRecord: boolean
        status: RecordPreviewStatus
        statusLabels: RecordPreviewStatusLabels
      }
  )

export interface RecordPreviewCoverProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  alt: string
  fallback: ReactNode
  src?: string | null
}

export interface RecordPreviewDecisionsProps
  extends Omit<ComponentPropsWithoutRef<'fieldset'>, 'aria-label'> {
  label: string
}

export interface RecordPreviewRegisterField {
  label: string
  value: string
}

export interface RecordPreviewRegisterAuthor {
  label: string
  options: readonly PersonPropertyOption[]
  placeholder: string
  value: string | null
}

export interface RecordPreviewRegisterProps {
  author?: RecordPreviewRegisterAuthor
  copyLabel: string
  createdAt?: RecordPreviewRegisterField
  defaultOpen?: boolean
  id: RecordPreviewRegisterField
  locale: string
  timeZone?: string
  title: ReactNode
  updatedAt?: RecordPreviewRegisterField
}
