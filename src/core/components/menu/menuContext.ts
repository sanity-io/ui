import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'

export interface MenuContextValue {
  version: 2
  activeElement: HTMLElement | null
  mount: (element: HTMLElement | null, selected?: boolean) => () => void
  onClickOutside?: (event: MouseEvent) => void
  onEscape?: () => void
  onItemClick?: () => void
  onItemMouseEnter: (event: React.MouseEvent<HTMLElement>) => void
  onItemMouseLeave: (event: React.MouseEvent<HTMLElement>) => void
  registerElement?: (el: HTMLElement) => () => void
}

export const MenuContext = createGlobalScopedContext<MenuContextValue | null>(
  '@sanity/ui/context/menu',
  null,
)
