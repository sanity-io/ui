import {useContext} from 'react'

import {A11yContext, A11yContextValue} from './A11yContext'

/** @internal */
export function useA11y(): A11yContextValue {
  const props = useContext(A11yContext)

  if (!props) {
    throw new Error('A11y: missing context value')
  }

  return props
}
