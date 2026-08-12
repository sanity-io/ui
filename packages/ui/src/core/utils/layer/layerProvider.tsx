import {useCallback, useContext, useEffect, useMemo, useState} from 'react'

import {useMediaIndex} from '../../hooks/useMediaIndex/useMediaIndex'
import {_getArrayProp} from '../../styles/helpers'
import {getLayerContext} from './getLayerContext'
import {LayerContext} from './layerContext'
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

  // Track the number of child layers on each level together with the number of
  // child levels ("size") in a single state value, so each transition is a pure
  // updater — React may invoke updater functions more than once, so they must
  // not perform nested state updates.
  const [{size}, setLayerState] = useState<{
    childLayers: Record<number, number>
    size: number
  }>({childLayers: {}, size: 0})

  const isTopLayer = size === 0

  const registerChild = useCallback(
    (childLevel?: number) => {
      // Register child layers to the parent layer
      const parentDispose = parentRegisterChild?.(childLevel)

      if (childLevel !== undefined) {
        setLayerState(({childLayers}) => {
          const prevLen = childLayers[childLevel] ?? 0
          const nextChildLayers = {...childLayers, [childLevel]: prevLen + 1}

          return {childLayers: nextChildLayers, size: Object.keys(nextChildLayers).length}
        })
      } else {
        // Legacy behavior: if no child level is provided, increment the size by 1
        setLayerState((state) => ({...state, size: state.size + 1}))
      }

      return () => {
        if (childLevel !== undefined) {
          setLayerState((state) => {
            const nextChildLayers = {...state.childLayers}

            if (nextChildLayers[childLevel] === 1) {
              delete nextChildLayers[childLevel]

              return {childLayers: nextChildLayers, size: Object.keys(nextChildLayers).length}
            }

            nextChildLayers[childLevel] -= 1

            return {...state, childLayers: nextChildLayers}
          })
        } else {
          // Legacy behavior: if no child level is provided, decrement the size by 1
          setLayerState((state) => ({...state, size: state.size - 1}))
        }

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
