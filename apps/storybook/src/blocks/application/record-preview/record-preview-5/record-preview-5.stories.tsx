import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  RecordPreview5 as RecordPreview5Block,
  type RecordPreview5Changes,
  type RecordPreview5Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-5'
import { Button } from '@tc96/ui/button'
import { useState } from 'react'
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'
import {
  DOCUMENTS_TIME_ZONE,
  documentRecord,
  documentsPeople,
  documentsPreviewLabels,
  documentsTypeColors,
  imageRecord,
  linkRecord,
} from '../fixtures/record-preview-5.ts'

const records: readonly { label: string; record: RecordPreview5Record }[] = [
  { label: 'Abrir arquivo', record: documentRecord },
  { label: 'Abrir imagem', record: imageRecord },
  { label: 'Abrir link', record: linkRecord },
]

function DocumentPreview({
  onRecordChange,
}: {
  onRecordChange?: (changes: RecordPreview5Changes) => void
}) {
  const [open, setOpen] = useState(true)
  const [current, setCurrent] = useState<RecordPreview5Record>(documentRecord)

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
      <RecordPreview5Block
        labels={documentsPreviewLabels}
        locale="pt-BR"
        onDownload={() => undefined}
        onExpand={() => undefined}
        onOpenChange={setOpen}
        onOpenRecord={() => undefined}
        onRecordChange={(changes) => {
          onRecordChange?.(changes)
          setCurrent((record) => ({ ...record, ...changes }))
        }}
        open={open}
        people={documentsPeople}
        record={current}
        timeZone={DOCUMENTS_TIME_ZONE}
        typeColors={documentsTypeColors}
      />
    </>
  )
}

const meta = {
  component: DocumentPreview,
  parameters: { layout: 'centered' },
  tags: ['!autodocs'],
  title: 'Blocks/Application/Record Preview/RecordPreview5',
} satisfies Meta<typeof DocumentPreview>

export default meta

type Story = StoryObj<typeof meta>

export const RecordPreview5: Story = {
  args: { onRecordChange: fn() },
  parameters: {
    docs: {
      description: {
        story:
          'The quick view of a row of the `Blocks/Data/Documents` collection, opened from `onOpen(recordId)`, with every property in its `plain` variant: Propriedades (Nome editable unless `record.canEdit` is `false`, Tipo, Responsável, Tamanho for a file, Endereço with a copy action for a link, Vinculado a and Fixado) and Registro, collapsed, with the ID and the read-only timestamps. An image with `previewUrl` opens with the picture on top, and the header has the Mais ações menu (open, download for a file) and expand, each only when its callback is passed.',
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const popup = await screen.findByRole('dialog', {
      name: 'Contrato de fornecimento assinado.pdf',
    })
    const dialog = within(popup)

    await expect(popup).toHaveAccessibleDescription(
      'Contrato de fornecimento com vigência de 24 meses.',
    )
    await userEvent.click(dialog.getByRole('button', { name: 'Mais ações' }))
    await expect(
      await screen.findByRole('menuitem', { name: 'Baixar' }),
    ).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('menu')).not.toBeInTheDocument(),
    )
    await expect(dialog.getByText('2,4 MB')).toBeVisible()
    await expect(
      dialog.getByRole('button', { name: 'Registro' }),
    ).toHaveAttribute('aria-expanded', 'false')

    const name = dialog.getByRole('textbox', { name: 'Nome' })
    await userEvent.clear(name)
    await userEvent.type(name, 'Contrato revisado.pdf{Enter}')
    await waitFor(() =>
      expect(args.onRecordChange).toHaveBeenCalledWith({
        name: 'Contrato revisado.pdf',
      }),
    )

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )

    await userEvent.click(
      within(canvasElement).getByRole('button', { name: 'Abrir link' }),
    )
    const linkPopup = await screen.findByRole('dialog', {
      name: 'Consulta processual do TJSP',
    })
    const linkDialog = within(linkPopup)
    await waitFor(() =>
      expect(
        linkDialog.getByText('https://esaj.tjsp.jus.br/cpopg/open.do'),
      ).toBeVisible(),
    )
    await userEvent.click(
      linkDialog.getByRole('button', { name: 'Mais ações' }),
    )
    await expect(
      await screen.findByRole('menuitem', { name: 'Abrir' }),
    ).toBeVisible()
    await expect(
      screen.queryByRole('menuitem', { name: 'Baixar' }),
    ).not.toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
  },
}
