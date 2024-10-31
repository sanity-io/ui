import {useContext} from 'react'

import {CardContext} from './cardContext'
import type {CardContextValue} from './types'

export function useCard(): CardContextValue | null {
  return useContext(CardContext)
}
