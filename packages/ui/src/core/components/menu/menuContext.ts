import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'

export interface MenuContextValue {
  version: 2
  activeElement: HTMLElement | null
  mount: (element: HTMLElement | null, selected?: boolean) => () => void
  onClickOutside?: (event: MouseEvent) => void
  onEscape?: () => void
  onItemClick?: () => void
  /**
   * Makes `event.currentTarget` the active item. Named for the pointer entering an item, which is
   * how items usually become active; an item also calls it when a click or key press on it has to
   * make it the active item first.
   */
  onItemMouseEnter: (event: React.SyntheticEvent<HTMLElement>) => void
  onItemMouseLeave: (event: React.MouseEvent<HTMLElement>) => void
  registerElement?: (el: HTMLElement) => () => void
}

export const MenuContext = createGlobalScopedContext<MenuContextValue | null>(
  '@sanity/ui/context/menu',
  null,
)
