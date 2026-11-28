import type { ArgTypes } from '@storybook/react-vite'

export interface RecordPreviewControls {
  body: boolean
  closeLabel: string
  description: string
  expand: boolean
  expandLabel: string
  footer: boolean
  longContent: boolean
  more: boolean
  moreLabel: string
  title: string
  trigger: string
}

export const recordPreviewControlArgs: RecordPreviewControls = {
  body: false,
  closeLabel: 'Close preview',
  description: 'Sprint 12',
  expand: true,
  expandLabel: 'Open as page',
  footer: false,
  longContent: false,
  more: true,
  moreLabel: 'More actions',
  title: 'Implement onboarding',
  trigger: 'Open preview',
}

export const recordPreviewControlArgTypes: Partial<
  ArgTypes<RecordPreviewControls>
> = {
  body: {
    control: 'boolean',
    description:
      'Wraps the content in `RecordPreviewBody`, which stacks it in a column with a 16px gap.',
  },
  closeLabel: {
    control: 'text',
    description:
      'The `closeLabel` of `RecordPreview`, which names the close button.',
  },
  description: {
    control: 'text',
    description:
      'The `description` of `RecordPreview`, under the title; empty removes it.',
  },
  expand: {
    control: 'boolean',
    description:
      'Passes `expand`, which renders the open button before the close button.',
  },
  expandLabel: {
    control: 'text',
    description:
      'The `label` of `expand`, which names the open button and fills its tooltip.',
  },
  footer: {
    control: 'boolean',
    description:
      'Passes a Cancel and a Restore button in `footer`, below the scrolling panel.',
  },
  longContent: {
    control: 'boolean',
    description:
      'Passes 24 paragraphs as `children` instead of 3, so the panel scrolls.',
  },
  more: {
    control: 'boolean',
    description:
      'Passes `more` with two actions, which renders the more button first.',
  },
  moreLabel: {
    control: 'text',
    description: 'The `label` of `more`, which names the more button.',
  },
  title: {
    control: 'text',
    description: 'The `title` of `RecordPreview`, which names the dialog.',
  },
  trigger: {
    control: 'text',
    description: 'Text of the button that opens the preview again.',
  },
}
