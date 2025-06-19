import {type GapStyleProps, type PaddingStyleProps, toastLayer} from '@sanity/ui/css'

import {Grid} from '../../primitives/grid/grid'
import {useLayer} from '../../primitives/layer/useLayer'
import type {ComponentType, Props} from '../../types/props'

/** @internal */
export const DEFAULT_TOAST_LAYER_ELEMENT = 'ul'

/** @internal */
export type ToastLayerOwnProps = GapStyleProps & PaddingStyleProps

/** @internal */
export type ToastLayerElementType = 'ul' | ComponentType

/** @internal */
export type ToastLayerProps<E extends ToastLayerElementType = ToastLayerElementType> = Props<
  ToastLayerOwnProps,
  E
>

/**
 * @internal
 */
export function ToastLayer<E extends ToastLayerElementType = typeof DEFAULT_TOAST_LAYER_ELEMENT>(
  props: ToastLayerProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_TOAST_LAYER_ELEMENT,
    children,
    padding = 4,
    paddingX,
    paddingY,
    gap = 3,
  } = props as ToastLayerProps<typeof DEFAULT_TOAST_LAYER_ELEMENT>

  const {zIndex} = useLayer()

  return (
    <Grid
      as={as}
      className={toastLayer()}
      data-ui="ToastProvider"
      padding={padding}
      paddingX={paddingX}
      paddingY={paddingY}
      gap={gap}
      columns={1}
      style={{zIndex}}
    >
      {children}
    </Grid>
  )
}
