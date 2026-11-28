import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  RecordPreview6 as RecordPreview6Block,
  type RecordPreview6Changes,
  type RecordPreview6Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-6'
import { Button } from '@tc96/ui/button'
import { useState } from 'react'
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'
import {
  entryAccounts,
  entryCategories,
  entryCostCenters,
  entryMembers,
  entryPreviewLabels,
  entryRecord,
} from '../fixtures/record-preview-6.ts'

interface EntryPreviewProps {
  onExpand?: () => void
  onRecordChange?: (changes: RecordPreview6Changes) => void
  onSettle?: () => void
}

function EntryPreview({
  onExpand,
  onRecordChange,
  onSettle,
}: EntryPreviewProps) {
  const [open, setOpen] = useState(true)
  const [bare, setBare] = useState(false)
  const [current, setCurrent] = useState<RecordPreview6Record>(entryRecord)

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            setBare(false)
            setOpen(true)
          }}
          variant="outline"
        >
          Abrir lançamento
        </Button>
        <Button
          onClick={() => {
            setBare(true)
            setOpen(true)
          }}
          variant="outline"
        >
          Abrir sem ações
        </Button>
      </div>
      <RecordPreview6Block
        accounts={entryAccounts}
        categories={entryCategories}
        costCenters={entryCostCenters}
        labels={entryPreviewLabels}
        locale="pt-BR"
        members={entryMembers}
        onExpand={bare ? undefined : onExpand}
        onOpenChange={setOpen}
        onRecordChange={(changes) => {
          onRecordChange?.(changes)
          setCurrent((record) => ({ ...record, ...changes }))
        }}
        onSettle={bare ? undefined : onSettle}
        open={open}
        record={current}
      />
    </>
  )
}

const meta = {
  component: EntryPreview,
  parameters: { layout: 'centered' },
  tags: ['!autodocs'],
  title: 'Blocks/Application/Record Preview/RecordPreview6',
} satisfies Meta<typeof EntryPreview>

export default meta

type Story = StoryObj<typeof meta>

export const RecordPreview6: Story = {
  args: { onExpand: fn(), onRecordChange: fn(), onSettle: fn() },
  parameters: {
    docs: {
      description: {
        story:
          'The quick view of a finance entry, after the entry preview of lemind, with every property in its `plain` variant: Resumo (Situação, Tipo and the read-only Valor, plus the Vencimento calendar), Origem (Pagador, Contrato and Parcela when the record has them, Caso ou processo) and Classificação (Conta, Categoria and Centro de custo for the kinds that take them, Responsável). The category list follows the direction of the kind. `record.canEdit` locks the editable rows and `record.dueOnly` locks all but the due date; Quitar, in the Mais ações menu, renders only with `onSettle` and `record.canSettle`, and Expand only with `onExpand`.',
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const popup = await screen.findByRole('dialog', {
      name: 'Honorários, parcela 3 de 6',
    })
    const dialog = within(popup)

    await waitFor(() =>
      expect(
        popup.querySelector('[data-slot="record-preview-body"]'),
      ).toBeVisible(),
    )
    for (const name of ['Resumo', 'Origem', 'Classificação']) {
      await expect(dialog.getByRole('region', { name })).toBeVisible()
    }
    await expect(dialog.getByText('Em aberto')).toBeVisible()
    await expect(dialog.getByText('Acme Construções')).toBeVisible()
    await expect(dialog.getByText('3 de 6')).toBeVisible()

    await userEvent.click(dialog.getByRole('button', { name: 'Mais ações' }))
    await userEvent.click(
      await screen.findByRole('menuitem', { name: 'Quitar' }),
    )
    await expect(args.onSettle).toHaveBeenCalledTimes(1)
    await userEvent.click(
      dialog.getByRole('button', { name: 'Abrir em tela completa' }),
    )
    await expect(args.onExpand).toHaveBeenCalledTimes(1)

    await userEvent.click(
      dialog.getByRole('combobox', {
        name: 'Categoria: Honorários contratuais',
      }),
    )
    await expect(
      screen.queryByRole('option', { name: 'Aluguel' }),
    ).not.toBeInTheDocument()
    await userEvent.click(
      await screen.findByRole('option', { name: 'Honorários de êxito' }),
    )
    await waitFor(() =>
      expect(args.onRecordChange).toHaveBeenCalledWith({
        categoryId: 'cat-success',
      }),
    )

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )

    await userEvent.click(
      within(canvasElement).getByRole('button', { name: 'Abrir sem ações' }),
    )
    const bare = await screen.findByRole('dialog', {
      name: 'Honorários, parcela 3 de 6',
    })
    await expect(
      within(bare).queryByRole('button', { name: 'Abrir em tela completa' }),
    ).not.toBeInTheDocument()
    await expect(
      within(bare).queryByRole('button', { name: 'Quitar' }),
    ).not.toBeInTheDocument()
  },
}
