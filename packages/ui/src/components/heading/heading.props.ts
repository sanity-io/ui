import {typographyProps, type TypographyProps} from '../../props/typography'
import { HEADING_SIZE, type HeadingSize } from '../../types/Heading'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface HeadingProps<T extends React.ElementType> extends TypographyProps {
  /** Element to render */
  as?: T
  /** CSS **font-size** property */
  size?: HeadingSize
}

export const headingProps: Record<string, PropDef> = {
  as: {
    type: 'union',
    values: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  },
  size: {
    type: 'union',
    className: 'text-heading',
    values: HEADING_SIZE,
  },
  ...typographyProps,
}
