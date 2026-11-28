import { CheckIcon, UserIcon, XIcon } from '@phosphor-icons/react'
import type {
  ActionBarGroup,
  ActionBarItem,
} from '@tc96/ui/patterns/action-bar/components/action-bar'
import type { Legal6Deadline, Legal6Labels, Legal6Person } from './types'

export interface Legal6SelectionActionsOptions {
  decidable: boolean
  labels: Legal6Labels
  onBulkConfirm?: (deadlineIds: string[]) => void
  onBulkOwnerChange?: (deadlineIds: string[], ownerId: string | null) => void
  onBulkReject?: (deadlineIds: string[]) => void
  onDone: () => void
  owners: readonly Legal6Person[]
  selectedRows: readonly Legal6Deadline[]
  unassignable?: boolean
}

export function createLegal6SelectionActions({
  decidable,
  labels,
  onBulkConfirm,
  onBulkOwnerChange,
  onBulkReject,
  onDone,
  owners,
  selectedRows,
  unassignable = true,
}: Legal6SelectionActionsOptions): ActionBarGroup<Legal6Deadline>[] {
  const ids = selectedRows.map((item) => item.id)
  const decide = (
    id: 'confirm' | 'reject',
    handler: ((deadlineIds: string[]) => void) | undefined,
    icon: ActionBarItem<Legal6Deadline>['icon'],
  ): ActionBarItem<Legal6Deadline>[] =>
    handler
      ? [
          {
            disabled: !decidable,
            icon,
            id,
            label: labels[id],
            onSelect: () => {
              handler(ids)
              onDone()
            },
          },
        ]
      : []
  const ownerChoice = (
    id: string,
    label: string,
    ownerId: string | null,
  ): ActionBarItem<Legal6Deadline> => ({
    id,
    label,
    onSelect: () => {
      onBulkOwnerChange?.(ids, ownerId)
      onDone()
    },
  })

  const groups: ActionBarGroup<Legal6Deadline>[] = [
    {
      id: 'bulk',
      items: onBulkOwnerChange
        ? [
            {
              icon: <UserIcon aria-hidden="true" />,
              id: 'owner',
              label: labels.owner,
              submenu: [
                {
                  id: 'owner',
                  items: [
                    ...owners.map((owner) =>
                      ownerChoice(owner.id, owner.label, owner.id),
                    ),
                    ...(unassignable
                      ? [ownerChoice('unassigned', labels.unassigned, null)]
                      : []),
                  ],
                },
              ],
            },
          ]
        : [],
    },
    {
      id: 'decide',
      items: [
        ...decide('confirm', onBulkConfirm, <CheckIcon aria-hidden="true" />),
        ...decide('reject', onBulkReject, <XIcon aria-hidden="true" />),
      ],
    },
  ]

  return groups.filter((group) => group.items.length > 0)
}
