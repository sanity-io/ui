import {CloseIcon} from '@sanity/icons/Close'
import {IconButton} from '@sanity/ui'

// Icon-only control: use aria-label. It is a short, fixed string, and IconButton requires
// it (the prop is typed as required). VisuallyHidden is for the other case — real DOM text
// added to a control that already has a visible label, such as per-row context
// ("Edit Jane Cooper"), because it is translated, selectable and seen by reading modes.
export function CloseDialogButton({onClose}: {onClose: () => void}) {
  return <IconButton icon={CloseIcon} aria-label="Close dialog" onClick={onClose} />
}
