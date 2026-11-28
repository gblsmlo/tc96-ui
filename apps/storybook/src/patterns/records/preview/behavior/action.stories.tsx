import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecordPreview } from '@tc96/ui/patterns'
import {
  expect,
  fireEvent,
  fn,
  userEvent,
  waitFor,
  within,
} from 'storybook/test'

const onAction = fn()
const onExpand = fn()

const page = (canvasElement: HTMLElement) =>
  within(canvasElement.ownerDocument.body)

const tooltipPopup = (canvasElement: HTMLElement) =>
  canvasElement.ownerDocument.querySelector('[data-slot="tooltip-popup"]')

const openDialog = (canvasElement: HTMLElement) =>
  page(canvasElement).findByRole('dialog', { name: 'Task 42' })

const meta = {
  args: {
    children: <p>Body</p>,
    closeLabel: 'Close preview',
    expand: { label: 'Open as page', onClick: onExpand },
    more: {
      actions: [
        { id: 'duplicate', label: 'Duplicate' },
        { disabled: true, id: 'archive', label: 'Archive' },
      ],
      label: 'More actions',
      onAction,
    },
    onOpenChange: fn(),
    open: true,
    title: 'Task 42',
  },
  render: (args) => <RecordPreview {...args} />,
  tags: ['!autodocs'],
  title: 'Patterns/Records/Preview/Behavior',
} satisfies Meta<typeof RecordPreview>

export default meta

type Story = StoryObj<typeof meta>

export const ActionsOrder: Story = {
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement)
    const buttons = ['More actions', 'Open as page', 'Close preview'].map(
      (name) => within(dialog).getByRole('button', { name }),
    )

    for (const button of buttons) {
      await expect(button.textContent).toBe('')
      await expect(button.querySelector('svg')).not.toBeNull()
    }
    await expect(
      buttons[0].compareDocumentPosition(buttons[1]) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    await expect(
      buttons[1].compareDocumentPosition(buttons[2]) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  },
}

export const MoreSelect: Story = {
  play: async ({ canvasElement }) => {
    onAction.mockClear()
    const dialog = await openDialog(canvasElement)

    await userEvent.click(
      within(dialog).getByRole('button', { name: 'More actions' }),
    )
    await userEvent.click(
      await page(canvasElement).findByRole('menuitem', { name: 'Duplicate' }),
    )

    await expect(onAction).toHaveBeenCalledOnce()
    await expect(onAction).toHaveBeenCalledWith('duplicate')
  },
}

export const MoreDisabled: Story = {
  play: async ({ canvasElement }) => {
    onAction.mockClear()
    const dialog = await openDialog(canvasElement)

    await userEvent.click(
      within(dialog).getByRole('button', { name: 'More actions' }),
    )
    const archive = await page(canvasElement).findByRole('menuitem', {
      name: 'Archive',
    })
    fireEvent.click(archive)

    await expect(archive).toHaveAttribute('aria-disabled', 'true')
    await expect(onAction).not.toHaveBeenCalled()
  },
}

export const MoreEmpty: Story = {
  args: { more: { actions: [], label: 'More actions', onAction } },
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement)

    await expect(
      within(dialog).queryByRole('button', { name: 'More actions' }),
    ).toBeNull()
    await expect(
      within(dialog).getByRole('button', { name: 'Open as page' }),
    ).toBeVisible()
  },
}

export const OpenClick: Story = {
  play: async ({ canvasElement }) => {
    onExpand.mockClear()
    const dialog = await openDialog(canvasElement)

    await userEvent.click(
      within(dialog).getByRole('button', { name: 'Open as page' }),
    )

    await expect(onExpand).toHaveBeenCalledOnce()
  },
}

export const OpenTooltip: Story = {
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement)
    const open = within(dialog).getByRole('button', { name: 'Open as page' })

    await waitFor(() => expect(dialog).toHaveFocus())
    await userEvent.tab()
    await userEvent.tab()
    await expect(open).toHaveFocus()
    await waitFor(
      () =>
        expect(tooltipPopup(canvasElement)?.textContent).toBe('Open as page'),
      { timeout: 5000 },
    )
  },
}
