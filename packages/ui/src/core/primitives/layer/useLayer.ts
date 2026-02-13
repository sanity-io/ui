import {use} from 'react'

import {getLayerContext} from './getLayerContext'
import {LayerContext} from './LayerContext'
import type {LayerContextValue} from './types'

/** @public */
export function useLayer(): LayerContextValue {
  const value = use(LayerContext)

  if (!value) {
    throw new Error('useLayer(): missing context value')
  }

  try {
    return getLayerContext(value)
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`useLayer(): ${err.message}`)
    } else {
      throw new Error(`useLayer(): ${err}`)
    }
  }
}
