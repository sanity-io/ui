import {kbd, type RadiusStyleProps, type ResponsiveProp} from '@sanity/ui/css'
import type {FontTextSize} from '@sanity/ui/theme'

import type {ComponentType, Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'
import {Text} from '../text/Text'

/**
 * The default HTML element type rendered by the {@link KBD} component.
 *
 * @public
 */
export const DEFAULT_KBD_ELEMENT = 'kbd'

/**
 * Own props for the {@link KBD} component.
 *
 * @remarks
 * Extends {@link BoxOwnProps} and {@link RadiusStyleProps} to combine all Box
 * layout/style props with border radius control and a font size option for the
 * rendered keyboard input text.
 *
 * @public
 */
export type KBDOwnProps = BoxOwnProps &
  RadiusStyleProps & {
    /**
     * Sets the font size of the keyboard input text.
     *
     * @remarks
     * Uses the text font size scale defined by the theme. Supports responsive values.
     *
     * @defaultValue 1
     */
    fontSize?: ResponsiveProp<FontTextSize>
  }

/**
 * Accepted values for the `as` prop of the {@link KBD} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `KBD`.
 *
 * @public
 */
export type KBDElementType = 'kbd' | ComponentType

/**
 * Props for the {@link KBD} component.
 *
 * @remarks
 * Combines {@link KBDOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<kbd>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link KBDElementType}.
 *
 * @public
 */
export type KBDProps<E extends KBDElementType = KBDElementType> = Props<KBDOwnProps, E>

/**
 * Renders a styled keyboard input indicator using the semantic `<kbd>` HTML element.
 *
 * @remarks
 * The `KBD` component is used to represent a single keyboard key or key combination
 * in the UI. It renders a {@link Box} element styled with a muted background and
 * themed border radius, containing a {@link Text} element that displays the key label
 * with `medium` font weight.
 *
 * It is typically used as a building block within the {@link Hotkeys} component, or
 * standalone to annotate keyboard shortcuts in menus, tooltips, or documentation.
 *
 * @public
 */
export function KBD<E extends KBDElementType = typeof DEFAULT_KBD_ELEMENT>(
  props: KBDProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_KBD_ELEMENT,
    children,
    className,
    display = 'inline-block',
    fontSize = 1,
    padding = 1,
    radius = 2,
    ...rest
  } = props as KBDProps<typeof DEFAULT_KBD_ELEMENT>

  return (
    <Box
      data-ui="KBD"
      {...rest}
      as={as as BoxElementType}
      className={kbd({className, radius})}
      display={display}
      muted
      padding={padding}
    >
      <Text as="span" muted size={fontSize} weight="medium">
        {children}
      </Text>
    </Box>
  )
}
