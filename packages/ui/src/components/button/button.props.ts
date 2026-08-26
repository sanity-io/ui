import {gapProps} from '../../props/gap'
import {heightProps} from '../../props/height'
import {paddingProps} from '../../props/padding'
import {widthProps} from '../../props/width'
import {
  BUTTON_DENSITY,
  BUTTON_LEVEL,
  BUTTON_TONE,
  type ButtonDensity,
  type ButtonLevel,
  type ButtonTone,
} from '../../types/Button'
import type {InteractiveAs} from '../../types/Interactive'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface ButtonProps<T extends React.ElementType = 'button'> {
  /**
   * HTML element to render. Accepts `'button'`, `'a'`.
   */
  as?: InteractiveAs<T>
  /**
   * Sets padding and gap to specify its size. Accepts `'regular'`, `'loose'`.
   */
  density?: ButtonDensity
  /**
   * Sets Button to fill the width of its container. Accepts Boolean value.
   */
  fullWidth?: Responsive<boolean>
  /**
   * Shows an icon in the start position (left side in left-to-right languages). Accepts any icon component.
   */
  iconStart?: React.ElementType | React.ReactNode
  /**
   * Shows an icon in the end position (right side in left-to-right languages). Accepts any icon component.
   */
  iconEnd?: React.ElementType | React.ReactNode
  /**
   * Sets the importance of Button's action. Accepts `'primary'`, `'secondary'`, `'tertiary'`.
   */
  level?: ButtonLevel
  /**
   * Places Button into a loading state. Accepts Boolean value.
   */
  loading?: boolean
  /**
   * Sets Button's text label. Accepts any string value.
   */
  text?: string
  /**
   * Sets Button's semantic meaning and related color. Accepts `'neutral'`, `'critical'`.
   */
  tone?: ButtonTone
}

export const buttonProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  density: {
    type: 'composite',
    values: BUTTON_DENSITY,
    composition: {
      gap: {
        propDef: gapProps['gap'] as PropDef,
        mapping: {
          regular: 2,
          loose: 3,
        },
      },
      padding: {
        propDef: paddingProps['padding'] as PropDef,
        mapping: {
          regular: 2,
          loose: 3,
        },
      },
      minHeight: {
        propDef: heightProps['minHeight'] as PropDef,
        mapping: {
          regular: '25px',
          loose: '33px',
        },
      },
      minWidth: {
        propDef: widthProps['minWidth'] as PropDef,
        mapping: {
          regular: '25px',
          loose: '33px',
        },
      },
    },
  },
  fullWidth: {
    type: 'boolean',
    className: 'width-full',
    inverseClassName: 'width-auto',
  },
  iconStart: {
    type: 'string',
  },
  iconEnd: {
    type: 'string',
  },
  level: {
    type: 'union',
    className: 'button-level',
    values: BUTTON_LEVEL,
  },
  loading: {
    type: 'boolean',
  },
  text: {
    type: 'string',
  },
  tone: {
    type: 'union',
    className: 'tone',
    values: BUTTON_TONE,
  },
}
