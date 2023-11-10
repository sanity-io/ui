import {Placement} from '@floating-ui/react-dom'

export const DEFAULT_TOOLTIP_PADDING = 4
export const DEFAULT_FALLBACK_PLACEMENTS: Record<Placement, Placement[]> = {
  top: ['bottom', 'left', 'right'],
  'top-start': ['bottom-start', 'left-start', 'right-start'],
  'top-end': ['bottom-end', 'left-end', 'right-end'],
  bottom: ['top', 'left', 'right'],
  'bottom-start': ['top-start', 'left-start', 'right-start'],
  'bottom-end': ['top-end', 'left-end', 'right-end'],
  left: ['right', 'top', 'bottom'],
  'left-start': ['right-start', 'top-start', 'bottom-start'],
  'left-end': ['right-end', 'top-end', 'bottom-end'],
  right: ['left', 'top', 'bottom'],
  'right-start': ['left-start', 'top-start', 'bottom-start'],
  'right-end': ['left-end', 'top-end', 'bottom-end'],
}
