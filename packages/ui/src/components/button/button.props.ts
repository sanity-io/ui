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
  /** Element to render */
  as?: InteractiveAs<T>
  /** Composite prop for setting padding and gap */
  density?: ButtonDensity
  /** Set CSS **width** property to 100% */
  fullWidth?: Responsive<boolean>
  /** Starting icon */
  iconStart?: React.ElementType | React.ReactNode
  /** Ending icon */
  iconEnd?: React.ElementType | React.ReactNode
  /** Button level */
  level?: ButtonLevel
  /** Loading state */
  loading?: boolean
  /** Button text */
  text?: string
  /** Button tone */
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
