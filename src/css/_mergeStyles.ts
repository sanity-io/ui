import type {Style, StyleKeyframes, StyleLayers, StyleRules} from './types'

/** @internal */
export function _mergeStyles(styles: Style[]): Style {
  const keyframes: StyleKeyframes = {}
  const layers: StyleLayers = {}
  const rules: StyleRules = {}

  for (const s of styles) {
    Object.assign(keyframes, s.keyframes)

    for (const layerName in s.layers) {
      if (!layers[layerName]) {
        layers[layerName] = {}
      }

      Object.assign(layers[layerName], s.layers[layerName])
    }

    Object.assign(rules, s.rules)
  }

  return {keyframes, layers, rules}
}
