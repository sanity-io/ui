import type {ResponsiveProp} from '@sanity/ui/css'

import type {CardElementType, CardOwnProps} from '../../primitives/card/Card'
import type {Props} from '../../types'
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
 * Extends {@link CardOwnProps} to inherit all card and box layout/style props,
 * and adds layer-specific properties for z-index stacking and activation callbacks.
 *
 * Inherited from {@link CardOwnProps} (which extends {@link BoxOwnProps} and {@link CardStyleProps}):
 * - All layout props: `display`, `flex`, `flexDirection`, `alignItems`, `justifyContent`, etc.
 * - All spacing props: `margin`, `marginX`, `marginY`, `padding`, `paddingX`, `paddingY` (and per-side variants).
 * - All sizing props: `width`, `height`, `minWidth`, `minHeight`, `maxWidth`.
 * - All position props: `position`, `inset`, and per-side inset variants.
 * - All visual props: `border`, `radius`, `shadow`, `overflow`, `muted`, `outline`.
 * - Card-specific props: `scheme` (`"light"` | `"dark"`), `tone` (all card tones plus `"inherit"`).
 * - Interactive state props: `disabled`, `pressed`, `selected`.
 *
 * @public
 */
export type LayerOwnProps = CardOwnProps & {
  /**
   * Callback fired when this layer becomes the topmost active layer after
   * previously not being the top layer.
   *
   * @remarks
   * Receives an object containing the `activeElement` — the DOM element that
   * had focus at the time the layer became active. This is useful for managing
   * focus restoration or performing side effects when a layer gains stacking
   * priority (e.g. when an overlapping layer above it is removed).
   *
   * @type {(props: \{ activeElement: HTMLElement | null \}) => void}
   * @defaultValue undefined
   * @optional
   */
  onActivate?: (props: {activeElement: HTMLElement | null}) => void

  /**
   * Controls the z-index offset applied to this layer.
   *
   * @remarks
   * The `Layer` component participates in a managed stacking context provided by
   * {@link LayerProvider}. The `zOffset` value is added to the base z-index
   * computed by the layer stack, determining this layer's final z-index position
   * relative to other layers.
   *
   * Higher values place the layer above sibling layers with lower offsets.
   * Supports responsive values.
   *
   * @type {ResponsiveProp\<number\>}
   * @defaultValue 1
   * @optional
   */
  zOffset?: ResponsiveProp<number>
}

/**
 * Accepted values for the `as` prop of the {@link Layer} component.
 *
 * @remarks
 * Inherits all element types from {@link CardElementType}, which in turn
 * inherits from {@link BoxElementType}. The rendered element receives all
 * applicable HTML attributes for the chosen element type.
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
 * A managed stacking-context component that provides z-index layering and
 * activation tracking for overlapping UI elements.
 *
 * @remarks
 * The `Layer` component renders a {@link Card}-based element wrapped in a
 * {@link LayerProvider} that manages z-index stacking. It is used as a
 * building block for components that need to participate in a layered
 * stacking context, such as {@link Popover}, {@link Tooltip}, and {@link Dialog}.
 *
 * Each `Layer` registers itself with the nearest parent `LayerProvider` and
 * receives a computed z-index based on its `zOffset` and position in the layer
 * stack. The `onActivate` callback fires when the layer becomes the topmost
 * layer in the stack.
 *
 * The `Layer` component inherits all visual and layout props from {@link Card},
 * including `scheme`, `tone`, `radius`, `shadow`, `padding`, and all
 * {@link BoxOwnProps}.
 *
 * ### Default prop values
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `LayerElementType` | `"div"` | No | The HTML element or component type to render. |
 * | `zOffset` | `ResponsiveProp<number>` | `1` | No | The z-index offset applied to this layer relative to its parent layer context. |
 * | `onActivate` | `(props: { activeElement: HTMLElement \| null }) => void` | `undefined` | No | Callback fired when this layer becomes the topmost active layer. |
 *
 * @public
 */
export function Layer<E extends LayerElementType = typeof DEFAULT_LAYER_ELEMENT>(
  props: LayerProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_LAYER_ELEMENT,
    children,
    zOffset = 1,
    ...rest
  } = props as LayerProps<typeof DEFAULT_LAYER_ELEMENT>

  return (
    <LayerProvider zOffset={zOffset}>
      <LayerCard {...rest} as={as}>
        {children}
      </LayerCard>
    </LayerProvider>
  )
}
