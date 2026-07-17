import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface TooltipProps
  extends Omit<React.ComponentProps<'div'>, 'children' | 'content'>, PlacementProps {
  /** Focusable trigger element */
  children: React.ReactElement<Record<string, unknown>>
  /** Tooltip content */
  content: React.ReactNode
  /** Disabled state */
  disabled?: boolean
  /** Shared id with Popover for combined tooltip + popover triggers */
  id?: string
}

export const tooltipProps: Record<string, PropDef> = {
  content: {
    type: 'string',
  },
  disabled: {
    type: 'boolean',
  },
  ...placementProps,
}
