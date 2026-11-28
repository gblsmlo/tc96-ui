import { ImageIcon } from '@phosphor-icons/react'
import { Button } from '@tc96/ui/button'
import { IconFrame } from '@tc96/ui/icon-frame'
import {
  RecordPreviewBody,
  RecordPreviewCover,
  RecordPreviewDecisions,
  RecordPreviewFrame,
  RecordPreviewRegister,
  type RecordPreviewStatus,
  type RecordPreviewStatusLabels,
} from '@tc96/ui/patterns'
import { useState } from 'react'

export type RecordPreviewPart = 'cover' | 'decisions' | 'frame' | 'register'

export const recordPreviewStatusLabels: RecordPreviewStatusLabels = {
  errorDescription: 'Close the details and try again.',
  errorTitle: 'The record could not be loaded',
  loading: 'Loading the record',
  notFoundDescription: 'It may have been deleted or moved to another page.',
  notFoundTitle: 'Record not found',
  retry: 'Try again',
}

const people = [
  { fallback: 'AL', label: 'Ana Lima', value: 'ana' },
  { fallback: 'BR', label: 'Bruno Reis', value: 'bruno' },
]

const ignore = () => undefined

const moreActions = [{ id: 'duplicate', label: 'Duplicate' }]

interface ComposedRecordPreviewPartsProps {
  cover?: string
  hasRecord?: boolean
  part: RecordPreviewPart
  status?: RecordPreviewStatus
}

export const ComposedRecordPreviewParts = ({
  cover,
  hasRecord = true,
  part,
  status = 'ready',
}: Readonly<ComposedRecordPreviewPartsProps>) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        Open preview
      </Button>
      <RecordPreviewFrame
        closeLabel="Close preview"
        description={hasRecord ? 'Sprint 12' : undefined}
        expand={{ label: 'Open as page', onClick: ignore }}
        fallbackTitle="Record"
        footer={
          part === 'decisions' ? (
            <RecordPreviewDecisions label="Decide on the record">
              <Button size="sm" variant="outline">
                Confirm
              </Button>
              <Button size="sm" variant="ghost">
                Reject
              </Button>
            </RecordPreviewDecisions>
          ) : undefined
        }
        hasRecord={hasRecord}
        more={{ actions: moreActions, label: 'More actions', onAction: ignore }}
        onOpenChange={setOpen}
        open={open}
        status={status}
        statusLabels={recordPreviewStatusLabels}
        title={hasRecord ? 'Implement onboarding' : undefined}
      >
        <RecordPreviewBody>
          {part === 'cover' ? (
            <RecordPreviewCover
              alt="Cover of the record"
              fallback={
                <IconFrame shape="rounded" size="xl">
                  <ImageIcon aria-hidden="true" />
                </IconFrame>
              }
              src={cover}
            />
          ) : null}
          {part === 'decisions' ? (
            <p className="text-sm">
              The deadline was read from the publication of 14 October.
            </p>
          ) : null}
          {part === 'register' ? (
            <RecordPreviewRegister
              author={{
                label: 'Created by',
                options: people,
                placeholder: 'No author',
                value: 'ana',
              }}
              copyLabel="Copy ID"
              createdAt={{
                label: 'Created',
                value: '2026-10-14T12:00:00.000Z',
              }}
              id={{ label: 'ID', value: 'rec_01HZX9' }}
              locale="en-US"
              timeZone="UTC"
              title="Record"
              updatedAt={{
                label: 'Updated',
                value: '2026-11-02T15:30:00.000Z',
              }}
            />
          ) : null}
        </RecordPreviewBody>
      </RecordPreviewFrame>
    </>
  )
}
