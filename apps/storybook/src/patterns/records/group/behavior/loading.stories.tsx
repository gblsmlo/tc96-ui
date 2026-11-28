import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecordGroup, RecordGroupRow } from '@tc96/ui/patterns'
import { expect, within } from 'storybook/test'

const meta = {
  tags: ['!autodocs'],
  title: 'Patterns/Records/Group/Behavior',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const LoadingRows: Story = {
  render: () => (
    <div className="w-96">
      <RecordGroup
        footer={<button type="button">View history</button>}
        loading
        loadingLabel="Loading the details"
        title="Details"
      >
        <RecordGroupRow label="Type">Document request</RecordGroupRow>
      </RecordGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole('region', { name: 'Details' })
    const busy = canvas.getByRole('status', { name: 'Loading the details' })

    await expect(group).toHaveAttribute('aria-busy', 'true')
    await expect(busy).toHaveAttribute('aria-busy', 'true')
    await expect(busy).toHaveAttribute('data-slot', 'record-group-loading')
    await expect(
      busy.querySelectorAll('[data-slot="skeleton"]').length,
    ).toBeGreaterThan(0)
    await expect(canvas.queryByText('Document request')).toBeNull()
    await expect(
      canvas.queryByRole('button', { name: 'View history' }),
    ).toBeNull()
  },
}

export const LoadingDone: Story = {
  render: () => (
    <div className="w-96">
      <RecordGroup loadingLabel="Loading the details" title="Details">
        <RecordGroupRow label="Type">Document request</RecordGroupRow>
      </RecordGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('region', { name: 'Details' }),
    ).not.toHaveAttribute('aria-busy')
    await expect(canvas.queryByRole('status')).toBeNull()
    await expect(canvas.getByText('Document request')).toBeVisible()
  },
}
