import type { Meta, StoryObj } from '@storybook/react-vite'
import { recordPreviewControlArgs } from './record-preview-controls.ts'
import { ComposedRecordPreview } from './record-preview-layouts.tsx'
import { ComposedRecordPreviewParts } from './record-preview-parts.tsx'

const meta = {
  tags: ['!autodocs'],
  title: 'Patterns/Records/Preview/Layouts',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const TitleOnly: Story = {
  render: () => (
    <ComposedRecordPreview
      {...recordPreviewControlArgs}
      description=""
      expand={false}
      more={false}
    />
  ),
}

export const WithBody: Story = {
  render: () => <ComposedRecordPreview {...recordPreviewControlArgs} body />,
}

export const WithFooter: Story = {
  render: () => <ComposedRecordPreview {...recordPreviewControlArgs} footer />,
}

export const LongContent: Story = {
  render: () => (
    <ComposedRecordPreview {...recordPreviewControlArgs} footer longContent />
  ),
}

export const Frame: Story = {
  render: () => <ComposedRecordPreviewParts part="frame" />,
}

export const Cover: Story = {
  render: () => <ComposedRecordPreviewParts part="cover" />,
}

export const Register: Story = {
  render: () => <ComposedRecordPreviewParts part="register" />,
}

export const Decisions: Story = {
  render: () => <ComposedRecordPreviewParts part="decisions" />,
}

export const LongTitle: Story = {
  render: () => (
    <ComposedRecordPreview
      {...recordPreviewControlArgs}
      title="Rework the onboarding flow so that the sign-up, the e-mail check and the first project share one continuous path"
    />
  ),
}
