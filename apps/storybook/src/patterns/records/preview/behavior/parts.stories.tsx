import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  RecordPreviewDecisions,
  RecordPreviewRegister,
} from '@tc96/ui/patterns'
import { expect, screen, within } from 'storybook/test'
import { ComposedRecordPreviewParts } from '../record-preview-parts.tsx'

const cover = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90"><rect width="160" height="90" fill="#8b9bb4"/></svg>',
)}`

const meta = {
  tags: ['!autodocs'],
  title: 'Patterns/Records/Preview/Behavior',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const FrameNotFound: Story = {
  render: () => <ComposedRecordPreviewParts hasRecord={false} part="frame" />,
  play: async () => {
    const dialog = await screen.findByRole('dialog', { name: 'Record' })

    await expect(within(dialog).getByText('Record not found')).toBeVisible()
    await expect(
      within(dialog).queryByRole('button', { name: 'Open as page' }),
    ).toBeNull()
    await expect(
      within(dialog).getByRole('button', { name: 'Close preview' }),
    ).toBeVisible()
  },
}

export const FrameExpand: Story = {
  render: () => <ComposedRecordPreviewParts part="frame" />,
  play: async () => {
    const dialog = await screen.findByRole('dialog', {
      name: 'Implement onboarding',
    })

    await expect(
      within(dialog).getByRole('button', { name: 'Open as page' }),
    ).toBeVisible()
    await expect(within(dialog).queryByText('Record not found')).toBeNull()
  },
}

export const FrameLoading: Story = {
  render: () => (
    <ComposedRecordPreviewParts
      hasRecord={false}
      part="frame"
      status="loading"
    />
  ),
  play: async () => {
    const dialog = await screen.findByRole('dialog', { name: 'Record' })
    const busy = within(dialog).getByRole('status', {
      name: 'Loading the record',
    })

    await expect(busy).toHaveAttribute('aria-busy', 'true')
    await expect(busy.closest('[data-slot="record-group"]')).not.toBeNull()
    await expect(
      within(dialog).queryByRole('button', { name: 'More actions' }),
    ).toBeNull()
    await expect(
      within(dialog).queryByRole('button', { name: 'Open as page' }),
    ).toBeNull()
    await expect(
      within(dialog).getByRole('button', { name: 'Close preview' }),
    ).toBeVisible()
  },
}

export const CoverImage: Story = {
  render: () => <ComposedRecordPreviewParts cover={cover} part="cover" />,
  play: async () => {
    const dialog = await screen.findByRole('dialog', {
      name: 'Implement onboarding',
    })
    const image = within(dialog).getByRole('img', {
      name: 'Cover of the record',
    })

    await expect(image).toBeVisible()
    await expect(image.parentElement).toHaveAttribute(
      'data-slot',
      'record-preview-cover',
    )
  },
}

export const CoverFallback: Story = {
  render: () => <ComposedRecordPreviewParts part="cover" />,
  play: async () => {
    const dialog = await screen.findByRole('dialog', {
      name: 'Implement onboarding',
    })

    await expect(
      within(dialog).queryByRole('img', { name: 'Cover of the record' }),
    ).toBeNull()
    await expect(
      dialog.querySelector('[data-slot="record-preview-cover"]'),
    ).toBeVisible()
  },
}

export const RegisterRows: Story = {
  render: () => (
    <RecordPreviewRegister
      copyLabel="Copy ID"
      id={{ label: 'ID', value: 'rec_01HZX9' }}
      locale="en-US"
      title="Record"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('ID')).toBeVisible()
    await expect(canvas.getByText('rec_01HZX9')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Copy ID' })).toBeVisible()
    await expect(canvas.queryByText('Created')).toBeNull()
    await expect(canvas.queryByText('Updated')).toBeNull()
    await expect(canvas.queryByText('Created by')).toBeNull()
  },
}

export const DecisionsName: Story = {
  render: () => (
    <RecordPreviewDecisions label="Decide on the record">
      <button type="button">Confirm</button>
      <button type="button">Reject</button>
    </RecordPreviewDecisions>
  ),
  play: async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole('group', {
      name: 'Decide on the record',
    })

    await expect(group).toHaveAttribute('data-slot', 'record-preview-decisions')
    await expect(
      within(group).getByRole('button', { name: 'Confirm' }),
    ).toBeVisible()
    await expect(
      within(group).getByRole('button', { name: 'Reject' }),
    ).toBeVisible()
  },
}

export const DecisionsFooter: Story = {
  render: () => <ComposedRecordPreviewParts part="decisions" />,
  play: async () => {
    const dialog = await screen.findByRole('dialog', {
      name: 'Implement onboarding',
    })
    const group = within(dialog).getByRole('group', {
      name: 'Decide on the record',
    })

    await expect(group.closest('[data-slot="sheet-footer"]')).not.toBeNull()
    await expect(group.closest('[data-slot="sheet-panel"]')).toBeNull()
  },
}
