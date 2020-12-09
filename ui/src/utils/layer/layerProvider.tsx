import React, {useCallback, useContext, useEffect, useState} from 'react'
import {LayerContext} from './layerContext'

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
  })

  return (
    <LayerContext.Provider value={{isTopLayer: size === 0, registerChild, size, zIndex}}>
      {children}
    </LayerContext.Provider>
  )
}
