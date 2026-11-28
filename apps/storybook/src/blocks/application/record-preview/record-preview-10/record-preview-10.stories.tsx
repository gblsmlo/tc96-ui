import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  RecordPreview10 as RecordPreview10Block,
  type RecordPreview10Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-10'
import { Button } from '@tc96/ui/button'
import { useState } from 'react'
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'
import {
  FAILURE_TIME_ZONE,
  failurePreviewLabels,
  openFailureRecord,
  resolvedFailureRecord,
} from '../fixtures/record-preview-10.ts'

interface FailureCase {
  label: string
  readOnly: boolean
  record: RecordPreview10Record
}

const cases: readonly FailureCase[] = [
  { label: 'Abrir falha aberta', readOnly: false, record: openFailureRecord },
  {
    label: 'Abrir falha resolvida',
    readOnly: false,
    record: resolvedFailureRecord,
  },
  {
    label: 'Abrir falha somente leitura',
    readOnly: true,
    record: openFailureRecord,
  },
]

interface FailurePreviewProps {
  onExpand?: () => void
  onOpenLawsuit?: () => void
  onOpenRuns?: () => void
  onResolve?: () => void
}

function FailurePreview(actions: FailurePreviewProps) {
  const [open, setOpen] = useState(true)
  const [current, setCurrent] = useState<FailureCase>(cases[0] as FailureCase)

  return (
    <>
      <div className="flex gap-2">
        {cases.map((item) => (
          <Button
            key={item.label}
            onClick={() => {
              setCurrent(item)
              setOpen(true)
            }}
            variant="outline"
          >
            {item.label}
          </Button>
        ))}
      </div>
      <RecordPreview10Block
        {...actions}
        labels={failurePreviewLabels}
        locale="pt-BR"
        onOpenChange={setOpen}
        open={open}
        readOnly={current.readOnly}
        record={current.record}
        timeZone={FAILURE_TIME_ZONE}
      />
    </>
  )
}

const meta = {
  component: FailurePreview,
  parameters: { layout: 'centered' },
  tags: ['!autodocs'],
  title: 'Blocks/Application/Record Preview/RecordPreview10',
} satisfies Meta<typeof FailurePreview>

export default meta

type Story = StoryObj<typeof meta>

export const RecordPreview10: Story = {
  args: {
    onExpand: fn(),
    onOpenLawsuit: fn(),
    onOpenRuns: fn(),
    onResolve: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The quick view of a capture failure (Falha), after the failure preview of lemind: the title is the failure type and the description its origin and state. The groups follow lemind: Janela que pode estar sem publicações, Publicação sem proposta, the silence of an OAB, Execuções da captura, Quem viu and Resolução, each only when the record has the data (Quem viu and Resolução always render). The record carries prepared names, days as `YYYY-MM-DD` and instants as ISO strings, formatted by `locale` and `timeZone`; every sentence is a function in `labels`. The footer has Fechar, Copiar detalhes para o suporte (the block copies `record.supportText` itself and reports the result) and Resolver, which renders only for an open failure when `onResolve` is passed; `readOnly` removes the footer. Ver execuções, Ver no Processo and Expand render only with `onOpenRuns`, `onOpenLawsuit` and `onExpand`, and the resolve dialog stays in the app.',
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const popup = await screen.findByRole('dialog', {
      name: 'OAB sem publicações',
    })
    const dialog = within(popup)

    await waitFor(() =>
      expect(
        popup.querySelector('[data-slot="record-preview-body"]'),
      ).toBeVisible(),
    )
    await expect(dialog.getByText('Sistema · Aberta')).toBeVisible()
    await expect(
      dialog.getByText('OAB 123456/SP: 20/11/2026 a 09/12/2026'),
    ).toBeVisible()
    await expect(
      dialog.getByText(
        'OAB 123456/SP: 14 dias úteis sem publicações, acima do maior intervalo de 9 dias.',
      ),
    ).toBeVisible()
    await expect(
      dialog.getByText('Última publicação em 19/11/2026.'),
    ).toBeVisible()
    await expect(dialog.getByText('Titular: Ana Lima')).toBeVisible()
    await expect(dialog.getByText(/Bruno Reis em 09\/12\/2026/)).toBeVisible()
    await expect(
      dialog.getByText('Aberta, aguardando resolução.'),
    ).toBeVisible()
    await expect(
      dialog.getByRole('region', { name: 'Execuções da captura' }),
    ).toBeVisible()

    await userEvent.click(dialog.getByRole('button', { name: 'Ver execuções' }))
    await expect(args.onOpenRuns).toHaveBeenCalledTimes(1)
    await userEvent.click(
      dialog.getByRole('button', { name: 'Ver no Processo' }),
    )
    await expect(args.onOpenLawsuit).toHaveBeenCalledTimes(1)
    await userEvent.click(
      dialog.getByRole('button', { name: 'Abrir em Falhas' }),
    )
    await expect(args.onExpand).toHaveBeenCalledTimes(1)
    await userEvent.click(
      dialog.getByRole('button', { name: 'Copiar detalhes para o suporte' }),
    )
    await waitFor(() => expect(dialog.getByRole('status')).toBeVisible())
    await userEvent.click(dialog.getByRole('button', { name: 'Resolver' }))
    await expect(args.onResolve).toHaveBeenCalledTimes(1)

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )

    await userEvent.click(
      within(canvasElement).getByRole('button', {
        name: 'Abrir falha resolvida',
      }),
    )
    const resolvedPopup = await screen.findByRole('dialog', {
      name: 'Captura parada',
    })
    const resolved = within(resolvedPopup)
    await waitFor(() =>
      expect(resolved.getByText('Conferido à mão')).toBeVisible(),
    )
    await expect(
      resolved.getByText('Conferido em 09/12/2026: 2 publicações encontradas.'),
    ).toBeVisible()
    await expect(
      resolved.getByText(/Por Ana Lima em 09\/12\/2026/),
    ).toBeVisible()
    await expect(
      resolved.queryByRole('button', { name: 'Resolver' }),
    ).not.toBeInTheDocument()
    await expect(
      resolved.queryByRole('button', { name: 'Ver no Processo' }),
    ).not.toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )

    await userEvent.click(
      within(canvasElement).getByRole('button', {
        name: 'Abrir falha somente leitura',
      }),
    )
    const readOnlyPopup = await screen.findByRole('dialog', {
      name: 'OAB sem publicações',
    })
    const readOnly = within(readOnlyPopup)
    await waitFor(() =>
      expect(readOnly.getByText('Titular: Ana Lima')).toBeVisible(),
    )
    await expect(
      readOnly.queryByRole('button', { name: 'Resolver' }),
    ).not.toBeInTheDocument()
    await expect(
      readOnly.queryByRole('button', {
        name: 'Copiar detalhes para o suporte',
      }),
    ).not.toBeInTheDocument()
    await expect(
      readOnly.queryByRole('button', { name: 'Fechar' }),
    ).not.toBeInTheDocument()
  },
}
