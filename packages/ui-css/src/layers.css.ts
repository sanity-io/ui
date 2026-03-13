import {layer} from '@vanilla-extract/css'

/** @internal */
export type CSSLayer = 'vars' | 'prop' | 'primitive' | 'component'

/** @internal */
export const _layers: Record<CSSLayer, string> = {
  vars: layer('vars'),
  prop: layer('prop'),
  primitive: layer('primitive'),
  component: layer('component'),
}
