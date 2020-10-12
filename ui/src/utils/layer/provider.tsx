import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {LayerContext} from './context'

export function LayerProvider({children}: {children: React.ReactNode}) {
  const parentLayer = useContext(LayerContext)
  const [size, setSize] = useState(-1)

  const mount = useCallback(() => {
    setSize((val) => val + 1)
    return () => setSize((val) => val - 1)
  }, [])

  const layer = useMemo(() => {
    const layerDepth = parentLayer ? parentLayer.depth + 1 : 0
    const layerSize = parentLayer ? parentLayer.size : size

    return {
      depth: layerDepth,
      isTopLayer: layerDepth === layerSize,
      mount: parentLayer?.mount || mount,
      size: layerSize,
    }
  }, [mount, parentLayer, size])

  const mountFn = layer.mount

  useEffect(() => mountFn(), [mountFn])

  return <LayerContext.Provider value={layer}>{children}</LayerContext.Provider>
}
