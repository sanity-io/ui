import type {ElementType} from 'react'

import {type LayoutProps, layoutProps} from '../../props/layout'
import {CONTAINER_SIZE, type ContainerSize} from '../../types/Container'
import type {Polymorphic} from '../../types/Polymorphic'
import type {PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export type ContainerProps<T extends ElementType = 'div'> = Polymorphic<
  T,
  LayoutProps & {
    /**
     * HTML element or component to render.
     */
    as?: T
    /**
     * Maximum width of the container.
     */
    size?: Responsive<ContainerSize>
  }
>

export const containerProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  size: {
    type: 'union',
    className: 'container',
    values: CONTAINER_SIZE,
  },
  ...layoutProps,
}
