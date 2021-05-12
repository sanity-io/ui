import {useContext} from 'react'
import {TreeContext} from './treeContext'
import {TreeContextValue} from './types'

export function useTree(): TreeContextValue {
  const tree = useContext(TreeContext)

  if (!tree) {
    throw new Error('Tree: missing context value')
  }

  return tree
}
