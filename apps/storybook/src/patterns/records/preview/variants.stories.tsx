import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@tc96/ui/button'
import {
  RecordPreview,
  type RecordPreviewStatusLabels,
} from '@tc96/ui/patterns'
import { expect, fn, userEvent, within } from 'storybook/test'
import { recordPreviewControlArgs } from './record-preview-controls.ts'
import { ComposedRecordPreview } from './record-preview-layouts.tsx'

const statusLabels: Omit<RecordPreviewStatusLabels, 'loading'> = {
  errorDescription: 'Close the details and try again.',
  errorTitle: 'The task could not be loaded',
  notFoundDescription: 'It may have been deleted or moved to another page.',
  notFoundTitle: 'Task not found',
  retry: 'Try again',
}

const page = (canvasElement: HTMLElement) =>
  within(canvasElement.ownerDocument.body)

const meta = {
  args: {
    children: <p>Body</p>,
    closeLabel: 'Close preview',
    expand: { label: 'Open as page', onClick: fn() },
    footer: <Button>Restore</Button>,
    more: {
      actions: [{ id: 'duplicate', label: 'Duplicate' }],
      label: 'More actions',
      onAction: fn(),
    },
    onOpenChange: fn(),
    onRetry: fn(),
    open: true,
    statusLabels,
    title: 'Task 42',
  },
  render: (args) => <RecordPreview {...args} />,
  tags: ['!autodocs'],
  title: 'Patterns/Records/Preview/Variants',
} satisfies Meta<typeof RecordPreview>

export default meta

type Story = StoryObj<typeof meta>

const expectOnlyTheState = async (dialog: HTMLElement) => {
  await expect(
    within(dialog).queryByRole('button', { name: 'More actions' }),
  ).toBeNull()
  await expect(
    within(dialog).queryByRole('button', { name: 'Open as page' }),
  ).toBeNull()
  await expect(
    within(dialog).queryByRole('button', { name: 'Restore' }),
  ).toBeNull()
  await expect(within(dialog).queryByText('Body')).toBeNull()
  await expect(
    within(dialog).getByRole('button', { name: 'Close preview' }),
  ).toBeVisible()
}

export const Default: Story = {
  render: () => <ComposedRecordPreview {...recordPreviewControlArgs} />,
}

export const ErrorRetry: Story = {
  args: { status: 'error' },
  play: async ({ args, canvasElement }) => {
    const dialog = await page(canvasElement).findByRole('dialog', {
      name: 'Task 42',
    })
    const alert = within(dialog).getByRole('alert')

    await expect(
      within(alert).getByText('The task could not be loaded'),
    ).toBeVisible()
    await expect(
      within(alert).getByText('Close the details and try again.'),
    ).toBeVisible()
    await expectOnlyTheState(dialog)

    await userEvent.click(
      within(alert).getByRole('button', { name: 'Try again' }),
    )
    await expect(args.onRetry).toHaveBeenCalledTimes(1)
  },
}

export const NotFound: Story = {
  args: { status: 'not-found' },
  play: async ({ canvasElement }) => {
    const dialog = await page(canvasElement).findByRole('dialog', {
      name: 'Task 42',
    })

    await expect(within(dialog).getByText('Task not found')).toBeVisible()
    await expect(
      within(dialog).getByText(
        'It may have been deleted or moved to another page.',
      ),
    ).toBeVisible()
    await expect(
      within(dialog).queryByRole('button', { name: 'Try again' }),
    ).toBeNull()
    await expectOnlyTheState(dialog)
  },
}
