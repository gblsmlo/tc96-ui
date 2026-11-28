'use client'

import { ArrowsOutSimpleIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@tc96/ui/button'
import { StateSurface } from '@tc96/ui/patterns/surfaces/state/composition/state-surface/state-surface'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
} from '@tc96/ui/sheet'
import type * as React from 'react'
import { useRef } from 'react'
import { RecordPreviewAction } from '../../components/record-preview-action'
import { RecordPreviewMoreMenu } from '../../components/record-preview-more-menu'
import type { RecordPreviewProps, RecordPreviewStatusLabels } from '../../core'

function RecordPreviewStatusBody({
  labels,
  onRetry,
  status,
}: Readonly<{
  labels: Omit<RecordPreviewStatusLabels, 'loading'>
  onRetry?: () => void
  status: 'error' | 'not-found'
}>): React.ReactElement {
  if (status === 'error') {
    return (
      <StateSurface
        actions={
          onRetry ? (
            <Button onClick={onRetry} size="sm" variant="outline">
              {labels.retry}
            </Button>
          ) : undefined
        }
        description={labels.errorDescription}
        kind="error"
        title={labels.errorTitle}
      />
    )
  }

  return (
    <StateSurface
      description={labels.notFoundDescription}
      kind="not-found"
      title={labels.notFoundTitle}
    />
  )
}

export function RecordPreview({
  children,
  className,
  closeLabel,
  description,
  expand,
  finalFocus,
  footer,
  more,
  onOpenChange,
  onRetry,
  open,
  status = 'ready',
  statusLabels,
  title,
}: Readonly<RecordPreviewProps>): React.ReactElement {
  const popupRef = useRef<HTMLDivElement | null>(null)
  const pending = status !== 'ready' && statusLabels ? statusLabels : null
  const ready = status === 'ready'
  const showMore = ready && Boolean(more?.actions.length)
  const showExpand = ready && Boolean(expand)

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetPopup
        className={className}
        finalFocus={finalFocus}
        initialFocus={popupRef}
        ref={popupRef}
        showCloseButton={false}
        side="right"
        tabIndex={-1}
        variant="inset"
      >
        <SheetHeader className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1 space-y-0.5">
              <SheetTitle className="text-base leading-snug">
                {title}
              </SheetTitle>
              {description ? (
                <SheetDescription>{description}</SheetDescription>
              ) : null}
            </div>
            <div className="flex shrink-0 items-start gap-0.5 self-start">
              {showMore || showExpand ? (
                <div
                  className="flex items-center gap-0.5"
                  data-slot="record-preview-header-actions"
                >
                  {showMore && more ? (
                    <RecordPreviewMoreMenu {...more} />
                  ) : null}
                  {showExpand && expand ? (
                    <RecordPreviewAction
                      label={expand.label}
                      onClick={expand.onClick}
                    >
                      <ArrowsOutSimpleIcon aria-hidden />
                    </RecordPreviewAction>
                  ) : null}
                </div>
              ) : null}
              <SheetClose
                aria-label={closeLabel}
                render={<Button size="icon-sm" variant="ghost" />}
              >
                <XIcon aria-hidden="true" />
              </SheetClose>
            </div>
          </div>
        </SheetHeader>
        <SheetPanel className="p-4 in-[[data-slot=sheet-popup]:has([data-slot=sheet-header])]:pt-4">
          {pending && status !== 'ready' ? (
            <RecordPreviewStatusBody
              labels={pending}
              onRetry={onRetry}
              status={status}
            />
          ) : (
            children
          )}
        </SheetPanel>
        {footer && ready ? (
          <SheetFooter className="px-4">{footer}</SheetFooter>
        ) : null}
      </SheetPopup>
    </Sheet>
  )
}
