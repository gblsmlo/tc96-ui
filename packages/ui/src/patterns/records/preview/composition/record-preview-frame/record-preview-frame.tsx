'use client'

import { RecordGroup } from '@tc96/ui/patterns/records/group/composition/record-group/record-group'
import type * as React from 'react'
import type { RecordPreviewFrameProps } from '../../core'
import { RecordPreview } from '../record-preview/record-preview'
import { RecordPreviewBody } from '../record-preview-body/record-preview-body'

export function RecordPreviewFrame({
  children,
  className,
  closeLabel,
  description,
  expand,
  fallbackTitle,
  finalFocus,
  footer,
  hasRecord = true,
  more,
  onOpenChange,
  onRetry,
  open,
  status = 'ready',
  statusLabels,
  title,
}: Readonly<RecordPreviewFrameProps>): React.ReactElement {
  const shared = {
    className,
    closeLabel,
    description,
    finalFocus,
    onOpenChange,
    onRetry,
    open,
    title: title ?? fallbackTitle,
  }

  if (!statusLabels)
    return (
      <RecordPreview {...shared} expand={expand} footer={footer} more={more}>
        {children}
      </RecordPreview>
    )

  if (status === 'loading')
    return (
      <RecordPreview {...shared}>
        <RecordPreviewBody>
          <RecordGroup
            collapsible={false}
            loading
            loadingLabel={statusLabels.loading}
          />
        </RecordPreviewBody>
      </RecordPreview>
    )

  const shownStatus = hasRecord || status !== 'ready' ? status : 'not-found'

  return (
    <RecordPreview
      {...shared}
      expand={expand}
      footer={footer}
      more={more}
      status={shownStatus}
      statusLabels={statusLabels}
    >
      {children}
    </RecordPreview>
  )
}
