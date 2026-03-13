import {style, type StyleRule} from '@vanilla-extract/css'

/* @internal */
export type LayerRule = NonNullable<StyleRule['@layer']>[string]

/* @internal */
export function _style(layer: string, rule: LayerRule, id: string): string {
  return style({'@layer': {[layer]: rule}}, id)
}
