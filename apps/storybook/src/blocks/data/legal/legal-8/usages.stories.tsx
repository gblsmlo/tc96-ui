import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Legal8,
  type Legal8Failure,
  type Legal8FailureOrigin,
  type Legal8Props,
  type Legal8Run,
  type Legal8Sort,
  type Legal8View,
} from '@tc96/ui/blocks/data/legal/legal-8'
import { useState } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'
import { apiUrl, fetchJson } from '../../../../mocks/api.ts'
import { legal8Handlers } from '../../../../mocks/legal-8.ts'
import { type Legal8SavedViewConfig, nextSweepAt } from '../fixtures/legal-8.ts'
import { useSavedViewsQuery } from '../legal-saved-views.ts'

const runsKey = ['data', 'legal', 'monitoring', 'runs']
const failuresKey = ['data', 'legal', 'monitoring', 'failures']

const failuresPath = (origin: Legal8FailureOrigin | null, sort: Legal8Sort) => {
  const search = new URLSearchParams({ sort })
  if (origin) search.set('origin', origin)
  return `/data/legal/monitoring/failures?${search}`
}

const requestSweep = async () => {
  const response = await fetch(apiUrl('/data/legal/monitoring/sweep'), {
    method: 'POST',
  })
  if (!response.ok) throw new Error(String(response.status))
}

interface CourtMonitoringProps extends Pick<Legal8Props, 'onResolveFailures'> {
  initialView?: Legal8View
}

const CourtMonitoring = ({
  initialView = 'runs',
  onResolveFailures,
}: Readonly<CourtMonitoringProps>) => {
  const queryClient = useQueryClient()
  const [view, setView] = useState<Legal8View>(initialView)
  const [selectedFailureIds, setSelectedFailureIds] = useState<string[]>([])
  const [sort, setSort] = useState<Legal8Sort>('newest')
  const [origin, setOrigin] = useState<Legal8FailureOrigin | null>(null)
  const views = useSavedViewsQuery<Legal8SavedViewConfig>('monitoring', {
    apply: (config) => {
      setView(config.view)
      setSort(config.sort)
      setOrigin(config.originFilter)
    },
    config: { originFilter: origin, sort, view },
  })
  const runs = useQuery({
    queryFn: () => fetchJson<Legal8Run[]>('/data/legal/monitoring/runs'),
    queryKey: runsKey,
  })
  const allFailures = useQuery({
    queryFn: () => fetchJson<Legal8Failure[]>(failuresPath(null, 'newest')),
    queryKey: [...failuresKey, 'all'],
  })
  const failures = useQuery({
    queryFn: () => fetchJson<Legal8Failure[]>(failuresPath(origin, sort)),
    queryKey: [...failuresKey, origin, sort],
  })
  const sweep = useMutation({
    mutationFn: requestSweep,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: runsKey }),
  })
  const shown = view === 'runs' ? runs : failures
  const stopped = allFailures.data
    ?.filter((item) => item.kind === 'capture_stopped' && item.state === 'open')
    .map((item) => item.startedAt)
    .sort()[0]

  return (
    <Legal8
      {...views.props}
      counts={{
        failures: allFailures.data?.length,
        runs: runs.data?.length,
      }}
      error={shown.isError}
      failures={failures.data ?? []}
      nextSweepAt={nextSweepAt}
      onOpenFailure={() => undefined}
      onOpenRun={() => undefined}
      onOriginFilterChange={setOrigin}
      onResolveFailures={(ids) => {
        onResolveFailures?.(ids)
        queryClient.invalidateQueries({ queryKey: failuresKey })
      }}
      onRetry={() => shown.refetch()}
      onRun={() => sweep.mutate()}
      onSelectedFailureIdsChange={setSelectedFailureIds}
      onSortChange={setSort}
      onViewChange={(next) => {
        setView(next)
        views.clear()
      }}
      originFilter={origin}
      pending={shown.isPending}
      runError={sweep.isError}
      running={sweep.isPending}
      runs={runs.data ?? []}
      selectedFailureIds={selectedFailureIds}
      sort={sort}
      stoppedSince={stopped ?? null}
      view={view}
    />
  )
}

const meta = {
  component: CourtMonitoring,
  parameters: { layout: 'padded' },
  tags: ['!autodocs', 'msw'],
  title: 'Blocks/Data/Legal/Legal8/Usages',
} satisfies Meta<typeof CourtMonitoring>

export default meta

type Story = StoryObj<typeof meta>

export const Loaded: Story = {
  beforeEach: ({ msw }) => {
    msw.use(...legal8Handlers.loaded, ...legal8Handlers.savedViews())
  },
}

export const ResolveFailures: Story = {
  args: { initialView: 'failures', onResolveFailures: fn() },
  beforeEach: ({ msw }) => {
    msw.use(...legal8Handlers.loaded, ...legal8Handlers.savedViews())
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const checkboxes = await canvas.findAllByRole('checkbox', {
      name: /^Selecionar falha /,
    })
    for (const checkbox of checkboxes.slice(0, 2))
      await userEvent.click(checkbox)

    const bar = within(
      await canvas.findByRole('toolbar', {
        name: 'Ações das falhas selecionadas',
      }),
    )
    await expect(bar.getByText('2 selecionadas')).toBeVisible()
    await userEvent.click(bar.getByRole('button', { name: 'Resolver' }))
    await expect(args.onResolveFailures).toHaveBeenCalledWith(
      expect.arrayContaining(['fail-30', 'fail-31']),
    )
  },
}

export const SweepFailed: Story = {
  beforeEach: ({ msw }) => {
    msw.use(
      legal8Handlers.sweepFailed,
      ...legal8Handlers.loaded,
      ...legal8Handlers.savedViews(),
    )
  },
}

export const Empty: Story = {
  beforeEach: ({ msw }) => {
    msw.use(...legal8Handlers.empty, ...legal8Handlers.savedViews())
  },
}

export const Pending: Story = {
  beforeEach: ({ msw }) => {
    msw.use(...legal8Handlers.pending, ...legal8Handlers.savedViews())
  },
}

export const Failed: Story = {
  beforeEach: ({ msw }) => {
    msw.use(...legal8Handlers.error, ...legal8Handlers.savedViews())
  },
}

export const SavedViews: Story = {
  beforeEach: ({ msw }) => {
    msw.use(...legal8Handlers.loaded, ...legal8Handlers.savedViews())
  },
}
