import {createGlobalScopedContext} from '@sanity/ui/core'
import {type Context, type MouseEvent as ReactMouseEvent} from 'react'

export interface MenuContextValue {
  version: 2
  activeElement: HTMLElement | null
  mount: (element: HTMLElement | null, selected?: boolean) => () => void
  onClickOutside?: (event: MouseEvent) => void
  onEscape?: () => void
  onItemClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void
  onItemMouseEnter?: (event: ReactMouseEvent<HTMLElement>) => void
  onItemMouseLeave?: (event: ReactMouseEvent<HTMLElement>) => void
  registerElement?: (el: HTMLElement) => () => void
}

export const MenuContext: Context<MenuContextValue | null> =
  createGlobalScopedContext<MenuContextValue | null>('@sanity/ui/v4/menu', null)
