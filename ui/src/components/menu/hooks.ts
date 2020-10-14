import {useContext} from 'react'
import {MenuContext} from './menuContext'

export function useMenu() {
  const menu = useContext(MenuContext)

  if (!menu) {
    throw new Error('Menu: missing context value')
  }

  return menu
}
