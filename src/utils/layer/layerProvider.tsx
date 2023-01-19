import {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {useMediaIndex, useArrayProp} from '../../hooks'
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
export function LayerProvider(props: LayerProviderProps): React.ReactElement {
  const {children, zOffset: zOffsetProp = 0} = props

  // Get parent context values
  const parent = useContext(LayerContext)
  const parentRegisterChild = parent?.registerChild
  const parentSize = parent?.size

  // Get z-index offset
  const zOffset = useArrayProp(zOffsetProp)

  // Get responsive z-index value
  const maxMediaIndex = zOffset.length - 1
  const mediaIndex = Math.min(useMediaIndex(), maxMediaIndex)
  const zIndex = parent ? parent.zIndex + zOffset[mediaIndex] : zOffset[mediaIndex]

  // This is a state value that is used to keep track of the number of child layers
  // This is only used by the root `LayerProvider`
  const [rootSize, setRootSize] = useState(0)

  // Calculate the size of the layer (i.e. number of child layers)
  const size = parentSize !== undefined ? parentSize - 1 : rootSize

  const registerChild = useCallback(() => {
    setRootSize((v) => v + 1)

    return () => setRootSize((v) => v - 1)
  }, [])

  useEffect(() => {
    if (!parentRegisterChild) return

    return parentRegisterChild()
  }, [parentRegisterChild])

  const value: LayerContextValue = useMemo(
    () => ({
      version: 0.0,
      isTopLayer: size === 0,
      registerChild: parentRegisterChild || registerChild,
      size,
      zIndex,
    }),
    [parentRegisterChild, registerChild, size, zIndex]
  )

  return <LayerContext.Provider value={value}>{children}</LayerContext.Provider>
}
