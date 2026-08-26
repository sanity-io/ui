import {type LayoutProps, layoutProps} from '../../props/layout'
import {CONTAINER_SIZE, type ContainerSize} from '../../types/Container'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface ContainerProps<T extends React.ElementType = 'div'> extends LayoutProps {
  /**
   * HTML element or component to render. Accepts any valid HTML tag or component (ex: `'main'`, `'section'`, `'article'`).
   */
  as?: T
  /**
   * Maximum width of the container. Accepts `0`, `1`, `2`, `3`, `4`, `5`.
   */
  size?: Responsive<ContainerSize>
}

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
