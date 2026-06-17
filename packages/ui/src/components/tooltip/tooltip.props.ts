import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface TooltipProps extends React.ComponentProps<'div'>, PlacementProps {
  /** Tooltip text */
  text?: React.ReactNode
  /** Disabled state */
  disabled?: boolean
}

export const tooltipProps: Record<string, PropDef> = {
  text: {
    type: 'string',
  },
  disabled: {
    type: 'boolean',
  },
  ...placementProps,
}
