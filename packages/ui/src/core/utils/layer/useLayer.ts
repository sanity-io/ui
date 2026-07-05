import {useContext} from 'react'

import {getLayerContext} from './getLayerContext'
import {LayerContext} from './layerContext'
import {LayerContextValue} from './types'

/**
 * @public
 */
export function useLayer(): LayerContextValue {
  const value = useContext(LayerContext)

  if (!value) {
    throw new Error('useLayer(): missing context value')
  }

  try {
    return getLayerContext(value)
  } catch (err) {
    if (err instanceof Error) {
      // oxlint-disable-next-line preserve-caught-error
      throw new Error(`useLayer(): ${err.message}`)
    } else {
      // oxlint-disable-next-line preserve-caught-error, restrict-template-expressions
      throw new Error(`useLayer(): ${err}`)
    }
  }
}
