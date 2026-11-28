import { cn } from '@tc96/utils'
import type * as React from 'react'
import type { RecordPreviewCoverProps } from '../../core'

export function RecordPreviewCover({
  alt,
  className,
  fallback,
  src,
  ...props
}: Readonly<RecordPreviewCoverProps>): React.ReactElement {
  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-lg bg-muted',
        src ? 'aspect-video' : 'h-28',
        className,
      )}
      data-slot="record-preview-cover"
      {...props}
    >
      {src ? (
        <img alt={alt} className="size-full object-cover" src={src} />
      ) : (
        fallback
      )}
    </div>
  )
}
