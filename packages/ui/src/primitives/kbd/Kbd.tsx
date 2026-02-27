import {_splitKeys, type ComponentType, type Props} from '@sanity/ui/core'
import {kbd, KBD_STYLE_PROP_KEYS, type KBDStyleProps} from '@sanity/ui/css'

/**
 * The default HTML element type rendered by the {@link KBD} component.
 *
 * @public
 */
export const DEFAULT_KBD_ELEMENT = 'kbd'

/**
 * Style props for the {@link KBD} component.
 *
 * @remarks
 * Inherits all properties from {@link KBDStyleProps}, which provides
 * styling utilities for keyboard input elements.
 *
 * @public
 */
export type KBDOwnProps = KBDStyleProps

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
 * The `KBD` component renders a styled keyboard input element, used to
 * visually represent a key or key combination.
 *
 * @remarks
 * Renders a `<kbd>` element by default, styled with the theme's keyboard
 * input typography and visual treatment.
 *
 * @public
 */
export function KBD<E extends KBDElementType = typeof DEFAULT_KBD_ELEMENT>(
  props: KBDProps<E>,
): React.JSX.Element {
  const [
    styleProps,
    {
      as: Element = DEFAULT_KBD_ELEMENT,
      children,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as KBDProps<typeof DEFAULT_KBD_ELEMENT>, KBD_STYLE_PROP_KEYS)

  return (
    <Element data-ui="KBD" {...domProps} className={kbd(styleProps)}>
      {children}
    </Element>
  )
}
