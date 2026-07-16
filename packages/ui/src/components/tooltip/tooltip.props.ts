import {type PlacementProps, placementProps} from '../../props/placement'
import type {InteractiveAs} from '../../types/Interactive'
import {type PropDef} from '../../types/PropDef'

/** @public */
export type TooltipRootProps = React.PropsWithChildren<{
  /** Optional ID */
  id?: string
}>

/** @public */
export interface TooltipTriggerProps<T extends React.ElementType> {
  /** Element to render */
  as?: InteractiveAs<T>
}

export const tooltipTriggerProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}

/** @public */
export interface TooltipContentProps extends React.ComponentProps<'div'>, PlacementProps {
  /** Tooltip text */
  text: React.ReactNode
}

export const tooltipContentProps: Record<string, PropDef> = {
  text: {
    type: 'string',
  },
  ...placementProps,
}
