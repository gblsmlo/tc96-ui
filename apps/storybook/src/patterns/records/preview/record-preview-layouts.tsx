import { Button } from '@tc96/ui/button'
import { RecordPreview, RecordPreviewBody } from '@tc96/ui/patterns'
import { useState } from 'react'
import type { RecordPreviewControls } from './record-preview-controls.ts'

const shortParagraphs = [
  'The shell has no content of its own: the consumer passes the body.',
  "Groups, fields and widgets are the consumer's, stacked as it sees fit.",
  'The header and the footer stay in place while the panel scrolls.',
]

const moreActions = [
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'archive', label: 'Archive' },
]

const ignore = () => undefined

const longParagraphs = Array.from(
  { length: 24 },
  (_, index) =>
    `Line ${index + 1} of the record body. The panel scrolls while the header and the footer stay in place.`,
)

interface ComposedRecordPreviewProps extends RecordPreviewControls {
  defaultOpen?: boolean
}

export const ComposedRecordPreview = ({
  body,
  closeLabel,
  defaultOpen = true,
  description,
  expand,
  expandLabel,
  footer,
  longContent,
  more,
  moreLabel,
  title,
  trigger,
}: Readonly<ComposedRecordPreviewProps>) => {
  const [open, setOpen] = useState(defaultOpen)
  const paragraphs = (longContent ? longParagraphs : shortParagraphs).map(
    (text) => (
      <p className="text-sm" key={text}>
        {text}
      </p>
    ),
  )

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        {trigger}
      </Button>
      <RecordPreview
        closeLabel={closeLabel}
        description={description || undefined}
        expand={expand ? { label: expandLabel, onClick: ignore } : undefined}
        footer={
          footer ? (
            <>
              <Button onClick={() => setOpen(false)} variant="ghost">
                Cancel
              </Button>
              <Button>Restore</Button>
            </>
          ) : undefined
        }
        more={
          more
            ? { actions: moreActions, label: moreLabel, onAction: ignore }
            : undefined
        }
        onOpenChange={setOpen}
        open={open}
        title={title}
      >
        {body ? (
          <RecordPreviewBody>{paragraphs}</RecordPreviewBody>
        ) : (
          paragraphs
        )}
      </RecordPreview>
    </>
  )
}
