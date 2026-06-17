import {type PropDef} from '../types/PropDef'
import {SHADOW, type Shadow} from '../types/Shadow'

export type ShadowProps = {
  /** CSS **box-shadow** property */
  shadow?: Shadow
}

export const shadowProps: Record<string, PropDef> = {
  shadow: {
    type: 'union',
    className: 'shadow',
    values: SHADOW,
  },
}
