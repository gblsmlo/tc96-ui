'use client'

import { DotsThreeIcon } from '@phosphor-icons/react'
import { Button } from '@tc96/ui/button'
import { Menu, MenuItem, MenuPopup, MenuTrigger } from '@tc96/ui/menu'
import type * as React from 'react'
import type { RecordPreviewMore } from '../core'

export function RecordPreviewMoreMenu({
  actions,
  label,
  onAction,
}: Readonly<RecordPreviewMore>): React.ReactElement {
  return (
    <Menu>
      <MenuTrigger
        render={<Button aria-label={label} size="icon-sm" variant="ghost" />}
      >
        <DotsThreeIcon aria-hidden weight="bold" />
      </MenuTrigger>
      <MenuPopup align="end">
        {actions.map((action) => (
          <MenuItem
            disabled={action.disabled}
            key={action.id}
            onClick={() => onAction(action.id)}
          >
            {action.label}
          </MenuItem>
        ))}
      </MenuPopup>
    </Menu>
  )
}
