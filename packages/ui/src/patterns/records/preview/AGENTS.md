# Record preview pattern

A controlled, modal right-side sheet that previews a record (`RecordPreview`) with its three header actions, more, open and close, and the column that stacks the groups of its body (`RecordPreviewBody`), plus the parts every record preview assembles: `RecordPreviewFrame` (the sheet with the lookup rules), `RecordPreviewCover`, `RecordPreviewRegister` and `RecordPreviewDecisions`. It has no content of its own. The consumer owns the open state, the URL, the record lookup, widgets and any confirmation; the pattern shows the error and not found states of that lookup from `status`, `RecordPreviewFrame` shows its loading through a loading `RecordGroup`, and the pattern never fetches or ships CSS, and keeps no state besides a ref to its popup.

## Map

| Folder | Holds |
| --- | --- |
| `core.ts` | React-free surface: the prop types |
| `composition/record-preview/` | `RecordPreview` on the COSS `Sheet` and its barrel |
| `composition/record-preview-body/` | `RecordPreviewBody` and its barrel |
| `composition/record-preview-frame/` | `RecordPreviewFrame` on `RecordPreview`, `RecordPreviewBody` and `RecordGroup`, and its barrel |
| `composition/record-preview-cover/` | `RecordPreviewCover` and its barrel |
| `composition/record-preview-register/` | `RecordPreviewRegister` on `RecordGroup` and the properties displays, and its barrel |
| `composition/record-preview-decisions/` | `RecordPreviewDecisions` and its barrel |
| `components/` | `RecordPreviewAction` (the open button, on the COSS `Button` and `Tooltip`) and `RecordPreviewMoreMenu` (the more button, on the COSS `Menu`); not exported |
| `hooks/` | `useRecordPreviewTimestamp`, the timestamp formatter of the register; not exported, the blocks 10 and 11 import it by file path |

Import direction: `composition/` → `components/`, `hooks/` and `core.ts`; `RecordPreview` → `components/`; `RecordPreviewFrame` → `RecordPreview` and `RecordPreviewBody`. The pattern imports COSS (`button`, `menu`, `sheet`, `tooltip`), `StateSurface` from `patterns/surfaces/state`, `RecordGroup` from `patterns/records/group` (in `RecordPreviewFrame` and `RecordPreviewRegister`), `RecordGroupRow` and the `TextProperty`, `DateProperty` and `PersonProperty` displays from `patterns/properties` (only in `RecordPreviewRegister`), all by file path, `@tc96/utils` (`cn`) and `@phosphor-icons/react`. The registry ships what a pattern imports by path, so the `record-preview` item carries those properties files.

## Dependents

- `packages/ui/src/patterns/index.ts` re-exports `records/preview/index`.
- `packages/registry/src/manifest.ts` maps the registry item `record-preview` to the folder `records/preview` in `patternSources`, and `scripts/test-patterns.ts` lists that folder.
- The blocks `RecordPreview1` to `RecordPreview11` (`packages/ui/src/blocks/application/record-preview/record-preview-{n}/record-preview-{n}.tsx`) import by file path `composition/record-preview-frame/record-preview-frame` (all eleven), `composition/record-preview-body/record-preview-body`, `composition/record-preview-register/record-preview-register` (1 to 5 and 7), `composition/record-preview-cover/record-preview-cover` (5), and `composition/record-preview-decisions/record-preview-decisions` (8 and 9); `hooks/use-record-preview-timestamp` stays internal to `RecordPreviewRegister`, and blocks 10 and 11 keep their own copy in the group's `shared/`, because the package exports map does not resolve a `.ts` file under `patterns/`; renaming one of those files breaks it. It replaced the former detail sheet pattern; see the break note in `docs/architecture/tc96-ui.md`.

## Invariants

- The props do not extend `Dialog.Root.Props`, so the Base UI surface stays out of the public API baseline.
- The title is the accessible name of the dialog and wraps instead of truncating. The close button is always rendered and its label has no default.
- The COSS `SheetPopup` renders its own close button by default; the pattern passes `showCloseButton={false}` so there is exactly one.
- Initial focus goes to the popup (`initialFocus` on its ref, `tabIndex={-1}`). Opened by keyboard, the focus otherwise stayed on the trigger and `Escape` went to the trigger's tooltip, leaving no way to close.
- The sheet is modal: `Escape` and an outside press call `onOpenChange(false)`. Closing returns focus to the element that was focused on open.
- When the trigger is unmounted while the preview is open (a card that moves to another column), Base UI returns focus to the detached node and focus falls to `body`. The consumer resolves the target at close time through `finalFocus`; a `null` return keeps the Base UI default. Covered by the `FinalFocus*` plays of `Patterns/Records/Preview/Behavior`. Decided in D27 of the plan. Below `md` the Kanban renders only the active column, so the moved card may not be in the DOM; the recommended fallback is the moved card's column option, `[data-kanban-column-option="<column id>"]` (always rendered on mobile, survives an empty column), after the visible `[data-record-id]` trigger. There is no Kanban story for this (D33 of the plan); `FinalFocusFallsBackToTheColumnOption` in `behavior.stories.tsx` is the proof.
- `RecordPreviewFrame` owns the rules the blocks used to repeat: the title is `title ?? fallbackTitle`; a `hasRecord` of `false` with `status` `'ready'` is shown as `'not-found'`; a `status` of `'loading'` renders the sheet with a `RecordGroup` in `loading` (not collapsible, no title, named by `statusLabels.loading`) in place of `children`, without more, open or footer. It never decides which actions a record may have. Without `statusLabels` it renders a `RecordPreview` that is always ready.
- `RecordPreviewCover` renders the image only with `src`, in a 16:9 box, and `fallback` in a fixed 112px box otherwise. `RecordPreviewCover` and `RecordPreviewDecisions` are plain elements that take their attributes after their own, so a block replaces `data-slot` and adds `data-*`; the decisions group never hides itself, the consumer decides when there is a decision to take, and it goes in `footer` (blocks 8 and 9, the `Decisions` layout), so the decisions stay in view below the scrolling panel.
- `RecordPreviewRegister` renders ID, created, updated and author in that order, each only when passed, all read-only and `plain`, the timestamps formatted by `locale` and `timeZone` with the value icon hidden. It names no record kind: every label comes from the consumer.
- The footer renders only with `footer`, in a COSS `SheetFooter` outside the scrolling panel. The pattern never confirms a destructive action; confirmation belongs to the consumer.
- The header has exactly three actions, in this order: more (`DotsThreeIcon`, a menu aligned to the end), open (`ArrowsOutSimpleIcon`, with its label in a tooltip) and close (`XIcon`). The icons are the pattern's, decided by the owner on 2026-11-28: a consumer passes only `more` (`actions`, `label`, `onAction(id)`) and `expand` (`label`, `onClick`), never a node or an icon. More renders only with at least one action, open only with `expand`, and their wrapper only when one of them does; a disabled more action stays in the menu and is not called.
- `side="right"` and `variant="inset"` are COSS props, not overrides, and `className` goes to the popup. There is no size prop; the width is the COSS one.
- Default copy does not exist: every label is a prop, `statusLabels` included.
- `RecordPreview` has no loading state (decided by the owner on 2026-11-28: the loading feedback belongs to `RecordGroup`); its `status` is `'ready'`, `'error'` or `'not-found'`. While it is not `'ready'`, more, open and `footer` do not render and the panel replaces `children` with the `StateSurface` of kind `error` (with a retry button only when `onRetry` is passed) or `not-found`. The types require `statusLabels` (without `loading`) whenever `status` is not `'ready'`. The blocks `RecordPreview3`, `RecordPreview4` and `RecordPreview6` forward it with a nullable `record`, so a consumer's lookup states stay in the pattern.

## Styling

| Attribute | Where |
| --- | --- |
| `data-slot="record-preview-header-actions"` | the wrapper of the more and open buttons, only when one of them renders |
| `data-slot="record-preview-body"` | the `RecordPreviewBody` column, a `div` with `flex flex-col gap-4`; `className` merges after it |
| `data-slot="record-preview-cover"` | the `RecordPreviewCover` tile; the consumer can replace it (block 5 uses `record-preview-5-preview`) |
| `data-slot="record-preview-decisions"` | the `RecordPreviewDecisions` `fieldset`; the consumer can replace it (blocks 8 and 9 use `record-preview-8-decisions` and `record-preview-9-decisions`) |

- `data-slot` names on the popup, panel, footer and title are left to COSS (`sheet-popup`, `sheet-panel`, `sheet-footer`, `sheet-title`).
- No class overrides a COSS border or radius; `scripts/override-exceptions.json` has no entry for this pattern. Changing that requires a new entry.
- Colors come from theme tokens. Measured contrast is in `docs/accessibility.md`.

## Verify

```bash
bunx biome check packages/ui/src/patterns/records/preview
bun run typecheck && bun run boundaries:check && bun run overrides:check && bun run verify:public-api
cd apps/storybook && bunx vitest run --project=storybook src/patterns/records/preview
```

The stories are in `apps/storybook/src/patterns/records/preview/`, on the pages of `Patterns/Records/Preview` (no `Usages`: previews with real content are the blocks `RecordPreview1` to `RecordPreview11`, `Blocks/Application/Record Preview`), and run axe with `test: 'error'`. The `Variants` page (`variants.stories.tsx`) holds `Default` (the composed sheet of the Playground) and `ErrorRetry` and `NotFound`, each with a `play`; there is no `Loading` variant, the loading is `RecordGroup`'s (`FrameLoading` in `behavior/parts.stories.tsx` proves the frame delegates to it). The `Layouts` page has one story per part (`Frame`, `Cover`, `Register`, `Decisions`), built by `record-preview-parts.tsx`; the guarantees of the parts are in `behavior/parts.stories.tsx`. Interface tests are `play` functions on the `Behavior` page, in `behavior.stories.tsx` (`RecordPreview`) and `behavior/` (the header actions in `action.stories.tsx`, `RecordPreviewBody` and the parts); the pattern has no bun tests.

## Pointers

- Public API: `index.ts` and the `record-preview` entry of `docs/architecture/public-api-exports.json`. Props are in `core.ts`.
- Decisions and the break note: `docs/architecture/tc96-ui.md`; contrast: `docs/accessibility.md`; plan: `docs/plans/2026-10-04-record-preview.md`.
