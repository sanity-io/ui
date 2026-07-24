import {placementProps, type PlacementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface MenuProps<T extends React.ElementType> {
  /** Focusable trigger element */
  trigger: React.ReactElement<Record<string, unknown>>
}

export const menuProps: Record<string, PropDef> = {
  trigger: {
    type: 'string',
  },
}

/** @public */
export interface MenuSubmenuProps extends React.ComponentProps<'li'>, PlacementProps {
  /** Focusable trigger element */
  trigger: React.ReactElement<Record<string, unknown>>
}

export const menuSubmenuProps: Record<string, PropDef> = {
  trigger: {
    type: 'string',
  },
  ...placementProps,
}
