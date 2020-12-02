import {createContext} from 'react'

export interface MenuContextValue {
  activeIndex: number
  mount: (element: HTMLElement | null) => () => void
  onItemClick?: () => void
  onMouseEnter: (event: React.MouseEvent<HTMLElement>) => void
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void
}

export const MenuContext = createContext<MenuContextValue | null>(null)
