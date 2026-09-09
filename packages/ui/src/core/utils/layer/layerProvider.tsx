import {useCallback, useContext, useEffect, useMemo, useReducer} from 'react'

import {useMediaIndex} from '../../hooks/useMediaIndex/useMediaIndex'
import {_getArrayProp} from '../../styles/helpers'
import {getLayerContext} from './getLayerContext'
import {LayerContext} from './layerContext'
import {INITIAL_LAYER_STATE, layerReducer} from './layerReducer'
import {LayerContextValue} from './types'

/**
 * @public
 */
export interface LayerProviderProps {
  children?: React.ReactNode
  zOffset?: number | number[]
}

/**
 * @public
 */
export function LayerProvider(props: LayerProviderProps): React.JSX.Element {
  const {children, zOffset: zOffsetProp = 0} = props

  // Get parent context values
  const parentContextValue = useContext(LayerContext)
  const parent = parentContextValue && getLayerContext(parentContextValue)
  const parentRegisterChild = parent?.registerChild
  const parentLevel = parent?.level ?? 0

  // Get level
  const level = parentLevel + 1

  // Get z-index offset
  const zOffset = _getArrayProp(zOffsetProp)

  // Get responsive z-index value
  const maxMediaIndex = zOffset.length - 1
  const mediaIndex = Math.min(useMediaIndex(), maxMediaIndex)
  const zIndex = parent ? parent.zIndex + zOffset[mediaIndex] : zOffset[mediaIndex]

  const [{size}, dispatch] = useReducer(layerReducer, INITIAL_LAYER_STATE)

  const isTopLayer = size === 0

  const registerChild = useCallback(
    (childLevel?: number) => {
      // Register child layers to the parent layer
      const parentDispose = parentRegisterChild?.(childLevel)

      dispatch({type: 'register', level: childLevel})

      return () => {
        dispatch({type: 'unregister', level: childLevel})
        parentDispose?.()
      }
    },
    [parentRegisterChild],
  )

  // Register this layer on mount
  useEffect(() => parentRegisterChild?.(level), [level, parentRegisterChild])

  const value: LayerContextValue = useMemo(
    () => ({
      version: 0.0,
      isTopLayer,
      level,
      registerChild,
      size,
      zIndex,
    }),
    [isTopLayer, level, registerChild, size, zIndex],
  )

  return <LayerContext.Provider value={value}>{children}</LayerContext.Provider>
}
