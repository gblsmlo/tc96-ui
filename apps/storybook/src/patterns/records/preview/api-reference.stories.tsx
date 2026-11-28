import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecordPreview, RecordPreviewBody } from '@tc96/ui/patterns'
import { Slot } from '../../../test-utils/anatomy-slot'

const ignore = () => undefined

const meta = {
  parameters: {
    docs: { story: { iframeHeight: '520px', inline: false } },
  },
  tags: ['!autodocs', '!dev'],
  title: 'Patterns/Records/Preview/API Reference',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Anatomy: Story = {
  render: () => (
    <RecordPreview
      closeLabel="closeLabel"
      description={<Slot name="description" />}
      expand={{ label: 'expand', onClick: ignore }}
      footer={<Slot name="footer" />}
      more={{
        actions: [{ id: 'action', label: 'more.actions' }],
        label: 'more',
        onAction: ignore,
      }}
      onOpenChange={ignore}
      open
      title={<Slot name="title" />}
    >
      <RecordPreviewBody>
        <Slot name="RecordPreviewBody" />
      </RecordPreviewBody>
    </RecordPreview>
  ),
}
