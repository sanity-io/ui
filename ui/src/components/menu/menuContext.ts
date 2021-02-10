import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'

export interface MenuContextValue {
  activeIndex: number
  mount: (element: HTMLElement | null) => () => void
  onItemClick?: () => void
  onMouseEnter: (event: React.MouseEvent<HTMLElement>) => void
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void
}

const key = Symbol.for('@sanity/ui/context/menu')

globalScope[key] = globalScope[key] || createContext<MenuContextValue | null>(null)

export const MenuContext: React.Context<MenuContextValue | null> = globalScope[key]
