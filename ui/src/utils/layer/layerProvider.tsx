import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {LayerContext, LayerContextValue} from './layerContext'

export function LayerProvider({
  children,
  zOffset = 0,
}: {
  children?: React.ReactNode
  zOffset?: number
}) {
  const parent = useContext(LayerContext)
  const zIndex = parent ? parent.zIndex + zOffset : zOffset
  const [size, setSize] = useState(0)

  const registerChild = useCallback(() => {
    setSize((v) => v + 1)

    return () => setSize((v) => v - 1)
  }, [])

  const parentRegisterChild = parent?.registerChild

  useEffect(() => {
    if (!parentRegisterChild) return

    return parentRegisterChild()
  }, [parentRegisterChild])

  const value: LayerContextValue = useMemo(
    () => ({version: 0.0, isTopLayer: size === 0, registerChild, size, zIndex}),
    [size, registerChild, zIndex]
  )

  return <LayerContext.Provider value={value}>{children}</LayerContext.Provider>
}
