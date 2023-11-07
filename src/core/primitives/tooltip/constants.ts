import {Placement} from '@floating-ui/react-dom'

export const DEFAULT_TOOLTIP_ARROW_WIDTH = 15
export const DEFAULT_TOOLTIP_ARROW_HEIGHT = 6
export const DEFAULT_TOOLTIP_ARROW_RADIUS = 2

export const DEFAULT_TOOLTIP_DISTANCE = 4
export const DEFAULT_TOOLTIP_PADDING = 4

export const DEFAULT_FALLBACK_PLACEMENTS: Record<Placement, Placement[]> = {
  top: ['top-end', 'top-start', 'bottom', 'left', 'right'],
  'top-start': ['top', 'top-end', 'bottom-start', 'left-start', 'right-start'],
  'top-end': ['top', 'top-start', 'bottom-end', 'left-end', 'right-end'],
  bottom: ['bottom-end', 'bottom-start', 'top', 'left', 'right'],
  'bottom-start': ['bottom', 'bottom-end', 'top-start', 'left-start', 'right-start'],
  'bottom-end': ['bottom', 'bottom-start', 'top-end', 'left-end', 'right-end'],
  left: ['left-end', 'left-start', 'right', 'top', 'bottom'],
  'left-start': ['left', 'left-end', 'right-start', 'top-start', 'bottom-start'],
  'left-end': ['left', 'left-start', 'right-end', 'top-end', 'bottom-end'],
  right: ['right-end', 'right-start', 'left', 'top', 'bottom'],
  'right-start': ['right', 'right-end', 'left-start', 'top-start', 'bottom-start'],
  'right-end': ['right', 'right-start', 'left-end', 'top-end', 'bottom-end'],
}
