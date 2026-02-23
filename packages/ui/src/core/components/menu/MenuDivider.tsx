import {menuDivider} from '@sanity/ui/css'

import type {ComponentType, Props} from '../../types'

/**
 * The default HTML element type rendered by the {@link MenuDivider} component.
 *
 * @public
 */
export const DEFAULT_MENU_DIVIDER_ELEMENT = 'hr'

/**
 * Own props for the {@link MenuDivider} component.
 *
 * @remarks
 * `MenuDividerOwnProps` is an empty interface — the component does not define
 * any props of its own beyond the intrinsic HTML attributes inherited from
 * the element type specified by the `as` prop. It exists as a named type so
 * that {@link MenuDividerProps} can be composed consistently with other
 * component prop types in the design system.
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
 * Accepted values: `"div"` | `"hr"` | `"span"` | `ComponentType`
 *
 * @public
 */
export type MenuDividerElementType = 'div' | 'hr' | 'span' | ComponentType

/**
 * Props for the {@link MenuDivider} component.
 *
 * @remarks
 * Combines {@link MenuDividerOwnProps} (empty) with the intrinsic HTML attributes
 * of the element type specified by the `as` prop. When `as` is not provided,
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
 * @remarks
 * The `MenuDivider` component renders a styled horizontal rule (`<hr>`) by
 * default that visually separates sections of menu items. It does not accept
 * any component-specific props — only intrinsic HTML attributes for the
 * rendered element type.
 *
 * ### Default prop values
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `MenuDividerElementType` | `"hr"` | No | The HTML element or component type to render. Accepted values: `"div"` \| `"hr"` \| `"span"` \| `ComponentType`. |
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

  return <Element {...rest} className={menuDivider({className})} />
}
