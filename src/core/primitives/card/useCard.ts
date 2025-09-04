import {use} from 'react'

import {CardContext} from './CardContext'
import type {CardContextValue} from './types'

/** @public */
export function useCard(): CardContextValue {
  const card = use(CardContext)

  if (!card) {
    throw new Error('useCard(): missing context value')
  }

  return card
}
