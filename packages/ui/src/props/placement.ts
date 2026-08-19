import {PLACEMENT, type Placement} from '../types/Placement'
import {type PropDef} from '../types/PropDef'

/** @public */
export type PlacementProps = {
  /** Placement relative to anchor */
  placement?: Placement
}

export const placementProps: Record<string, PropDef> = {
  placement: {
    type: 'union',
    className: 'placement',
    values: PLACEMENT,
  },
}
