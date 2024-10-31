import {MouseEvent as ReactMouseEvent} from 'react'

import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'

export interface MenuContextValue {
  version: 0.0
  activeElement: HTMLElement | null
  activeIndex: number
  mount: (element: HTMLElement | null, selected?: boolean) => () => void
  onClickOutside?: (event: MouseEvent) => void
  onEscape?: () => void
  onItemClick?: () => void
  onItemMouseEnter?: (event: ReactMouseEvent<HTMLElement>) => void
  onItemMouseLeave?: (event: ReactMouseEvent<HTMLElement>) => void
  registerElement?: (el: HTMLElement) => () => void

  /**
   * @deprecated Use `onItemMouseEnter` instead
   */
  onMouseEnter: (event: ReactMouseEvent<HTMLElement>) => void

  /**
   * @deprecated Use `onItemMouseLeave` instead
   */
  onMouseLeave: (event: ReactMouseEvent<HTMLElement>) => void
}

export const MenuContext = createGlobalScopedContext<MenuContextValue | null>(
  '@sanity/ui/context/menu',
  null,
)
