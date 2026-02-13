import {use} from 'react'

import {CardContext} from './CardContext'
import type {CardContextValue} from './types'

/** @public */
export function useCard(): CardContextValue {
  const card = use(CardContext)

  assertCardContext(card)

  return card
}

/** @internal */
export function assertCardContext(card: CardContextValue | null): asserts card is CardContextValue {
  if (!card) {
    throw new Error('useCard(): missing context value', {cause: card})
  }
}
