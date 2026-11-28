import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  RecordPreview7 as RecordPreview7Block,
  type RecordPreview7Changes,
  type RecordPreview7Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-7'
import { Button } from '@tc96/ui/button'
import { useState } from 'react'
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'
import {
  MATTER_TIME_ZONE,
  matterContracts,
  matterPeople,
  matterPhases,
  matterPreviewLabels,
  matterRecord,
  matterTags,
} from '../fixtures/record-preview-7.ts'

function MatterPreview({
  onExpand,
  onRecordChange,
}: {
  onExpand?: () => void
  onRecordChange?: (changes: RecordPreview7Changes) => void
}) {
  const [open, setOpen] = useState(true)
  const [expandable, setExpandable] = useState(true)
  const [matter, setMatter] = useState<RecordPreview7Record>(matterRecord)

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            setExpandable(true)
            setOpen(true)
          }}
          variant="outline"
        >
          Abrir caso
        </Button>
        <Button
          onClick={() => {
            setExpandable(false)
            setOpen(true)
          }}
          variant="outline"
        >
          Abrir sem tela completa
        </Button>
      </div>
      <RecordPreview7Block
        contracts={matterContracts}
        labels={matterPreviewLabels}
        locale="pt-BR"
        onExpand={expandable ? onExpand : undefined}
        onOpenChange={setOpen}
        onRecordChange={(changes) => {
          onRecordChange?.(changes)
          setMatter((current) => ({ ...current, ...changes }))
        }}
        open={open}
        people={matterPeople}
        phases={matterPhases}
        record={matter}
        tags={matterTags}
        timeZone={MATTER_TIME_ZONE}
      />
    </>
  )
}

const meta = {
  component: MatterPreview,
  parameters: { layout: 'centered' },
  tags: ['!autodocs'],
  title: 'Blocks/Application/Record Preview/RecordPreview7',
} satisfies Meta<typeof MatterPreview>

export default meta

type Story = StoryObj<typeof meta>

export const RecordPreview7: Story = {
  args: { onExpand: fn(), onRecordChange: fn() },
  parameters: {
    docs: {
      description: {
        story:
          'The quick view of a legal matter (Caso), after the legal record preview of lemind and consistent with `RecordPreview4`, with `record.description` under the title and every property in its `plain` variant: Propriedades (Número, empty for a matter, Fase, Contrato, Responsável and Tags) and Registros, collapsed, with the ID and the read-only timestamps. Phases, contracts, tags and people are the app data. The `status` of the pattern (loading, error, not found) and `onRetry` are forwarded, and a `null` record shows the not found state under `labels.fallbackTitle`; Expand renders only with `onExpand`.',
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const popup = await screen.findByRole('dialog', {
      name: 'Rescisão de contrato de empreitada',
    })
    const dialog = within(popup)

    await expect(popup).toHaveAccessibleDescription(
      'Consulta sobre a rescisão do contrato de empreitada.',
    )
    await waitFor(() =>
      expect(
        popup.querySelector('[data-slot="record-preview-body"]'),
      ).toBeVisible(),
    )
    await expect(
      dialog.getByRole('region', { name: 'Propriedades' }),
    ).toBeVisible()
    await expect(
      dialog.getByRole('button', { name: 'Registros' }),
    ).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(
      dialog.getByRole('button', { name: 'Abrir em tela completa' }),
    )
    await expect(args.onExpand).toHaveBeenCalledTimes(1)

    await userEvent.click(
      dialog.getByRole('combobox', { name: 'Fase: Análise inicial' }),
    )
    await userEvent.click(
      await screen.findByRole('option', { name: 'Negociação' }),
    )
    await waitFor(() =>
      expect(args.onRecordChange).toHaveBeenCalledWith({
        phaseId: 'negotiation',
      }),
    )

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )

    await userEvent.click(
      within(canvasElement).getByRole('button', {
        name: 'Abrir sem tela completa',
      }),
    )
    const plainPopup = await screen.findByRole('dialog', {
      name: 'Rescisão de contrato de empreitada',
    })
    await expect(
      within(plainPopup).queryByRole('button', {
        name: 'Abrir em tela completa',
      }),
    ).not.toBeInTheDocument()
  },
}
