import {type TypographyProps, typographyProps} from '../../props/typography'
import {type PropDef} from '../../types/PropDef'

const TEXT_SIZE = [0, 1, 2, 3, 4] as const
type TextSize = (typeof TEXT_SIZE)[number]

/** @public */
export interface TextProps<T extends React.ElementType> extends TypographyProps {
  /** Element to render */
  as?: T
  /** CSS **font-size** property */
  size?: TextSize
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
