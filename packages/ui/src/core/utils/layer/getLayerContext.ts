import {isRecord} from '../../lib/isRecord'
import {LayerContextValue} from './types'

export function getLayerContext(contextValue: LayerContextValue): LayerContextValue {
  // NOTE: This check is for future-compatiblity
  // - If the value is not an object, it’s not compatible with the current version
  // - If the value is an object, but doesn’t have `version: 0.0`, it’s not compatible with the current version
  if (!isRecord(contextValue) || contextValue.version !== 0.0) {
    throw new Error('the context value is not compatible')
  }

  if (!contextValue) {
    throw new Error('components using `useLayer()` should be wrapped in a <LayerProvider>.')
  }

  if (contextValue.version === 0.0) {
    return contextValue
  }

  throw new Error('could not get layer context')
}
