import type {PropDef} from '../types/PropDef'
import type {Responsive} from '../types/Responsive'

export type ZIndexProps = {
  /** CSS z-index property */
  zIndex?: Responsive<number>
}

export const zIndexProps: Record<string, PropDef> = {
  zIndex: {
    type: 'number',
    className: 'z-index',
    variable: '--z-index',
  },
}
