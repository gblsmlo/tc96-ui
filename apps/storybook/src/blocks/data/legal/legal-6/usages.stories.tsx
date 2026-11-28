import type { Meta, StoryObj } from '@storybook/react-vite'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import {
  Legal6,
  type Legal6Props,
  type Legal6Sort,
  type Legal6View,
} from '@tc96/ui/blocks/data/legal/legal-6'
import { useState } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'
import { fetchJson } from '../../../../mocks/api.ts'
import { legal6Handlers } from '../../../../mocks/legal-6.ts'
import {
  kinds,
  type Legal6QueuePage,
  type Legal6SavedViewConfig,
  owners,
} from '../fixtures/legal-6.ts'
import { useSavedViewsQuery } from '../legal-saved-views.ts'

const pathOf = (filters: Record<string, string | null>, cursor: number) => {
  const params = new URLSearchParams()
  for (const [name, value] of Object.entries(filters))
    if (value) params.set(name, value)
  if (cursor > 0) params.set('cursor', String(cursor))
  return `/data/legal/deadline-queue?${params}`
}

interface DeadlineQueuesProps
  extends Pick<
    Legal6Props,
    'onBulkConfirm' | 'onBulkOwnerChange' | 'onBulkReject'
  > {
  initialView?: Legal6View
}

const DeadlineQueues = ({
  initialView = 'mine',
  onBulkConfirm,
  onBulkOwnerChange,
  onBulkReject,
}: Readonly<DeadlineQueuesProps>) => {
  const queryClient = useQueryClient()
  const [view, setView] = useState<Legal6View>(initialView)
  const [sort, setSort] = useState<Legal6Sort>('fatal')
  const [owner, setOwner] = useState<string | null>(null)
  const [kind, setKind] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const views = useSavedViewsQuery<Legal6SavedViewConfig>('deadline-queue', {
    apply: (config) => {
      setView(config.view)
      setSort(config.sort)
      setOwner(config.ownerFilter)
      setKind(config.kindFilter)
    },
    config: { kindFilter: kind, ownerFilter: owner, sort, view },
  })
  const queryKey = ['data', 'legal', 'deadline-queue', view, sort, owner, kind]
  const queue = useInfiniteQuery({
    getNextPageParam: (page: Legal6QueuePage) => page.nextCursor,
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchJson<Legal6QueuePage>(
        pathOf({ kind, owner, sort, view }, pageParam),
      ),
    queryKey,
    retry: false,
  })
  const pages = queue.data?.pages ?? []
  const decide = () => queryClient.invalidateQueries({ queryKey })

  return (
    <Legal6
      {...views.props}
      counts={pages[0]?.counts}
      deadlines={pages.flatMap((page) => page.items)}
      error={queue.isError && pages.length === 0}
      hasMore={queue.hasNextPage}
      kindFilter={kind}
      kinds={kinds}
      loadingMore={queue.isFetchingNextPage}
      loadMoreError={queue.isFetchNextPageError}
      onBulkConfirm={(ids) => {
        onBulkConfirm?.(ids)
        decide()
      }}
      onBulkOwnerChange={(ids, ownerId) => {
        onBulkOwnerChange?.(ids, ownerId)
        decide()
      }}
      onBulkReject={(ids) => {
        onBulkReject?.(ids)
        decide()
      }}
      onConfirm={decide}
      onKindFilterChange={setKind}
      onLoadMore={() => queue.fetchNextPage()}
      onOwnerFilterChange={setOwner}
      onReject={decide}
      onRetry={() => queue.refetch()}
      onSelectedIdsChange={setSelectedIds}
      onSortChange={setSort}
      onViewChange={(next) => {
        setView(next)
        views.clear()
      }}
      ownerFilter={owner}
      owners={owners}
      pending={queue.isPending}
      selectedIds={selectedIds}
      sort={sort}
      view={view}
    />
  )
}

const meta = {
  component: DeadlineQueues,
  parameters: { layout: 'padded' },
  tags: ['!autodocs', 'msw'],
  title: 'Blocks/Data/Legal/Legal6/Usages',
} satisfies Meta<typeof DeadlineQueues>

export default meta

type Story = StoryObj<typeof meta>

export const Loaded: Story = {
  beforeEach: ({ msw }) => {
    msw.use(legal6Handlers.loaded, ...legal6Handlers.savedViews())
  },
}

export const BulkDecision: Story = {
  args: { initialView: 'proposed', onBulkConfirm: fn() },
  beforeEach: ({ msw }) => {
    msw.use(legal6Handlers.loaded, ...legal6Handlers.savedViews())
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const checkboxes = await canvas.findAllByRole('checkbox', {
      name: /^Selecionar prazo /,
    })
    await expect(checkboxes).toHaveLength(2)
    for (const checkbox of checkboxes) await userEvent.click(checkbox)

    const bar = within(
      await canvas.findByRole('toolbar', {
        name: 'Ações dos prazos selecionados',
      }),
    )
    await expect(bar.getByText('2 selecionados')).toBeVisible()
    await userEvent.click(bar.getByRole('button', { name: 'Confirmar' }))
    await expect(args.onBulkConfirm).toHaveBeenCalledWith(
      expect.arrayContaining(['prz-609', 'prz-610']),
    )
  },
}

export const LoadsMoreByCursor: Story = {
  args: { initialView: 'all' },
  beforeEach: ({ msw }) => {
    msw.use(legal6Handlers.loaded, ...legal6Handlers.savedViews())
  },
}

export const LoadMoreFailed: Story = {
  args: { initialView: 'all' },
  beforeEach: ({ msw }) => {
    msw.use(legal6Handlers.moreFailed, ...legal6Handlers.savedViews())
  },
}

export const Empty: Story = {
  beforeEach: ({ msw }) => {
    msw.use(legal6Handlers.empty, ...legal6Handlers.savedViews())
  },
}

export const Pending: Story = {
  beforeEach: ({ msw }) => {
    msw.use(legal6Handlers.pending, ...legal6Handlers.savedViews())
  },
}

export const Failed: Story = {
  beforeEach: ({ msw }) => {
    msw.use(legal6Handlers.error, ...legal6Handlers.savedViews())
  },
}

export const SavedViews: Story = {
  args: { initialView: 'all' },
  beforeEach: ({ msw }) => {
    msw.use(legal6Handlers.loaded, ...legal6Handlers.savedViews())
  },
}
