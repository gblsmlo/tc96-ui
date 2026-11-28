import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  RecordPreview9 as RecordPreview9Block,
  type RecordPreview9Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-9'
import { Button } from '@tc96/ui/button'
import { useState } from 'react'
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'
import {
  publicationPreviewLabels,
  publicationRecord,
  unlinkedPublicationRecord,
} from '../fixtures/record-preview-9.ts'

const records: readonly { label: string; record: RecordPreview9Record }[] = [
  { label: 'Abrir publicação com processo', record: publicationRecord },
  {
    label: 'Abrir publicação sem processo',
    record: unlinkedPublicationRecord,
  },
]

interface PublicationPreviewProps {
  onCreateDeadline?: () => void
  onCreateLawsuit?: () => void
  onCreateTask?: () => void
  onDiscard?: () => void
  onExpand?: () => void
  onLinkDeadline?: () => void
  onLinkLawsuit?: () => void
  onNoDeadline?: () => void
  onOpenLawsuit?: () => void
}

function PublicationPreview(actions: PublicationPreviewProps) {
  const [open, setOpen] = useState(true)
  const [current, setCurrent] =
    useState<RecordPreview9Record>(publicationRecord)

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
      <RecordPreview9Block
        {...actions}
        labels={publicationPreviewLabels}
        locale="pt-BR"
        onOpenChange={setOpen}
        open={open}
        record={current}
      />
    </>
  )
}

const meta = {
  component: PublicationPreview,
  parameters: { layout: 'centered' },
  tags: ['!autodocs'],
  title: 'Blocks/Application/Record Preview/RecordPreview9',
} satisfies Meta<typeof PublicationPreview>

export default meta

type Story = StoryObj<typeof meta>

export const RecordPreview9: Story = {
  args: {
    onCreateDeadline: fn(),
    onCreateLawsuit: fn(),
    onCreateTask: fn(),
    onDiscard: fn(),
    onExpand: fn(),
    onLinkDeadline: fn(),
    onLinkLawsuit: fn(),
    onOpenLawsuit: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The reading pane of a queued court publication (Publicação), after the publication preview of lemind, every property read-only and `plain`: Disponibilizada em, Advogados (only when there are some), Processo (the linked lawsuit or "Não cadastrado") with Abrir processo when `onOpenLawsuit` is passed, and Número CNJ, then the full text with its line breaks preserved, with the decisions in the footer. The decisions follow the record: with a linked lawsuit Criar prazo, Vincular a prazo and Sem prazo; without one Cadastrar processo and Vincular a um processo; the menu Outras ações holds Criar tarefa and Descartar for both. Each action renders only when its callback is passed, so the app passes Cadastrar processo only to the roles that may register a lawsuit; the dialogs stay in the app. The record carries the prepared lawyers, `title(kind, tribunal)` builds the sheet title, and `locale` formats the day.',
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const popup = await screen.findByRole('dialog', {
      name: 'Intimação · TJSP',
    })
    const dialog = within(popup)

    await waitFor(() =>
      expect(
        popup.querySelector('[data-slot="record-preview-body"]'),
      ).toBeVisible(),
    )
    await expect(dialog.getByText('07/12/2026')).toBeVisible()
    await expect(
      dialog.getByText('Ana Lima (OAB 123456/SP), Bruno Reis (OAB 654321/SP)'),
    ).toBeVisible()
    await expect(dialog.getByText('Ação de cobrança')).toBeVisible()

    const text = popup.querySelector('[data-slot="record-preview-9-text"]')
    await expect(text).toBeVisible()
    await expect(text).toHaveTextContent(/Intime-se a parte requerida/)
    await expect(text).toHaveTextContent(/Último parágrafo/)
    await expect(text?.textContent).toContain('\n\nProcesso nº')
    await expect(text && getComputedStyle(text).whiteSpace).toBe('pre-line')

    await expect(
      dialog.queryByRole('button', { name: 'Sem prazo' }),
    ).not.toBeInTheDocument()
    await expect(
      dialog.queryByRole('button', { name: 'Cadastrar processo' }),
    ).not.toBeInTheDocument()

    await userEvent.click(dialog.getByRole('button', { name: 'Criar prazo' }))
    await expect(args.onCreateDeadline).toHaveBeenCalledTimes(1)
    await userEvent.click(
      dialog.getByRole('button', { name: 'Vincular a prazo' }),
    )
    await expect(args.onLinkDeadline).toHaveBeenCalledTimes(1)
    await userEvent.click(
      dialog.getByRole('button', { name: 'Abrir processo' }),
    )
    await expect(args.onOpenLawsuit).toHaveBeenCalledTimes(1)
    await userEvent.click(
      dialog.getByRole('button', { name: 'Abrir em tela completa' }),
    )
    await expect(args.onExpand).toHaveBeenCalledTimes(1)

    await userEvent.click(dialog.getByRole('button', { name: 'Outras ações' }))
    await userEvent.click(
      await screen.findByRole('menuitem', { name: 'Criar tarefa' }),
    )
    await expect(args.onCreateTask).toHaveBeenCalledTimes(1)
    await waitFor(() =>
      expect(screen.queryByRole('menuitem')).not.toBeInTheDocument(),
    )
    await userEvent.click(dialog.getByRole('button', { name: 'Outras ações' }))
    await userEvent.click(
      await screen.findByRole('menuitem', { name: 'Descartar' }),
    )
    await expect(args.onDiscard).toHaveBeenCalledTimes(1)
    await waitFor(() =>
      expect(screen.queryByRole('menuitem')).not.toBeInTheDocument(),
    )

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )

    await userEvent.click(
      within(canvasElement).getByRole('button', {
        name: 'Abrir publicação sem processo',
      }),
    )
    const unlinkedPopup = await screen.findByRole('dialog', {
      name: 'Intimação · TJSP',
    })
    const unlinked = within(unlinkedPopup)
    await waitFor(() =>
      expect(unlinked.getByText('Não cadastrado')).toBeVisible(),
    )
    await expect(
      unlinked.queryByRole('button', { name: 'Criar prazo' }),
    ).not.toBeInTheDocument()
    await expect(
      unlinked.queryByRole('button', { name: 'Abrir processo' }),
    ).not.toBeInTheDocument()
    await userEvent.click(
      unlinked.getByRole('button', { name: 'Cadastrar processo' }),
    )
    await expect(args.onCreateLawsuit).toHaveBeenCalledTimes(1)
    await userEvent.click(
      unlinked.getByRole('button', { name: 'Vincular a um processo' }),
    )
    await expect(args.onLinkLawsuit).toHaveBeenCalledTimes(1)
  },
}
