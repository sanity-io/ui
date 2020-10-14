import {useContext} from 'react'
import {CardContext} from './cardContext'

export function useCard() {
  return useContext(CardContext)
}
