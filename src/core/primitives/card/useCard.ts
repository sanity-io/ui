import {useContext} from 'react'

import {CardContext} from './cardContext'
import type {CardContextValue} from './types'

/** @public */
export function useCard(): CardContextValue {
  const card = useContext(CardContext)

  if (!card) {
    throw new Error('useCard(): missing context value')
  }

  return card
}
