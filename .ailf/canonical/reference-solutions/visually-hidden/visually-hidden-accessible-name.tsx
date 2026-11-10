import {Button, VisuallyHidden} from '@sanity/ui'

// Per-row context on a control that already has a visible label.
//
// The visible word stays "Edit" for sighted users; the screen reader hears
// "Edit Jane Cooper", so one row's button is distinguishable from the next.
//
// Why VisuallyHidden and not aria-label here: the added text is dynamic
// per-row content, and VisuallyHidden renders it as real DOM text, so it is
// translated, selectable, and visible to reading modes and test runners.
// The docs prefer `aria-label` for the opposite case — a short fixed string
// on an icon-only control (and IconButton requires one outright).
//
// Note the leading space inside VisuallyHidden: without it the accessible
// name concatenates to "EditJane Cooper".
export function EditRowButton({name}: {name: string}) {
  return (
    <Button level="tertiary">
      Edit<VisuallyHidden> {name}</VisuallyHidden>
    </Button>
  )
}
