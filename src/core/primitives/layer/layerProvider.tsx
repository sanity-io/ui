import type {Breakpoint, ResponsiveProp} from '@sanity/ui/css'
import {
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {useMediaIndex} from '../../hooks/useMediaIndex/useMediaIndex'
import {useResponsiveProp} from '../../hooks/useResponsiveProp'
import {getLayerContext} from './getLayerContext'
import {LayerContext} from './layerContext'
import type {LayerContextValue} from './types'

/** @public */
export interface LayerProviderProps {
  children?: ReactNode
  zOffset?: ResponsiveProp<number>
}

/** @public */
export function LayerProvider(props: LayerProviderProps): ReactElement {
  const {children, zOffset: zOffsetProp = 0} = props

  // Get parent context values
  const parentContextValue = useContext(LayerContext)
  const parent = parentContextValue && getLayerContext(parentContextValue)
  const parentRegisterChild = parent?.registerChild
  const parentLevel = parent?.level ?? 0

  // Get level
  const level = parentLevel + 1

  // Get z-index offset
  const zOffset = useResponsiveProp(zOffsetProp)

  // Get responsive z-index value
  const maxMediaIndex = Object.values(zOffset).length - 1
  const mediaIndex = Math.min(useMediaIndex(), maxMediaIndex) as Breakpoint
  const zIndex = parent ? parent.zIndex + (zOffset[mediaIndex] ?? 0) : (zOffset[mediaIndex] ?? 0)

  // A state value that is used to keep track of the number of child layers on each level
  const [, setChildLayers] = useState<Record<number, number>>({})

  // A state value that is used to keep track of the number of child levels
  const [size, setSize] = useState(0)

  const isTopLayer = size === 0

  const registerChild = useCallback(
    (childLevel?: number) => {
      // Register child layers to the parent layer
      const parentDispose = parentRegisterChild?.(childLevel)

      if (childLevel !== undefined) {
        setChildLayers((state) => {
          const prevLen = state[childLevel] ?? 0
          const nextState = {...state, [childLevel]: prevLen + 1}

          setSize(Object.keys(nextState).length)

          return nextState
        })
      } else {
        // Legacy behavior: if no child level is provided, increment the size by 1
        setSize((v) => v + 1)
      }

      return () => {
        if (childLevel !== undefined) {
          setChildLayers((state) => {
            const nextState = {...state}

            if (nextState[childLevel] === 1) {
              delete nextState[childLevel]

              setSize(Object.keys(nextState).length)
            } else {
              nextState[childLevel] -= 1
            }

            return nextState
          })
        } else {
          // Legacy behavior: if no child level is provided, decrement the size by 1
          setSize((v) => v - 1)
        }

        parentDispose?.()
      }
    },
    [parentRegisterChild, setSize, setChildLayers],
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
