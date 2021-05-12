import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'

export interface MenuContextValue {
  version: 0.0
  activeElement: HTMLElement | null
  activeIndex: number
  mount: (element: HTMLElement | null, selected?: boolean) => () => void
  onClickOutside?: (event: MouseEvent) => void
  onEscape?: () => void
  onItemClick?: () => void
  onMouseEnter: (event: React.MouseEvent<HTMLElement>) => void
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void
  registerElement?: (el: HTMLElement) => () => void
}

const key = Symbol.for('@sanity/ui/context/menu')

globalScope[key] = globalScope[key] || createContext<MenuContextValue | null>(null)

export const MenuContext: React.Context<MenuContextValue | null> = globalScope[key]
