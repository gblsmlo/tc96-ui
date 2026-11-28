'use client'

import { ActionBar } from '@tc96/ui/patterns/action-bar/components/action-bar'
import { useDataTable } from '@tc96/ui/patterns/data-table/use-data-table'
import { useMemo } from 'react'
import {
  DataCollection,
  type DataCollectionDefinition,
} from '../../shared/collection/data-collection'
import { DataCollectionFrame } from '../../shared/collection/data-collection-frame'
import { dataCollectionLoadState } from '../../shared/collection/data-collection-load-state'
import { DataCollectionSettingsToolbar } from '../../shared/collection/data-collection-settings-toolbar'
import { DataCollectionToolbarButton } from '../../shared/collection/data-collection-toolbar'
import { DataCollectionViewSwitcher } from '../../shared/collection/data-collection-view-switcher'
import {
  defaultDataCollectionLocale,
  defaultDataCollectionTimeZone,
} from '../../shared/collection/labels'
import {
  useControllable,
  useStableHandler,
} from '../../shared/collection/use-controllable'
import { resolveLegal6Labels } from './labels'
import { createLegal6Columns } from './legal-6-columns'
import type { Legal6FieldContext } from './legal-6-fields'
import { Legal6Footer } from './legal-6-footer'
import { legal6Views, nextLegal6ViewWithItems } from './legal-6-options'
import { createLegal6SelectionActions } from './legal-6-selection-actions'
import { Legal6Settings } from './legal-6-settings'
import { Legal6Skeleton } from './legal-6-skeleton'
import type {
  Legal6Deadline,
  Legal6Props,
  Legal6Sort,
  Legal6View,
} from './types'

export { legal6Sorts, legal6Views } from './legal-6-options'

const noOwners: NonNullable<Legal6Props['owners']> = []
const noKinds: NonNullable<Legal6Props['kinds']> = []
const noIds: string[] = []

export function Legal6({
  className,
  counts,
  dateFormat = 'numeric',
  deadlines,
  error,
  filtered: filteredProp,
  hasMore = false,
  kindFilter: kindFilterProp,
  kinds = noKinds,
  kindsLoading = false,
  labels: labelsProp,
  loadingMore = false,
  loadMoreError = false,
  locale = defaultDataCollectionLocale,
  onBulkConfirm,
  onBulkOwnerChange,
  onBulkReject,
  onConfirm,
  onCreate,
  onKindFilterChange,
  onLoadMore,
  onOpen,
  onOwnerFilterChange,
  onReject,
  onRetry,
  onSavedViewCreate,
  onSavedViewDelete,
  onSavedViewDuplicate,
  onSavedViewRename,
  onSavedViewSelect,
  onSavedViewUpdate,
  onSavePreference,
  onSelectedIdsChange,
  onSortChange,
  onViewChange,
  ownerFilter: ownerFilterProp,
  owners = noOwners,
  ownersLoading = false,
  pending,
  savedViewId,
  savedViewModified,
  savedViews,
  savedViewsLoading,
  savedViewsPending,
  selectedIds: selectedIdsProp,
  sort: sortProp,
  timeZone = defaultDataCollectionTimeZone,
  unassignable = true,
  view: viewProp,
  views: viewsProp,
}: Readonly<Legal6Props>) {
  const labels = useMemo(() => resolveLegal6Labels(labelsProp), [labelsProp])
  const views = useMemo(
    () =>
      viewsProp
        ? legal6Views.filter((item) => viewsProp.includes(item))
        : legal6Views,
    [viewsProp],
  )
  const [view, setView] = useControllable<Legal6View>(
    viewProp,
    views[0] ?? 'mine',
    onViewChange,
  )
  const [sort, setSort] = useControllable<Legal6Sort>(
    sortProp,
    'fatal',
    onSortChange,
  )
  const [ownerFilter, setOwnerFilter] = useControllable<string | null>(
    ownerFilterProp,
    null,
    onOwnerFilterChange,
  )
  const [kindFilter, setKindFilter] = useControllable<string | null>(
    kindFilterProp,
    null,
    onKindFilterChange,
  )
  const [selectedIds, setSelectedIds] = useControllable<string[]>(
    selectedIdsProp,
    noIds,
    onSelectedIdsChange,
  )
  const selectable = Boolean(
    selectedIdsProp ||
      onSelectedIdsChange ||
      onBulkConfirm ||
      onBulkOwnerChange ||
      onBulkReject,
  )
  const openDeadline = useStableHandler(onOpen)
  const confirm = useStableHandler(onConfirm)
  const reject = useStableHandler(onReject)
  const decides = view === 'proposed' && Boolean(confirm || reject)
  const activeFilterCount = (ownerFilter ? 1 : 0) + (kindFilter ? 1 : 0)
  const filtered = filteredProp ?? activeFilterCount > 0

  const context = useMemo<Legal6FieldContext>(
    () => ({
      dateFormat,
      labels,
      locale,
      onConfirm: confirm,
      onReject: reject,
      owners,
      timeZone,
    }),
    [confirm, dateFormat, labels, locale, owners, reject, timeZone],
  )

  const collection = useMemo<DataCollectionDefinition<Legal6Deadline>>(
    () => ({
      getKey: (item) => item.id,
      getLabel: (item) => item.label,
      groupings: [],
      records: deadlines,
    }),
    [deadlines],
  )

  const columns = useMemo(
    () => createLegal6Columns(context, decides, selectable),
    [context, decides, selectable],
  )
  const rowSelection = useMemo(
    () => Object.fromEntries(selectedIds.map((id) => [id, true as const])),
    [selectedIds],
  )
  const { table } = useDataTable<Legal6Deadline>({
    columns,
    data: deadlines,
    enableRowSelection: selectable,
    getRowId: (item) => item.id,
    onRowSelectionChange: (selection) =>
      setSelectedIds(Object.keys(selection).filter((id) => selection[id])),
    rowSelection,
  })

  const nextView =
    deadlines.length === 0 ? nextLegal6ViewWithItems(views, view, counts) : null

  const loadState = dataCollectionLoadState({
    error,
    labels,
    onRetry,
    pending,
    skeleton: <Legal6Skeleton label={labels.loading} />,
  })

  return (
    <DataCollectionFrame
      className={className}
      data-block="legal-6"
      data-view={view}
      title={labels.title}
      toolbar={
        <DataCollectionSettingsToolbar
          actions={
            onCreate ? (
              <DataCollectionToolbarButton onClick={onCreate} variant="default">
                {labels.create}
              </DataCollectionToolbarButton>
            ) : null
          }
          activeFilterCount={activeFilterCount}
          labels={labels}
          left={
            <DataCollectionViewSwitcher<Legal6View>
              counts={counts}
              label={labels.viewList}
              modified={savedViewModified}
              onSavedViewCreate={onSavedViewCreate}
              onSavedViewDelete={onSavedViewDelete}
              onSavedViewDuplicate={onSavedViewDuplicate}
              onSavedViewRename={onSavedViewRename}
              onSavedViewSelect={onSavedViewSelect}
              onSavedViewUpdate={onSavedViewUpdate}
              onViewChange={setView}
              savedViewId={savedViewId}
              savedViewLabels={labels.savedViews}
              savedViews={savedViews}
              savedViewsLoading={savedViewsLoading}
              savedViewsPending={savedViewsPending}
              view={view}
              viewCountName={labels.viewCountName}
              viewLabels={labels.views}
              views={views}
            />
          }
          loading={Boolean(loadState)}
          onClearFilters={() => {
            setOwnerFilter(null)
            setKindFilter(null)
          }}
          onSavePreference={onSavePreference}
          savePreferenceLabel={labels.savePreference}
        >
          <Legal6Settings
            kindFilter={kindFilter}
            kinds={kinds}
            kindsLoading={kindsLoading}
            labels={labels}
            onKindFilterChange={setKindFilter}
            onOwnerFilterChange={setOwnerFilter}
            onSortChange={setSort}
            ownerFilter={ownerFilter}
            owners={owners}
            ownersLoading={ownersLoading}
            sort={sort}
          />
        </DataCollectionSettingsToolbar>
      }
    >
      {loadState ?? (
        <DataCollection<Legal6Deadline>
          collection={collection}
          emptyMessage={
            filtered ? labels.emptyFiltered : labels.emptyViews[view]
          }
          footer={
            <Legal6Footer
              hasMore={hasMore}
              labels={labels}
              loadingMore={loadingMore}
              loadMoreError={loadMoreError}
              nextViewLabel={nextView ? labels.views[nextView] : null}
              onLoadMore={onLoadMore}
              onSeeNextView={() => {
                if (nextView) setView(nextView)
              }}
            />
          }
          getRowOpenLabel={(item) =>
            labels.openDeadline(item.label, item.lawsuitTitle)
          }
          label={labels.tableLabel(labels.title, labels.views[view])}
          mode="table"
          onOpen={openDeadline ? (item) => openDeadline(item.id) : undefined}
          selectionActions={
            selectable
              ? ({ clearSelection, selectedCount, selectedRows }) => (
                  <ActionBar
                    actions={createLegal6SelectionActions({
                      decidable: view === 'proposed',
                      labels,
                      onBulkConfirm,
                      onBulkOwnerChange,
                      onBulkReject,
                      onDone: clearSelection,
                      owners,
                      selectedRows,
                      unassignable,
                    })}
                    clearSelectionLabel={labels.clearSelection}
                    formatSelection={labels.selectedCount}
                    label={labels.selectionActions}
                    onClearSelection={clearSelection}
                    selectedCount={selectedCount}
                    selectedRows={selectedRows}
                  />
                )
              : undefined
          }
          table={table}
        />
      )}
    </DataCollectionFrame>
  )
}
