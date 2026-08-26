import {type TypographyProps, typographyProps} from '../../props/typography'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'
import {TEXT_SIZE, type TextSize} from '../../types/Text'

/** @public */
export interface TextProps<T extends React.ElementType = 'span'> extends TypographyProps {
  /**
   * HTML element to render. Accepts any valid HTML tag (ex: `'span'`, `'label'`, `'li'`).
   */
  as?: T
  /**
   * Font size and line height from the body text scale. Accepts `0`, `1`, `2`, `3`, `4`.
   */
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
