'use client'

import { Button } from '@tc96/ui/button'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@tc96/ui/tooltip'
import type * as React from 'react'

export function RecordPreviewAction({
  children,
  label,
  onClick,
}: Readonly<{
  children: React.ReactNode
  label: string
  onClick: () => void
}>): React.ReactElement {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={label}
            onClick={onClick}
            size="icon-sm"
            variant="ghost"
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipPopup>{label}</TooltipPopup>
    </Tooltip>
  )
}
