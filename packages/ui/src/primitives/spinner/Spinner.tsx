import type {ComponentType, Props} from '@sanity/ui/core'
import {type ResponsiveProp, spinner} from '@sanity/ui/css'
import {Text} from '@sanity/ui/primitives/text'
import type {FontTextSize} from '@sanity/ui/theme'

import {SpinnerAnimatedIcon} from './SpinnerAnimatedIcon'

/**
 * The default HTML element type rendered by the {@link Spinner} component.
 *
 * @public
 */
export const DEFAULT_SPINNER_ELEMENT = 'div'

/**
 * Own props for the {@link Spinner} component.
 *
 * @public
 */
export type SpinnerOwnProps = {
  /**
   * When `true`, applies a muted foreground color to the spinner.
   */
  muted?: boolean

  /**
   * Sets the size of the spinner, using the text font size scale from the theme.
   * Supports responsive values.
   */
  size?: ResponsiveProp<FontTextSize>
}

/**
 * Accepted values for the `as` prop of the {@link Spinner} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Spinner`.
 *
 * @public
 */
export type SpinnerElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link Spinner} component.
 *
 * @remarks
 * Combines {@link SpinnerOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link SpinnerElementType}.
 *
 * @public
 */
export type SpinnerProps<E extends SpinnerElementType = SpinnerElementType> = Props<
  SpinnerOwnProps,
  E
>

/**
 * The `Spinner` component indicates that something is loading for an
 * indeterminate amount of time.
 *
 * @remarks
 * Renders an animated spinning icon inside a {@link Text} component,
 * inheriting the theme's text sizing and color treatment.
 *
 * @public
 */
export function Spinner<E extends SpinnerElementType = typeof DEFAULT_SPINNER_ELEMENT>(
  props: SpinnerProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_SPINNER_ELEMENT,
    className,
    ...rest
  } = props as SpinnerProps<typeof DEFAULT_SPINNER_ELEMENT>

  return (
    <Text as={as} data-ui="Spinner" {...rest} className={spinner({className})}>
      <SpinnerAnimatedIcon />
    </Text>
  )
}
