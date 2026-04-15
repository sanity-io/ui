import {type StyleProp} from '../types/StyleProp'
import {type Responsive} from '../types/Responsive'

export type WidthProps = {
  /** CSS **width** property */
  width?: Responsive<string>
  /** CSS **min-width** property */
  minWidth?: Responsive<string>
  /** CSS **max-width** property */
  maxWidth?: Responsive<string>
}

export const widthProps: Record<string, StyleProp> = {
  width: {
    type: 'string',
    className: 'width',
    variable: '--width',
  },
  minWidth: {
    type: 'string',
    className: 'min-width',
    variable: '--min-width',
  },
  maxWidth: {
    type: 'string',
    className: 'max-width',
    variable: '--max-width',
  },
}
