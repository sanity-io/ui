import {layer} from '@vanilla-extract/css'

/** @public */
export type CSSLayer = 'theme' | 'props' | 'primitives' | 'components'

/** @public */
export const layers: Record<CSSLayer, string> = {
  theme: layer('theme'),
  props: layer('props'),
  primitives: layer('primitives'),
  components: layer('components'),
}
