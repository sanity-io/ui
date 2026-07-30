import {type TypographyProps, typographyProps} from '../../props/typography'
import {EYEBROW_SIZE, type EyebrowSize} from '../../types/Eyebrow'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface EyebrowProps<T extends React.ElementType = 'span'> extends TypographyProps {
  /** Element to render */
  as?: T
  /** CSS **font-size** property */
  size?: Responsive<EyebrowSize>
}

export const eyebrowProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  size: {
    type: 'union',
    className: 'text-eyebrow',
    values: EYEBROW_SIZE,
  },
  ...typographyProps,
}
