import type {ComponentType, Props} from '@sanity/ui/core'
import {type GapStyleProps, type PaddingStyleProps, toast_layer} from '@sanity/ui-css'
import {Grid} from '@sanity/ui/primitives/grid'
import {useLayer} from '@sanity/ui/primitives/layer'

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
      className={toast_layer()}
      data-ui="ToastProvider"
      gap={gap}
      gridTemplateColumns={1}
      padding={padding}
      paddingX={paddingX}
      paddingY={paddingY}
      style={{zIndex}}
    >
      {children}
    </Grid>
  )
}
