import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  RecordPreview11 as RecordPreview11Block,
  type RecordPreview11Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-11'
import { Button } from '@tc96/ui/button'
import { useState } from 'react'
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'
import {
  doneRunRecord,
  failedRunRecord,
  RUN_TIME_ZONE,
  runPreviewLabels,
} from '../fixtures/record-preview-11.ts'

const records: readonly { label: string; record: RecordPreview11Record }[] = [
  { label: 'Abrir execução com falha', record: failedRunRecord },
  { label: 'Abrir execução concluída', record: doneRunRecord },
]

function RunPreview({
  onOpenFailure,
}: {
  onOpenFailure?: (failureId: string) => void
}) {
  const [open, setOpen] = useState(true)
  const [current, setCurrent] = useState<RecordPreview11Record>(failedRunRecord)

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
      <RecordPreview11Block
        labels={runPreviewLabels}
        locale="pt-BR"
        onOpenChange={setOpen}
        onOpenFailure={onOpenFailure}
        open={open}
        record={current}
        timeZone={RUN_TIME_ZONE}
      />
    </>
  )
}

const meta = {
  component: RunPreview,
  parameters: { layout: 'centered' },
  tags: ['!autodocs'],
  title: 'Blocks/Application/Record Preview/RecordPreview11',
} satisfies Meta<typeof RunPreview>

export default meta

type Story = StoryObj<typeof meta>

export const RecordPreview11: Story = {
  args: { onOpenFailure: fn() },
  parameters: {
    docs: {
      description: {
        story:
          'The quick view of a capture run (Execução), after the run preview of lemind, every property read-only and `plain`: Propriedades (Tipo, Situação, Na fila desde, Início, Fim and Duração) and Resultado (Publicações, Andamentos, Último erro and Falha). The title is the run type and the description its state. Instants come as ISO strings and are formatted by `locale` and `timeZone`; the duration, the counts and the error text are prepared by the app, with `errorSimulated` adding the Simulado badge. The Falha row with Ver falha renders only when the run has a `failureId` and `onOpenFailure` is passed, which receives that id.',
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const popup = await screen.findByRole('dialog', {
      name: 'Varredura do DJEN',
    })
    const dialog = within(popup)

    await waitFor(() =>
      expect(
        popup.querySelector('[data-slot="record-preview-body"]'),
      ).toBeVisible(),
    )
    await expect(dialog.getAllByText('Falhou')).toHaveLength(2)
    await expect(dialog.getByText(/09\/12\/2026.*10:00/)).toBeVisible()
    await expect(dialog.getByText('2 min 5 s')).toBeVisible()
    await expect(dialog.getByText('Simulado')).toBeVisible()
    await expect(dialog.getByText(/O DJEN não respondeu a tempo/)).toBeVisible()
    await expect(dialog.getByText('—')).toBeVisible()

    await userEvent.click(dialog.getByRole('button', { name: 'Ver falha' }))
    await expect(args.onOpenFailure).toHaveBeenCalledTimes(1)
    await expect(args.onOpenFailure).toHaveBeenCalledWith('88')

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )

    await userEvent.click(
      within(canvasElement).getByRole('button', {
        name: 'Abrir execução concluída',
      }),
    )
    const donePopup = await screen.findByRole('dialog', {
      name: 'Busca por OAB',
    })
    const done = within(donePopup)
    await waitFor(() => expect(done.getByText('Sem erro')).toBeVisible())
    await expect(done.getByText('48 s')).toBeVisible()
    await expect(done.getByText('12')).toBeVisible()
    await expect(
      done.queryByRole('button', { name: 'Ver falha' }),
    ).not.toBeInTheDocument()
  },
}
