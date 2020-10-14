import {createContext} from 'react'

export interface MenuContextValue {
  activeIndex: number
  mount: (element: HTMLButtonElement | null) => () => void
  onItemClick?: () => void
  onMouseEnter: (event: React.MouseEvent<HTMLButtonElement>) => void
  onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const MenuContext = createContext<MenuContextValue | null>(null)
