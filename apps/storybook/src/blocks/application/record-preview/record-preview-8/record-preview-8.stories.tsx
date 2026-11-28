import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  RecordPreview8 as RecordPreview8Block,
  type RecordPreview8Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-8'
import { Button } from '@tc96/ui/button'
import { useState } from 'react'
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'
import {
  DEADLINE_TIME_ZONE,
  deadlineKinds,
  deadlinePeople,
  deadlinePreviewLabels,
  deadlineRecord,
  proposedDeadlineRecord,
} from '../fixtures/record-preview-8.ts'

const records: readonly { label: string; record: RecordPreview8Record }[] = [
  { label: 'Abrir prazo proposto', record: proposedDeadlineRecord },
  { label: 'Abrir prazo aberto', record: deadlineRecord },
]

function DeadlinePreview({
  onConfirm,
  onExpand,
  onReject,
}: {
  onConfirm?: () => void
  onExpand?: () => void
  onReject?: () => void
}) {
  const [open, setOpen] = useState(true)
  const [current, setCurrent] = useState<RecordPreview8Record>(
    proposedDeadlineRecord,
  )

  return (
    <>
      <div className="flex gap-2">
        {records.map(({ label, record }) => (
          <Button
            key={record.id}
            onClick={() => {
              setCurrent(record)
              setOpen(true)
            }}
            variant="outline"
          >
            {label}
          </Button>
        ))}
      </div>
      <RecordPreview8Block
        kinds={deadlineKinds}
        labels={deadlinePreviewLabels}
        locale="pt-BR"
        onConfirm={onConfirm}
        onExpand={onExpand}
        onOpenChange={setOpen}
        onReject={onReject}
        open={open}
        people={deadlinePeople}
        record={current}
        timeZone={DEADLINE_TIME_ZONE}
      />
    </>
  )
}

const meta = {
  component: DeadlinePreview,
  parameters: { layout: 'centered' },
  tags: ['!autodocs'],
  title: 'Blocks/Application/Record Preview/RecordPreview8',
} satisfies Meta<typeof DeadlinePreview>

export default meta

type Story = StoryObj<typeof meta>

export const RecordPreview8: Story = {
  args: { onConfirm: fn(), onExpand: fn(), onReject: fn() },
  parameters: {
    docs: {
      description: {
        story:
          'The quick view of a deadline (Prazo) of a queue row, after the deadline preview of lemind, every property read-only and `plain`: Prazo, Tipo, Status, Data interna, Data fatal, Faltam, Responsável, Processo and Cliente. For a proposed deadline (`record.deadlineStatus` is `proposed`) the decision buttons Confirmar and Rejeitar render in the footer when `onConfirm` and `onReject` are passed, the dialogs that follow stay in the app, and Expand renders only with `onExpand`. Dates come as `YYYY-MM-DD` or ISO strings and are formatted by `locale` and `timeZone`; `daysLeft` is the prepared text of the Faltam row.',
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const popup = await screen.findByRole('dialog', {
      name: 'Recurso contra a sentença',
    })
    const dialog = within(popup)

    await waitFor(() =>
      expect(
        popup.querySelector('[data-slot="record-preview-body"]'),
      ).toBeVisible(),
    )
    await expect(
      dialog.getByRole('region', { name: 'Propriedades' }),
    ).toBeVisible()
    await expect(dialog.getByText('14/12/2026')).toBeVisible()
    await expect(dialog.getByText('09/12/2026')).toBeVisible()
    await expect(dialog.getByText('Proposto')).toBeVisible()
    await expect(dialog.getByText('Recurso de apelação')).toBeVisible()
    await expect(
      dialog.getByText('Acme Construções, Ada Lovelace'),
    ).toBeVisible()

    await userEvent.click(dialog.getByRole('button', { name: 'Confirmar' }))
    await expect(args.onConfirm).toHaveBeenCalledTimes(1)
    await userEvent.click(dialog.getByRole('button', { name: 'Rejeitar' }))
    await expect(args.onReject).toHaveBeenCalledTimes(1)
    await userEvent.click(
      dialog.getByRole('button', { name: 'Abrir em tela completa' }),
    )
    await expect(args.onExpand).toHaveBeenCalledTimes(1)

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )

    await userEvent.click(
      within(canvasElement).getByRole('button', { name: 'Abrir prazo aberto' }),
    )
    const openPopup = await screen.findByRole('dialog', {
      name: 'Contestação ao pedido de tutela',
    })
    const openDialog = within(openPopup)
    await waitFor(() => expect(openDialog.getByText('Aberto')).toBeVisible())
    await expect(
      openDialog.queryByRole('button', { name: 'Confirmar' }),
    ).not.toBeInTheDocument()
    await expect(
      openDialog.queryByRole('button', { name: 'Rejeitar' }),
    ).not.toBeInTheDocument()
  },
}
