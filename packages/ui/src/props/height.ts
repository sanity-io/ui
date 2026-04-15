import {type StyleProp} from '../types/StyleProp'
import {type Responsive} from '../types/Responsive'

export type HeightProps = {
  /** CSS **height** property */
  height?: Responsive<string>
  /** CSS **min-height** property */
  minHeight?: Responsive<string>
  /** CSS **max-height** property */
  maxHeight?: Responsive<string>
}

export const heightProps: Record<string, StyleProp> = {
  height: {
    type: 'string',
    className: 'height',
    variable: '--height',
  },
  minHeight: {
    type: 'string',
    className: 'min-height',
    variable: '--min-height',
  },
  maxHeight: {
    type: 'string',
    className: 'max-height',
    variable: '--max-height',
  },
}
