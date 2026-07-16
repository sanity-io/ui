import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export type PopoverRootProps = React.PropsWithChildren<{
  /** Optional ID */
  id?: string
}>

/** @public */
export interface PopoverTriggerProps<T extends React.ElementType> {
  /** Element to render */
  as?: T
}

export const popoverTriggerProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}

/** @public */
export interface PopoverContentProps extends React.ComponentProps<'div'>, PlacementProps {}

export const popoverContentProps: Record<string, PropDef> = {
  ...placementProps,
}
