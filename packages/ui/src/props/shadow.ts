import {type PropDef} from '../types/PropDef'
import {SHADOW} from '../types/Shadow'

export type ShadowProps = {
  /** CSS **box-shadow** property */
  shadow?: string
}

export const shadowProps: Record<string, PropDef> = {
  shadow: {
    type: 'union',
    className: 'shadow',
    values: SHADOW,
  },
}
