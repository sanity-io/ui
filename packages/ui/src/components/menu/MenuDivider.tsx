import type {ComponentType, Props} from '@sanity/ui/core'
import {menu_divider} from '@sanity/ui/css'

/**
 * The default HTML element type rendered by the {@link MenuDivider} component.
 *
 * @public
 */
export const DEFAULT_MENU_DIVIDER_ELEMENT = 'hr'

/**
 * Own props for the {@link MenuDivider} component.
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type MenuDividerOwnProps = {}

/**
 * Accepted values for the `as` prop of the {@link MenuDivider} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `MenuDivider`.
 *
 * @public
 */
export type MenuDividerElementType = 'div' | 'hr' | 'span' | ComponentType

/**
 * Props for the {@link MenuDivider} component.
 *
 * @remarks
 * Combines {@link MenuDividerOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders an `<hr>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link MenuDividerElementType}.
 *
 * @public
 */
export type MenuDividerProps<E extends MenuDividerElementType = MenuDividerElementType> = Props<
  MenuDividerOwnProps,
  E
>

/**
 * A visual separator rendered between groups of {@link MenuItem} components
 * within a {@link Menu}.
 *
 * @public
 */
export function MenuDivider<E extends MenuDividerElementType = typeof DEFAULT_MENU_DIVIDER_ELEMENT>(
  props: MenuDividerProps<E>,
): React.JSX.Element {
  const {
    as: Element = DEFAULT_MENU_DIVIDER_ELEMENT,
    className,
    ...rest
  } = props as MenuDividerProps<typeof DEFAULT_MENU_DIVIDER_ELEMENT>

  return <Element {...rest} className={menu_divider({className})} />
}
