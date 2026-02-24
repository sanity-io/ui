import {layer as createLayer} from '@vanilla-extract/css'

/** @internal */
export type CSSLayer = 'vars' | 'prop' | 'primitive' | 'component'

/** @internal */
export const _layers: Record<CSSLayer, string> = {
  vars: createLayer('vars'),
  prop: createLayer('prop'),
  primitive: createLayer('primitive'),
  component: createLayer('component'),
}
