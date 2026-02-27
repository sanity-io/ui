import type {Props} from '@sanity/ui/core'
import type {ResponsiveProp} from '@sanity/ui/css'
import type {CardElementType, CardOwnProps} from '@sanity/ui/primitives/card'

import {LayerCard} from './LayerCard'
import {LayerProvider} from './LayerProvider'

/**
 * The default HTML element type rendered by the {@link Layer} component.
 *
 * @public
 */
export const DEFAULT_LAYER_ELEMENT = 'div'

/**
 * Own props for the {@link Layer} component.
 *
 * @remarks
 * Extends {@link CardOwnProps} to inherit all card styling and layout props,
 * and adds z-index stacking and activation callback support.
 *
 * @public
 */
export interface LayerOwnProps extends CardOwnProps {
  /**
   * A callback that fires when the layer becomes the top layer when it was
   * not the top layer before.
   */
  onActivate?: (props: {activeElement: HTMLElement | null}) => void

  /**
   * Controls the z-index offset of the layer relative to its parent layer.
   * Supports responsive values.
   */
  zOffset?: ResponsiveProp<number>
}

/**
 * Accepted values for the `as` prop of the {@link Layer} component.
 *
 * @remarks
 * Inherits all element types from {@link CardElementType}. The rendered element
 * receives all applicable HTML attributes for the chosen element type.
 *
 * @public
 */
export type LayerElementType = CardElementType

/**
 * Props for the {@link Layer} component.
 *
 * @remarks
 * Combines {@link LayerOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link LayerElementType}.
 *
 * @public
 */
export type LayerProps<E extends LayerElementType = LayerElementType> = Props<LayerOwnProps, E>

/**
 * The `Layer` component manages z-index stacking for overlapping UI elements
 * such as popovers, tooltips, and dialogs.
 *
 * @remarks
 * `Layer` renders a {@link Card} wrapped in a {@link LayerProvider} that
 * establishes a new stacking context. Nested layers automatically receive
 * incrementing z-index values based on their `zOffset` prop.
 *
 * @public
 */
export function Layer<E extends LayerElementType = typeof DEFAULT_LAYER_ELEMENT>(
  props: LayerProps<E>,
): React.JSX.Element {
  const {children, zOffset = 1, ...rest} = props as LayerProps<typeof DEFAULT_LAYER_ELEMENT>

  return (
    <LayerProvider zOffset={zOffset}>
      <LayerCard {...rest}>{children}</LayerCard>
    </LayerProvider>
  )
}
