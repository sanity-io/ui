import {type Context, type MouseEvent as ReactMouseEvent} from 'react'

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
}

export const MenuContext: Context<MenuContextValue | null> =
  createGlobalScopedContext<MenuContextValue | null>('@sanity/ui/v3/menu', null)
