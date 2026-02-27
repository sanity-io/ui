import {type ResponsiveProp, spinner} from '@sanity/ui/css'
import type {FontTextSize} from '@sanity/ui/theme'

import type {ComponentType, Props} from '../../types'
import {Text} from '../text/Text'
import {AnimatedSpinnerIcon} from './AnimatedSpinnerIcon'

/**
 * The default HTML element type rendered by the {@link Spinner} component.
 *
 * @public
 */
export const DEFAULT_SPINNER_ELEMENT = 'div'

/**
 * Own props for the {@link Spinner} component.
 *
 * @remarks
 * Defines the configuration for rendering an animated loading indicator.
 *
 * @public
 */
export type SpinnerOwnProps = {
  /**
   * When `true`, reduces the visual prominence of the spinner by applying
   * a muted foreground color from the theme.
   */
  muted?: boolean

  /**
   * Sets the size of the spinner icon.
   *
   * @remarks
   * Uses the text font size scale defined by the theme. The spinner scales
   * proportionally to the specified font size. Supports responsive values.
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
 * Renders an animated spinner icon to indicate that something is loading
 * for an indeterminate amount of time.
 *
 * @remarks
 * The `Spinner` component renders a continuously animating icon wrapped in a
 * {@link Text} element. The size of the spinner is controlled by the `size` prop,
 * which maps to the theme's text font size scale. The `muted` prop can be used
 * to reduce its visual prominence.
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
      <AnimatedSpinnerIcon />
    </Text>
  )
}
