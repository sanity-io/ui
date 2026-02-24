import {globalStyle, type GlobalStyleRule} from '@vanilla-extract/css'

/** @internal */
export type GlobalLayerRule = NonNullable<NonNullable<GlobalStyleRule['@layer']>[string]>

/** @internal */
export function _globalStyle(layer: string, selector: string, rule: GlobalLayerRule) {
  return globalStyle(selector, {
    '@layer': {[layer]: rule},
  })
}
