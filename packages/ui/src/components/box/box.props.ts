import {type LayoutProps, layoutProps} from '../../props/layout'
import {DISPLAY_BLOCK, type DisplayBlock} from '../../types/Display'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface BoxProps<T extends React.ElementType = 'div'> extends LayoutProps {
  /**
   * HTML element or component to render. Accepts any valid HTML tag or component (ex: `'nav'`, `'section'`, `'main'`).
   * @default "div"
   */
  as?: T
  /**
   * CSS `display` property. Accepts `'block'`, `'inline-block'`, `'none'`.
   * @default "block"
   * @remarks Does not include `'flex'` or `'grid'`. Use the Flex or Grid components for those.
   */
  display?: Responsive<DisplayBlock>
}

export const boxProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  display: {
    type: 'union',
    className: 'display',
    values: DISPLAY_BLOCK,
  },
  ...layoutProps,
}
