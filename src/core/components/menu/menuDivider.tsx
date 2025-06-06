import {menuDivider} from '@sanity/ui/css'

import type {ComponentType, Props} from '../../types/props'

/** @public */
export const DEFAULT_MENU_DIVIDER_ELEMENT = 'hr'

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type MenuDividerOwnProps = {}

/** @public */
export type MenuDividerElementType = 'div' | 'hr' | 'span' | ComponentType

/** @public */
export type MenuDividerProps<E extends MenuDividerElementType = MenuDividerElementType> = Props<
  MenuDividerOwnProps,
  E
>

/** @public */
export function MenuDivider<E extends MenuDividerElementType = typeof DEFAULT_MENU_DIVIDER_ELEMENT>(
  props: MenuDividerProps<E>,
) {
  const {
    as: Element = DEFAULT_MENU_DIVIDER_ELEMENT,
    className,
    ...rest
  } = props as MenuDividerProps<typeof DEFAULT_MENU_DIVIDER_ELEMENT>

  return <Element {...rest} className={menuDivider({className})} />
}
