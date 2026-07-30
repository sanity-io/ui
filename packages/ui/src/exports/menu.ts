'use client'

// The `@sanity/ui/menu` entry point. `MenuButton` and `MenuGroup` render a
// `Popover` (which depends on `@floating-ui/react-dom` and `motion`), so the
// menu components live together on their own subpath to keep those
// dependencies out of the root entry point.
export {Menu, type MenuProps} from '../core/components/menu/menu'
export {MenuButton, type MenuButtonProps} from '../core/components/menu/menuButton'
export {MenuDivider, type MenuDividerProps} from '../core/components/menu/menuDivider'
export {
  MenuGroup,
  type MenuGroupOwnProps,
  type MenuGroupProps,
} from '../core/components/menu/menuGroup'
export {
  MenuItem,
  type MenuItemOwnProps,
  type MenuItemProps,
} from '../core/components/menu/menuItem'
