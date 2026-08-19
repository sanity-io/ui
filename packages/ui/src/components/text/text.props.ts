import {type TypographyProps, typographyProps} from '../../props/typography'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'
import {TEXT_SIZE, type TextSize} from '../../types/Text'

/** @public */
export interface TextProps<T extends React.ElementType = 'span'> extends TypographyProps {
  /** Element to render */
  as?: T
  /** CSS **font-size** property */
  size?: Responsive<TextSize>
}

export const textProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  size: {
    type: 'union',
    className: 'text-body',
    values: TEXT_SIZE,
  },
  ...typographyProps,
}
