'use client'

import { CheckCircleIcon } from '@phosphor-icons/react'
import { ActionBar } from '@tc96/ui/patterns/action-bar/components/action-bar'
import { useDataTable } from '@tc96/ui/patterns/data-table/use-data-table'
import { useMemo } from 'react'
import {
  DataCollection,
  type DataCollectionDefinition,
} from '../../shared/collection/data-collection'
import {
  createLegal8FailureColumns,
  createLegal8RunColumns,
  type Legal8ColumnContext,
} from './legal-8-columns'
import type { Legal8Failure, Legal8Run } from './types'

export interface Legal8FailureSelection {
  onResolve?: (failureIds: string[]) => void
  onSelectedIdsChange: (failureIds: string[]) => void
  selectedIds: readonly string[]
}

export function Legal8RunsTable({
  context,
  runs,
}: Readonly<{ context: Legal8ColumnContext; runs: Legal8Run[] }>) {
  const { labels, onOpenRun } = context
  const collection = useMemo<DataCollectionDefinition<Legal8Run>>(
    () => ({
      getKey: (run) => run.id,
      getLabel: (run) => labels.runKinds[run.kind],
      groupings: [],
      records: runs,
    }),
    [labels, runs],
  )
  const columns = useMemo(() => createLegal8RunColumns(context), [context])
  const { table } = useDataTable<Legal8Run>({
    columns,
    data: runs,
    getRowId: (run) => run.id,
  })

  return (
    <DataCollection<Legal8Run>
      collection={collection}
      emptyMessage={labels.runsEmpty}
      getRowOpenLabel={(run) => labels.openRunRow(labels.runKinds[run.kind])}
      label={labels.views.runs}
      mode="table"
      onOpen={onOpenRun ? (run) => onOpenRun(run.id) : undefined}
      table={table}
    />
  )
}

export function Legal8FailuresTable({
  context,
  failures,
  selection,
}: Readonly<{
  context: Legal8ColumnContext
  failures: Legal8Failure[]
  selection?: Legal8FailureSelection
}>) {
  const { labels, onOpenFailure } = context
  const collection = useMemo<DataCollectionDefinition<Legal8Failure>>(
    () => ({
      getKey: (failure) => failure.id,
      getLabel: (failure) => labels.failureKinds[failure.kind],
      groupings: [],
      records: failures,
    }),
    [failures, labels],
  )
  const selectable = Boolean(selection)
  const columns = useMemo(
    () => createLegal8FailureColumns(context, selectable),
    [context, selectable],
  )
  const rowSelection = useMemo(
    () =>
      Object.fromEntries(
        (selection?.selectedIds ?? []).map((id) => [id, true as const]),
      ),
    [selection?.selectedIds],
  )
  const { table } = useDataTable<Legal8Failure>({
    columns,
    data: failures,
    enableRowSelection: selectable,
    getRowId: (failure) => failure.id,
    onRowSelectionChange: (next) =>
      selection?.onSelectedIdsChange(
        Object.keys(next).filter((id) => next[id]),
      ),
    rowSelection,
  })

  return (
    <DataCollection<Legal8Failure>
      collection={collection}
      emptyMessage={labels.failuresEmpty}
      getRowOpenLabel={(failure) =>
        labels.openFailureRow(labels.failureKinds[failure.kind])
      }
      label={labels.views.failures}
      mode="table"
      onOpen={
        onOpenFailure ? (failure) => onOpenFailure(failure.id) : undefined
      }
      selectionActions={
        selection
          ? ({ clearSelection, selectedCount, selectedRows }) => {
              const openIds = selectedRows
                .filter((failure) => failure.state === 'open')
                .map((failure) => failure.id)
              return (
                <ActionBar
                  actions={
                    selection.onResolve
                      ? [
                          {
                            id: 'resolve',
                            items: [
                              {
                                disabled: openIds.length === 0,
                                icon: <CheckCircleIcon aria-hidden="true" />,
                                id: 'resolve',
                                label: labels.resolve,
                                onSelect: () => {
                                  selection.onResolve?.(openIds)
                                  clearSelection()
                                },
                              },
                            ],
                          },
                        ]
                      : []
                  }
                  clearSelectionLabel={labels.clearSelection}
                  formatSelection={labels.selectedCount}
                  label={labels.selectionActions}
                  onClearSelection={clearSelection}
                  selectedCount={selectedCount}
                  selectedRows={selectedRows}
                />
              )
            }
          : undefined
      }
      table={table}
    />
  )
}
