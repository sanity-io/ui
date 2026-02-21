import {use} from 'react'

import {TreeContext} from './TreeContext'
import type {TreeContextValue} from './types'

/**
 * @beta
 */
export function useTree(): TreeContextValue {
  const tree = use(TreeContext)

  if (!tree) {
    throw new Error('Tree: missing context value')
  }

  return tree
}
