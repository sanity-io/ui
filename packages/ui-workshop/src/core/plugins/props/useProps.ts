import {useContext} from 'react'
import {PropsContext, PropsContextValue} from './PropsContext'

/** @internal */
export function useProps(): PropsContextValue {
  const props = useContext(PropsContext)

  if (!props) {
    throw new Error('Props: missing context value')
  }

  return props
}
