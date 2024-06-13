import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {useMediaIndex} from '../../hooks'
import {_getArrayProp} from '../../styles'
import {getLayerContext} from './getLayerContext'
import {LayerContext} from './layerContext'

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
export function LayerProvider(props: LayerProviderProps): React.ReactElement {
  const {children, zOffset: zOffsetProp = 0} = props

  // Get parent context values
  const parentContextValue = useContext(LayerContext)
  const parentRegisterChild = useContext(LayerContextRegisterChild)
  const parent = parentContextValue && getLayerContext(parentContextValue)
  const parentLevel = parent?.level ?? 0

  // Get level
  const level = parentLevel + 1

  // Get z-index offset
  const zOffset = useMemo(() => _getArrayProp(zOffsetProp), [zOffsetProp])

  // Get responsive z-index value
  const maxMediaIndex = zOffset.length - 1
  const mediaIndex = Math.min(useMediaIndex(), maxMediaIndex)
  const zIndex = parent ? parent.zIndex + zOffset[mediaIndex] : zOffset[mediaIndex]

  // A state value that is used to keep track of the number of child layers on each level
  const [childLayers, setChildLayers] = useState<Record<number, number>>({})
  // A memo value that is used to keep track of the number of child levels
  const size = useMemo(() => Object.keys(childLayers).length, [childLayers])

  const isTopLayer = size === 0

  const registerChild = useCallback(
    (childLevel: number) => {
      // Register child layers to the parent layer
      const parentDispose = parentRegisterChild?.(childLevel)

      setChildLayers((state) => {
        const prevLen = state[childLevel] ?? 0
        const nextState = {...state, [childLevel]: prevLen + 1}

        return nextState
      })

      return () => {
        setChildLayers((state) => {
          const nextState = {...state}

          if (nextState[childLevel] === 1) {
            delete nextState[childLevel]
          } else {
            nextState[childLevel] -= 1
          }

          return nextState
        })

        parentDispose?.()
      }
    },
    [parentRegisterChild],
  )

  // Register this layer on mount
  useEffect(() => parentRegisterChild?.(level), [level, parentRegisterChild])

  const value = useMemo(
    () => ({
      version: 0.0 as const,
      isTopLayer,
      level,
      size,
      zIndex,
    }),
    [isTopLayer, level, size, zIndex],
  )

  return (
    <LayerContext.Provider value={value}>
      <LayerContextRegisterChild.Provider value={registerChild}>
        {children}
      </LayerContextRegisterChild.Provider>
    </LayerContext.Provider>
  )
}

const LayerContextRegisterChild = createContext<((childLevel: number) => () => void) | null>(null)
