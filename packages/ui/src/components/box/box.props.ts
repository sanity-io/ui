import type {ElementType} from 'react'

import {type LayoutProps, layoutProps} from '../../props/layout'
import {DISPLAY_BLOCK, type DisplayBlock} from '../../types/Display'
import type {Polymorphic} from '../../types/Polymorphic'
import type {PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export type BoxProps<T extends ElementType = 'div'> = Polymorphic<
  T,
  LayoutProps & {
    /**
     * HTML element or component to render.
     */
    as?: T
    /**
     * CSS `display` property.
     * @remarks Does not include `'flex'` or `'grid'`. Use the Flex or Grid components for those.
     */
    display?: Responsive<DisplayBlock>
  }
>

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
